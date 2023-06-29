import {combineReducers} from 'redux';
import textReducer from './textReducer';
import popupReducer from './popupReducer';
import authReducer from './authReducer';
import homeChefReducer from './homeChefReducer';

const appReducer = combineReducers({
  text: textReducer,
  popup: popupReducer,
  auth: authReducer,
  homeChef: homeChefReducer,
});

export default appReducer;
