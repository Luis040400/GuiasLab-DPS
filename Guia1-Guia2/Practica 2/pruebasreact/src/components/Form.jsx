import React, { useState } from 'react';
import Todo from '../components/Todo';

const Form = () => {
    const [lista, setLista] = useState([])
    const [listas, setListas] = useState([
        {
            number: 1,
            objeto: 'Manzana'
        }
    ])
    const handleChange = e => setLista({ ...lista,objeto: e.target.value })
    const handleChange1 = e => setLista({ ...lista,number: e.target.value })
    const handleClick = e => {
        if (Object.keys(lista).length === 0) {
            alert('el campo no puede estar vacio.')
            return
        }
        setListas([...listas, lista])
    }
    const deleteTodo = indice => {
        const newListas = [...listas]
        newListas.splice(indice, 1)
        setListas(newListas)
    }
    return (
        <>
            <form onSubmit={e => e.preventDefault()} autoComplete={"off"}>
                <label>Agregar Tarea</label><br />
                <input type="text" name="objeto" placeholder={"Objeto"} onChange={handleChange} />
                <input type="number" name="number" placeholder={"numero"} onChange={handleChange1} />
                <button onClick={handleClick}>Agregar</button>

            </form>
            {
                listas.map((value, index) => (<Todo todo={value.objeto} numero={value.number} key={index} index={index} deleteTodo={deleteTodo} />))
            }
        </>
    )
}
export default Form