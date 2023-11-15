function TodoListItem({ todo, onRemoveTodo }) {
  const { title, id } = todo;
  return (
    <li>
      {title}
      <button
        type="button"
        onClick={() => {
          onRemoveTodo(id);
        }}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
