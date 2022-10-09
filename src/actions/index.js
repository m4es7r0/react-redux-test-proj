export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDelete = (arr, id) => {
    return {
        type: 'HERO_DELETE',
        payload: arr.filter(char => char.id !== id)
    }
}

export const heroAdd = (char) => {
    return {
        type: 'HERO_ADD',
        payload: char
    }
}