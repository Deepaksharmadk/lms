import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slice/AuthSllice";
export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});
