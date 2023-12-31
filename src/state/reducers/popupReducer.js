import {ALERT, ERROR, CLEAR_MESSAGES} from '../../actions/types';

const INITIAL_STATE = {
  error: undefined,
  alert: undefined,
  timeout: undefined,
};

const popupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALERT:
      if (state.timeout) {
        clearTimeout(state.timeout);
      }
      return {error: undefined, alert: action.payload, timeout};
    case ERROR:
      const {message, timeout} = action.payload;
      return {error: message, timeout, alert: undefined};
    case CLEAR_MESSAGES:
      if (state.timeout) {
        clearTimeout(state.timeout);
      }
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default popupReducer;
