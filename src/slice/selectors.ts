import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../Redux/rootReducer";
import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.App || initialState;

export const selectLanguage = createSelector([selectDomain], (AppSlice) =>
  JSON.parse(AppSlice.language)
);

export const selectIsRtl = createSelector(
  [selectDomain],
  (AppSlice) => AppSlice.isRtl
);

export const selectUserAuth = createSelector(
  [selectDomain],
  (AppSlice) => AppSlice.userAuthenticated
);

export const selectUserAuthAcessToken = createSelector(
  [selectDomain],
  (AppSlice) => JSON.parse(AppSlice.userAuthenticated).accessToken
);
