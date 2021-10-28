import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodoItem, removeTodoItem } from "../state/TodoItemsSlice";
import "./css/todoItem.css";

const TodoItem = ({ item, colors }) => {
  const removeButton = useRef();
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
  const showButton = () => {
    removeButton.current.style.opacity = "1";
  };

  const hideButton = () => {
    removeButton.current.style.opacity = "0";
  };
  const toggleCompletionState = (id) => {
    const updatedItem = { ...item };
    if (item.state === "pending") {
      updatedItem.state = "done";
      dispatch(updateTodoItem({ itemId: id, item: updatedItem }));
      setDone(!done);
    } else {
      updatedItem.state = "pending";
      dispatch(updateTodoItem({ itemId: id, item: updatedItem }));
      setDone(!done);
    }
  };

  const removeTodoClicked = () => {
    dispatch(removeTodoItem({ itemId: item.id }));
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
      draggable={true}
      id={item.id}
      style={{
        backgroundColor: `${colors.veryDarkDesaturatedBlue}`,
        borderBottom: `1px solid ${colors.darkGrayishBlue}`,
        color: `${colors.lightGrayishBlue}`,
      }}
      onMouseEnter={showButton}
      onMouseLeave={hideButton}
    >
      <div
        className="checkmark"
        onClick={() => toggleCompletionState(item.id)}
        style={done ? checkStylingDone : checkStylingUndone}
        ref={checkMark}
      >
        {done ? checkIcon : null}
      </div>
      <div className="text">
        <p style={done ? textStylingDone : textStylingUndone} ref={todoItem}>
          {item.taskName}
        </p>
      </div>
      <div
        className="remove-todo"
        onClick={removeTodoClicked}
        ref={removeButton}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            fill="#494C6B"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </div>
    </div>
  ) : null;
};

export default TodoItem;
