import {fetchBooks,fetchBooksPending, fetchBooksError} from './Actions/books';

export const fetchProducts = (page) => {
    return async (dispatch) => {
      dispatch(fetchBooksPending());
      try {
        const response = await fetch(`http://localhost:3000/api/books?page=${page}`);
        const data = await response.json();
        dispatch(fetchBooks(data));
      } catch (error) {
        dispatch(fetchBooksError(error.message));
      }
    };
};
  