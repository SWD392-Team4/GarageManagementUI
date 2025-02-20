import axios from "axios";

const api = axios.create({
  baseURL: "https://gm-api.newlsun.com/api", // Base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add an interceptor for request/response handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
