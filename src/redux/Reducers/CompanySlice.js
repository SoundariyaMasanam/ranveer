import { createSlice } from "@reduxjs/toolkit";
import {
  companyProfile,
  companyProfilePage,
  memberVisitProfile,
  companyListParms,
  getInfoByBranch,
  companyList,
  getBranches
} from "redux/Actions/Company";

const CompanySlice = createSlice({
  name: "companySlice",
  initialState: {
    isLoading: false,
    isVisit: false,
    companyProfileData: {},
    companyData: {},
    companyListData: {},
    ListParms: {},
    branchInfo: {},
    cBranch: {}
  },
  reducers: {
    setInitialState: (state) => {
      state.companyListData = {};
    },
    setInitialListParms: (state) => {
      state.ListParms = {};
    },
    setBranchInfo: (state) => {
      state.branchInfo = {};
    }
  },
  extraReducers: (builder) => {
    /* Company Profile */
    builder.addCase(companyProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companyProfileData = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(companyProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(companyProfile.rejected, (state) => {
      state.isLoading = false;
    });

    /* Company Profile */
    builder.addCase(companyProfilePage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companyData = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(companyProfilePage.pending, (state) => {
      state.isLoading = true;
      state.companyData = {};
    });
    builder.addCase(companyProfilePage.rejected, (state) => {
      state.isLoading = false;
      state.companyData = {};
    });

    /* Memebr Visit Profile */
    builder.addCase(memberVisitProfile.fulfilled, (state, action) => {
      state.isVisit = action.payload.status === 200 ? true : false;
    });

    /* Company Profile */
    builder.addCase(companyList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companyListData = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(companyList.pending, (state) => {
      state.isLoading = true;
      state.companyListData = {};
    });
    builder.addCase(companyList.rejected, (state) => {
      state.isLoading = false;
      state.companyListData = {};
    });

    /* Company Profile */
    builder.addCase(companyListParms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ListParms = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(companyListParms.pending, (state) => {
      state.isLoading = true;
      state.ListParms = {};
    });
    builder.addCase(companyListParms.rejected, (state) => {
      state.isLoading = false;
      state.ListParms = {};
    });

    /* Company getInfoByBranch */
    builder.addCase(getInfoByBranch.fulfilled, (state, action) => {
      state.branchInfo = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getInfoByBranch.rejected, (state) => {
      state.branchInfo = {};
    });

    /* Company get Branches */
    builder.addCase(getBranches.fulfilled, (state, action) => {
      state.cBranch = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getBranches.rejected, (state) => {
      state.cBranch = {};
    });

  }
});

export const {
  setInitialListParms,
  setInitialState,
  setBranchInfo
} = CompanySlice.actions;
export default CompanySlice.reducer