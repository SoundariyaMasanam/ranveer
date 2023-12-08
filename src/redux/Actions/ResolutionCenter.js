import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiMultiPart, api } from "lib/api";



const addResolutionCentre = createAsyncThunk(
  'member/add-resolution-centre',
  async (data) => {
    try {
      const response = await apiMultiPart.post(`member/add-resolution-centre`, data, {
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

const getResolutionCentre = createAsyncThunk(
  'member/get-resolution-centers',
  async (data) => {
    try {
      const response = await api.post(`member/get-resolution-centers`, data, {
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

const getResolutionCentreMessages = createAsyncThunk(
  'member/get-resolution-center-messages',
  async (data) => {
    try {
      const response = await api.post(`member/get-resolution-center-messages`, data, {
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

const replyResolutionCentreMessages = createAsyncThunk(
  'member/reply-on-resolution-center-conversation',
  async (data) => {
    try {
      const response = await apiMultiPart.post(`member/reply-on-resolution-center-conversation`, data, {
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
export {
  addResolutionCentre,
  getResolutionCentre,
  getResolutionCentreMessages,
  replyResolutionCentreMessages
};