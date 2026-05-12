import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      await API.post(
        `/users/reset-password/${uid}/${token}/`,
        { password }
      );
      alert("Password reset successful");
    } catch {
      alert("Reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
             <div className="flex justify-center mb-4">

    <img
      src="/logo.png"
      alt="lms Logo"
      className="w-10 h-10 object-contain"
    />

  </div>
            <span className="text-zinc-400 text-sm tracking-widest uppercase font-medium">
              ASTRAKALAM
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight">
            Set a new{" "}
            <span className="text-indigo-400">password.</span>
          </h1>
 <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.06] grid place-items-center">
       <div className="-rotate-12 text-6xl font-black text-yellow-300">
  AstraKalam LMS

        </div>
      </div>
          <p className="text-zinc-500 mt-3 text-sm leading-relaxed">
            Choose something strong and memorable.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5">

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
              New Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleReset}
            className="w-full bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm transition-all duration-150"
          >
            Reset Password
          </button>
        </div>

        {/* Back to login */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          Back to{" "}
          <a
            href="/"
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
          >
            sign in
          </a>
        </p>

      </div>
    </div>
  );
}