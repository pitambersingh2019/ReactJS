import { configureStore } from "@reduxjs/toolkit";
import syncToolReducer from "./slice";

export const store = configureStore({
  reducer: {
    syncTool: syncToolReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["syncTool/uploadSyncFile"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.file"],
        // Ignore these paths in the state
        ignoredPaths: ["syncTool.parsedFileData.file"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
