import { createSlice } from "@reduxjs/toolkit";
import {
  getFeaturedMember,
  getDashWidgets,
  getVisitedProfiles
} from "redux/Actions/Dashboard";

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isLoading: false,
    featuredData: {},
    visitedProfiles: {},
    dashWidgets: {}
  },
  reducers: {},
  extraReducers: (builder) => {

    /* Featured Member */
    builder.addCase(getFeaturedMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.featuredData = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getFeaturedMember.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getFeaturedMember.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });

    /* Dash Widgets Member */
    builder.addCase(getDashWidgets.fulfilled, (state, action) => {      
      state.isLoading = false;
      state.dashWidgets = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getDashWidgets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDashWidgets.rejected, (state) => {
      state.isLoading = false;
    });

    /* visited profile */
    builder.addCase(getVisitedProfiles.fulfilled, (state, action) => {      
      state.isLoading = false;
      state.visitedProfiles = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getVisitedProfiles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVisitedProfiles.rejected, (state) => {
      state.isLoading = false;
    });

  }
});


export default DashboardSlice.reducer