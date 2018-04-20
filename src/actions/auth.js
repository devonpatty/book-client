
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';
export const UPDATE_NAME = 'UPDATE_NAME';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

/* todo fleiri action */

function receiveLogin(user, token, name) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    name,
    token,
    message: null,
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
    token: null,
    name: null,
  }
}

function nameUpdate(name) {
  return {
    type: UPDATE_NAME,
    name,
  }
}
/* todo async "thunk" fyrir tengingu við vefþjónustu */

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    let login;
    try {
      login = await api.login(username, password);
    } catch (err) {
      return dispatch(loginError(err));
    }

    if (!login.loggedIn) {
      dispatch(loginError(login.error));
    } 

    if (login.loggedIn) {
      const { user, token, name } = login;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('name', JSON.stringify(name));
      dispatch(receiveLogin(user, token, name));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('picture');
    localStorage.removeItem('name');
    dispatch(logout());
  }
}

export const updateNameProfile = (name) => {
  return async (dispatch) => {
    localStorage.removeItem('name');
    localStorage.setItem('name', JSON.stringify(name));
    dispatch(nameUpdate(name));
  }
}