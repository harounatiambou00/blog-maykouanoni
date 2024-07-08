import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IsAdminType {
  isAdmin?: boolean;
}

const initialState: IsAdminType = {
  isAdmin: undefined,
};

export const isAdminSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setIsAdmin: (state, action: PayloadAction<IsAdminType>) => {
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setIsAdmin } = isAdminSlice.actions;
