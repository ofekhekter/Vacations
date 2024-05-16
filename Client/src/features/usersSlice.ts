import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: false,
  reducers: {
    userRole: (state) => !state,
  },
});

export const { userRole } = usersSlice.actions;
export default usersSlice.reducer;
