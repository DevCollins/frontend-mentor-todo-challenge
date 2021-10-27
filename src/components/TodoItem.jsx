import { useRef } from "react";
import "./css/todoItem.css";

const TodoItem = ({ item, colors }) => {
  const todoItem = useRef(null);
  const markAsDone = (id) => {
    todoItem.current.style.textDecoration = "line-through";
  };
  return item ? (
    <div
      className="todo-item"
      id={item.id}
      style={{
        backgroundColor: `${colors.veryDarkDesaturatedBlue}`,
        borderBottom: `1px solid ${colors.darkGrayishBlue}`,
        color: `${colors.lightGrayishBlue}`,
      }}
    >
      <div className="checkmark" onClick={() => markAsDone(item.id)}></div>
      <p ref={todoItem}>{item.taskName}</p>
    </div>
  ) : null;
};

export default TodoItem;
