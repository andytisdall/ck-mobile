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
      return {alert: action.payload};
    case ERROR:
      const {message, timeout} = action.payload;
      return {error: message, timeout};
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
