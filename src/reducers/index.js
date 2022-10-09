const defaultState = {
    heroes: [],
    filteredHeroes: [],
    heroesLoadingStatus: 'idle',
    activeFilter: 'all',
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
                filteredHeroes: action.payload === 'all' ? [...state.heroes] : [...state.heroes].filter(char => char.element === action.payload),
                activeFilter: action.payload
            }
        default: return state
    }
}

export default reducer;