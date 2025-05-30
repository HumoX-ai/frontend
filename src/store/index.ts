import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authReducer from "./slices/authSlice"; // authSlice reducerini import qilamiz
import { venueApi } from "./api/venueApi";
import { bookingApi } from "./api/bookingApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [venueApi.reducerPath]: venueApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    auth: authReducer, // authReducer ni store ga qo'shamiz
    // Boshqa reducerlar shu yerga qo'shiladi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(venueApi.middleware)
      .concat(bookingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
