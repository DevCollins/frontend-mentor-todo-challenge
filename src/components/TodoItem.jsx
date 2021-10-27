import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodoItem } from "../state/TodoItemsSlice";
import "./css/todoItem.css";

const TodoItem = ({ item, colors }) => {
  const dispatch = useDispatch();
  const todoItem = useRef();
  const checkMark = useRef();
  const [done, setDone] = useState(item.state === "done" ? true : false);
  const checkStylingUndone = {
    backgroundImage: "none",
    border: `1px solid ${colors.lightGrayishBlue}`,
  };
  const checkStylingDone = {
    backgroundImage:
      "linear-gradient(75deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
  };
  const textStylingUndone = {
    textDecoration: "none",
    color: `${colors.lightGrayishBlue}`,
  };
  const textStylingDone = { textDecoration: "line-through" };
  const toggleCompletionState = (id) => {
    const updatedItem = { ...item };
    if (item.state === "pending") {
      updatedItem.state = "done";
      setDone(!done);
    } else if (item.state === "done") {
      updatedItem.state = "pending";
      setDone(!done);
    }
    dispatch(updateTodoItem({ itemId: id, item: updatedItem }));
  };
  const checkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
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
      <div
        className="checkmark"
        ref={checkMark}
        onClick={() => toggleCompletionState(item.id)}
        style={done ? checkStylingDone : checkStylingUndone}
      >
        {done ? checkIcon : null}
      </div>
      <p style={done ? textStylingDone : textStylingUndone} ref={todoItem}>
        {item.taskName}
      </p>
    </div>
  ) : null;
};

export default TodoItem;
