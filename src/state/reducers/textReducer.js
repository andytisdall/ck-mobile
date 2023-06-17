import {GET_FRIDGES, SEND_TEXT, CLEAR_TEXT} from '../../actions/types';

const INITIAL_STATE = {
  sent: null,
  townFridges: null,
};

const textReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_TEXT:
      return {...state, sent: action.payload};
    case GET_FRIDGES:
      return {...state, townFridges: action.payload};
    case CLEAR_TEXT:
      return {...state, sent: null};
    default:
      return state;
  }
};

export default textReducer;
