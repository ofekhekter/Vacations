import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacationType } from "../Models/VacationModel";

interface VacationsState {
  vacations: VacationType[];
}

const initialState: VacationsState = {
  vacations: [],
};

export const vacationsSlice = createSlice({
  name: "vacationsState",
  initialState,
  reducers: {
    vacations: (state, action: PayloadAction<VacationType[]>) => {
      state.vacations = action.payload;
    },
  },
});

export const { vacations } = vacationsSlice.actions;
export default vacationsSlice.reducer;
