import {CLEAR_MESSAGES, ALERT} from './types';

export const clearMessages = () => {
  return {type: CLEAR_MESSAGES};
};

export const setAlert = message => dispatch => {
  dispatch({type: ALERT, payload: message});
  setTimeout(() => {
    dispatch({type: CLEAR_MESSAGES});
  }, 10000);
};
