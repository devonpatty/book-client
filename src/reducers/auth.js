import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  /* todo fleiri actions */
} from '../actions/auth';

const user = JSON.parse(localStorage.getItem('user') || 'null');
const token = JSON.parse(localStorage.getItem('token') || 'null');

const initialState = {
  isFetching: false,
  isAuthenticated: user ? true : false,
  user,
  token,
};

export default (state = initialState, action) => {
  switch (action.type) {

    /* todo setja upp reducer */
    case LOGIN_REQUEST:
      console.log(action);
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      }
    case LOGIN_SUCCESS:
      console.log(action);
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.token,
        message: action.message,
      }
    case LOGIN_FAILURE:
      console.log(action);
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message,
      }
    case LOGIN_LOGOUT:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.token,
      }
    default:
      return state;
  }
};
