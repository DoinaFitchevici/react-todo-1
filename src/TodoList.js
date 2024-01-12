// It removes the dragged item from its original position and inserts it at the target position.

import TodoListItem from "./TodoListItem";
import { useState } from "react";
import style from "./TodoListItem.module.css";

const TodoList = ({
  todoList,
  onRemoveTodo,
  onReorderTodo,
  onToggleComplete,
}) => {
  const [draggedTodoId, setDraggedTodoId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedTodoId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();

    if (draggedTodoId === targetId) {
      return;
    }

    const updatedTodoList = [...todoList];
    const draggedIndex = updatedTodoList.findIndex(
      (todo) => todo.id === draggedTodoId
    );
    const targetIndex = updatedTodoList.findIndex(
      (todo) => todo.id === targetId
    );

    const draggedItem = updatedTodoList[draggedIndex];
    updatedTodoList.splice(draggedIndex, 1); // Remove the dragged item
    updatedTodoList.splice(targetIndex, 0, draggedItem); // Insert the dragged item at the target position

    onReorderTodo(updatedTodoList);
    setDraggedTodoId(null);
  };

  return (
    <ul>
      {todoList.map(({ id, ...rest }) => (
        <li
          className={style.ListItem}
          key={id}
          draggable
          onDragStart={(e) => handleDragStart(e, id)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, id)}
        >
          <TodoListItem
            todo={{ id, ...rest }}
            onRemoveTodo={onRemoveTodo}
            onToggleComplete={onToggleComplete}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

// import TodoListItem from "./TodoListItem";

// function TodoList({ todoList, onRemoveTodo }) {
//   return (
//     <ul>
//       {todoList.map((todo) => (
//         <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
//       ))}
//     </ul>
//   );
// }

// export default TodoList;
