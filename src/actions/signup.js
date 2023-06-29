import {GET_SHIFTS} from './types';
import server from './api';

export const getShifts = () => async dispatch => {
  const {data} = await server.get('/home-chef/job-listing');
  dispatch({type: GET_SHIFTS, payload: data});
};
