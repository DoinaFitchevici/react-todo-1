import { useState } from "react";

function TodoListItem({ todo, onRemoveTodo, onToggleComplete }) {
  const { title, id, completed } = todo;
  const [isChecked, setIsChecked] = useState(completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onToggleComplete(id, !isChecked);
  };

  return (
    <li style={{ textDecoration: isChecked ? "line-through" : "none" }}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
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

// function TodoListItem({ todo, onRemoveTodo }) {
//   const { title, id } = todo;
//   return (
//     <li>
//       {title}
//       <button
//         type="button"
//         onClick={() => {
//           onRemoveTodo(id);
//         }}
//       >
//         Remove
//       </button>
//     </li>
//   );
// }

// export default TodoListItem;
