const defaultState = {
    heroes: [],
    filteredHeroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: [...state.heroes],
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE':
            return {
                ...state,
                heroes: action.payload
            }
        case 'HERO_ADD':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        default: return state
    }
}

export default reducer;