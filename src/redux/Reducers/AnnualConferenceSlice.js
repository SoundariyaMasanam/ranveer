import { createSlice } from "@reduxjs/toolkit";
import {
  interestToAttend,
  interestToSponser,
  getSponsersList,
  getConferenceBanner,
  getAttendeeList,
  getKeyEventsList,
  cancelAttended,
  cancelSponsored
} from "redux/Actions/AnnualConference";

const AnnualConferenceSlice = createSlice({
  name: "anualConference",
  initialState: {
    isLoading: false,
    isLoadingS: false,
    isSuccess: false,
    // isSuccessS: false,
    // cancelAttend: false,
    tokenExp: false,
    sponsersList: {},
    attendeeList: {},
    keyEventsList: {},
    conferenceBanner: {},
  },
  reducers: {
    setInitialState: (state) => {
      state.isSuccess = false;
      // state.isSuccessS = false;
      // state.cancelAttend = false;
    }
  },
  extraReducers: (builder) => {

    /* Interest To Attend */
    builder.addCase(interestToAttend.fulfilled, (state, action) => {
      state.isLoadingS = false;
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(interestToAttend.pending, (state) => {
      state.isLoadingS = true;
    });
    builder.addCase(interestToAttend.rejected, (state) => {
      state.isLoadingS = false;
    });

    /* Interest To Sponser */
    builder.addCase(interestToSponser.fulfilled, (state, action) => {
      state.isLoadingS = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(interestToSponser.pending, (state) => {
      state.isLoadingS = true;
    });
    builder.addCase(interestToSponser.rejected, (state) => {
      state.isLoadingS = false;
    });

    /* Get Sponsers List */
    builder.addCase(getSponsersList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sponsersList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getSponsersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSponsersList.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get Sponsers List */
    builder.addCase(getConferenceBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.conferenceBanner = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getConferenceBanner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getConferenceBanner.rejected, (state) => {
      state.isLoading = false;
    });
   
    /* Get Attendee List */
    builder.addCase(getAttendeeList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.attendeeList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getAttendeeList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAttendeeList.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get Key Events List */
    builder.addCase(getKeyEventsList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.keyEventsList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getKeyEventsList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getKeyEventsList.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get Key Events List */
    builder.addCase(cancelAttended.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(cancelAttended.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cancelAttended.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get Key Events List */
    builder.addCase(cancelSponsored.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(cancelSponsored.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cancelSponsored.rejected, (state) => {
      state.isLoading = false;
    });

  }
});


export const {
  setInitialState
} = AnnualConferenceSlice.actions

export default AnnualConferenceSlice.reducer