import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completionMessage, setCompletionMessage] = useState("");

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
        completed: false,
      }));
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
    // console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (newTodo) => {
    // Make a POST request to add a new todo to Airtable
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();

      // Update the todo list with the new todo received from the API response
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        {
          id: responseData.id,
          title: responseData.fields.title,
          completed: false,
        },
      ]);

      //   setCompletionMessage(`Todo added successfully!`);
      //   const messageTimer = setTimeout(() => setCompletionMessage(""), 3000);
      //   return () => clearTimeout(messageTimer);
    } catch (error) {
      //   console.error("Error adding todo:", error);
      setCompletionMessage("Failed to add todo. Please try again.");
      const messageTimer = setTimeout(() => setCompletionMessage(""), 3000);
      return () => clearTimeout(messageTimer);
    }
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
