import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import defaultTheme from "../../helpers/defaultTheme";
import ThemeState from "../../interfaces/theme.interface";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: defaultTheme,
  },
  reducers: {
    setTheme: (state: ThemeState, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
