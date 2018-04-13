import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_RESET,
    /* todo fleiri actions */
  } from '../actions/register';

const initialState = {
  isRequesting: false,
  isDone: false,
}

export default (state = initialState, action) => {
  switch(action.type) {

    case REGISTER_REQUEST:
      return {
        ...state,
        isRequesting: action.isRequesting,
        isDone: action.isDone,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRequesting: action.isRequesting,
        isDone: action.isDone,
        message: action.message,
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        isRequesting: action.isRequesting,
        isDone: action.isDone,
        message: action.message,
      }
    case REGISTER_RESET:
      return {
        ...state,
        isRequesting: action.isRequesting,
        isDone: action.isDone,
      }
    default:
      return state;
  }
}