import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  // apiMultiPart, 
  api
} from "lib/api";

const scheduleEvent = createAsyncThunk(
  'member/schedule-new-meeting',
  async (data) => {
    try {
      const response = await api.post(`member/schedule-new-meeting`, data, {
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

const getScheduleEvent = createAsyncThunk(
  'member/get-scheduled-meetings',
  async () => {
    try {
      const response = await api.get(`member/get-scheduled-meetings`, {
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

const updateScheduleEvent = createAsyncThunk(
  'member/update-scheduled-meeting',
  async (data) => {
    try {
      const response = await api.post(`member/update-scheduled-meeting/${data.eventid}`, data, {
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
/*
const cancelMetting = createAsyncThunk(
  'member/cancel-scheduled-meeting',
  async (data) => {    
    try {
      const response = await api.get(`member/cancel-scheduled-meeting/${data}`, {
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
) */

const cancelMetting = createAsyncThunk(
  'member/change-status-of-scheduled-meeting',
  async (data) => {
    try {
      const response = await api.post(`member/change-status-of-scheduled-meeting`, data, {
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

const Member = createAsyncThunk(
  'member/search/member',
  async (data) => {
    try {
      const response = await api.post(`member/search`, data, {
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


const getTimeZone = createAsyncThunk(
  'loctaions/timezones',
  async (data) => {
    try {
      const response = await api.get(`loctaions/timezones`, {
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
  scheduleEvent,
  getScheduleEvent,
  updateScheduleEvent,
  cancelMetting,
  Member,
  getTimeZone
};