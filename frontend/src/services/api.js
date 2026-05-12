import axios from "axios";

const API_ROOT = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const baseURL = API_ROOT.replace(/\/$/, "").endsWith("/api")
  ? API_ROOT.replace(/\/$/, "")
  : `${API_ROOT.replace(/\/$/, "")}/api`;

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
