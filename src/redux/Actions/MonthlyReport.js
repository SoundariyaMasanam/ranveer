import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiMultiPart, api } from "lib/api";


const monthlyReportUploade = createAsyncThunk(
  'member/upload-monthly-report',
  async (data) => {
    try {
      const response = await apiMultiPart.post(`member/upload-monthly-report`, data, {
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

const getMonthlyReport = createAsyncThunk(
  'member/get-monthly-reports',
  async () => {
    try {
      const response = await api.get(`member/get-monthly-reports`, {
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

const getTemplateDownload = createAsyncThunk(
  'member/get-template-for-download',
  async () => {
    try {
      const response = await api.get(`member/get-template-for-download`, {
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
  monthlyReportUploade,
  getMonthlyReport,
  getTemplateDownload
};