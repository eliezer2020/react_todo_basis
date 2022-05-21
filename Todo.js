import React from "react";



export default function Todo({todo, toggleTodoCheckFunc}) {

    function handleCheckTodo(){
        toggleTodoCheckFunc(todo.id)
    }
  return (
    <div>
        <label>
        <input type="checkbox" checked={todo.complete}
        onChange={handleCheckTodo}></input>
        {todo.name}
        </label>
     
    </div>
  )
}
