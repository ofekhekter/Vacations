import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./features/emailSlice";
import loginSlice from "./features/loginSlice";
import adminSlice from "./features/adminSlice";
import vacationSlice from "./features/vacationSlice";

export const store = configureStore({
  reducer: {
    userRole: adminSlice,
    emailAddress: emailSlice,
    login: loginSlice,
    currentVacation: vacationSlice,
  },
});
