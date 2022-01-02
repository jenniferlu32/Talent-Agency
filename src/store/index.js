import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import clientsReducer from './clients';

const rootReducer = combineReducers({
  clients: clientsReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk, loggingMiddleware));
