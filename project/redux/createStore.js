import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';

import combinedReducer from './reducers.js';

const middlewares = [ReduxThunk, ReduxLogger];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const store = createStoreWithMiddleware(combinedReducer);

export default store;
