import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FollowingsDataSetModel } from "../Models/FollowingsModel";

interface FollowersState {
  followers: FollowingsDataSetModel[];
}

const initialState: FollowersState = {
  followers: [],
};

export const followersSlice = createSlice({
  name: "followersSlice",
  initialState,
  reducers: {
    followersCount: (state, action: PayloadAction<FollowingsDataSetModel[]>) => {
      state.followers = action.payload;
    },
  },
});

export const { followersCount } = followersSlice.actions;
export default followersSlice.reducer;
