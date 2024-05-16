import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "user",
  initialState: false,
  reducers: {
    userRole: (state: boolean) => !state,
  },
});

export const { userRole } = adminSlice.actions;
export default adminSlice.reducer;
