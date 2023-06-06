import {setAlert} from './popup';
import {SEND_TEXT, GET_FRIDGES} from './types';
import server from './api';
// import {router} from '../App';

// export const addPhone = (phone, region) => async dispatch => {
//   await server.post('/text/addphone', {phone, region});
//   dispatch(setAlert('Phone Number Added'));
//   router.navigate('..');
// };

const REGION_NAMES = {
  WEST_OAKLAND: 'WEST_OAKLAND',
  EAST_OAKLAND: 'EAST_OAKLAND',
};

const townFridges = [
  {
    name: 'Homies',
    address: '7631 MacArthur Blvd',
    region: REGION_NAMES.EAST_OAKLAND,
  },
  {
    name: 'Omni Commons',
    address: '4799 Shattuck Ave',
    region: REGION_NAMES.WEST_OAKLAND,
  },
  {
    name: 'City Slicker Farms',
    address: '2847 Peralta St',
    region: REGION_NAMES.WEST_OAKLAND,
  },
  {
    name: '44th St. & Telegraph',
    region: REGION_NAMES.WEST_OAKLAND,
  },
  {
    name: 'Hasta Muerte',
    address: 'East 27th St & Fruitvale Ave',
    region: REGION_NAMES.EAST_OAKLAND,
  },
  {
    name: '10th St. & Mandela',
    region: REGION_NAMES.WEST_OAKLAND,
  },
  {name: '59th St. & Vallejo', region: REGION_NAMES.WEST_OAKLAND},
];

export const sendText = (message, region, photo) => async dispatch => {
  const postBody = new FormData();
  postBody.append('message', message);
  postBody.append('region', region);
  if (photo) {
    postBody.append('photo', photo);
  }

  const res = await server.post('/text/outgoing/mobile', postBody, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  dispatch({type: SEND_TEXT, payload: res.data});
  dispatch(setAlert('Message Sent'));
};

export const getFridges = () => async dispatch => {
  // const {data} = await server.get('/home-chef/campaign/fridges');
  dispatch({type: GET_FRIDGES, payload: townFridges});
};
