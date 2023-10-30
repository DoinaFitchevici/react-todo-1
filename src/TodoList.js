import TodoListItem from "./TodoListItem";

function TodoList(props) {
  return (
    <ul>
      {props.todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
