import { createSlice } from "@reduxjs/toolkit";
import {
  getSpotlightListing,
  getSpotlightCategoryListing,
  getSpotlightBanner,
  getSpotlightAdd
} from "redux/Actions/Spotlight";

const SpotlightSlice = createSlice({
  name: "spotSlice",
  initialState: {
    isLoading: false,
    isSuccess: false,
    spotlightListing: {},
    spotlightBanner: {},
    spotlightCatgoryListing: {},    
    error: {},
  },
  reducers: { 
    setInitialState: (state) => {      
      state.isSuccess = false;
      state.error = {};
    }
  },
  extraReducers: (builder) => {
    /* get Spotlight listing */
    builder.addCase(getSpotlightAdd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.status !== 200 ? action.payload.data : {};
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(getSpotlightAdd.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSpotlightAdd.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* get Spotlight listing */
    builder.addCase(getSpotlightBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.spotlightBanner = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getSpotlightBanner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSpotlightBanner.rejected, (state) => {
      state.isLoading = false;
    });

    /* get Spotlight listing */
    builder.addCase(getSpotlightListing.fulfilled, (state, action) => {
      state.isLoading = false;
      state.spotlightListing = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getSpotlightListing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSpotlightListing.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* get Spotlight listing */
    builder.addCase(getSpotlightCategoryListing.fulfilled, (state, action) => {
      state.isLoading = false;
      state.spotlightCatgoryListing = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getSpotlightCategoryListing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSpotlightCategoryListing.rejected, (state) => {
      state.isLoading = false;
    });
    
  }
});

export const { setInitialState } = SpotlightSlice.actions;
export default SpotlightSlice.reducer