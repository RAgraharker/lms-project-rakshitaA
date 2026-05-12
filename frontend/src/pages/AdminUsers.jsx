// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function AdminUsers() {

//   const [users, setUsers] = useState([]);

//   const [stats, setStats] = useState({
//     total_students: 0,
//     total_instructors: 0,
//     total_admins: 0,
//   });

//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     role: "student",
//   });

//   const fetchUsers = async () => {

//     try {

//       const res = await API.get(
//         "/users/all-users/"
//       );

//       setUsers(res.data.users);

//       setStats({
//         total_students:
//           res.data.total_students,

//         total_instructors:
//           res.data.total_instructors,

//         total_admins:
//           res.data.total_admins,
//       });

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {

//     try {

//       await API.delete(
//         `/users/delete-user/${id}/`
//       );

//       fetchUsers();

//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const handleAddUser = async () => {

//     try {

//       await API.post(
//         "/users/admin-add-user/",
//         form
//       );

//       alert("User added successfully");

//       fetchUsers();

//     } catch (err) {
//       alert("Failed to add user");
//     }
//   };

//   return (

//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         User Management
//       </h1>

//       {/* STATS */}
//       <div className="grid grid-cols-3 gap-4 mb-8">

//         <div className="bg-white p-5 rounded shadow">
//           <h2 className="text-lg font-semibold">
//             Students
//           </h2>
//           <p className="text-2xl font-bold">
//             {stats.total_students}
//           </p>
//         </div>
//  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] grid place-items-center">
//         <div className="-rotate-12 text-6xl font-black text-slate-900">
//           AstraKalam LMS
//         </div>
//       </div>
//         <div className="bg-white p-5 rounded shadow">
//           <h2 className="text-lg font-semibold">
//             Instructors
//           </h2>
//           <p className="text-2xl font-bold">
//             {stats.total_instructors}
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded shadow">
//           <h2 className="text-lg font-semibold">
//             Admins
//           </h2>
//           <p className="text-2xl font-bold">
//             {stats.total_admins}
//           </p>
//         </div>
//       </div>

//       {/* ADD USER */}
//       <div className="bg-white p-5 rounded shadow mb-8">

//         <h2 className="text-xl font-bold mb-4">
//           Add User
//         </h2>

//         <input
//           type="text"
//           placeholder="Email / Username"
//           className="border p-2 w-full mb-3"
//           onChange={(e) =>
//             setForm({
//               ...form,
//               username: e.target.value,
//             })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-3"
//           onChange={(e) =>
//             setForm({
//               ...form,
//               password: e.target.value,
//             })
//           }
//         />

//         <select
//           className="border p-2 w-full mb-3"
//           onChange={(e) =>
//             setForm({
//               ...form,
//               role: e.target.value,
//             })
//           }
//         >
//           <option value="student">
//             Student
//           </option>

//           <option value="instructor">
//             Instructor
//           </option>
//         </select>

//         <button
//           onClick={handleAddUser}
//           className="bg-black text-white px-5 py-2 rounded"
//         >
//           Add User
//         </button>
//       </div>

//       {/* USER TABLE */}
//       <div className="bg-white rounded shadow overflow-hidden">

//         <table className="w-full">

//           <thead className="bg-black text-white">
//             <tr>
//               <th className="p-3 text-left">
//                 Username
//               </th>

//               <th className="p-3 text-left">
//                 Role
//               </th>

//               <th className="p-3 text-left">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody>

//             {users.map((u) => (

//               <tr
//                 key={u.id}
//                 className="border-b"
//               >

//                 <td className="p-3">
//                   {u.username}
//                 </td>

//                 <td className="p-3">
//                   {u.role}
//                 </td>

//                 <td className="p-3">

//                   {u.role !==
//                     "super_admin" && (

//                     <button
//                       onClick={() =>
//                         handleDelete(u.id)
//                       }
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


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
    email: "",
    password: "",
    role: "student",
  });

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/all-users/");

      setUsers(res.data.users);

      setStats({
        total_students: res.data.total_students,
        total_instructors: res.data.total_instructors,
        total_admins: res.data.total_admins,
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
      await API.delete(`/users/delete-user/${id}/`);
      fetchUsers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleAddUser = async () => {
    try {
      await API.post("/users/admin-add-user/", form);

      alert("User added successfully");
      fetchUsers();
    } catch (err) {
      alert("Failed to add user");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-950">
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035] grid place-items-center">
        <div className="-rotate-12 text-6xl font-black text-yellow-300">
          AstraKalam LMS
        </div>
      </div>

      <div className="relative z-[2] max-w-7xl mx-auto px-6 py-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Admin Console
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              User Management
            </h1>

            <p className="text-slate-500 mt-2">
              Create accounts, monitor roles, and manage LMS access.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatCard
            title="Students"
            value={stats.total_students}
            accent="bg-blue-600"
          />

          <StatCard
            title="Instructors"
            value={stats.total_instructors}
            accent="bg-emerald-600"
          />

          <StatCard
            title="Admins"
            value={stats.total_admins}
            accent="bg-violet-600"
          />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 h-fit">
            <h2 className="text-xl font-extrabold mb-1">
              Add User
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Create a student or instructor account.
            </p>

            <label className="block mb-4">
              <span className="block text-sm font-bold text-slate-700 mb-2">
                Email / Username
              </span>

              <input
                type="text"
                placeholder="name@example.com"
                className="w-full h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
              />
            </label>

            <label className="block mb-4">
              <span className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </span>

              <input
                type="password"
                placeholder="Create password"
                className="w-full h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </label>

            <label className="block mb-5">
              <span className="block text-sm font-bold text-slate-700 mb-2">
                Role
              </span>

              <select
                className="w-full h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                value={form.role}
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
            </label>

            <button
              onClick={handleAddUser}
              className="w-full h-11 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
            >
              Add User
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold">
                  All Users
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Manage platform accounts and permissions.
                </p>
              </div>

              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {users.length} users
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold">
                      Username
                    </th>

                    <th className="px-6 py-3 text-left font-bold">
                      Role
                    </th>

                    <th className="px-6 py-3 text-left font-bold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {u.username}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize text-slate-700">
                          {u.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {u.role !== "super_admin" && (
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="h-9 rounded-lg border border-red-200 bg-white px-3 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-10 text-center text-sm font-medium text-slate-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, accent }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 mb-2">
            {title}
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight">
            {value}
          </h2>
        </div>

        <div className={`w-10 h-10 rounded-lg ${accent}`} />
      </div>
    </div>
  );
}
