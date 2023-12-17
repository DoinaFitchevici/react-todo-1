import { useState, useEffect, useCallback } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completionMessage, setCompletionMessage] = useState("");

  const API_BASE_URL = "https://api.airtable.com/v0/";
  const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
  const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
  const AIRTABLE_API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;
  const SORT_BY_LAST_MODIFIED_TIME =
    "?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";
  const URL = `${API_BASE_URL}${AIRTABLE_BASE_ID}/${TABLE_NAME}`;

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `${URL}${SORT_BY_LAST_MODIFIED_TIME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const { records } = await response.json();
      const todos = records.map(({ fields: { title, completed }, id }) => ({
        id,
        title,
        completed,
      }));
      return todos;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  };

  const memoizedFetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const todo = await fetchData();
      setTodoList(todo);
      setCompletionMessage("");
    } catch (error) {
      console.error("Error updating todo list: ", error);
      setCompletionMessage("Failed to fetch todos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  const updateTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
          completed: todo.completed,
        },
      };
      const url = `${URL}/${todo.id}${SORT_BY_LAST_MODIFIED_TIME}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
      });

      if (!response.ok) {
        const message = `Error updating todo: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      throw new Error(`Error updating todo: ${error.message}`);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const url = `${URL}/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
      });

      if (!response.ok) {
        const message = `Error deleting todo: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      throw new Error(`Error deleting todo: ${error.message}`);
    }
  };

  const addTodo = async (newTodo) => {
    // Make a POST request to add a new todo to Airtable
    const url = `${URL}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
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
