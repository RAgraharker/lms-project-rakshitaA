// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/users/login/", {
//         username: form.username,
//         password: form.password,
//       });

//       console.log("LOGIN:", res.data);

//       localStorage.setItem("token", res.data.access);
//       localStorage.setItem("refresh", res.data.refresh);
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("username", res.data.username);

//       navigate("/dashboard");
//     } catch (err) {
//       console.log(err.response?.data);
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">

//       <div className="bg-white p-10 rounded-2xl border border-gray-200 w-[360px]">

//         {/* Header */}
       
// <div className="text-center mb-8">

//   <div className="flex justify-center mb-4">

//     <img
//       src="/logo.png"
//       alt="lms Logo"
//       className="w-24 h-24 object-contain"
//     />

//   </div>

//   <h2 className="text-2xl font-bold text-gray-900">
//     Welcome back
//   </h2>
//  <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.06] grid place-items-center">
//         <div className="-rotate-12 text-6xl font-black text-slate-900">
//           AstraKalam LMS
//         </div>
//       </div>
//   <p className="text-sm text-gray-500 mt-1">
//     Sign in to your AstraKalam account
//   </p>

// </div>



//         {/* Username */}
//         <div className="mb-4">
//           <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
//             Username
//           </label>
//           <input
//             type="text"
//             placeholder="Enter your username"
//             className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-6">
//           <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
//             Password
//           </label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//         </div>

//         {/* Login button */}
//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-800 hover:bg-blue-900 text-blue-50 py-2.5 rounded-lg text-sm font-medium transition"
//         >
//           Login
//         </button>

//         {/* Footer links */}
//         <p className="text-center mt-5 text-sm text-gray-500">
//           Don't have an account?{" "}
//           <span
//             onClick={() => navigate("/register")}
//             className="text-blue-600 font-medium cursor-pointer hover:underline"
//           >
//             Register
//           </span>
//         </p>
//         <p className="text-center mt-2">
//           <span
//             onClick={() => navigate("/forgot-password")}
//             className="text-sm text-blue-600 cursor-pointer hover:underline"
//           >
//             Forgot Password?
//           </span>
//         </p>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.username)) {
      alert("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/users/login/", {
        username: form.username,
        password: form.password,
      });

      console.log("LOGIN:", res.data);

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data);

      alert(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-10 rounded-2xl border border-gray-200 w-[360px]">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt="lms Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back
          </h2>

          <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.06] grid place-items-center">
            <div className="-rotate-12 text-6xl font-black text-slate-900">
              AstraKalam LMS
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Sign in to your AstraKalam account
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
            Email
          </label>

          <input
            type="email"
            value={form.username}
            placeholder="Enter your email"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
            Password
          </label>

          <input
            type="password"
            value={form.password}
            placeholder="Enter your password"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-800 hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed text-blue-50 py-2.5 rounded-lg text-sm font-medium transition"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        {/* Footer links */}
        <p className="text-center mt-5 text-sm text-gray-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

        <p className="text-center mt-2">
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </p>

      </div>
    </div>
  );
}