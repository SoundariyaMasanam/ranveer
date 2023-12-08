import { createSlice } from "@reduxjs/toolkit";
import {
  getLogin,
  getRegister,
  forgetPassword,
  resetPassword
} from "redux/Actions/Authentication";

const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoading: false,
    isLoadingF: false,
    isSuccess: false,
    isMessage: false,
    isMessageF: false,
    error: false,
    errorF: false,
    userData: false,
  },
  reducers: {
    setLogin: (state) => {
      state.isSuccess = true;
    },
    setInitialState: (state) => {
      state.error = false;
      state.isMessage = false;
    },
    setInitialStateF: (state) => {
      state.errorF = false;
      state.isMessageF = false;
    }
  },
  extraReducers: (builder) => {
    /* Login */
    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? true : false;
      state.error = action.payload.status !== 200 ? true : false;
      state.userData = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(getLogin.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.userData = false;
      state.error = false;
    });
    builder.addCase(getLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.userData = false;
    });

    /* Register */
    builder.addCase(getRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? true : false;
      state.userData = action.payload.status === 200 ? action.payload.data : false;
      state.error = action.payload.status !== 200 ? true : false;
    });
    builder.addCase(getRegister.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
      state.userData = false;
    });
    builder.addCase(getRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.userData = false;
    });


    /* Forget Password */
    builder.addCase(forgetPassword.fulfilled, (state, action) => {      
      state.isLoadingF = false;
      state.isMessageF = action.payload.status === 200 ? action.payload.data : false;
      state.errorF = action.payload.status !== 200 ? action.payload.data : false;
    });
    builder.addCase(forgetPassword.pending, (state, action) => {
      state.isLoadingF = true;
      state.isMessageF = false;
      state.errorF = false;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.isLoadingF = false;
      state.isMessageF = false;
      state.errorF = false;
    });

    /* Update Password */
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isMessage = action.payload.status === 200 ? action.payload.data : false;
      state.error = action.payload.status !== 200 ? true : false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.isMessage = false;
      state.error = false;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.isLoading = false;
      state.isMessage = false;
      state.error = false;
    });
  }
});

export const { 
  setLogin, 
  setInitialState,
  setInitialStateF } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer