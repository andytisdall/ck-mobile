import _ from 'lodash';

import {
  GET_SHIFTS,
  SIGN_UP_FOR_SHIFT,
  GET_HOURS,
  EDIT_HOURS,
  GET_CAMPAIGN,
  GET_FRIDGES,
} from '../../actions/types';

const INITIAL_STATE = {
  jobs: null,
  shifts: null,
  hours: null,
  campaign: null,
};

const homeChefReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHIFTS:
      return {
        ...state,
        jobs: action.payload.jobs,
        shifts: _.mapKeys(action.payload.shifts, i => i.id),
      };
    case SIGN_UP_FOR_SHIFT:
      const shift = state.shifts[action.payload.shift];
      shift.open = false;
      return {
        ...state,
        shifts: {...state.shifts, [action.payload.shift]: shift},
        hours: {...state.hours, [action.payload.id]: action.payload},
      };
    case GET_HOURS:
      return {...state, hours: _.mapKeys(action.payload, i => i.id)};
    case EDIT_HOURS:
      let newHours;
      if (action.payload.cancel) {
        newHours = {...state.hours};
        delete newHours[action.payload.id];
      } else {
        const hours = state.hours[action.payload.id];
        newHours = {
          ...state.hours,
          [action.payload.id]: {...hours, ...action.payload},
        };
      }
      return {...state, hours: newHours};
    case GET_CAMPAIGN:
      return {...state, campaign: action.payload};
    case GET_FRIDGES:
      return {
        ...state,
        townFridges: action.payload,
      };
    default:
      return state;
  }
};

export default homeChefReducer;
