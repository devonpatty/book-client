import api from '../api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const HREF_SEARCH = 'HREF_SEARCH';

function requestSearch() {
  return {
    type: SEARCH_REQUEST,
    isSearching: true,
    isCompleted: false,
  }
}

function receiveBooks(books, query, resetPage, changePage, show) {
  return {
    type: SEARCH_SUCCESS,
    isSearching: false,
    search: true,
    isCompleted: true,
    books,
    query,
    resetPage,
    changePage,
    show,
  }
}

function hrefSearch(books, query, changePage, show) {
  return {
    type: HREF_SEARCH,
    isSearching: false,
    search: false,
    isCompleted: true,
    books,
    query,
    changePage,
    show,
  }
}

function searchError(error) {
  return {
    type: SEARCH_FAILURE,
    isSearching: false,
    search: false,
    isCompleted: false,
    error,
  }
}

function iterate(items) {
  let counter = 0;
  items.map((item) => {
    if(item) {
      counter++;
    }
  });
  if(counter < 10) {
    return false;
  }
  return true;
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

    const resetPage = 1;
    let boo = search.data.links;

    let show;
    if (search) {
      if (iterate(search.data.items)) {
        show = true;
        dispatch(receiveBooks(search, title, resetPage, resetPage, show));
      } else {
        show = false;
        dispatch(receiveBooks(search, title, resetPage, resetPage, show));
      }
    }
  }
}

export const goToHref = (href, title, changePage, action) => {
  return async (dispatch) => {
    dispatch(requestSearch());

    let search;
    try {
      search = await api.searchHref(href);
    } catch (error) {
      return dispatch(searchError(error));
    }

    let manualPage = changePage;
    if (action === 'next') {
      manualPage++;
    } else if (action === 'prev') {
      manualPage--;
    }

    let boo = search.data.links;
    let show;
    if (search) {
      if (iterate(search.data.items)) {
        show = true;
        dispatch(hrefSearch(search, title, manualPage, show));
      } else if (!boo.hasOwnProperty("next")) {
        show = false;
        dispatch(hrefSearch(search, title, manualPage, show));
      }
    }
  }
}