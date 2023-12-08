import axios from "axios";
const API_URL = process.env.REACT_APP_API_BASE_URL;
// console.log('API_URL',API_URL)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const apiMultiPart = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type" : "multipart/form-data",
  },
});

// export default api;
export {api, apiMultiPart}