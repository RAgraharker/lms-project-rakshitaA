import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import CourseFormModal from "../components/CourseFormModal";
import LessonBuilder from "../components/LessonBuilder";
export default function CoursePage() {

  console.log("COURSE PAGE RUNNING");

  const { id } = useParams();

 

  const [course, setCourse] =
    useState(null);

  const [showEdit, setShowEdit] =
    useState(false);

  const role =
    localStorage.getItem("role");

  const fetchCourse = async () => {

    try {

      const res = await API.get(
        "/users/courses/"
      );

      const found = res.data.find(
        (c) => c.id === Number(id)
      );

      console.log(found);
console.log("COURSE:", found);
console.log("ROLE:", role);
      setCourse(found);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  if (!course) {

    return (
      <div className="min-h-screen bg-[#fff8e1] flex items-center justify-center">

        <p className="text-lg">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8e1] p-6">

      {/* BACK */}
      <Link
        to="/dashboard"
        className="text-blue-500 mb-6 inline-block"
      >
        ← Back
      </Link>

      {/* CARD */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">

        {/* TOP */}
        <div className="flex justify-between items-start flex-wrap gap-4">

          <div>

            <h1 className="text-4xl font-bold mb-4 text-[#5c3d00]">
              {course.title}
            </h1>

            <p className="text-gray-600 mb-6 text-lg">
              {course.description}
            </p>
          </div>

          {/* EDIT */}
          {(role === "instructor" ||
            role === "super_admin") && (

            <button
              onClick={() =>
                setShowEdit(true)
              }
              className="bg-[#d4a017] text-white px-5 py-2 rounded-xl hover:bg-[#b58900]"
            >
              Edit Course
            </button>
          )}
        </div>

        {/* WATCH BUTTON */}
        {course.youtube_link && (

          <a
            href={course.youtube_link}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-[#5c3d00] text-white px-6 py-3 rounded-xl hover:bg-[#7a5200] transition"
          >
            ▶ Watch Lesson on YouTube
          </a>
        )}
      </div>

      {/* DETAILS */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mt-6">

        <h2 className="text-2xl font-semibold mb-4 text-[#5c3d00]">
          Course Details
        </h2>

        <div className="space-y-3 text-gray-700 text-lg">

          <p>
            📚 Lessons: 10
          </p>

          <p>
            ⏱ Duration: 2h
          </p>

          <p>
            📈 Progress: {course.progress || 0}%
          </p>
        </div>
      </div>
{(
  role === "instructor" ||
  role === "super_admin"
) && (
  <LessonBuilder
    courseId={course.id}
  />
)}

      {/* MODAL */}
      {showEdit && (

        <CourseFormModal
          onClose={() =>
            setShowEdit(false)
          }
          course={course}
          refresh={fetchCourse}
        />
      )}
    </div>
  );
}