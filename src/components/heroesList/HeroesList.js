import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDelete, heroFilter } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const { heroesLoadingStatus, filteredHeroes, activeFilter } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .then(() => dispatch(heroFilter(activeFilter)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const deleteChar = useCallback((id) => {
        if (filteredHeroes.length !== 0) {
            dispatch(heroDelete(filteredHeroes, id))
            dispatch(heroFilter(activeFilter))
            request(`http://localhost:3001/heroes/${id}`, "DELETE")
                .then(console.log(`next char was deleted: `, filteredHeroes.find(c => c.id === id)))
                .catch(e => console.log(e))
        }

        // eslint-disable-next-line
    }, [filteredHeroes])

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