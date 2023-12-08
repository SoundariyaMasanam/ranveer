import { createSlice } from "@reduxjs/toolkit";
import {
  sendQuote,
  sendsQuotes,
  receivedQuote
} from "redux/Actions/SendQuote";

const SendQuoteSlice = createSlice({
  name: "sendQuote",
  initialState: {
    isLoading: false,
    isLoadingS: false,
    isSuccess: false,
    isSuccessS: false,
    isLoadingL: false,
    sendQuoteList: {},
    quoteList: {},
  },
  reducers: { 
    setInitialState: (state) => {
      state.error = false;
      state.isSuccess = false;
      state.isSuccessS = false;
      state.isLoadingS = false;
    }
  },
  extraReducers: (builder) => {
    /* Send a Quote */
    builder.addCase(sendQuote.fulfilled, (state, action) => {      
      state.isLoadingS = false;
      state.isSuccessS = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(sendQuote.pending, (state, action) => {
      state.isLoadingS = true;
      state.isSuccessS = false;
    });
    builder.addCase(sendQuote.rejected, (state, action) => {
      state.isLoadingS = false;
      state.isSuccessS = false;
    });

    /* Received a Quote */
    builder.addCase(receivedQuote.fulfilled, (state, action) => {      
      state.isLoading = false;
      state.quoteList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(receivedQuote.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(receivedQuote.rejected, (state, action) => {
      state.isLoading = false;
    });

    /* Send a Quote list */
    builder.addCase(sendsQuotes.fulfilled, (state, action) => {      
      state.isLoadingL = false;
      state.sendQuoteList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(sendsQuotes.pending, (state, action) => {
      state.isLoadingL = false;
    });
    builder.addCase(sendsQuotes.rejected, (state, action) => {
      state.isLoadingL = false;
    });
  }
});

export const { setInitialState } = SendQuoteSlice.actions;
export default SendQuoteSlice.reducer