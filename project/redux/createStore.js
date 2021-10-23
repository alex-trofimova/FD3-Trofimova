import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';

import combinedReducer from './reducers.js';
import { saveState, loadState } from './storage.js'
import { saveDataToAJAX, loadDataFromAJAX } from './AJAXstorage.js'

const persistedState = loadState();
//const persistedState = loadDataFromAJAX();
const middlewares = [ReduxThunk, ReduxLogger];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);


export const store = createStoreWithMiddleware(combinedReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>{
    saveState(store.getState())
})

// store.subscribe(()=>{
//     saveDataToAJAX(store.getState())
// })

export default store;
