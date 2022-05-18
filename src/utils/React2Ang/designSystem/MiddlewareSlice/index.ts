import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MiddlewareSliceTypes } from "./types";

export const initialState: MiddlewareSliceTypes = {
  SideMenuOpened: document.getElementById("side-menu") !== null ? true : false,
};

const slice = createSlice({
  name: "MiddleWareSlice",
  initialState,
  reducers: {
    SetMenuOpen(state, action: PayloadAction<boolean>) {
      state.SideMenuOpened = action.payload;
    },
  },
});

export const { SetMenuOpen } = slice.actions;

export default slice.reducer;
