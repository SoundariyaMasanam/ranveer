import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, apiMultiPart } from "lib/api";

const sendQuote = createAsyncThunk(
  'member/send-quote',
  async (data) => {
    try {
      const response = await apiMultiPart.post(`member/send-quote`, data, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),          
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)

const sendsQuotes = createAsyncThunk(
  'member/sent-quotes',
  async () => {
    try {
      const response = await api.get(`member/sent-quotes`, {
        headers: {
          "Authorization":"Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {          
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)
const receivedQuote = createAsyncThunk(
  'member/received-quotes',
  async () => {
    try {
      const response = await api.get(`member/received-quotes`, {
        headers: {
          "Authorization":"Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {          
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)

export {
  sendQuote,
  sendsQuotes,
  receivedQuote
};