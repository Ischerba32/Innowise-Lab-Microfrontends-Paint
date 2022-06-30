import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import FilterState from "../../interfaces/filter.interface";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    user: "all",
  },
  reducers: {
    filterImages: (state: FilterState, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const { filterImages } = filterSlice.actions;

export default filterSlice.reducer;
