import { ADD_BOOK, UPDATE_BOOK,FETCH_BOOKS, DELETE_BOOK, SET_SEARCH_QUERY, FETCH_BOOKS_ERROR ,FETCH_BOOKS_PENDING} from '../Actions/books';

const initialState = {
  books: [],
  searchQuery: '',
  error: null,
  pending: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      }
    case FETCH_BOOKS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case FETCH_BOOKS:
      return {
        ...state,
        pending: false,
        books: action.payload,
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book => {
          if (book.id === action.payload.id) {
            return { ...book, ...action.payload };
          }
          return book;
        }),
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== action.payload),
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
}
