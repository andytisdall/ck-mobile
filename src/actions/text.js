import AsyncStorage from '@react-native-async-storage/async-storage';
import {addDays} from 'date-fns';

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
      photoAlreadySentToThisRegion = storedText.sentTo.includes(region);
    }

    if (photo) {
      postBody.append('photo', photo);
    }

    if (storedText?.photoUrl && !photoAlreadySentToThisRegion) {
      postBody.append('photo', storedText.photoUrl);
    }
    const res = await server.post('/text/outgoing', postBody, {
      headers: {'Content-Type': 'multipart/form-data'},
    });

    navigate('TextSuccess');
    dispatch(setAlert('Message Sent'));

    if (user.busDriver) {
      if (storedText) {
        if (!photoAlreadySentToThisRegion) {
          const modifiedStoredText = {
            ...storedText,
            sentTo: [...storedText.sentTo, res.data.region],
          };
          await AsyncStorage.setItem(
            'ck-text',
            JSON.stringify(modifiedStoredText),
          );
          dispatch({type: GET_STORED_TEXT, payload: modifiedStoredText});
        }
      } else {
        const newStoredText = {
          photoUrl: res.data.photoUrl,
          sentTo: [res.data.region],
          name,
          restaurants,
          date: new Date(),
        };
        await AsyncStorage.setItem('ck-text', JSON.stringify(newStoredText));
        dispatch({type: GET_STORED_TEXT, payload: newStoredText});
      }
    }

    dispatch({type: SEND_TEXT, payload: res.data});
  };

export const getStoredText = () => async dispatch => {
  const existingText = await AsyncStorage.getItem('ck-text');
  if (existingText) {
    const storedText = JSON.parse(existingText);
    if (addDays(new Date(storedText.date), 1) > new Date()) {
      dispatch({
        type: GET_STORED_TEXT,
        payload: storedText,
      });
    } else {
      dispatch(deleteStoredText());
    }
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
    payload: null,
  });
};

export const getFridges = () => async dispatch => {
  const {data} = await server.get('/home-chef/campaign/fridges');
  dispatch({type: GET_FRIDGES, payload: data});
};
