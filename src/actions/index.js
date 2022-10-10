import { createAction } from "@reduxjs/toolkit"

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching())
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

// createAction(type: str, func?: payload) второй аргумент опциональный если не указывать то payload будет передан автоматически.
export const heroesFetching = createAction('HEROES_FETCHING')
export const heroesFetched = createAction('HEROES_FETCHED')
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

export const heroDelete = createAction('HERO_DELETE', (arr, id) => ({ payload: arr.filter(char => char.id !== id) }))
export const heroAdd = createAction('HERO_ADD')
export const heroFilter = createAction('HERO_FILTER')