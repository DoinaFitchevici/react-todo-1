function TodoListItem(props) {
  // handle the case when props.todo is undefined or null to prevent potential runtime errors.
  if (!props.todo) {
    return null;
  }
  // Destructure todo prop to get title and url
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
