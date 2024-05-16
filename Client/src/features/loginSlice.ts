import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginState",
  initialState: {
    text: "Login",
  },
  reducers: {
    login: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
