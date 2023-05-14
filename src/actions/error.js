import { CLEAR_ERROR, ERROR } from './types';

export const setError = (err) => (dispatch) => {
  let message;
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
    dispatch({ type: CLEAR_ERROR });
  }, 7000);
  dispatch({ type: ERROR, payload: { message, timeout } });
};
