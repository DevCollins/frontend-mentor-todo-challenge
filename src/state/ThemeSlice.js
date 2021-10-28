import { createSlice } from "@reduxjs/toolkit";
const darkThemeColors = {
  veryDarkBlue: "hsl(235, 21%, 11%)",
  veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
  lightGrayishBlue: "hsl(234, 39%, 85%)",
  lightGrayishBlueHover: "hsl(236, 33%, 92%)",
  darkGrayishBlue: "hsl(234, 11%, 52%)",
  veryDarkGrayishBlue: "hsl(233, 14%, 35%)",
  veryLightGrayishBlue: "hsl(236, 33%, 92%)",
};
const lightThemeColors = {
  veryDarkBlue: "hsl(0, 0%, 98%)",
  veryDarkDesaturatedBlue: "hsl(236, 33%, 92%)",
  lightGrayishBlue: "hsl(233, 14%, 35%)",
  darkGrayishBlue: "rgb(77, 80, 102)",
  veryDarkGrayishBlue: "hsl(235, 19%, 35%)",
  veryLightGrayishBlue: "hsl(236, 33%, 92%)",
};
const initialState = {
  ...darkThemeColors,
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      if (action.payload.theme === "dark") {
        state = darkThemeColors;
        state.theme = "dark";
        localStorage.setItem("theme", JSON.stringify({ ...darkThemeColors }));
      } else if (action.payload.theme === "light") {
        state = lightThemeColors;
        state.theme = "light";
        localStorage.setItem("theme", JSON.stringify({ ...lightThemeColors }));
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
