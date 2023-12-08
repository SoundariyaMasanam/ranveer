import { createSlice } from "@reduxjs/toolkit";
import {
  monthlyReportUploade,
  getMonthlyReport,
  getTemplateDownload
} from "redux/Actions/MonthlyReport";

const MonthlyReportSlice = createSlice({
  name: "MonthlyReport",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isTemplate: {},
    error: {},
    monthlyReportList: {},
  },
  reducers: {
    setInitialState: (state) => {
      state.isSuccess = false;
      state.error = {};
    }
  },
  extraReducers: (builder) => {

    /* get Monthly Report Uploade*/
    builder.addCase(monthlyReportUploade.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.status !== 200 ? action.payload.data : {};
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(monthlyReportUploade.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(monthlyReportUploade.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });

    /* get Monthly Report Uploade*/
    builder.addCase(getMonthlyReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.monthlyReportList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getMonthlyReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMonthlyReport.rejected, (state) => {
      state.isLoading = false;
    });

    /* get Monthly Report Uploade*/
    builder.addCase(getTemplateDownload.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isTemplate = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getTemplateDownload.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTemplateDownload.rejected, (state) => {
      state.isLoading = false;
    });

  }
});

export const { setInitialState } = MonthlyReportSlice.actions;
export default MonthlyReportSlice.reducer