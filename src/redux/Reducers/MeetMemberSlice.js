import { createSlice } from "@reduxjs/toolkit";
import {
  scheduleEvent,
  getScheduleEvent,
  updateScheduleEvent,
  cancelMetting,
  Member,
  getTimeZone
} from "redux/Actions/MeetMember";

const MeetMemberSlice = createSlice({
  name: "meetMemberSlice",
  initialState: {
    isLoading: false,
    isSuccess: false,
    timeZoneList: {},
    eventList: {},
    memberData: {},
    error: {},
    tokenExp: {},
  },
  reducers: {
    setInitialState: (state) => {
      state.isSuccess = false;
    },
    memberInital: (state) => {
      state.memberData = {};
    }
  },
  extraReducers: (builder) => {

    /* Schedule Event */
    builder.addCase(scheduleEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.status !== 200 ? action.payload.data : {};
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(scheduleEvent.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(scheduleEvent.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });

    /* Get Schedule Event */
    builder.addCase(getScheduleEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.eventList = action.payload.status === 200 ? action.payload.data : false;
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(getScheduleEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getScheduleEvent.rejected, (state) => {
      state.isLoading = false;
    });

    /* Update Schedule Event */
    builder.addCase(updateScheduleEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.status !== 200 ? action.payload.data : {};
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(updateScheduleEvent.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(updateScheduleEvent.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });

    /* Memner Search */
    builder.addCase(Member.fulfilled, (state, action) => {
      state.isLoading = false;
      state.memberData = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(Member.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Member.rejected, (state) => {
      state.isLoading = false;
    });

    /* Memner Search */
    builder.addCase(cancelMetting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(cancelMetting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cancelMetting.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Memner Search */
    builder.addCase(getTimeZone.fulfilled, (state, action) => {
      state.isLoading = false;
      state.timeZoneList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getTimeZone.rejected, (state) => {
      state.isLoading = false;
    });

  }
});


export const {
  setInitialState,
  memberInital
} = MeetMemberSlice.actions

export default MeetMemberSlice.reducer