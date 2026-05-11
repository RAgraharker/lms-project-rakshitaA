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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
          <p className="text-sm font-medium text-slate-500">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              LMS Insights
            </p>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">
              Analytics Dashboard
            </h1>
          </div>

          <Link
            to="/dashboard"
            className="h-10 px-4 inline-flex items-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <Card
            title="Courses"
            value={data.total_courses}
            accent="bg-blue-600"
          />

          <Card
            title="Students"
            value={data.total_students}
            accent="bg-emerald-600"
          />

          <Card
            title="Enrollments"
            value={data.total_enrollments}
            accent="bg-violet-600"
          />

          <Card
            title="Top Course"
            value={data.popular_course || "No data"}
            accent="bg-amber-600"
          />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_.8fr] gap-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-950">
                  Course Enrollments
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Student count by course
                </p>
              </div>

              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {data.course_data.length} courses
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="text-left px-6 py-3 font-bold">
                      Course
                    </th>

                    <th className="text-left px-6 py-3 font-bold">
                      Students
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {data.course_data.map((course, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {course.title}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex min-w-10 justify-center rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                          {course.students}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="text-lg font-extrabold text-slate-950">
                Recent Enrollments
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Latest student activity
              </p>
            </div>

            <div className="p-4 space-y-3">
              {data.recent_enrollments.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 p-4 hover:border-blue-200 hover:bg-blue-50/40 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-900">
                        {item.student}
                      </p>

                      <p className="text-sm text-slate-600 mt-1">
                        enrolled in{" "}
                        <span className="font-semibold text-slate-900">
                          {item.course}
                        </span>
                      </p>
                    </div>
 <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.06] grid place-items-center">
        <div className="-rotate-12 text-6xl font-black text-slate-900">
          AstraKalam LMS
        </div>
      </div>
                    <span className="shrink-0 w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5" />
                  </div>

                  <p className="text-xs font-medium text-slate-400 mt-3">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({ title, value, accent }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 mb-2">
            {title}
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 break-words">
            {value}
          </h2>
        </div>

        <div className={`w-10 h-10 rounded-lg ${accent}`} />
      </div>
    </div>
  );
}
