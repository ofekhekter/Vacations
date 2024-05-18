import { createSlice } from "@reduxjs/toolkit";

export const vacationSlice = createSlice({
  name: "vacationState",
  initialState: {
    vacationId: 0,
  },
  reducers: {
    currentVacation: (state, action) => {
      state.vacationId = action.payload;
    },
  },
});

export const { currentVacation } = vacationSlice.actions;
export default vacationSlice.reducer;
