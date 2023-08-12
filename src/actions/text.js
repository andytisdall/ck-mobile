import AsyncStorage from '@react-native-async-storage/async-storage';

import {setAlert} from './popup';
import {SEND_TEXT, GET_FRIDGES, GET_STORED_TEXT} from './types';
import server from './api';
import {navigate} from '../RootNavigation';

export const sendText =
  (message, region, photo, name, restaurants) => async (dispatch, getState) => {
    const postBody = new FormData();
    postBody.append('message', message);
    postBody.append('region', region);

    const user = getState().auth.user;
    const storedText = getState().text.stored;
    let photoAlreadySentToThisRegion = false;
    if (user.busDriver && storedText) {
      photoAlreadySentToThisRegion = storedText?.sentTo.includes(region);
    }

    if (photo) {
      postBody.append('photo', photo);
    }

    if (storedText?.photoUrl && !photoAlreadySentToThisRegion) {
      postBody.append('photo', storedText.photoUrl);
    }

    const res = await server.post('/text/outgoing/mobile', postBody, {
      headers: {'Content-Type': 'multipart/form-data'},
    });

    if (user.busDriver) {
      if (storedText) {
        if (!photoAlreadySentToThisRegion) {
          await AsyncStorage.setItem(
            'ck-text',
            JSON.stringify({
              ...storedText,
              sentTo: [...storedText.sentTo, res.data.region],
            }),
          );
        }
      } else {
        const newStoredText = {
          photoUrl: res.data.photoUrl,
          sentTo: [res.data.region],
          name,
          restaurants,
        };
        await AsyncStorage.setItem('ck-text', JSON.stringify(newStoredText));
        dispatch({type: GET_STORED_TEXT, payload: newStoredText});
      }
    }

    dispatch({type: SEND_TEXT, payload: res.data});
    dispatch(setAlert('Message Sent'));
    navigate('TextSuccess');
  };

export const getStoredText = () => async dispatch => {
  const existingText = await AsyncStorage.getItem('ck-text');
  if (existingText) {
    dispatch({
      type: GET_STORED_TEXT,
      payload: JSON.parse(existingText),
    });
  } else {
    dispatch({
      type: GET_STORED_TEXT,
      payload: null,
    });
  }
};

export const deleteStoredText = () => async dispatch => {
  await AsyncStorage.removeItem('ck-text');
  dispatch({
    type: GET_STORED_TEXT,
    payload: undefined,
  });
};

export const getFridges = () => async dispatch => {
  const {data} = await server.get('/home-chef/campaign/fridges');
  dispatch({type: GET_FRIDGES, payload: data});
};
