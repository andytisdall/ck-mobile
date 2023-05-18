import {combineReducers} from 'redux';
import textReducer from './textReducer';

const appReducer = combineReducers({
  text: textReducer,
});

export default appReducer;
