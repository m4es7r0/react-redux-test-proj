import { createStore, combineReducers, compose } from 'redux';
import { filters, heroes } from '../reducers/index';

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const oldDispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === 'string') return oldDispatch({ type: action })
        else return oldDispatch(action)
    }

    return store
}

const store = createStore(
    combineReducers({ heroes, filters }),
    compose(
        enhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;