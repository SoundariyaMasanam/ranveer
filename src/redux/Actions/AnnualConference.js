import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "lib/api";


const interestToAttend = createAsyncThunk(
  'member/interest-to-attend',
  async (data) => {
    try {
      const response = await api.post(`member/interest-to-attend`, data, {
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


const interestToSponser = createAsyncThunk(
  'member/interest-to-sponser',
  async (data) => {    
    try {
      const response = await api.post(`member/interest-to-sponser`, data, {
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

const getSponsersList = createAsyncThunk(
  'member/sponsers-list',
  async () => {    
    try {
      const response = await api.get(`member/sponsers-list`, {
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

const getConferenceBanner = createAsyncThunk(
  'member/get-conference-banner',
  async () => {    
    try {
      const response = await api.get(`member/get-conference-banner`, {
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


const getAttendeeList = createAsyncThunk(
  'member/attendee-list',
  async () => {    
    try {
      const response = await api.get(`member/attendee-list`, {
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


const getKeyEventsList = createAsyncThunk(
  'member/list-key-events',
  async () => {    
    try {
      const response = await api.get(`member/list-key-events`, {
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


const cancelAttended = createAsyncThunk(
  'member/cancel-attended-annualconference/id',
  async (data) => {    
    try {
      const response = await api.get(`member/cancel-attended-annualconference/${data}`, {
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

const cancelSponsored = createAsyncThunk(
  'member/cancel-sponsored-annualconference/id',
  async (data) => {    
    try {
      const response = await api.get(`member/cancel-sponsored-annualconference/${data}`, {
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
  interestToAttend,
  interestToSponser,
  getSponsersList,
  getConferenceBanner,
  getAttendeeList,
  getKeyEventsList,
  cancelAttended,
  cancelSponsored
};