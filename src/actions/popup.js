import {CLEAR_MESSAGES, ALERT, ERROR} from './types';

export const setError = err => dispatch => {
  let message;
  console.log(err._response);
  if (err.response?.data) {
    if (err.response.data.error) {
      message = err.response.data.error;
    } else {
      message = err.response.data;
    }
  } else {
    message = err.message;
  }
  console.log(err);
  const timeout = setTimeout(() => {
    dispatch({type: CLEAR_MESSAGES});
  }, 7000);
  dispatch({type: ERROR, payload: {message, timeout}});
};

export const setAlert = message => dispatch => {
  dispatch({type: ALERT, payload: message});
  setTimeout(() => {
    dispatch({type: CLEAR_MESSAGES});
  }, 10000);
};

export const clearMessages = () => {
  return {type: CLEAR_MESSAGES};
};
