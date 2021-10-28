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
      state.splice(
        state.findIndex((item) => item.id === action.payload.itemId),
        1
      );
      localStorage.setItem("todos", JSON.stringify(state));
    },
    updateTodoItem(state, action) {
      const index = state.findIndex((item) => {
        return item.id === action.payload.itemId;
      });
      state.splice(index, 1, action.payload.item);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    resetTodos(state, action) {
      state = action.payload.todos;
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});

export const {
  addTodoItem,
  removeTodoItem,
  updateTodoItem,
  resetTodos,
} = todoItemsSlice.actions;
export default todoItemsSlice.reducer;
