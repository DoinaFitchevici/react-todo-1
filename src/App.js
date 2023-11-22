import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  // Use the new custom hook
  // const [todoList, setTodoList] = useSemiPersistentState();
  // Copied useState and useEffect hooks from useSemiPersistentState
  // const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList")) || [];
  const [todoList, setTodoList] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  // }, [todoList]);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { todoList: todoList } });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);
    });
  }, []);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
