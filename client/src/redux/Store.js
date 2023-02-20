import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers/rootReducer';


// Create the store with the rootReducer and the thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

