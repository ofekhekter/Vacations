import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./features/emailSlice";
import loginSlice from "./features/loginSlice";
import adminSlice from "./features/adminSlice";

export const store = configureStore({
  reducer: {
    userRole: adminSlice,
    emailAddress: emailSlice,
    login: loginSlice,
  },
});
