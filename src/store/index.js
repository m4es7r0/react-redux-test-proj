import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { filters, heroes } from '../reducers/index';


//// MiddleWare взаемодействует только с Dispatch
const stringMiddleWare = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') return dispatch({ type: action })
    else return dispatch(action)
}

//// Enhancer изменяет store и его работу 
// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;

//     store.dispatch = (action) => {
//         if (typeof action === 'string') return oldDispatch({ type: action })
//         else return oldDispatch(action)
//     }

//     return store
// }

const store = createStore(
    combineReducers({ heroes, filters }),
    compose(
        applyMiddleware(stringMiddleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;