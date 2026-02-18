import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import HomeEditor from "./editors/HomeEditor";
import AboutEditor from "./editors/AboutEditor";
import EventHighlightEditor from "./editors/EventHighlightEditor";
import EventsGridEditor from "./editors/EventsGridEditor";
import SermonsEditor from "./editors/SermonsEditor";
import VerseEditor from "./editors/VerseEditor";
import FooterEditor from "./editors/FooterEditor";
import AboutPageEditor from "./editors/AboutPageEditor";
import ContactPageEditor from "./editors/ContactPageEditor";
import SermonsPageEditor from "./editors/SermonsPageEditor";
import EventsPageEditor from "./editors/EventsPageEditor";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#090e1c" }}
      >
        <div className="text-yellow-400/60 text-sm">Loading…</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        {/* Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin area */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="home" element={<HomeEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="event-highlight" element={<EventHighlightEditor />} />
          <Route path="events-grid" element={<EventsGridEditor />} />
          <Route path="sermons" element={<SermonsEditor />} />
          <Route path="verse" element={<VerseEditor />} />
          <Route path="footer" element={<FooterEditor />} />
          <Route path="about-page" element={<AboutPageEditor />} />
          <Route path="contact-page" element={<ContactPageEditor />} />
          <Route path="sermons-page" element={<SermonsPageEditor />} />
          <Route path="events-page" element={<EventsPageEditor />} />
        </Route>

        {/* Catch-all admin redirect */}
        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
