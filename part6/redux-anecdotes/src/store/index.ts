import { configureStore } from "@reduxjs/toolkit";
import { anecdotesSlice } from "./anecdotesSlice";
import { notificationsSlice } from "./notificationsSlice";
import { AppState } from "./store.model";

export const store = configureStore<AppState>({
  reducer: {
    anecdotes: anecdotesSlice.reducer,
    notifications: notificationsSlice.reducer,
  },
});
