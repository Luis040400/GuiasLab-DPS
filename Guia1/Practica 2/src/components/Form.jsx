import React from 'react';
import Todo from '../components/Todo';
import { useState } from 'react';


const Form = ()=>{
   
    const Form = ()=>{
        const [todos,setTodos] = useState([
            {todo: 'todo 1'},
            {todo: 'todo 2'},
            {todo: 'todo 3'}
        ])
    }

    return(
        <>
        <h1>Form component</h1>
        <Todo></Todo>
        </>
    );
}
export default Form