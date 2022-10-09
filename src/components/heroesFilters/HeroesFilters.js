
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";

import { heroFilter } from '../../actions/index'

const HeroesFilters = () => {
    const dispatch = useDispatch()
    const { request } = useHttp()
    const [filters, setFilters] = useState([])

    useEffect(() => {
        request("http://localhost:3001/filters/")
            .then(setFilters)
            .catch(e => console.log(e))
        // eslint-disable-next-line
    }, [])

    const handleSetFilter = (e) => {
        dispatch(heroFilter(e.target.value));
        document.querySelectorAll('.btn-group>button').forEach(el => {
            el.classList.remove('active')
        })
        e.target.classList.add('active')
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(({ name, title, style }) => {
                        return <button
                            className={`btn ${style}`}
                            key={name}
                            value={name}
                            onClick={handleSetFilter}
                        >
                            {title}
                        </button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;