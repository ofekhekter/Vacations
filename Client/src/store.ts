import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./features/emailSlice";
import loginSlice from "./features/loginSlice";
import adminSlice from "./features/adminSlice";
import vacationSlice from "./features/vacationSlice";
import deletedCardSlice from "./features/deletedCardSlice";
import vacationsSlice from "./features/vacationsSlice";
import followersSlice from "./features/followersSlice";

export const store = configureStore({
  reducer: {
    userRole: adminSlice,
    emailAddress: emailSlice,
    login: loginSlice,
    currentVacation: vacationSlice,
    isDeleted: deletedCardSlice,
    vacations: vacationsSlice,
    followersCount: followersSlice,
  },
});
