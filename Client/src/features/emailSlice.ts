import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    text: "",
  },
  reducers: {
    emailAddress: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { emailAddress } = emailSlice.actions;
export default emailSlice.reducer;
