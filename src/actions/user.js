import {
  SIGN_IN,
  SIGN_OUT,
  GET_ALL_USERS,
  CREATE_USER,
  EDIT_USER,
  GET_USER_INFO,
} from './types';
import server from './api';
import { setAlert } from './alert';
import { router } from '../App';

export const getUser = () => async (dispatch) => {
  try {
    const res = await server.get('/user');
    dispatch({ type: SIGN_IN, payload: res.data });
  } catch (err) {
    dispatch(signOut);
    throw Error(err.message);
  }
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const res = await server.get('/user/userInfo');
    dispatch({ type: GET_USER_INFO, payload: res.data });
  } catch (err) {
    router.navigate('/404');
    throw Error(err);
  }
};

export const getAllUsers = () => async (dispatch) => {
  const res = await server.get('/user/all');
  dispatch({ type: GET_ALL_USERS, payload: res.data });
};

export const signIn = (username, password) => async (dispatch) => {
  const res = await server.post('/signin', {
    username,
    password,
  });
  localStorage.setItem('ck-token', res.data.token);
  dispatch({ type: SIGN_IN, payload: res.data.user });

  // prompt new user to change password
  if (!res.data.user.active) {
    router.navigate('user/change-password');
  }
};

export const googleSignIn = (credential) => async (dispatch) => {
  const res = await server.post('/google-signin', { credential });
  localStorage.setItem('ck-token', res.data.token);
  dispatch({ type: SIGN_IN, payload: res.data.user });
};

export const signOut = () => {
  localStorage.removeItem('ck-token');
  return { type: SIGN_OUT };
};

export const createUser =
  (username, password, salesforceId) => async (dispatch) => {
    const res = await server.post('/user', {
      username,
      password,
      salesforceId,
    });
    dispatch({ type: CREATE_USER, payload: res.data });
    dispatch(setAlert('User Created'));
  };

export const editUser =
  (userId, username, password, salesforceId) => async (dispatch) => {
    const res = await server.patch('/user', {
      userId,
      username,
      password,
      salesforceId,
    });
    dispatch({ type: EDIT_USER, payload: res.data });
    dispatch(setAlert('User Modified!'));
    router.navigate('/');
  };
