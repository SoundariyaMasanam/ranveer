import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "lib/api";

const getNotificationsLeftMenu = createAsyncThunk(
  'member/get-notifications-left-menu',
  async () => {
    try {
      const response = await api.post(`member/get-notifications`, { left_menu: 1 }, {
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


const getNotifications = createAsyncThunk(
  'member/get-notifications',
  async () => {
    try {
      const response = await api.post(`member/get-notifications`, {}, {
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

const getNotificationsForMember = createAsyncThunk(
  'member/get-notifications/Member',
  async (data) => {
    try {
      const response = await api.post(`member/get-notifications`, data, {
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


const actionPerform = createAsyncThunk(
  'member/notification-actions',
  async (data) => {
    try {
      const response = await api.post(`member/notification-actions`, data, {
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

const actionPerformSideBar = createAsyncThunk(
  'member/notification-actions-sidebar',
  async (data) => {
    try {
      const response = await api.post(`member/notification-actions`, data, {
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
  getNotificationsLeftMenu,
  getNotificationsForMember,
  actionPerformSideBar,
  getNotifications,
  actionPerform
};