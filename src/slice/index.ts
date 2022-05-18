import { createSlice } from "@reduxjs/toolkit";
import { AppSliceInterface } from "./types";
import { loadStateLang, loadStateUser, isRtl } from "../AppStart";

export const initialState: AppSliceInterface = {
  userAuthenticated: loadStateUser(),
  language: loadStateLang(),
  isRtl: isRtl(),
};

const slice = createSlice({
  name: "AppSlice",
  initialState,
  reducers: {
    SetLang(state) {
      state.language = loadStateLang();
    },
    SetRtl(state) {
      state.isRtl = isRtl();
    },
  },
});

export const { SetLang, SetRtl } = slice.actions;

export default slice.reducer;
