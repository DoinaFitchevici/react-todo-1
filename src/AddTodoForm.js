import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./TodoListItem.module.css";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    if (!todoTitle.length) return;
    onAddTodo({
      title: todoTitle,
      // id: Date.now(), // Placeholder for generating a unique ID
    });
    setTodoTitle(""); // Reset the input value
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        type="text"
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
