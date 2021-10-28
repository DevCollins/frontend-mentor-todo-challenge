import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../state/ThemeSlice";
import { addTodoItem, resetTodos } from "../state/TodoItemsSlice";
import TodoItem from "./TodoItem";
import "./css/layout.css";

const Layout = ({ clicked }) => {
  const filterAll = useRef();
  const filterActive = useRef();
  const filterCompleted = useRef();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const localColors = JSON.parse(localStorage.getItem("theme"));
  const [themeColors, setThemeColors] = useState({ ...localColors });
  const todoInput = useRef(null);
  const [todoItems, setTodoItems] = useState(todos);
  const [counter, setCounter] = useState(
    todos.length !== 0 ? todos[todos.length - 1].id : 0
  );
  const [incomplete, setIncomplete] = useState(
    todos ? todos.filter((todo) => todo.state === "pending").length : 0
  );
  const [dark, setDark] = useState(true);
  const addTodo = (event) => {
    event.preventDefault();
    let newTodoItem = todoInput.current.value;
    if (newTodoItem !== "") {
      const todoItem = {
        id: counter + 1,
        taskName: newTodoItem,
        state: "pending",
      };
      dispatch(addTodoItem({ todoItem: todoItem }));
      setTodoItems(JSON.parse(localStorage.getItem("todos")));
      setCounter(counter + 1);
      todoInput.current.value = "";
    }
  };
  const toggleTheme = () => {
    dark
      ? dispatch(setTheme({ theme: "light" }))
      : dispatch(setTheme({ theme: "dark" }));
    setThemeColors(JSON.parse(localStorage.getItem("theme")));
    setDark(!dark);
  };

  const filter = (category) => {
    if (todos) {
      if (category === "all") {
        setTodoItems(JSON.parse(localStorage.getItem("todos")));
        filterAll.current.style.color = "hsl(220, 98%, 61%)";
        filterCompleted.current.style.color = themeColors.lightGrayishBlue;
        filterActive.current.style.color = themeColors.lightGrayishBlue;
      } else if (category === "active") {
        const activeTodos = JSON.parse(localStorage.getItem("todos")).filter(
          (item) => {
            return item.state === "pending";
          }
        );
        setTodoItems(activeTodos);
        filterActive.current.style.color = "hsl(220, 98%, 61%)";
        filterCompleted.current.style.color = themeColors.lightGrayishBlue;
        filterAll.current.style.color = themeColors.lightGrayishBlue;
      } else if (category === "completed") {
        const completedTodos = JSON.parse(localStorage.getItem("todos")).filter(
          (item) => {
            return item.state !== "pending";
          }
        );
        setTodoItems(completedTodos);
        filterCompleted.current.style.color = "hsl(220, 98%, 61%)";
        filterAll.current.style.color = themeColors.darkGrayishBlue;
        filterActive.current.style.color = themeColors.darkGrayishBlue;
      } else {
        setTodoItems(JSON.parse(localStorage.getItem("todos")));
        filterAll.current.style.color = "hsl(220, 98%, 61%)";
      }
    }
  };

  const clearCompleted = () => {
    const incompleteTodos = JSON.parse(localStorage.getItem("todos")).filter(
      (todo) => {
        return todo.state === "pending";
      }
    );
    dispatch(resetTodos({ todos: incompleteTodos }));

    setTodoItems(incompleteTodos);
    setIncomplete(incompleteTodos.length);
  };
  const lightThemeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
      />
    </svg>
  );
  const darkThemeicon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
      />
    </svg>
  );

  return (
    <div className="todo-layout" onClick={clicked}>
      <div className="todo-layout__title">
        <h3>TODO</h3>
        <div className="theme-toggle" onClick={toggleTheme}>
          {themeColors.theme === "dark" ? lightThemeIcon : darkThemeicon}
        </div>
      </div>
      <form onSubmit={(event) => addTodo(event)}>
        <input
          ref={todoInput}
          type="text"
          placeholder="What do you want to do?"
          className="todo-layout__input"
          style={{
            backgroundColor: `${themeColors.veryDarkDesaturatedBlue}`,
            color: `${themeColors.lightGrayishBlue}`,
          }}
        />
      </form>
      <div
        className="todo-items"
        onClick={() =>
          setIncomplete(
            JSON.parse(localStorage.getItem("todos")).filter(
              (todo) => todo.state === "pending"
            ).length
          )
        }
      >
        <div
          className="todo-items-container"
          onClick={() =>
            setTodoItems(JSON.parse(localStorage.getItem("todos")))
          }
        >
          {todoItems.map((item) => {
            return <TodoItem item={item} key={item.id} colors={themeColors} />;
          })}
        </div>
        <div
          className="footer"
          style={{ backgroundColor: `${themeColors.veryDarkDesaturatedBlue}` }}
        >
          <div className="counter">
            <p style={{ color: themeColors.lightGrayishBlue }}>
              {incomplete} items left
            </p>
          </div>
          <div className="filters">
            <p
              ref={filterAll}
              onClick={() => filter("all")}
              style={{ color: "hsl(220, 98%, 61%)" }}
            >
              All
            </p>
            <p
              ref={filterActive}
              onClick={() => filter("active")}
              style={{ color: themeColors.lightGrayishBlue }}
            >
              Active
            </p>
            <p
              ref={filterCompleted}
              onClick={() => filter("completed")}
              style={{ color: themeColors.lightGrayishBlue }}
            >
              Completed
            </p>
          </div>
          <div className="clear">
            <p
              onClick={clearCompleted}
              style={{ color: themeColors.lightGrayishBlue }}
            >
              Clear Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
