import _ from 'lodash';

import {
  GET_FEEDBACK,
  EDIT_FEEDBACK,
  DELETE_FEEDBACK,
  SEND_TEXT,
} from '../../actions/types';

const INITIAL_STATE = {
  feedback: null,
  sent: null,
};

const textReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_TEXT:
      return {...state, sent: action.payload};
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: {..._.mapKeys(action.payload, i => i.id)},
      };
    case EDIT_FEEDBACK:
      const fb = state.feedback[action.payload.feedbackId];
      if (fb.response) {
        fb.response.push(action.payload.message);
      } else {
        fb.response = [action.payload.message];
      }
      return {
        ...state,
        feedback: {...state.feedback, [fb.id]: fb},
      };
    case DELETE_FEEDBACK:
      const {feedback} = state;
      delete feedback[action.payload];
      return {...state, feedback: {...feedback}};
    default:
      return state;
  }
};

export default textReducer;
