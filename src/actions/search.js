import api from '../api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

function requestSearch() {
  return {
    type: SEARCH_REQUEST,
    isSearching: true,
    isCompleted: false,
  }
}

function receiveBooks(books) {
  return {
    type: SEARCH_SUCCESS,
    isSearching: false,
    isCompleted: true,
    books,
  }
}

function searchError(error) {
  return {
    type: SEARCH_FAILURE,
    isSearching: false,
    isCompleted: false,
    error,
  }
}

/* todo async "thunk" fyrir tengingu við vefþjónustu */
export const searchBooks = (title) => {
  return async (dispatch) => {
    dispatch(requestSearch());

    let search;
    try {
      search = await api.search(title);
    } catch (error) {
      return dispatch(searchError(error));
    }

    if (search) {
      dispatch(receiveBooks(search));
    }
  }
}