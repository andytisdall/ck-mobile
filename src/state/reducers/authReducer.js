import {SIGN_IN, SIGN_OUT, GET_USER_INFO} from '../../actions/types';

const INITIAL_STATE = {
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {...state, user: action.payload};
    case SIGN_OUT:
      return {...state, user: null};
    case GET_USER_INFO:
      if (!state.user) {
        return state;
      }
      return {...state, user: {...state.user, ...action.payload}};
    default:
      return state;
  }
};

export default authReducer;
