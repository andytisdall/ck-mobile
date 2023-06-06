import {CLEAR_MESSAGES} from '../actions/types';

const clearError =
  ({dispatch, getState}) =>
  next =>
  action => {
    if (typeof action === 'function' && getState().popup.error) {
      dispatch({type: CLEAR_MESSAGES});
    }
    next(action);
  };

export default clearError;
