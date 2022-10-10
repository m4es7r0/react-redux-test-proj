const defaultState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    activeFilter: 'all',
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
                heroes: action.payload,
            }
        case 'HERO_ADD':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            }
        case 'HERO_FILTER':
            return {
                ...state,
                activeFilter: action.payload
            }
        default: return state
    }
}

export default reducer;