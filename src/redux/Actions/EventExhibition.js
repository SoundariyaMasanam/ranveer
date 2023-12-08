import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiMultiPart,
  api
} from "lib/api";


const getExhibitionBanner = createAsyncThunk(
  'member/get-exhibition-banner',
  async () => {
    try {
      const response = await api.get(`member/get-exhibition-banner`, {
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


const getExhibition = createAsyncThunk(
  'member/get-exhibitions',
  async (data) => {
    try {
      const response = await api.post(`member/get-exhibitions`, data, {
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

const addExhibition = createAsyncThunk(
  'member/add-exhibition',
  async (data) => {
    try {
      const response = await apiMultiPart.post(`member/add-exhibition`, data, {
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

const getExhibitionList = createAsyncThunk(
  'member/get-attended-exhibition',
  async (data) => {
    try {
      const response = await api.post(`member/get-attended-exhibition`, data, {
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

const attendExhibition = createAsyncThunk(
  'member/attend-exhibition',
  async (data) => {
    try {
      const response = await api.post(`member/attend-exhibition`, data, {
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

const getTeamMembers = createAsyncThunk(
  'member/team-members',
  async () => {
    try {
      const response = await api.get(`member/team-members`, {
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

const addTeamMember = createAsyncThunk(
  'member/add-team-member',
  async () => {
    try {
      const response = await api.get(`member/add-team-member`, {
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

const cancelAttendedExhibition = createAsyncThunk(
  'member/cancel-attended-exhibition',
  async (data) => {
    try {
      const response = await api.post(`member/cancel-attended-exhibition`, data, {
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
  getExhibitionBanner,
  getExhibition,
  addExhibition,
  getExhibitionList,
  attendExhibition,
  getTeamMembers,
  addTeamMember,
  cancelAttendedExhibition
};