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
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Reset Password
      </h1>

      <input
        type="password"
        placeholder="New Password"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={handleReset}
        className="bg-black text-white px-5 py-2"
      >
        Reset Password
      </button>
    </div>
  );
}
