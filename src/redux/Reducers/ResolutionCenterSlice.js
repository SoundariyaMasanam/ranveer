import { createSlice } from "@reduxjs/toolkit";
import {
  addResolutionCentre,
  getResolutionCentre,
  getResolutionCentreMessages,
  replyResolutionCentreMessages,
} from "redux/Actions/ResolutionCenter";

const ResolutionCenterSlice = createSlice({
  name: "resolutionCenter",
  initialState: {
    isLoading: false,
    tokenExp: false,
    error: {},
    isSuccess: false,
    resolutionCentreList: {},
    messages: {},
  },
  reducers: {
    setInitialState: (state) => {
      state.isSuccess = false;
    },
    setInitialMessage: (state) => {
      state.messages = {};
    }
  },
  extraReducers: (builder) => {

    /* Add resolution centre */
    builder.addCase(addResolutionCentre.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
      state.error = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(addResolutionCentre.pending, (state) => {
      state.isLoading = true;
      state.error = {};
    });
    builder.addCase(addResolutionCentre.rejected, (state) => {
      state.isLoading = false;
      state.error = {};
    });

    /* Get resolution centre */
    builder.addCase(getResolutionCentre.fulfilled, (state, action) => {      
      state.isLoading = false;
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : false;
      state.resolutionCentreList = action.payload.status === 200 ? action.payload.data : {};      
    });
    builder.addCase(getResolutionCentre.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getResolutionCentre.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get resolution centre Message*/
    builder.addCase(getResolutionCentreMessages.fulfilled, (state, action) => {      
      state.isLoading = false;
      state.messages = action.payload.status === 200 ? action.payload.data : {};      
    });
    builder.addCase(getResolutionCentreMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getResolutionCentreMessages.rejected, (state) => {
      state.isLoading = false;
      state.messages = {};
    });
    /* Update reply resolution centre */
    builder.addCase(replyResolutionCentreMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(replyResolutionCentreMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(replyResolutionCentreMessages.rejected, (state) => {
      state.isLoading = false;
    });


  }
});


export const {
  setInitialState,
  setInitialMessage
} = ResolutionCenterSlice.actions

export default ResolutionCenterSlice.reducer