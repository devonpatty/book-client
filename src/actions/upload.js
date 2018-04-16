import api from '../api';

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

function requestUpload() {
  return {
    type: UPLOAD_REQUEST,
    isUploading: true,
  }
}

function receiveUrl(url) {
  return {
    type: UPLOAD_SUCCESS,
    isUploading: false,
    url,
  }
}

function uploadError(message) {
  return {
    type: UPLOAD_FAILURE,
    isUploading: false,
    message,
  }
}

export const upload = (file) => {
  return async (dispatch) => {
    dispatch(requestUpload());

    let upload;
    try {
      upload = await api.updatePicture(file);
    } catch (err) {
      return dispatch(uploadError(err));
    }
    
    if (upload) {
      const { secure_url } = upload;
      localStorage.setItem('picture', JSON.stringify(secure_url));
      dispatch(receiveUrl(file));
      window.location.reload();
    }
  }
}

export const getPic = () => {
  return async (dispatch) => {
    dispatch(requestUpload());

    let picture;
    try {
      picture = await api.getMe();
    } catch (err) {
      return dispatch(uploadError(err));
    }

    if(picture) {
      const { url } = picture;
      localStorage.setItem('picture', JSON.stringify(url));
      dispatch(receiveUrl(url));
    }
  }
}