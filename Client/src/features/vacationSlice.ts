import { createSlice } from "@reduxjs/toolkit";
import { VacationType } from "../Models/VacationModel";

export const vacationSlice = createSlice({
  name: "vacationState",
  initialState: {
    vacation: {
      destination: "",
      description: "",
      startDate: "",
      endDate: "",
      price: 0,
      imageName: "",
    } as VacationType,
  },
  reducers: {
    currentVacation: (state, action) => {
      state.vacation = action.payload;
    },
  },
});

export const { currentVacation } = vacationSlice.actions;
export default vacationSlice.reducer;
