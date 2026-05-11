import axios from "axios";

const API = axios.create({
  baseURL: "https://lms-project-rakshitaa.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// ✅ Attach JWT token
API.interceptors.request.use((req) => {
  const publicPaths = [
    "/users/login/",
    "/users/register/",
    "/users/forgot-password/",
    "/users/reset-password/",
  ];

  const isPublicPath = publicPaths.some((path) => req.url?.startsWith(path));

  if (isPublicPath) {
    delete req.headers.Authorization;
    return req;
  }

  const token = localStorage.getItem("token");

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
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default API;
