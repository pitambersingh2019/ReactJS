import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../../Redux/rootReducer";
import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.middlewareSlice || initialState;

export const selectIsMenuOpen = createSelector(
  [selectDomain],
  (Slice) => Slice.SideMenuOpened
);
