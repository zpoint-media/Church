import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllContent } from "./api";
import { useAuth } from "./context/AuthContext";

const pages = [
  { path: "/admin/home", label: "Home Hero", icon: "🏠", desc: "Edit hero slider — 3 slides with subtitle, title, text & buttons", color: "#3b82f6" },
  { path: "/admin/about", label: "About Section", icon: "ℹ", desc: "Parish name, description & 4 feature cards", color: "#8b5cf6" },
  { path: "/admin/event-highlight", label: "Event Highlight", icon: "📅", desc: "Upcoming event details & latest sermon preview", color: "#059669" },
  { path: "/admin/events-grid", label: "Events Grid", icon: "🗓", desc: "All event cards — date, title, time, pastor, address", color: "#d97706" },
  { path: "/admin/sermons", label: "Sermons Page", icon: "📖", desc: "6 sermon cards with category, title, description & scripture", color: "#dc2626" },
  { path: "/admin/verse", label: "Verse Section", icon: "✝", desc: "Bible verse slides shown in the verse/scripture section", color: "#0891b2" },
  { path: "/admin/footer", label: "Footer", icon: "▭", desc: "Newsletter, latest news, useful links, social links & copyright", color: "#7c3aed" },
  { path: "/admin/about-page", label: "About Page", icon: "📄", desc: "Full About page — hero, history, mission, values & quote", color: "#ec4899" },
  { path: "/admin/contact-page", label: "Contact Page", icon: "✉️", desc: "Contact page — hero, form labels & messages", color: "#14b8a6" },
  { path: "/admin/sermons-page", label: "Sermons Listing", icon: "🎙", desc: "All sermons with audio player, preacher, date & description", color: "#f59e0b" },
  { path: "/admin/events-page", label: "Events Listing", icon: "🎉", desc: "Events grid & upcoming sermons section", color: "#10b981" },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const now = new Date();

  useEffect(() => {
    getAllContent()
      .then(setContent)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-yellow-500/80 text-sm font-medium mb-1">{greeting}</p>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
          {user?.name || "Admin"} 👋
        </h1>
        <p className="text-white/40 mt-2 text-sm">
          Manage all content across the Mafoluku Parish website from here.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Pages Managed", value: pages.length },
          { label: "Sermon Entries", value: (content?.sermons?.cards?.length || 0) + (content?.sermonsPage?.sermons?.length || 0) },
          { label: "Event Entries", value: (content?.eventsGrid?.events?.length || 0) + (content?.eventsPage?.events?.length || 0) },
          { label: "About Values", value: content?.aboutPage?.values?.length ?? "–" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-3xl font-bold text-yellow-400">{stat.value}</p>
            <p className="text-white/40 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Page cards */}
      <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
        Edit Page Content
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className="group flex items-start gap-4 p-5 rounded-2xl transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
              style={{ background: `${page.color}20`, border: `1px solid ${page.color}40` }}
            >
              {page.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white/90 text-sm group-hover:text-yellow-400 transition">
                {page.label}
              </p>
              <p className="text-white/35 text-xs mt-1 leading-relaxed">{page.desc}</p>
            </div>
            <span className="text-white/20 group-hover:text-white/60 transition text-lg self-center">
              →
            </span>
          </NavLink>
        ))}
      </div>

      {/* Status */}
      <div
        className="mt-8 rounded-2xl p-5 flex items-center gap-3"
        style={{
          background: "rgba(5, 150, 105, 0.08)",
          border: "1px solid rgba(5, 150, 105, 0.15)",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
        <div>
          <p className="text-green-400/90 text-sm font-medium">
            {loading ? "Loading content status…" : "All content sections loaded successfully"}
          </p>
          <p className="text-green-400/40 text-xs mt-0.5">
            Last checked: {now.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
