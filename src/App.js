import React from "react";

const todoList = [
  {
    id: 1,
    title: "Learn React",
    url: "https://reactjs.org/",
  },
  {
    id: 2,
    title: "Learn Redux",
    url: "https://redux.js.org/",
  },
  { id: 3, title: "Learn React Native", url: "https://reactnative.dev/" },
];

function App() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 my-4">Todo List</h1>
      <ul class="list-disc ml-10" role="list">
        {todoList.map((todo) => (
          <li key={todo.id}>
            <span>
              <a href={todo.url} target="_blank" rel="noopener noreferrer">
                <span className="text-blue-500"> {todo.title}</span>
              </a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
