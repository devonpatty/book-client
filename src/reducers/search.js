import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  HREF_SEARCH,
  /* todo fleiri actions */
} from '../actions/search';

const initialState = {
  isSearching: false,
  search: false,
  isCompleted: false,
  books: null,
  query: '',
  resetPage: 1,
  changePage: 1,
  show: true,
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
        search: action.search,
        books: action.books,
        query: action.query,
        resetPage: action.resetPage,
        changePage: action.changePage,
        show: action.show,
      }
    case HREF_SEARCH:
      console.log(action);
      return {
        ...state,
        isSearching: action.isSearching,
        search: action.search,
        isCompleted: action.isCompleted,
        books: action.books,
        query: action.query,
        changePage: action.changePage,
        show: action.show,
      }
    case SEARCH_FAILURE:
      return {
        ...state,
        isSearching: action.isSearching,
        search: action.search,
        isCompleted: action.isCompleted,
        error: action.error,
      }
    default:
      return state;
  }
}