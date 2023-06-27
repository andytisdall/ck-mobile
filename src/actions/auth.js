import AsyncStorage from '@react-native-async-storage/async-storage';

import server from './api';
import {SIGN_IN, SIGN_OUT} from './types';

export const signIn = (username, password) => async dispatch => {
  const res = await server.post('/signin', {
    username,
    password,
  });
  await AsyncStorage.setItem('ck-token', res.data.token);
  dispatch({type: SIGN_IN, payload: res.data.user});
};

export const signOut = () => async dispatch => {
  await AsyncStorage.removeItem('ck-token');
  dispatch({type: SIGN_OUT});
};

export const googleSignIn =
  ({user}) =>
  async dispatch => {
    const {data} = await server.post('/google-signin/mobile', {
      email: user.email,
      familyName: user.familyName,
      givenName: user.givenName,
      googleId: user.id,
    });
    await AsyncStorage.setItem('ck-token', data.token);
    dispatch({type: SIGN_IN, payload: data.user});
  };

export const getUser = () => async dispatch => {
  const token = await AsyncStorage.getItem('ck-token');
  if (token) {
    const response = await server.get('/user');
    if (response.data?.username) {
      dispatch({
        type: 'SIGN_IN',
        payload: {username: response.data.username},
      });
    }
  }
};
