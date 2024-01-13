import { useState } from "react";
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo, onToggleComplete }) {
  const { title, id, completed } = todo;
  const [isChecked, setIsChecked] = useState(completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onToggleComplete(id, !isChecked);
  };

  return (
    <div>
      <input
        type="checkbox"
        className={styles.customCheckbox}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {/* <span style={{ color: isChecked ? "grey" : "inherit" }}>{title}</span> */}
      <span className={isChecked ? styles.completedTodo : ""}>{title}</span>

      <button
        type="button"
        className={styles.button}
        onClick={() => {
          onRemoveTodo(id);
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default TodoListItem;
