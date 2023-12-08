import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "lib/api";

const getLogin = createAsyncThunk(
  'getLogin',
  async (data) => {
    try {
      const response = await api.post(`member/login`, data)
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

const getRegister = createAsyncThunk(
  'getRegister',
  async (data) => {
    try {
      const response = await api.post(`member/register`, data.register)
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

const forgetPassword = createAsyncThunk(
  'forgetPassword',
  async (data) => {
    try {
      const response = await api.post(`member/forgot_passsord`, data)
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

const resetPassword = createAsyncThunk(
  'reset_password',
  async (data) => {
    try {
      const response = await api.post(`member/reset_password`, data)
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
  getLogin,
  getRegister,
  forgetPassword,
  resetPassword
};