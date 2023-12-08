import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, apiMultiPart } from "lib/api";

const getSpotlightAdd = createAsyncThunk(
  'spotlight/add',
  async (data) => {
    try {
      const response = await apiMultiPart.post(`spotlight/add`, data, {
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

const getSpotlightBanner = createAsyncThunk(
  'spotlight/banners',
  async () => {
    try {
      const response = await api.get(`spotlight/banners`, {
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

const getSpotlightListing = createAsyncThunk(
  'spotlight/listing',
  async (data) => {
    try {
      const response = await api.post(`spotlight/listing`, data, {
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


const getSpotlightCategoryListing = createAsyncThunk(
  'spotlight/category-listing',
  async () => {
    try {
      const response = await api.get(`spotlight/category-listing`, {
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
  getSpotlightAdd,
  getSpotlightListing,
  getSpotlightBanner,
  getSpotlightCategoryListing
};