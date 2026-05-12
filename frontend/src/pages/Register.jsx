// // import { useState } from "react";
// // import API from "../services/api";
// // import { useNavigate } from "react-router-dom";

// // export default function Register() {
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({
// //     username: "",
// //     password: "",
// //     role: "student",
// //   });

// //   const handleRegister = async () => {
// //     try {
// //       await API.post("/users/register/", form);
// //       alert("Registered Successfully");
// //       navigate("/");
// //     } catch (err) {
// //       alert(err.response?.data?.error || err.response?.data?.detail || "Registration failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
// //       <div className="w-full max-w-md">

// //         {/* Header */}
// //         <div className="mb-10">
// //           <div className="flex items-center gap-2 mb-6">
// //             <div className="w-7 h-7 rounded-full bg-indigo-500" />
// //             <span className="text-zinc-400 text-sm tracking-widest uppercase font-medium">
// //               ASTRAKALAM 
// //             </span>
// //           </div>
// //           <h1 className="text-4xl font-bold text-white leading-tight">
// //             Create your<br />
// //             <span className="text-indigo-400">account.</span>
// //           </h1>
// //            <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.06] grid place-items-center">
// //         <div className="-rotate-12 text-6xl font-black text-yellow-300">
// //   AstraKalam LMS
          
// //         </div>
// //       </div>
// //           <p className="text-zinc-500 mt-2 text-sm">
// //             Already have one?{" "}
// //             <a href="/" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">
// //               Sign in
// //             </a>
// //           </p>
// //         </div>

// //         {/* Form Card */}
// //         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5">

// //           {/* Email */}
// //           <div className="space-y-1.5">
// //             <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
// //               Email
// //             </label>
// //             <input
// //               type="text"
// //               placeholder="you@example.com"
// //               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
// //               onChange={(e) => setForm({ ...form, username: e.target.value })}
// //             />
// //           </div>

// //           {/* Password */}
// //           <div className="space-y-1.5">
// //             <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               placeholder="••••••••"
// //               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
// //               onChange={(e) => setForm({ ...form, password: e.target.value })}
// //             />
// //           </div>

// //           {/* Role */}
// //           <div className="space-y-1.5">
// //             <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
// //               Role
// //             </label>
// //             <select
// //               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
// //               onChange={(e) => setForm({ ...form, role: e.target.value })}
// //             >
// //               <option value="student">Student</option>
// //               <option value="instructor">Instructor</option>
// //             </select>
// //           </div>

// //           {/* Submit */}
// //           <button
// //             onClick={handleRegister}
// //             className="w-full bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm transition-all duration-150 mt-2"
// //           >
// //             Create Account
// //           </button>
// //         </div>

// //         {/* Footer */}
// //         <p className="text-center text-zinc-600 text-xs mt-6">
// //           By registering, you agree to our{" "}
// //           <span className="text-zinc-500 underline cursor-pointer">Terms of Service</span>.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     role: "student",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     if (!form.username || !form.password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       await API.post("/users/register/", form);

//       alert("Registered Successfully");
//       navigate("/");
//     } catch (err) {
//       console.error(err);

//       alert(
//         err.response?.data?.error ||
//         err.response?.data?.detail ||
//         "Registration failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">

//       {/* Watermark */}
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] grid place-items-center">
//         <div className="-rotate-12 text-6xl font-black text-yellow-300">
//           AstraKalam LMS
//         </div>
//       </div>

//       <div className="w-full max-w-md relative z-10">

//         {/* Header */}
//         <div className="mb-10">
//           <div className="flex items-center gap-2 mb-6">
//             <div className="w-7 h-7 rounded-full bg-indigo-500" />

//             <span className="text-zinc-400 text-sm tracking-widest uppercase font-medium">
//               ASTRAKALAM
//             </span>
//           </div>

//           <h1 className="text-4xl font-bold text-white leading-tight">
//             Create your <br />
//             <span className="text-indigo-400">account.</span>
//           </h1>

//           <p className="text-zinc-500 mt-2 text-sm">
//             Already have one?{" "}
//             <Link
//               to="/"
//               className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5">

//           {/* Email */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
//               Email
//             </label>

//             <input
//               type="email"
//               value={form.username}
//               placeholder="ENTER YOUR EMAIL"
//               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
//               onChange={(e) =>
//                 setForm({ ...form, username: e.target.value })
//               }
//             />
//           </div>

//           {/* Password */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
//               Password
//             </label>

//             <input
//               type="password"
//               value={form.password}
//               placeholder="••••••••"
//               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//             />
//           </div>

//           {/* Role */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
//               Role
//             </label>

//             <select
//               value={form.role}
//               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
//               onChange={(e) =>
//                 setForm({ ...form, role: e.target.value })
//               }
//             >
//               <option value="student">Student</option>
//               <option value="instructor">Instructor</option>
//             </select>
//           </div>

//           {/* Submit */}
//           <button
//             onClick={handleRegister}
//             disabled={loading}
//             className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm transition-all duration-150 mt-2"
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-zinc-600 text-xs mt-6">
//           By registering, you agree to our{" "}
//           <span className="text-zinc-500 underline cursor-pointer">
//             Terms of Service
//           </span>
//           .
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
    adminToken: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

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

    // Super admin token validation
    if (
      form.role === "super_admin" &&
      !form.adminToken
    ) {
      alert("Enter super admin token");
      return;
    }

    try {
      setLoading(true);

      await API.post("/users/register/", {
        username: form.username,
        password: form.password,
        role: form.role,
        adminToken: form.adminToken,
      });

      alert("Registered Successfully");

      navigate("/");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] grid place-items-center">
        <div className="-rotate-12 text-6xl font-black text-yellow-300">
          AstraKalam LMS
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">

        {/* Header */}
        <div className="mb-10">

          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-full bg-indigo-500" />

            <span className="text-zinc-400 text-sm tracking-widest uppercase font-medium">
              ASTRAKALAM
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight">
            Create your <br />
            <span className="text-indigo-400">account.</span>
          </h1>

          <p className="text-zinc-500 mt-2 text-sm">
            Already have one?{" "}

            <Link
              to="/"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5">

          {/* Email */}
          <div className="space-y-1.5">

            <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
              Email
            </label>

            <input
              type="email"
              value={form.username}
              placeholder="you@example.com"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">

            <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
              Password
            </label>

            <input
              type="password"
              value={form.password}
              placeholder="••••••••"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          {/* Role */}
<div className="space-y-1.5">

  <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
    Role
  </label>

  <select
    value={form.role}
    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
    onChange={(e) =>
      setForm({
        ...form,
        role: e.target.value,
      })
    }
  >
    <option value="student">
      Student
    </option>

    <option value="instructor">
      Instructor
    </option>

    <option value="super_admin">
      Super Admin
    </option>
  </select>
</div>

{/* Super Admin Token */}
{form.role === "super_admin" && (
  <div className="space-y-1.5">

    <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
      Super Admin Token
    </label>

    <input
      type="text"
      value={form.adminToken}
      placeholder="Enter admin token"
      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
      onChange={(e) =>
        setForm({
          ...form,
          adminToken: e.target.value,
        })
      }
    />
  </div>
)}

          {/* Submit */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm transition-all duration-150 mt-2"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-xs mt-6">
          By registering, you agree to our{" "}
          <span className="text-zinc-500 underline cursor-pointer">
            Terms of Service
          </span>.
        </p>
      </div>
    </div>
  );
}