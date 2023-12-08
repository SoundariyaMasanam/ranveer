import { createSlice } from "@reduxjs/toolkit";
import {
  memberProfile,
  updateProfile,
  updatePassword,
  memberSearch,
  memberAnnouncements,
  memberListDocuments,
  loctaionsRegionList,
  loctaionsCountryList,
  loctaionsStatesList,
  otherTeamMembers,
  getLicensesExpire,
  getLicensesDeparted,
} from "redux/Actions/Member";

const MemberSlice = createSlice({
  name: "member",
  initialState: {
    isLoading: false,
    isUpdate: false,
    isError: {},
    tokenExp: false,
    documentsList: {},
    announcementsList: {},
    memberProfileData: {},
    memberSearchResult: {},
    expireList: {},
    departedList: {},
    otherMember: {},
    regionList: {},
    countryList: {},
    stateList: {},
    forSearch: {},
    network: false,
  },
  reducers: {
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
    setInitialState: (state) => {
      state.memberSearchResult = {};
    },
    setForSearchInit: (state) => {
      state.memberSearchResult = {};
      state.countryList = {};
      state.forSearch = {};
    },
    setIsUpdate: (state) => {
      state.isUpdate = false;
    },
    setCountryList: (state) => {
      state.countryList = {};
    },
    setForSearch: (state, action) => {
      state.memberSearchResult = {};
      state.forSearch = action.payload;
    }
  },
  extraReducers: (builder) => {

    /* Memner Profile */
    builder.addCase(memberProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : false;
      state.memberProfileData = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(memberProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(memberProfile.rejected, (state) => {
      state.isLoading = false;
      state.memberProfileData = {};
    });

    /* Memner Profile Update */
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isUpdate = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.isLoading = false;
    });

    /* Password Update */
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isUpdate = action.payload.status === 200 ? action.payload.data : false;
      state.isError = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePassword.rejected, (state) => {
      state.isLoading = false;
    });

    /* Memner Search */
    builder.addCase(memberSearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.memberSearchResult = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(memberSearch.pending, (state) => {
      state.isLoading = true;
      state.memberSearchResult = {};
    });
    builder.addCase(memberSearch.rejected, (state) => {
      state.isLoading = false;
      state.memberSearchResult = {};
    });

    /* Get member announcements list */
    builder.addCase(memberAnnouncements.fulfilled, (state, action) => {
      state.isLoading = false;
      state.announcementsList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(memberAnnouncements.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(memberAnnouncements.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get member document list */
    builder.addCase(memberListDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.documentsList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(memberListDocuments.pending, (state) => {
      state.isLoading = true;
      state.documentsList = {};
    });
    builder.addCase(memberListDocuments.rejected, (state) => {
      state.isLoading = false;
      state.documentsList = {};
    });

    /* Get region list */
    builder.addCase(loctaionsRegionList.fulfilled, (state, action) => {
      state.regionList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(loctaionsRegionList.pending, (state) => {
      state.regionList = {};
    });
    builder.addCase(loctaionsRegionList.rejected, (state) => {
      state.regionList = {};
    });

    /* Get country list */
    builder.addCase(loctaionsCountryList.fulfilled, (state, action) => {
      state.countryList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(loctaionsCountryList.pending, (state) => {
      state.countryList = {};
    });
    builder.addCase(loctaionsCountryList.rejected, (state) => {
      state.countryList = {};
    });

    /* Get state or region list */
    builder.addCase(loctaionsStatesList.fulfilled, (state, action) => {
      state.stateList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(loctaionsStatesList.pending, (state) => {
      state.stateList = {};
    });
    builder.addCase(loctaionsStatesList.rejected, (state) => {
      state.stateList = {};
    });

    /* Get state or region list */
    builder.addCase(otherTeamMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.otherMember = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(otherTeamMembers.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(otherTeamMembers.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get licenses Expire list */
    builder.addCase(getLicensesExpire.fulfilled, (state, action) => {
      state.isLoading = false;
      state.expireList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getLicensesExpire.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getLicensesExpire.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get Licenses Departed list */
    builder.addCase(getLicensesDeparted.fulfilled, (state, action) => {
      state.isLoading = false;
      state.departedList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getLicensesDeparted.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getLicensesDeparted.rejected, (state) => {
      state.isLoading = false;
    });

  }
});


export const {
  setInitialState,
  setForSearchInit,
  setIsUpdate,
  setCountryList,
  setForSearch,
  setNetwork
} = MemberSlice.actions

export default MemberSlice.reducer