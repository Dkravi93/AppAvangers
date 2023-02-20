export const ADD_BOOK = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOKS_PENDING = 'FETCH_BOOKS_PENDING';
export const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR';
// Action Creators

export const fetchBooksPending= ()=> {
    return {
        type: FETCH_BOOKS_PENDING
    }
}

export const fetchBooksError = (error) => {
    return {
        type: FETCH_BOOKS_ERROR,
        error: error
    }
}
export const fetchBooks = books => ({
    type: "FETCH_BOOKS",
    payload: books
});
export const addBook = book => ({
  type: ADD_BOOK,
  payload: book,
});
export const updateBook = book => ({
  type: UPDATE_BOOK,
  payload: book,
});
export const deleteBook = id => ({
  type: DELETE_BOOK,
  payload: id,
});
export const searchBooks = searchTerm => ({
  type: SET_SEARCH_QUERY,
  payload: searchTerm,
});


