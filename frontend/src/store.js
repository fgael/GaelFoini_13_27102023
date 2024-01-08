import { configureStore } from "@reduxjs/toolkit";

// Importing reducers
import authReducer from "./state/auth/authSlice";
import userReducer from "./state/user/userSlice";

// Configuring the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer for handling authentication state
    user: userReducer, // Reducer for handling user profile state
  },
});

export default store;
