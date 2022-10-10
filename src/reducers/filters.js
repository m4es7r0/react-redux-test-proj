const defaultState = {
    activeFilter: 'all',
}

const filters = (state = defaultState, action) => {
    switch (action.type) {
        case 'HERO_FILTER':
            return {
                ...state,
                activeFilter: action.payload
            }
        default: return state
    }
}

export default filters;