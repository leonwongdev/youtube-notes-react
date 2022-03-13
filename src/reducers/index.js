import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

//key in combineReducers will be the key of the state
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});
