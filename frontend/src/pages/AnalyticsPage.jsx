import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function AnalyticsPage() {

  const [data, setData] = useState(null);

  useEffect(() => {

    API.get("/users/analytics/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#fff8e1] flex items-center justify-center">
        <p className="text-lg text-[#5c3d00]">
          Loading analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8e1] p-8">

      {/* BACK */}
      <Link
        to="/dashboard"
        className="text-blue-500 inline-block mb-6"
      >
        ← Back
      </Link>

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-[#5c3d00] mb-8">
        Analytics Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <Card
          title="Courses"
          value={data.total_courses}
        />

        <Card
          title="Students"
          value={data.total_students}
        />

        <Card
          title="Enrollments"
          value={data.total_enrollments}
        />

        <Card
          title="Top Course"
          value={data.popular_course}
        />
      </div>

      {/* COURSE ENROLLMENTS */}
      <div className="bg-white rounded-2xl p-6 shadow mb-8">

        <h2 className="text-2xl font-semibold mb-5 text-[#5c3d00]">
          Course Enrollments
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="text-left py-3">
                Course
              </th>

              <th className="text-left py-3">
                Students
              </th>
            </tr>
          </thead>

          <tbody>

            {data.course_data.map((course, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="py-3">
                  {course.title}
                </td>

                <td className="py-3">
                  {course.students}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECENT ENROLLMENTS */}
      <div className="bg-white rounded-2xl p-6 shadow">

        <h2 className="text-2xl font-semibold mb-5 text-[#5c3d00]">
          Recent Enrollments
        </h2>

        <div className="space-y-4">

          {data.recent_enrollments.map((item, index) => (

            <div
              key={index}
              className="border rounded-xl p-4"
            >

              <p className="font-medium">
                {item.student}
              </p>

              <p className="text-gray-600">
                enrolled in {item.course}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {

  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">

      <p className="text-gray-500 text-sm mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-[#5c3d00]">
        {value}
      </h2>
    </div>
  );
}