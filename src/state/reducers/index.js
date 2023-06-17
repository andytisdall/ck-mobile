import {combineReducers} from 'redux';
import textReducer from './textReducer';
import popupReducer from './popupReducer';
import authReducer from './authReducer';

const appReducer = combineReducers({
  text: textReducer,
  popup: popupReducer,
  auth: authReducer,
});

export default appReducer;
