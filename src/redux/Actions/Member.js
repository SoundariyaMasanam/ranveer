import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, apiMultiPart } from "lib/api";


const memberProfile = createAsyncThunk(
  'member/profile',
  async () => {
    try {
      const response = await api.post(`member/profile`, {}, {
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
const updateProfile = createAsyncThunk(
  'member/update-profile',
  async (data) => {
    try {
      const response = await apiMultiPart.post(`member/update-profile`, data, {
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

const updatePassword = createAsyncThunk(
  'member/update-password',
  async (data) => {
    try {
      const response = await api.post(`member/update-password`, data, {
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


const memberSearch = createAsyncThunk(
  'member/search',
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


const memberAnnouncements = createAsyncThunk(
  'announcement/list',
  async (data) => {
    try {
      const response = await api.post(`announcement/list`, data, {
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

const memberListDocuments = createAsyncThunk(
  'member/list-documents',
  async (data) => {
    try {
      const response = await api.post(`member/list-documents`, data, {
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
const loctaionsRegionList = createAsyncThunk(
  'loctaions/region-list',
  async () => {
    try {
      const response = await api.post(`loctaions/region-list`, {}, {
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

const loctaionsCountryList = createAsyncThunk(
  'loctaions/country-list',
  async (data) => {
    try {
      const response = await api.post(`loctaions/country-list`, data, {
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

const loctaionsStatesList = createAsyncThunk(
  'loctaions/states-list',
  async (data) => {
    try {
      const response = await api.post(`loctaions/states-list`, data, {
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

const otherTeamMembers = createAsyncThunk(
  'member/other-company-team-members',
  async (data) => {
    try {
      const response = await api.get(`member/other-company-team-members`, {
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

const getLicensesExpire = createAsyncThunk(
  'member/search-licenses/expire',
  async (data) => {
    try {
      const response = await api.post(`member/search-licenses`, data, {
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

const getLicensesDeparted = createAsyncThunk(
  'member/search-licenses/departed',
  async (data) => {
    try {
      const response = await api.post(`member/search-licenses`, data, {
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
  memberProfile,
  updateProfile,
  updatePassword,
  memberSearch,
  memberAnnouncements,
  memberListDocuments,
  loctaionsRegionList,
  loctaionsCountryList,
  loctaionsStatesList,
  otherTeamMembers,
  getLicensesExpire,
  getLicensesDeparted
};