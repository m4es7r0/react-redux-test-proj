import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

import { filters, heroes } from '../reducers/index';


//// MiddleWare взаемодействует только с Dispatch
const stringMiddleWare = () => (dispatch) => (action) => {
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

//// Vanila Redux
// const store = createStore(
//     combineReducers({ heroes, filters }),
//     compose(
//         applyMiddleware(thunk, stringMiddleWare),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ));

const store = configureStore({
    reducer: {filters, heroes},
    middleware: [thunk, stringMiddleWare],
    devTools: process.env.NODE_ENV !== 'production' ? true : false,
})

export default store;