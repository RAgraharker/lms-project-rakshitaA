import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ScreenProtection from "../components/ScreenProtection";
export default function LearningPage() {
  const { id } = useParams();
  const role = localStorage.getItem("role");

  const [modules, setModules] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [newModule, setNewModule] = useState("");

  const [newLesson, setNewLesson] = useState({
    moduleId: "",
    title: "",
    content: "",
    video_url: "",
    resources: "",
  });

  const [announcementText, setAnnouncementText] = useState("");

  const canManage = role === "instructor" || role === "super_admin";

  useEffect(() => {
    fetchStructure();
    fetchAnnouncements();
  }, []);

  const fetchStructure = async () => {
    try {
      const res = await API.get(`/users/course-structure/${id}/`);

      setModules(res.data.modules);

      if (
        res.data.modules.length > 0 &&
        res.data.modules[0].lessons.length > 0
      ) {
        setActiveLesson(res.data.modules[0].lessons[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await API.get(`/users/announcements/${id}/`);
      setAnnouncements(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addModule = async () => {
    if (!newModule) return;

    try {
      await API.post("/users/add-module/", {
        course: id,
        title: newModule,
      });

      setNewModule("");
      fetchStructure();
    } catch (err) {
      console.log(err);
    }
  };

  const addLesson = async () => {
    try {
      await API.post("/users/add-lesson/", {
        module: newLesson.moduleId,
        title: newLesson.title,
        content: newLesson.content,
        video_url: newLesson.video_url,
        resources: newLesson.resources,
      });

      setNewLesson({
        moduleId: "",
        title: "",
        content: "",
        video_url: "",
        resources: "",
      });

      fetchStructure();
    } catch (err) {
      console.log(err);
    }
  };

  const saveLesson = async () => {
    try {
      await API.put(`/users/update-lesson/${activeLesson.id}/`, activeLesson);

      alert("Lesson updated");
      fetchStructure();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!confirm("Delete this lesson?")) return;

    try {
      await API.delete(`/users/delete-lesson/${lessonId}/`);
      fetchStructure();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteModule = async (moduleId) => {
    if (!confirm("Delete this module and all its lessons?")) return;

    try {
      await API.delete(`/users/delete-module/${moduleId}/`);
      fetchStructure();
    } catch (err) {
      console.log(err);
    }
  };

  const postAnnouncement = async () => {
    try {
      await API.post("/users/add-announcement/", {
        course: id,
        message: announcementText,
      });

      setAnnouncementText("");
      fetchAnnouncements();
    } catch (err) {
      console.log(err);
    }
  };

  return (
     <ScreenProtection>
    <div className="min-h-screen bg-slate-50 text-slate-950 flex">
      <aside className="w-[340px] shrink-0 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto">
        <div className="p-5 border-b border-slate-200">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Course Builder
          </p>

          <h2 className="text-2xl font-extrabold tracking-tight mt-1">
            Modules
          </h2>
        </div>

        <div className="p-5">
          {canManage && (
            <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <input
                type="text"
                placeholder="New module"
                value={newModule}
                onChange={(e) => setNewModule(e.target.value)}
                className="w-full h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 mb-3"
              />

              <button
                onClick={addModule}
                className="w-full h-10 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
              >
                Add Module
              </button>
            </div>
          )}

          <div className="space-y-5">
            {modules.map((module) => (
              <div key={module.id} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-3">
                  <h3 className="font-extrabold text-sm text-slate-900 truncate">
                    {module.title}
                  </h3>

                  {canManage && (
                    <button
                      onClick={() => deleteModule(module.id)}
                      className="text-xs font-bold text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div className="p-3 space-y-2">
                  {module.lessons.map((lesson) => {
                    const isActive = activeLesson?.id === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-2 rounded-lg border p-2 transition ${
                          isActive
                            ? "border-blue-200 bg-blue-50"
                            : "border-transparent bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <button
                          onClick={async () => {
                            try {
                              await API.post(`/users/open-lesson/${lesson.id}/`);
                            } catch (err) {
                              console.log("open lesson failed", err);
                            }

                            setActiveLesson(lesson);
                          }}
                          className="min-w-0 flex-1 text-left text-sm font-semibold text-slate-700"
                        >
                          <span className="block truncate">
                            {lesson.title}
                          </span>
                        </button>

                        {canManage && (
                          <button
                            onClick={() => deleteLesson(lesson.id)}
                            className="shrink-0 w-8 h-8 rounded-md text-red-600 hover:bg-red-50 font-bold"
                            title="Delete lesson"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {canManage && (
                  <div className="p-3 border-t border-slate-100 bg-slate-50">
                    <input
                      type="text"
                      placeholder="Lesson title"
                      className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 mb-2"
                      onChange={(e) =>
                        setNewLesson({
                          ...newLesson,
                          moduleId: module.id,
                          title: e.target.value,
                        })
                      }
                    />

                    <button
                      onClick={addLesson}
                      className="w-full h-9 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition"
                    >
                      Add Lesson
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          {activeLesson ? (
            <>
              <section className="bg-white rounded-lg border border-slate-200 shadow-sm mb-6 overflow-hidden">
                <div className="px-7 py-5 border-b border-slate-200 bg-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                    Active Lesson
                  </p>

                  {canManage ? (
                    <input
                      value={activeLesson.title}
                      onChange={(e) =>
                        setActiveLesson({
                          ...activeLesson,
                          title: e.target.value,
                        })
                      }
                      className="w-full text-3xl font-extrabold tracking-tight text-slate-950 border-0 border-b border-slate-200 px-0 pb-2 outline-none focus:border-blue-500"
                    />
                  ) : (
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950">
                      {activeLesson.title}
                    </h1>
                  )}
                </div>

                <div className="p-7">
                  {canManage ? (
                    <Field label="Video URL">
                      <input
                        type="text"
                        value={activeLesson.video_url || ""}
                        onChange={(e) =>
                          setActiveLesson({
                            ...activeLesson,
                            video_url: e.target.value,
                          })
                        }
                        placeholder="https://..."
                        className="input"
                      />
                    </Field>
                  ) : (
                    activeLesson.video_url && (
                      <a
                        href={activeLesson.video_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 items-center rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700 transition mb-6"
                      >
                        Watch Video
                      </a>
                    )
                  )}

                  {canManage ? (
                    <Field label="Lesson Content">
                      <textarea
                        rows={10}
                        value={activeLesson.content || ""}
                        onChange={(e) =>
                          setActiveLesson({
                            ...activeLesson,
                            content: e.target.value,
                          })
                        }
                        className="input min-h-[260px] py-3 resize-y"
                      />
                    </Field>
                  ) : (
                    <p className="text-slate-700 whitespace-pre-line text-base leading-8 mb-6">
                      {activeLesson.content}
                    </p>
                  )}

                  {canManage ? (
                    <Field label="Resources">
                      <textarea
                        rows={4}
                        value={activeLesson.resources || ""}
                        onChange={(e) =>
                          setActiveLesson({
                            ...activeLesson,
                            resources: e.target.value,
                          })
                        }
                        placeholder="Add links, notes, or files"
                        className="input min-h-[120px] py-3 resize-y"
                      />
                    </Field>
                  ) : (
                    activeLesson.resources && (
                      <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 mb-6">
                        <h3 className="font-extrabold text-slate-900 mb-2">
                          Resources
                        </h3>

                        <p className="text-slate-700 whitespace-pre-line">
                          {activeLesson.resources}
                        </p>
                      </div>
                    )
                  )}

                  {canManage && (
                    <button
                      onClick={saveLesson}
                      className="h-11 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h2 className="text-xl font-extrabold text-slate-950">
                    Announcements
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Course updates and instructor notes
                  </p>
                </div>

                <div className="p-6">
                  {canManage && (
                    <div className="mb-6">
                      <textarea
                        rows={3}
                        placeholder="Write announcement..."
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="input min-h-[110px] py-3 resize-y mb-3"
                      />

                      <button
                        onClick={postAnnouncement}
                        className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700 transition"
                      >
                        Post Announcement
                      </button>
                    </div>
                  )}

                  <div className="space-y-3">
                    {announcements.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-slate-200 p-4"
                      >
                        <p className="font-bold text-blue-700 mb-1">
                          {item.author_name}
                        </p>

                        <p className="text-slate-700">
                          {item.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="min-h-[420px] rounded-lg border border-dashed border-slate-300 bg-white flex items-center justify-center">
              <p className="text-sm font-semibold text-slate-500">
                Select a lesson to begin.
              </p>
            </div>
          )}
        </div>
        
      </main>

      <style>{`
        .input {
          width: 100%;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          padding-left: 12px;
          padding-right: 12px;
          min-height: 44px;
          font-size: 14px;
          color: #0f172a;
          outline: none;
        }

        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, .12);
        }
      `}</style>
    </div>
    </ScreenProtection>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-5">
      <span className="block text-sm font-bold text-slate-700 mb-2">
        {label}
      </span>

      {children}
    </label>
    
    
    
  );
}
