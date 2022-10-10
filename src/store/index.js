import { createStore, combineReducers } from 'redux';
import { filters, heroes } from '../reducers/index';

const store = createStore(combineReducers({ heroes, filters }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;