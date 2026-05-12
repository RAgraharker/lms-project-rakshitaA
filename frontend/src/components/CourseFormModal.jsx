import { useState, useEffect } from "react";
import API from "../services/api";

export default function CourseFormModal({ onClose, course, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    youtube_link: "",
  });

  useEffect(() => {
    if (course) {
      setForm({
        title: course.title,
        description: course.description,
        youtube_link: course.youtube_link,
      });
    }
  }, [course]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSubmit = async () => {
    try {
      if (course) {
        await API.put(`/users/update-course/${course.id}/`, form);
      } else {
        await API.post("/users/add-course/", form);
      }
      refresh();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            
            <h2 className="text-2xl font-bold text-white">
              {course ? "Edit " : "Add "}{" "}
              <span className="text-indigo-400">Course.</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-5">

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
              Title
            </label>
            <input
              value={form.title}
              placeholder="e.g. Introduction to React"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
              Description
            </label>
            <input
              value={form.description}
              placeholder="Brief course description"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 rounded-xl text-sm transition-all duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm transition-all duration-150"
          >
            {course ? "Save Changes" : "Add Course"}
          </button>
        </div>

      </div>
    </div>
  );
}