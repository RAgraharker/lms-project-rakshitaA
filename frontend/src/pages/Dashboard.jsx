import { useEffect, useState } from "react";
import API from "../services/api";
import AnalyticsCards from "../components/AnalyticsCards";
import CourseFormModal from "../components/CourseFormModal";
import { useNavigate } from "react-router-dom";

const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #f6f8fb;
    --panel: #ffffff;
    --panel-soft: #f1f5f9;
    --text: #111827;
    --muted: #64748b;
    --line: #dbe3ee;
    --brand: #2563eb;
    --brand-dark: #1d4ed8;
    --green: #059669;
    --red: #dc2626;
    --violet: #7c3aed;
    --amber: #d97706;
    --radius: 8px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
  }

  button {
    font-family: inherit;
  }

  .shell {
    min-height: 100vh;
    background:
      linear-gradient(180deg, #eef4ff 0, rgba(246,248,251,0) 280px),
      var(--bg);
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 50;
    height: 68px;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255,255,255,.88);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--line);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand-mark {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #fff;
    border: 1px solid var(--line);
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .brand-mark img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .brand-title {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .brand-title strong {
    font-size: 16px;
    letter-spacing: -.01em;
  }

  .brand-title span {
    font-size: 12px;
    color: var(--muted);
    font-weight: 500;
  }

  .user-pill {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 7px 12px 7px 8px;
    border: 1px solid var(--line);
    background: var(--panel);
    border-radius: 999px;
  }

  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--brand);
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 12px;
    font-weight: 800;
  }

  .page {
    max-width: 1240px;
    margin: 0 auto;
    padding: 34px 28px 72px;
  }

  .hero {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    margin-bottom: 28px;
  }

  .eyebrow {
    margin: 0 0 8px;
    color: var(--brand);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(30px, 4vw, 46px);
    line-height: 1.04;
    letter-spacing: -.04em;
  }

  .subtitle {
    max-width: 590px;
    margin: 12px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.6;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .segmented {
    display: flex;
    padding: 4px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: var(--panel);
  }

  .icon-tab {
    width: 38px;
    height: 34px;
    border: 0;
    border-radius: 7px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
  }

  .icon-tab.active {
    background: var(--brand);
    color: #fff;
  }

  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
    gap: 18px;
    margin-top: 26px;
  }

  .course-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 26px;
  }

  .course-card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    box-shadow: 0 16px 36px rgba(15, 23, 42, .06);
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
  }

  .course-card:hover {
    transform: translateY(-2px);
    border-color: #b8c7dd;
    box-shadow: 0 20px 44px rgba(15, 23, 42, .1);
  }

  .course-head {
    height: 92px;
    padding: 18px;
    color: #fff;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .course-code {
    padding: 5px 8px;
    border-radius: 999px;
    background: rgba(255,255,255,.18);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .08em;
  }

  .course-body {
    padding: 18px;
  }

  .course-title {
    margin: 0 0 8px;
    font-size: 18px;
    line-height: 1.28;
    letter-spacing: -.02em;
  }

  .course-desc {
    margin: 0;
    min-height: 62px;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .course-actions {
    display: flex;
    gap: 8px;
    margin-top: 18px;
  }

  .list-card {
    display: grid;
    grid-template-columns: 10px 1fr auto;
    align-items: center;
    overflow: hidden;
  }

  .list-accent {
    width: 10px;
    align-self: stretch;
  }

  .list-content {
    padding: 18px 20px;
    min-width: 0;
  }

  .list-content h2 {
    margin: 0 0 5px;
    font-size: 16px;
    letter-spacing: -.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list-content p {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list-actions {
    display: flex;
    gap: 8px;
    padding: 0 18px 0 0;
  }

  .fade-up {
    animation: fadeUp .35s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .loader {
    width: 36px;
    height: 36px;
    margin: 0 auto;
    border: 3px solid var(--line);
    border-top-color: var(--brand);
    border-radius: 50%;
    animation: spin .8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 760px) {
    .topbar {
      padding: 0 16px;
    }

    .page {
      padding: 26px 16px 52px;
    }

    .hero {
      align-items: flex-start;
      flex-direction: column;
    }

    .toolbar {
      justify-content: flex-start;
    }

    .list-card {
      grid-template-columns: 8px 1fr;
    }

    .list-actions {
      grid-column: 2;
      padding: 0 16px 16px;
      flex-wrap: wrap;
    }
  }
`;

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await API.get("courses/");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const filtered = courses;

  return (
    <>
      <style>{GLOBAL_STYLE}</style>

      <div className="shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">
              <img src="/logo.png" alt="AstraKalam" />
            </div>
            <div className="brand-title">
              <strong>AstraKalam</strong>
              <span>Learning Management System</span>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="user-pill">
              <div className="avatar">{role?.[0]?.toUpperCase()}</div>
              <span style={{ fontSize: 13, fontWeight: 600, textTransform: "capitalize" }}>
                {role}
              </span>
            </div>

            <ActionBtn onClick={handleLogout}>Sign out</ActionBtn>
          </div>
        </header>

        <main className="page">
          <section className="hero">
            <div>
              <p className="eyebrow">My Learning</p>
              <h1>Your course workspace</h1>
              <p className="subtitle">
                Browse, manage, and continue courses from a focused dashboard built for everyday learning.
              </p>
            </div>

            <div className="toolbar">
              <div className="segmented" aria-label="Change course layout">
                {["grid", "list"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`icon-tab ${view === v ? "active" : ""}`}
                    title={v === "grid" ? "Grid view" : "List view"}
                  >
                    {v === "grid" ? <GridIcon2 /> : <ListIcon />}
                  </button>
                ))}
              </div>
              <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.06] grid place-items-center">
        <div className="-rotate-12 text-6xl font-black text-slate-900">
          AstraKalam LMS
        </div>
      </div>

              {(role === "instructor" || role === "super_admin") && (
                <ActionBtn onClick={() => navigate("/analytics")} variant="outline">
                  Analytics
                </ActionBtn>
              )}

              {role === "super_admin" && (
                <ActionBtn onClick={() => navigate("/admin-users")} variant="dark">
                  Manage Users
                </ActionBtn>
              )}

              {(role === "instructor" || role === "super_admin") && (
                <ActionBtn
                  onClick={() => {
                    setEditCourse(null);
                    setShowAddModal(true);
                  }}
                  variant="primary"
                >
                  Add Course
                </ActionBtn>
              )}
            </div>
          </section>

          <AnalyticsCards courses={courses} />

          {loading && (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <div className="loader" />
              <p style={{ color: "var(--muted)", marginTop: 16, fontSize: 14 }}>
                Loading courses...
              </p>
            </div>
          )}

          {error && (
            <p style={{ textAlign: "center", color: "var(--red)", padding: "3rem 0", fontSize: 15 }}>
              {error}
            </p>
          )}

          {!loading && (
            <div className={view === "grid" ? "course-grid" : "course-list"}>
              {filtered.map((course, i) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  view={view}
                  role={role}
                  index={i}
                  setEditCourse={setEditCourse}
                  onContinue={() => navigate(`/learning/${course.id}`)}
                  refresh={fetchCourses}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {(showAddModal || editCourse) && (
        <CourseFormModal
          onClose={() => {
            setShowAddModal(false);
            setEditCourse(null);
          }}
          course={editCourse}
          refresh={fetchCourses}
        />
      )}
    </>
  );
}

function CourseCard({ course, view, role, index, setEditCourse, onContinue, refresh }) {
  const handleEnroll = async () => {
    try {
      await API.post(`/users/enroll/${course.id}/`);
      alert("Enrolled successfully");
      await refresh();
    } catch (err) {
      console.log(err);
      alert("Enrollment failed");
    }
  };

  const isInstructor = role === "instructor" || role === "super_admin";
  const accents = ["#2563eb", "#059669", "#7c3aed", "#d97706", "#dc2626"];
  const accent = accents[index % accents.length];

  const deleteCourse = async () => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await API.delete(`/users/delete-course/${course.id}/`);
      await refresh();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  if (view === "list") {
    return (
      <div className="course-card list-card fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
        <div className="list-accent" style={{ background: accent }} />

        <div className="list-content">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>

        <div className="list-actions">
          {role === "student" && !course.is_enrolled ? (
            <SmBtn onClick={handleEnroll} color="var(--green)">Enroll</SmBtn>
          ) : (
            <SmBtn onClick={onContinue} color={accent}>Continue</SmBtn>
          )}

          {isInstructor && (
            <SmBtn onClick={() => setEditCourse(course)} color="var(--muted)" outline>
              Edit
            </SmBtn>
          )}

          {isInstructor && (
            <SmBtn onClick={deleteCourse} color="var(--red)" outline>
              Delete
            </SmBtn>
          )}
        </div>
      </div>
    );
  }
     
  return (
    <div className="course-card fade-up" style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="course-head" style={{ background: accent }}>
        <span className="course-code">COURSE</span>
      </div>

      <div className="course-body">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-desc">{course.description}</p>

        <div className="course-actions">
          {role === "student" && !course.is_enrolled ? (
            <PrimaryBtn onClick={handleEnroll} color="var(--green)">Enroll</PrimaryBtn>
          ) : (
            <PrimaryBtn onClick={onContinue} color={accent}>Continue</PrimaryBtn>
          )}

          {isInstructor && (
            <SecondaryBtn onClick={() => setEditCourse(course)}>Edit</SecondaryBtn>
          )}

          {isInstructor && (
            <DangerBtn onClick={deleteCourse}>Delete</DangerBtn>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ children, onClick, variant = "outline" }) {
  const styles = {
    primary: { background: "var(--brand)", color: "#fff", border: "1px solid var(--brand)" },
    dark: { background: "var(--text)", color: "#fff", border: "1px solid var(--text)" },
    outline: { background: "var(--panel)", color: "var(--text)", border: "1px solid var(--line)" },
  };

  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 38,
        padding: "0 16px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
}

function PrimaryBtn({ children, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        minHeight: 40,
        padding: "0 14px",
        borderRadius: 8,
        border: "none",
        background: color,
        color: "#fff",
        fontSize: 13,
        fontWeight: 800,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 40,
        padding: "0 14px",
        borderRadius: 8,
        border: "1px solid var(--line)",
        background: "#fff",
        color: "var(--text)",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function DangerBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 40,
        padding: "0 14px",
        borderRadius: 8,
        border: "1px solid rgba(220,38,38,.25)",
        background: "#fff",
        color: "var(--red)",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function SmBtn({ children, onClick, color, outline }) {
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 34,
        padding: "0 12px",
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer",
        background: outline ? "#fff" : color,
        color: outline ? color : "#fff",
        border: `1px solid ${outline ? color : "transparent"}`,
        fontWeight: 700,
      }}
    >
      {children}
    </button>
  );
}

function GridIcon2() {
  return <span>⊞</span>;
}

function ListIcon() {
  return <span>☰</span>;
}
