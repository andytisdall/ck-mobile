import {combineReducers} from 'redux';
import textReducer from './textReducer';
import popupReducer from './popupReducer';

const appReducer = combineReducers({
  text: textReducer,
  popup: popupReducer,
});

export default appReducer;
