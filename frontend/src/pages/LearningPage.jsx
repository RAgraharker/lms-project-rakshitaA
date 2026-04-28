import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function LearningPage() {

  const { id } = useParams();

  const role =
    localStorage.getItem("role");

  const [modules, setModules] =
    useState([]);

  const [activeLesson, setActiveLesson] =
    useState(null);

  const [announcements, setAnnouncements] =
    useState([]);

  const [progress, setProgress] =
    useState(0);

  const [newModule, setNewModule] =
    useState("");

  const [newLesson, setNewLesson] =
    useState({
      moduleId: "",
      title: "",
      content: "",
      video_url: "",
      resources: "",
    });

  const [announcementText, setAnnouncementText] =
    useState("");

  useEffect(() => {

    fetchStructure();

    fetchAnnouncements();

  }, []);

  const fetchStructure = async () => {

    try {

      const res = await API.get(
        `/users/course-structure/${id}/`
      );

      setModules(res.data);

      if (
        res.data.length > 0 &&
        res.data[0].lessons.length > 0
      ) {

        setActiveLesson(
          res.data[0].lessons[0]
        );
      }

    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnnouncements = async () => {

    try {

      const res = await API.get(
        `/users/announcements/${id}/`
      );

      setAnnouncements(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const completeLesson = async () => {

    try {

      const res = await API.post(
        `/users/complete-lesson/${activeLesson.id}/`
      );

      setProgress(res.data.progress);

      alert("Lesson completed");

    } catch (err) {
      console.log(err);
    }
  };

  // =========================================
  // ADD MODULE
  // =========================================

  const addModule = async () => {

    if (!newModule) return;

    try {

      await API.post(
        "/users/add-module/",
        {
          course: id,
          title: newModule,
        }
      );

      setNewModule("");

      fetchStructure();

    } catch (err) {
      console.log(err);
    }
  };

  // =========================================
  // ADD LESSON
  // =========================================

  const addLesson = async () => {

    try {

      await API.post(
        "/users/add-lesson/",
        {
          module: newLesson.moduleId,
          title: newLesson.title,
          content: newLesson.content,
          video_url: newLesson.video_url,
          resources: newLesson.resources,
        }
      );

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

  // =========================================
  // SAVE LESSON
  // =========================================

  const saveLesson = async () => {

    try {

      await API.put(
        `/users/update-lesson/${activeLesson.id}/`,
        activeLesson
      );

      alert("Lesson updated");

      fetchStructure();

    } catch (err) {
      console.log(err);
    }
  };

  // =========================================
  // POST ANNOUNCEMENT
  // =========================================

  const postAnnouncement = async () => {

    try {

      await API.post(
        "/users/add-announcement/",
        {
          course: id,
          message: announcementText,
        }
      );

      setAnnouncementText("");

      fetchAnnouncements();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8e1] flex">

      {/* SIDEBAR */}
      <div className="w-[320px] bg-white border-r border-gray-200 p-5 overflow-y-auto">

        <h2 className="text-2xl font-bold mb-6 text-[#5c3d00]">
          Modules
        </h2>

        {/* ADD MODULE */}
        {(role === "instructor" ||
          role === "super_admin") && (

          <div className="mb-6">

            <input
              type="text"
              placeholder="New module"
              value={newModule}
              onChange={(e) =>
                setNewModule(e.target.value)
              }
              className="w-full border p-3 rounded-xl mb-3"
            />

            <button
              onClick={addModule}
              className="w-full bg-[#d4a017] text-white py-3 rounded-xl"
            >
              + Add Module
            </button>
          </div>
        )}

        <div className="space-y-6">

          {modules.map((module) => (

            <div key={module.id}>

              <h3 className="font-bold text-lg mb-3 text-[#d4a017]">
                📁 {module.title}
              </h3>

              {/* LESSONS */}
              <div className="space-y-2 ml-2">

                {module.lessons.map((lesson) => (

                  <button
                    key={lesson.id}
                    onClick={() =>
                      setActiveLesson(lesson)
                    }
                    className="block text-left w-full bg-[#fff8e1] hover:bg-[#f4e1a1] p-3 rounded-xl"
                  >
                    ▶ {lesson.title}
                  </button>
                ))}
              </div>

              {/* ADD LESSON */}
              {(role === "instructor" ||
                role === "super_admin") && (

                <div className="mt-4 border-t pt-4">

                  <input
                    type="text"
                    placeholder="Lesson title"
                    className="w-full border p-2 rounded-lg mb-2"
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
                    className="w-full bg-[#5c3d00] text-white py-2 rounded-lg"
                  >
                    + Add Lesson
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">

        {activeLesson && (

          <>
            {/* LESSON VIEW */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">

              {/* EDITABLE TITLE */}
              {(role === "instructor" ||
                role === "super_admin") ? (

                <input
                  value={activeLesson.title}
                  onChange={(e) =>
                    setActiveLesson({
                      ...activeLesson,
                      title: e.target.value,
                    })
                  }
                  className="text-4xl font-bold w-full mb-5 border-b pb-2"
                />

              ) : (

                <h1 className="text-4xl font-bold text-[#5c3d00] mb-5">
                  {activeLesson.title}
                </h1>
              )}

              {/* VIDEO URL */}
              {(role === "instructor" ||
                role === "super_admin") ? (

                <input
                  type="text"
                  value={activeLesson.video_url || ""}
                  onChange={(e) =>
                    setActiveLesson({
                      ...activeLesson,
                      video_url: e.target.value,
                    })
                  }
                  placeholder="Video URL"
                  className="w-full border p-3 rounded-xl mb-5"
                />

              ) : (

                activeLesson.video_url && (
                  <a
                    href={activeLesson.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-[#5c3d00] text-white px-6 py-3 rounded-xl mb-6"
                  >
                    ▶ Watch Video
                  </a>
                )
              )}

              {/* CONTENT */}
              {(role === "instructor" ||
                role === "super_admin") ? (

                <textarea
                  rows={10}
                  value={activeLesson.content || ""}
                  onChange={(e) =>
                    setActiveLesson({
                      ...activeLesson,
                      content: e.target.value,
                    })
                  }
                  className="w-full border p-4 rounded-xl mb-6"
                />

              ) : (

                <p className="text-gray-700 whitespace-pre-line text-lg leading-8 mb-6">
                  {activeLesson.content}
                </p>
              )}

              {/* RESOURCES */}
              {(role === "instructor" ||
                role === "super_admin") ? (

                <textarea
                  rows={4}
                  value={activeLesson.resources || ""}
                  onChange={(e) =>
                    setActiveLesson({
                      ...activeLesson,
                      resources: e.target.value,
                    })
                  }
                  placeholder="Resources"
                  className="w-full border p-4 rounded-xl mb-6"
                />

              ) : (

                activeLesson.resources && (
                  <div className="bg-[#fff8e1] p-5 rounded-xl mb-6">

                    <h3 className="font-bold mb-2">
                      Resources
                    </h3>

                    <p>
                      {activeLesson.resources}
                    </p>
                  </div>
                )
              )}

              {/* SAVE */}
              {(role === "instructor" ||
                role === "super_admin") && (

                <button
                  onClick={saveLesson}
                  className="bg-[#d4a017] text-white px-6 py-3 rounded-xl mr-4"
                >
                  Save Changes
                </button>
              )}

              {/* COMPLETE */}
              {role === "student" && (

                <button
                  onClick={completeLesson}
                  className="bg-[#5c3d00] text-white px-6 py-3 rounded-xl"
                >
                  Mark as Complete
                </button>
              )}
            </div>

            {/* PROGRESS */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">

              <h2 className="text-2xl font-bold mb-4 text-[#5c3d00]">
                Progress
              </h2>

              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">

                <div
                  className="bg-[#d4a017] h-full"
                  style={{
                    width: `${progress}%`
                  }}
                />
              </div>

              <p className="mt-3 text-lg font-semibold">
                {progress}% Completed
              </p>
            </div>

            {/* ANNOUNCEMENTS */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">

              <h2 className="text-2xl font-bold mb-6 text-[#5c3d00]">
                📢 Announcements
              </h2>

              {/* POST */}
              {(role === "instructor" ||
                role === "super_admin") && (

                <div className="mb-6">

                  <textarea
                    rows={3}
                    placeholder="Write announcement..."
                    value={announcementText}
                    onChange={(e) =>
                      setAnnouncementText(
                        e.target.value
                      )
                    }
                    className="w-full border p-4 rounded-xl mb-3"
                  />

                  <button
                    onClick={postAnnouncement}
                    className="bg-[#d4a017] text-white px-6 py-3 rounded-xl"
                  >
                    Post Announcement
                  </button>
                </div>
              )}

              <div className="space-y-4">

                {announcements.map((item) => (

                  <div
                    key={item.id}
                    className="border rounded-xl p-4"
                  >
                    <p className="font-semibold text-[#d4a017] mb-2">
                      {item.author_name}
                    </p>

                    <p className="text-gray-700">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}