import { combineReducers } from 'redux';
import auth from './auth';
import register from './register';
import upload from './upload';
import search from './search';

export default combineReducers({
  auth,
  register,
  upload,
  search,
});