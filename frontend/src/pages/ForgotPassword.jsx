import { useState } from "react";
import API from "../services/api";

export default function ForgotPassword() {

  const [username, setUsername] = useState("");

  const handleSubmit = async () => {

    try {

      await API.post(
        "/users/forgot-password/",
        { username }
      );

      alert("Reset link sent");

    } catch {
      alert("Error sending reset link");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
Forgot Password
      </h1>

      <input
        type="text"
        placeholder="Enter email"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-5 py-2"
      >
        Send Reset Link
      </button>
    </div>
  );
}
