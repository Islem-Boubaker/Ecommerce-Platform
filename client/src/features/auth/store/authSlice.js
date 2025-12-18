import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    SignInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    SignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    SignOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { SignInStart, SignInSuccess, SignInFailure, SignOut } =  authSlice.actions;

export default authSlice.reducer;
