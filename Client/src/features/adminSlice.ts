import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "user",
  initialState: {
    isAdmin: false,
  },
  reducers: {
    userRole: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { userRole } = adminSlice.actions;
export default adminSlice.reducer;
