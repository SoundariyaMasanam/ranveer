import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "lib/api";

const getFeaturedMember = createAsyncThunk(
  'member/get-featured-license',
  async () => {
    try {
      const response = await api.post(`member/get-featured-license`, {}, {
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

const getDashWidgets = createAsyncThunk(
  'member/dash-widgets',
  async () => {
    try {
      const response = await api.get(`member/dash-widgets`, {
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

const getVisitedProfiles = createAsyncThunk(
  'member/visited-profiles',
  async () => {
    try {
      const response = await api.get(`member/visited-profiles`, {
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
  getFeaturedMember,
  getDashWidgets,
  getVisitedProfiles
};