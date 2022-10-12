import { createReducer } from "@reduxjs/toolkit";

import { heroesFetching, heroesFetched, heroesFetchingError, heroAdd, heroDelete } from "../actions";

const defaultState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(defaultState, builder => {
    builder
        .addCase(heroesFetching, (state) => {
            state.heroesLoadingStatus = 'loading'
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroes = action.payload
            state.heroesLoadingStatus = 'idle'
        })
        .addCase(heroesFetchingError, (state) => {
            state.heroesLoadingStatus = 'error'
        })
        .addCase(heroDelete, (state, action) => {
            state.heroes = action.payload
        })
        .addCase(heroAdd, (state, action) => {
            state.heroes.push(action.payload)
        })
        .addDefaultCase(() => { })
})

// const heroes = (state = defaultState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_DELETE':
//             return {
//                 ...state,
//                 heroes: action.payload,
//             }
//         case 'HERO_ADD':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//             }
//         default: return state
//     }
// }

export default heroes;