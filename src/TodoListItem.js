function TodoListItem(props) {
  const { title, url } = props.todo;
  return (
    <li>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </li>
  );
}

export default TodoListItem;
