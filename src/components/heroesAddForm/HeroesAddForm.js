import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';

import { heroesFetchingError, heroAdd, heroFilter } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const { activeFilter } = useSelector(state => state)
    const dispatch = useDispatch();
    const { request } = useHttp();

    const [newChar, setNewChar] = useState(null)
    const [options, setOptions] = useState([])

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => setOptions(data))
            .catch(() => dispatch(heroesFetchingError()))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (newChar !== null) {
            request("http://localhost:3001/heroes/", "POST", JSON.stringify(newChar))
            dispatch(heroAdd(newChar))
            dispatch(heroFilter(activeFilter))
        }
        // eslint-disable-next-line
    }, [newChar])

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewChar({
            "id": uuidv4(),
            "name": e.target[0].value,
            "description": e.target[1].value,
            "element": e.target[2].value
        });
        e.target.reset();
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                >
                    <option hidden selected>Я владею элементом...</option>
                    {options
                        .filter(el => el.name !== "all")
                        .map(el => <option key={el.name} value={el.name}>{el.title}</option>)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;