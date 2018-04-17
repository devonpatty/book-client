import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  /* todo fleiri actions */
} from '../actions/search';

const initialState = {
  isSearching: false,
  isCompleted: false,
  books: null,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SEARCH_REQUEST:
      return {
        ...state,
        isSearching: action.isSearching,
        isCompleted: action.isCompleted,
      }
    case SEARCH_SUCCESS:
      console.log(action);
      return {
        ...state,
        isSearching: action.isSearching,
        isCompleted: action.isCompleted,
        books: action.books,
      }
    case SEARCH_FAILURE:
      return {
        ...state,
        isSearching: action.isSearching,
        isCompleted: action.isCompleted,
        error: action.error,
      }
    default:
      return state;
  }
}