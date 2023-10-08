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

function TodoList() {
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          <a
            href={todo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-black hover:underline"
          >
            {todo.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
