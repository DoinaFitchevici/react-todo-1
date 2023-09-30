import React from 'react';

const todoList = [{id:1, title: 'Learn React'}, {id:2, title: 'Learn Redux'}, {id:3, title: 'Learn React Native'}];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
