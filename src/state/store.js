import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./ThemeSlice";
import todoItemsReducer from "./TodoItemsSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    todos: todoItemsReducer,
  },
});
export default store;
