import { createSlice } from "@reduxjs/toolkit";
import {
  getNotificationsLeftMenu,
  getNotificationsForMember,
  actionPerformSideBar,
  getNotifications,
  actionPerform
} from "redux/Actions/Notifications";

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    isLoading: false,
    isLoadingA: false,
    isSuccess: false,
    isSuccessA: false,
    notificationList: {},
    notificationLeft: {},
    notificationMember: {},
  },
  reducers: {
    setInitialState: (state) => {
      state.isSuccess = false;
      state.isSuccessA = false;
    }
  },
  extraReducers: (builder) => {

    /* Get Notifications */
    builder.addCase(getNotificationsLeftMenu.fulfilled, (state, action) => {          
      state.isLoading = false;
      state.notificationLeft = action.payload.status === 200 ? action.payload.data : {};
      state.isSuccessA = action.payload.status === 200 ? true : false;
    });
    builder.addCase(getNotificationsLeftMenu.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotificationsLeftMenu.rejected, (state) => {
      state.isLoading = false;
    });
    /* Get Notifications */
    builder.addCase(getNotifications.fulfilled, (state, action) => { 
      state.isLoading = false;
      state.notificationList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.isLoading = false;
    });
   
    /* Get Notifications */
    builder.addCase(getNotificationsForMember.fulfilled, (state, action) => { 
      state.isLoading = false;
      state.notificationMember = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getNotificationsForMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotificationsForMember.rejected, (state) => {
      state.isLoading = false;
    });

    /* Notification Action perform */
    builder.addCase(actionPerform.fulfilled, (state, action) => {
      state.isLoadingA = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(actionPerform.pending, (state) => {
      state.isLoadingA = true;
    });
    builder.addCase(actionPerform.rejected, (state) => {
      state.isLoadingA = false;
    });
    
    /* Notification Action perform */
    builder.addCase(actionPerformSideBar.fulfilled, (state, action) => {
      state.isLoadingA = false;
      state.isSuccessA = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(actionPerformSideBar.pending, (state) => {
      state.isLoadingA = false;
    });
    builder.addCase(actionPerformSideBar.rejected, (state) => {
      state.isLoadingA = false;
    });
  }
});


export const {
  setInitialState
} = NotificationsSlice.actions

export default NotificationsSlice.reducer