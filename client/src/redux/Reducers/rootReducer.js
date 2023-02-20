import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import bookReducer from './bookReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
cart: cartReducer,
books: bookReducer,
auth: authReducer,
});

export default rootReducer;