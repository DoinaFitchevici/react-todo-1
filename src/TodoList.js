import TodoListItem from "./TodoListItem";

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
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
