import { configureStore } from "@reduxjs/toolkit";
import jobRecipeReducer from "./slice";

export const store = configureStore({
  reducer: {
    jobRecipe: jobRecipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
