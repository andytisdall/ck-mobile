import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import server from './api';
import {SIGN_IN, SIGN_OUT} from './types';
import {setError} from './popup';

const authFlow = async (dispatch, token) => {
  if (token) {
    await AsyncStorage.setItem('ck-token', token);
  }
  const {data} = await server.get('/user/userInfo');
  if (!data.busDriver && data.homeChefStatus !== 'Active') {
    return dispatch(
      setError(
        'You must be an active home chef to use this app. Please complete the onboarding process at portal.ckoakland.org',
      ),
    );
  }
  registerDeviceToken(data);
  dispatch({type: SIGN_IN, payload: data});
};

export const signIn = (username, password) => async dispatch => {
  const {data} = await server.post('/signin', {
    username,
    password,
  });
  authFlow(dispatch, data.token);
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
    authFlow(dispatch, data.token);
  };

export const signOut = () => async dispatch => {
  try {
    await GoogleSignin.signOut();
  } catch (err) {}

  await AsyncStorage.removeItem('ck-token');
  dispatch({type: SIGN_OUT});
};

export const getUser = () => async dispatch => {
  const token = await AsyncStorage.getItem('ck-token');
  if (token) {
    try {
      authFlow(dispatch);
    } catch (err) {
      await AsyncStorage.removeItem('ck-token');
    }
  }
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
