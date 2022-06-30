import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import MenuState from "../../interfaces/menu.interface";

const menuSlice = createSlice({
  name: "burgerMenu",
  initialState: {
    isOpened: false,
  },
  reducers: {
    setIsOpened: (state: MenuState, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
  },
});

export const { setIsOpened } = menuSlice.actions;

export default menuSlice.reducer;
