import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useHttp } from '../../hooks/http.hook';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchHeroes, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const stateSelector = createSelector(
        state => state.heroes.heroes,
        state => state.filters.activeFilter,
        (heroes, activeFilter) => {
            if (activeFilter === 'all') {
                return heroes
            } else {
                return heroes.filter(char => char.element === activeFilter)
            }
        }
    )
    const heroes = useSelector(({ heroes }) => heroes.heroes)
    const heroesLoadingStatus = useSelector(({ heroes }) => heroes.heroesLoadingStatus)
    const filteredHeroes = useSelector(stateSelector)

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request))
        // eslint-disable-next-line
    }, []);

    const deleteChar = useCallback((id) => {
        dispatch(heroDelete(heroes, id))
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(console.log(`next char was deleted: `, heroes.find(c => c.id === id)))
            .catch(e => console.log(e))
        // eslint-disable-next-line
    }, [heroes])

    if (heroesLoadingStatus === "loading") return <Spinner />;
    if (heroesLoadingStatus === "error") return <h5 className="text-center mt-5">Ошибка загрузки</h5>

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <CSSTransition timeout={450} classNames="hero">
                <h5 className="text-center mt-5 hero_idle">Героев пока нет</h5>
            </CSSTransition>
        }

        return arr.map(({ id, ...props }) => {
            return <CSSTransition key={id} timeout={450} classNames="hero">
                <HeroesListItem id={id} deleteChar={deleteChar} {...props} />
            </CSSTransition>
        })
    }

    const elements = renderHeroesList(filteredHeroes);

    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;