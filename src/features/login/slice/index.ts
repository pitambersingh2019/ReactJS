import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginInterface {
  loading: boolean;
  languageItems: any[];
  language: any;
  init: any;
  session: any;
}
export const initialState: LoginInterface = {
  loading: true,
  languageItems: [],
  language: null,
  init: null,
  session: null,
};

const slice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    init(state) {
      state.loading = true;
    },
    initFinished(
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: PayloadAction<{ languageItems: any }>
    ) {
      state.loading = false;
      state.languageItems = data.payload.languageItems;
    },
    setLanguage(state, data: PayloadAction) {
      state.language = data.payload;
    },
    setInit(state, data: PayloadAction) {
      state.init = data.payload;
    },
    setLoading(state, status: PayloadAction<boolean>) {
      state.loading = status.payload;
    },
    setSession(state, data: PayloadAction<any>) {
      state.session = data.payload;
    },
  },
});

export const {
  init,
  initFinished,
  setLanguage,
  setInit,
  setLoading,
  setSession,
} = slice.actions;

export default slice.reducer;
