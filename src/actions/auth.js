import server from './api';
import {SIGN_IN} from './types';

export const signIn = (username, password) => async dispatch => {
  const res = await server.post('/signin', {
    username,
    password,
  });
  // localStorage.setItem('ck-token', res.data.token);
  dispatch({type: SIGN_IN, payload: res.data.user});
};
