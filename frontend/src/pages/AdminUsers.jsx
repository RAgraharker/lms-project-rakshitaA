import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState({
    total_students: 0,
    total_instructors: 0,
    total_admins: 0,
  });

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const fetchUsers = async () => {

    try {

      const res = await API.get(
        "/users/all-users/"
      );

      setUsers(res.data.users);

      setStats({
        total_students:
          res.data.total_students,

        total_instructors:
          res.data.total_instructors,

        total_admins:
          res.data.total_admins,
      });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {

    try {

      await API.delete(
        `/users/delete-user/${id}/`
      );

      fetchUsers();

    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleAddUser = async () => {

    try {

      await API.post(
        "/users/admin-add-user/",
        form
      );

      alert("User added successfully");

      fetchUsers();

    } catch (err) {
      alert("Failed to add user");
    }
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-semibold">
            Students
          </h2>
          <p className="text-2xl font-bold">
            {stats.total_students}
          </p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-semibold">
            Instructors
          </h2>
          <p className="text-2xl font-bold">
            {stats.total_instructors}
          </p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-semibold">
            Admins
          </h2>
          <p className="text-2xl font-bold">
            {stats.total_admins}
          </p>
        </div>
      </div>

      {/* ADD USER */}
      <div className="bg-white p-5 rounded shadow mb-8">

        <h2 className="text-xl font-bold mb-4">
          Add User
        </h2>

        <input
          type="text"
          placeholder="Email / Username"
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
          <option value="student">
            Student
          </option>

          <option value="instructor">
            Instructor
          </option>
        </select>

        <button
          onClick={handleAddUser}
          className="bg-black text-white px-5 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {/* USER TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">
            <tr>
              <th className="p-3 text-left">
                Username
              </th>

              <th className="p-3 text-left">
                Role
              </th>

              <th className="p-3 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {users.map((u) => (

              <tr
                key={u.id}
                className="border-b"
              >

                <td className="p-3">
                  {u.username}
                </td>

                <td className="p-3">
                  {u.role}
                </td>

                <td className="p-3">

                  {u.role !==
                    "super_admin" && (

                    <button
                      onClick={() =>
                        handleDelete(u.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
