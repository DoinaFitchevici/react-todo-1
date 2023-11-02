function TodoListItem({ todo }) {
  // Destructure todo prop to get title and url
  const { title, url } = todo;
  return (
    <li>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </li>
  );
}

export default TodoListItem;
