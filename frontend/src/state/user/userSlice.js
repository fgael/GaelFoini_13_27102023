// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    createdAt: "",
    updatedAt: "",
    id: "",
  },
  reducers: {
    setUserProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateUserProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUserProfile: () => {
      return {
        email: "",
        firstName: "",
        lastName: "",
        createdAt: "",
        updatedAt: "",
        id: "",
      };
    },
  },
});

// actions
export const { setUserProfile, updateUserProfile, clearUserProfile } =
  userSlice.actions;
export const selectUserProfile = (state) => state.user;

export default userSlice.reducer;
