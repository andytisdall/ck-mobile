import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import server from './api';
import {SIGN_IN, SIGN_OUT, GET_USER_INFO} from './types';

export const signIn = (username, password) => async dispatch => {
  const res = await server.post('/signin', {
    username,
    password,
  });
  await AsyncStorage.setItem('ck-token', res.data.token);
  await registerDeviceToken(res.data.user);
  dispatch({type: SIGN_IN, payload: res.data.user});
};

export const signOut = () => async dispatch => {
  try {
    await GoogleSignin.signOut();
  } catch (err) {}

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
    await registerDeviceToken(data.user);
    dispatch({type: SIGN_IN, payload: data.user});
  };

export const getUser = () => async dispatch => {
  const token = await AsyncStorage.getItem('ck-token');
  if (token) {
    const response = await server.get('/user');
    if (response.data?.username) {
      dispatch({
        type: 'SIGN_IN',
        payload: {
          username: response.data.username,
          busDriver: response.data.busDriver,
        },
      });
    }
  }
};

export const getUserInfo = () => async dispatch => {
  const res = await server.get('/user/userInfo');
  // check for active home chef status
  // and check on the routes too (new middleware)
  dispatch({type: GET_USER_INFO, payload: res.data});
};

export const registerDeviceToken = async user => {
  const deviceToken = await AsyncStorage.getItem('ck-push-notification-token');
  if (deviceToken) {
    if (deviceToken !== user.homeChefNotificationToken) {
      await server.post('/user/save-token', {token: deviceToken});
    }
    await AsyncStorage.removeItem('ck-push-notification-token');
  }
};
