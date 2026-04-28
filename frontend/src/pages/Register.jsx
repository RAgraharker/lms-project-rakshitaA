import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const handleRegister = async () => {

    try {

      await API.post("/users/register/", form);

      alert("Registered Successfully");

      navigate("/");
} catch (err) {
      alert(
        err.response?.data?.error ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Register
      </h1>

      <input
        type="text"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            role: e.target.value,
          })
        }
      >
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
        <option value="super_admin"> Super Admin </option>
      </select>

      <button
        onClick={handleRegister}
        className="bg-black text-white px-5 py-2"
      >
        Register
      </button>
    </div>
  );
}
