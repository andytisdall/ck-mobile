import {setAlert} from './popup';
import {SEND_TEXT, GET_FRIDGES, CLEAR_TEXT} from './types';
import server from './api';
// import {router} from '../App';

// export const addPhone = (phone, region) => async dispatch => {
//   await server.post('/text/addphone', {phone, region});
//   dispatch(setAlert('Phone Number Added'));
//   router.navigate('..');
// };

// const loadImageBase64 = async capturedImageURI => {
//   try {
//     const base64Data = await readFile(capturedImageURI, 'base64');
//     return 'data:image/jpeg;base64,' + base64Data;
//   } catch (error) {
//     console.error('Error converting image to base64:', error);
//   }
// };

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
};

export const clearText = () => {
  return {type: CLEAR_TEXT};
};

export const getFridges = () => async dispatch => {
  const {data} = await server.get('/home-chef/campaign/fridges');
  dispatch({type: GET_FRIDGES, payload: data});
};
