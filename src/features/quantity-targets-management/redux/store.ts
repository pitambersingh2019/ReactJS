import { configureStore } from "@reduxjs/toolkit";
import quantityTargetsManagementReducer from "./quantityTargetsManagementSlice";

export const store = configureStore({
  reducer: {
    qtm: quantityTargetsManagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
