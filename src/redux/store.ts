import { configureStore } from "@reduxjs/toolkit";
import { ticketsApi } from "./ticketsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [ticketsApi.reducerPath]: ticketsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ticketsApi.middleware),
});

setupListeners(store.dispatch);
