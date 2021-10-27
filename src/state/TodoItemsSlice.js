import { createSlice } from "@reduxjs/toolkit";

const storedItems = JSON.parse(localStorage.getItem("todos"));

const todoItemsSlice = createSlice({
  name: "todoItems",
  initialState: storedItems ? storedItems : [],
  reducers: {
    addTodoItem(state, action) {
      state.push(action.payload.todoItem);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeTodoItem(state, action) {
      const index = state.findIndex((item) => {
        return item.id === action.payload.todoItem.id;
      });
      state.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    updateTodoItem(state, action) {
      const index = state.findIndex((item) => {
        return item.id === action.payload.todoItem.id;
      });
      state[index] = action.payload.todoItem;
    },
  },
});

export const { addTodoItem, removeTodoItem, updateTodoItem } =
  todoItemsSlice.actions;
export default todoItemsSlice.reducer;
