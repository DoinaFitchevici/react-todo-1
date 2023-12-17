import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchData } from "api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completionMessage, setCompletionMessage] = useState("");

  // const sortByLastModifiedTime =
  //   "?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";
  // const fetchData = async () => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
  //     },
  //   };
  //   const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}${sortByLastModifiedTime}`;

  //   try {
  //     const response = await fetch(url, options);
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     const todos = data.records.map((record) => ({
  //       title: record.fields.title,
  //       id: record.id,
  //       completed: record.fields.completed,
  //     }));
  //     setTodoList(todos);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log("Error fetching data: ", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  //   // console.log(data);
  // };
  useEffect(() => {
    // fetchData();
    const fetchDataAndUpdateState = async () => {
      try {
        const todo = await fetchData();
        setTodoList(todo);
        setIsLoading(false);
      } catch (error) {
        console.error("Error updating todo list: ", error);
        setIsLoading(false);
      }
    };
    fetchDataAndUpdateState();
  }, []);

  const updateTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
          completed: todo.completed,
        },
      };
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${todo.id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
      });

      if (!response.ok) {
        const message = `Error has ocurred:
                             ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
      });

      if (!response.ok) {
        const message = `Error has ocurred:
                             ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

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
    deleteTodo(id);
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const onReorderTodo = (newTodoList) => {
    setTodoList(newTodoList);
  };

  const onToggleComplete = (id, completed) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    updateTodo(updatedTodoList.find((itemTodo) => itemTodo.id === id));
    setTodoList(updatedTodoList);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
