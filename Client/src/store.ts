import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/adminSlice";
import emailSlice from "./features/emailSlice";
import loginSlice from "./features/loginSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    emailAddress: emailSlice,
    login: loginSlice,
  },
});
