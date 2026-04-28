import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import CourseModal from "./components/CourseModal";
import AnalyticsPage from "./pages/AnalyticsPage";
import LearningPage from "./pages/LearningPage";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminUsers from './pages/AdminUsers';

// ✅ Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>

  <Route path="/" element={<Login />} />
<Route
  path="/learning/:id"
  element={<LearningPage />}
/>
  <Route
    path="/analytics"
    element={<AnalyticsPage />}
  />
<Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route
  path="/reset-password/:uid/:token"
  element={<ResetPassword />}
/>

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
<Route
  path="/admin-users"
  element={<AdminUsers />}
/>

  <Route
    path="/course/:id"
    element={<CoursePage />}
  />

  <Route
    path="*"
    element={<Navigate to="/" />}
  />

</Routes>
    </Router>
  );
}

export default App;