import axios from "axios";

const API_ROOT = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const cleanRoot = API_ROOT.replace(/\/+$/, "").replace(/\/api(\/users)?$/, "");
const baseURL = `${cleanRoot}/api`;

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token && token !== "undefined" && token !== "null") {
    req.headers.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
  }

  return req;
});

export default API;
