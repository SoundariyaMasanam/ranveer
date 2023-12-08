import { createSlice } from "@reduxjs/toolkit";
import {
  getExhibitionBanner,
  getExhibition,  
  addExhibition,
  getExhibitionList,
  getTeamMembers,
  attendExhibition,
  cancelAttendedExhibition
} from "redux/Actions/EventExhibition";

const EventExhibitionSlice = createSlice({
  name: "EventExhibition",
  initialState: {
    isLoading: false,
    isSuccess: false,    
    isError: false,    
    bannerList: {},
    exhibitionDetails: {},
    exhibitionList: {},
    teamMember: {},
    validation: {},
    tokenExp: {},
  },
  reducers: {
    setInitialState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.validation = {};
    },
    setValidation: (state) => {
      state.validation = {};
    }
  },
  extraReducers: (builder) => {

    /* Get Exhibition Banner */
    builder.addCase(getExhibitionBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bannerList = action.payload.status === 200 ? action.payload.data : false;
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(getExhibitionBanner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getExhibitionBanner.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get Exhibition */
    builder.addCase(getExhibition.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exhibitionDetails = action.payload.status === 200 ? action.payload.data : false;
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(getExhibition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getExhibition.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Add Exhibition */
    builder.addCase(addExhibition.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
      state.validation = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(addExhibition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addExhibition.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get Exhibition List */
    builder.addCase(getExhibitionList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exhibitionList = action.payload.status === 200 ? action.payload.data : {};
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(getExhibitionList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getExhibitionList.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get Exhibition List */
    builder.addCase(getTeamMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.teamMember = action.payload.status === 200 ? action.payload.data : {};
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(getTeamMembers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTeamMembers.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get Exhibition List */
    builder.addCase(attendExhibition.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
      state.validation = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(attendExhibition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(attendExhibition.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get Exhibition List */
    builder.addCase(cancelAttendedExhibition.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
      state.isError = action.payload.status !== 200 ? action.payload.data : false;
    });
    builder.addCase(cancelAttendedExhibition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cancelAttendedExhibition.rejected, (state) => {
      state.isLoading = false;
    });

  }
});


export const {
  setInitialState,
  setValidation
} = EventExhibitionSlice.actions

export default EventExhibitionSlice.reducer