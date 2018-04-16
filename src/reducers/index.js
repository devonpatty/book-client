import { combineReducers } from 'redux';
import auth from './auth';
import register from './register';
import upload from './upload';

export default combineReducers({
  auth,
  register,
  upload,
});