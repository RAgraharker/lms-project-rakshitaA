import { useEffect, useState } from "react";
import API from "../services/api";

export default function LessonBuilder({
  courseId,
}) {

  const [lessons, setLessons] =
    useState([]);

  const [form, setForm] =
    useState({
      module: "",
      title: "",
      content: "",
      video_url: "",
    });

  const fetchLessons = async () => {

    try {

      const res = await API.get(
        `/users/lessons/${courseId}/`
      );

      setLessons(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleSubmit = async () => {

    try {

      await API.post(
        "/users/add-lesson/",
        {
          ...form,
          course: courseId,
        }
      );

      setForm({
        module: "",
        title: "",
        content: "",
        video_url: "",
      });

      fetchLessons();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mt-6">

      <h2 className="text-2xl font-semibold mb-6 text-[#5c3d00]">
        Lesson Builder
      </h2>

      {/* FORM */}
      <div className="space-y-4 mb-8">

        <input
          type="text"
          placeholder="Module Name"
          value={form.module}
          onChange={(e) =>
            setForm({
              ...form,
              module: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Lesson Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          placeholder="Lesson Content"
          value={form.content}
          onChange={(e) =>
            setForm({
              ...form,
              content: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl h-40"
        />

        <input
          type="text"
          placeholder="YouTube Video URL"
          value={form.video_url}
          onChange={(e) =>
            setForm({
              ...form,
              video_url: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <button
          onClick={handleSubmit}
          className="bg-[#5c3d00] text-white px-6 py-3 rounded-xl"
        >
          Add Lesson
        </button>
      </div>
 <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.06] grid place-items-center">
        <div className="-rotate-12 text-6xl font-black text-slate-900">
          AstraKalam LMS
        </div>
      </div>
      {/* LESSONS */}
      <div className="space-y-6">

        {lessons.map((lesson) => (

          <div
            key={lesson.id}
            className="border rounded-2xl p-5"
          >

            <p className="text-sm text-[#d4a017] font-semibold mb-2">
              {lesson.module}
            </p>

            <h3 className="text-xl font-bold text-[#5c3d00] mb-3">
              {lesson.title}
            </h3>

            <p className="text-gray-700 whitespace-pre-line mb-4">
              {lesson.content}
            </p>

            {lesson.video_url && (
              <a
                href={lesson.video_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#d4a017] text-white px-4 py-2 rounded-lg"
              >
                ▶ Watch Video
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
