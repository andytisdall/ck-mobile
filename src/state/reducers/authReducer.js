import {SIGN_IN} from '../../actions/types';

const INITIAL_STATE = {
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {...state, user: action.payload};
    default:
      return state;
  }
};

export default authReducer;
