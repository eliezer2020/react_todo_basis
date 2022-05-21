import { useState , useRef, useEffect} from "react";
import TodoList from "./TodoList";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {

const [todos,setTodos]= useState([])
const inputTodoRef = useRef()
//storage on browser
const LOCAL_STORAGE_KEY= "todoApp.todos";

  

  useEffect(()=>{
    const storedTodos= JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    )
    if(storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])
//onClick ADD
function addTodoFunc (e){
const todoName= inputTodoRef.current.value;
if(!todoName) return;
setTodos((todoState)=>{
return [...todoState, {id: uuidv4(), name:todoName, 
complete:false}]
})
inputTodoRef.current.value=null;



}

function clearTodoAllFunc(e){
  localStorage.clear()
  setTodos(()=>[])
  
}

function clearTodoFunc(e){
  const newTodoList= todos.filter(
    todo=> !todo.complete
  )
  setTodos(newTodoList)
  
}
//passed as props
function toggleTodoCheckFunc(id){
  //copy of state
  const todosCopy= [...todos]
  //find and change todo checkbox
  const checkedTodo= todosCopy.find(todo=> todo.id===id)
  checkedTodo.complete = !checkedTodo.complete
  setTodos(todosCopy)
}
  return (
    <>
    <TodoList todos={todos} toggleTodoCheckFunc={toggleTodoCheckFunc}/>
    <input ref={inputTodoRef} type="text" ></input>
    <button onClick={addTodoFunc}>add todo</button>
    <button onClick={clearTodoFunc}>clear todo list</button>
    <button onClick={clearTodoAllFunc}>delete All</button>
    <div>{todos.filter(todo=> !todo.complete).length} </div>
    </>
    
  )

  
}

export default App;
