import {GET_SHIFTS, SIGN_UP_FOR_SHIFT, GET_HOURS} from './types';
import server from './api';
import {setAlert} from './popup';
import {navigate} from '../RootNavigation';

export const getShifts = () => async dispatch => {
  const {data} = await server.get('/home-chef/job-listing');
  dispatch({type: GET_SHIFTS, payload: data});
};

export const signUpForShift =
  (shiftId, mealCount, jobId, date, soup) => async dispatch => {
    const {data} = await server.post('/home-chef/hours', {
      shiftId,
      mealCount,
      jobId,
      date,
      soup,
    });
    dispatch({type: SIGN_UP_FOR_SHIFT, payload: data});
    dispatch(setAlert('You Signed Up For A Shift'));
    navigate('SignupConfirm', {hoursId: data.id});
  };

export const getHours = () => async dispatch => {
  const res = await server.get('/home-chef/hours');
  dispatch({type: GET_HOURS, payload: res.data});
};
