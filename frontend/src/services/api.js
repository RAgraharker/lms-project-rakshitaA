import axios from "axios";

const API = axios.create({
  baseURL: "https://lms-project-rakshitaa.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// ✅ Attach JWT token
API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ✅ Auto logout on token expiry
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default API;
