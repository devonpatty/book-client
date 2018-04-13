import api from '../api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_RESET = 'REGISTER_RESET';

function requestRegister() {
    return {
        type: REGISTER_REQUEST,
        isRequesting: true,
        isDone: false,
    };
}

function receivedRequest() {
    return {
        type: REGISTER_SUCCESS,
        isRequesting: false,
        isDone: true,
        message: null,
    }
}

function registerError(message) {
    return {
        type: REGISTER_FAILURE,
        isRequesting: false,
        isDone: false,
        message,
    }
}

function registerReset() {
    return {
        type: REGISTER_RESET,
        isRequesting: false,
        isDone: false,
    }
}

export const register = (username, password, name) => {
    return async (dispatch) => {
        dispatch(requestRegister());

        let register;
        try {
            register = await api.register(username, password, name);
        } catch (err) {
            return dispatch(registerError(err));
        }
        
        if (!register.success) {
            dispatch(registerError(register.error));
        }

        if (register.success) {
            dispatch(receivedRequest());
        }
    }
}

export const reset = () => {
    return async (dispatch) => {
        dispatch(registerReset());
    }
}