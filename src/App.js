import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completionMessage, setCompletionMessage] = useState("");

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
          },
        });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
      setCompletionMessage(
        `Congratulations, you have ${getIncompleteCount()} left to complete.`
      );
      const messageTimer = setTimeout(() => setCompletionMessage(""), 3000);
      return () => clearTimeout(messageTimer);
    }
  }, [todoList, isLoading]);

  const getIncompleteCount = () => {
    return todoList.filter((todo) => !todo.completed).length;
  };

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const onReorderTodo = (newTodoList) => {
    setTodoList(newTodoList);
  };

  const onToggleComplete = (id, completed) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    setTodoList(updatedTodoList);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {completionMessage && <p>{completionMessage}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          onReorderTodo={onReorderTodo}
          onToggleComplete={onToggleComplete}
        />
      )}
    </>
  );
}

export default App;

// import { useState, useEffect } from "react";
// import AddTodoForm from "./AddTodoForm";
// import TodoList from "./TodoList";

// function App() {
//   const [todoList, setTodoList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve({
//           data: {
//             todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
//           },
//         });
//       }, 2000);
//     }).then((result) => {
//       setTodoList(result.data.todoList);
//       setIsLoading(false);
//     });
//   }, []);

//   useEffect(() => {
//     if (!isLoading) {
//       localStorage.setItem("savedTodoList", JSON.stringify(todoList));
//     }
//   }, [todoList, isLoading]);

//   function addTodo(newTodo) {
//     setTodoList([...todoList, newTodo]);
//   }

//   function removeTodo(id) {
//     setTodoList(todoList.filter((todo) => todo.id !== id));
//   }
//   //App.js, add the callback handler function onReorderTodo and pass it as props to TodoList component
//   const onReorderTodo = (newTodoList) => {
//     setTodoList(newTodoList);
//   };

//   return (
//     <>
//       <h1>Todo List</h1>
//       <AddTodoForm onAddTodo={addTodo} />
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <TodoList
//           todoList={todoList}
//           onRemoveTodo={removeTodo}
//           onReorderTodo={onReorderTodo}
//         />
//       )}
//     </>
//   );
// }

// export default App;
