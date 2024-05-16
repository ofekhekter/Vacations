import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/usersSlice";
import emailSlice from "./features/emailSlice";
import loginSlice from "./features/loginSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    emailAddress: emailSlice,
    login: loginSlice,
  },
});
