import {setAlert} from './popup';
import {SEND_TEXT, GET_FRIDGES} from './types';
import server from './api';
import {navigate} from '../RootNavigation';

export const sendText = (message, region, photo) => async dispatch => {
  const postBody = new FormData();
  postBody.append('message', message);
  postBody.append('region', region);
  if (photo) {
    postBody.append('photo', photo);
  }

  const res = await server.post('/text/outgoing/mobile', postBody, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  dispatch({type: SEND_TEXT, payload: res.data});
  dispatch(setAlert('Message Sent'));
  navigate('TextSuccess');
};

export const getFridges = () => async dispatch => {
  const {data} = await server.get('/home-chef/campaign/fridges');
  dispatch({type: GET_FRIDGES, payload: data});
};
