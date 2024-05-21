import { createSlice } from "@reduxjs/toolkit";

export const deletedCardSlice = createSlice({
  name: "deletedCard",
  initialState: {
    deleted: false,
  },
  reducers: {
    isDeleted: (state, action) => {
      state.deleted = action.payload;
    },
  },
});

export const { isDeleted } = deletedCardSlice.actions;
export default deletedCardSlice.reducer;
