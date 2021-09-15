import React from 'react';

const Todo = ({todo,numero,index,deleteTodo}) =>{
    return(
        <>
        <div className="list">
            <h3>{numero}-</h3>
        <h3>{todo}</h3>
        <button className="btn-delete" onClick={()=>deleteTodo(index)}>X</button>
        </div>
        
        </>
    )
}
export default Todo