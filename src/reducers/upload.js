import {
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
} from '../actions/upload';

const url = JSON.parse(localStorage.getItem('picture') || 'null');

const initialState = {
  isUploading: false,
  url,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case UPLOAD_REQUEST: 
      return {
        ...state,
        isUploading: action.isUploading,
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        isUploading: action.isUploading,
        url: action.url,
      }
    case UPLOAD_FAILURE:
      return {
        ...state,
        isUploading: action.isUploading,
        message: action.message,
      }
    default:
      return state;
  }
}