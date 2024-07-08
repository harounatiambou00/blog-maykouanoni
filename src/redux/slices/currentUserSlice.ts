import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../data";

export interface CurrentUserType {
  user?: UserType;
}

const initialState: CurrentUserType = {
  user: undefined,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
