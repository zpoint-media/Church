import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const navItems = [
  { path: "/admin/dashboard",      label: "Dashboard",        icon: "⊞", group: "overview" },
  // ── Homepage sections ──
  { path: "/admin/home",           label: "Home Hero",        icon: "🏠", group: "home" },
  { path: "/admin/about",          label: "About Section",    icon: "ℹ",  group: "home" },
  { path: "/admin/event-highlight",label: "Event Highlight",  icon: "📅", group: "home" },
  { path: "/admin/events-grid",    label: "Events Grid",      icon: "🗓", group: "home" },
  { path: "/admin/sermons",        label: "Sermons Cards",    icon: "📖", group: "home" },
  { path: "/admin/verse",          label: "Verse Section",    icon: "✝",  group: "home" },
  { path: "/admin/footer",         label: "Footer",           icon: "▭",  group: "home" },
  // ── Separate pages ──
  { path: "/admin/about-page",     label: "About Page",       icon: "📄", group: "pages" },
  { path: "/admin/sermons-page",   label: "Sermons Page",     icon: "🎙", group: "pages" },
  { path: "/admin/events-page",    label: "Events Page",      icon: "🎉", group: "pages" },
  { path: "/admin/contact-page",   label: "Contact Page",     icon: "✉️", group: "pages" },
];

const GROUP_LABELS = {
  overview: null,
  home:  "HOMEPAGE",
  pages: "INNER PAGES",
};

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // desktop: collapsed icon-only rail
  const [collapsed, setCollapsed] = useState(false);
  // mobile: full overlay drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const overlayRef = useRef(null);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function handleLogout() {
    signOut();
    navigate("/admin/login");
  }

  /* ── Sidebar content (shared between desktop & mobile) ── */
  function SidebarContent({ onClose }) {
    const groups = [...new Set(navItems.map(i => i.group))];

    return (
      <div className="flex flex-col h-full">
        {/* Logo / header */}
        <div className="flex items-center gap-3 px-5 h-16 border-b flex-shrink-0"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#b8860b,#daa520)", color: "#0a0f1e" }}>
            ✝
          </div>
          {(!collapsed || onClose) && (
            <div className="flex-1 min-w-0">
              <p className="text-white/90 font-semibold text-sm leading-none">CMS</p>
              <p className="text-white/30 text-xs mt-0.5">Mafoluku Parish</p>
            </div>
          )}
          {/* Close button on mobile */}
          {onClose && (
            <button onClick={onClose}
              className="ml-auto w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition text-xl font-light">
              ✕
            </button>
          )}
          {/* Collapse toggle on desktop */}
          {!onClose && (
            <button onClick={() => setCollapsed(!collapsed)}
              className="ml-auto w-9 h-9 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition font-bold"
              style={{ fontSize: "22px", lineHeight: 1 }}>
              {collapsed ? "›" : "‹"}
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-thin">
          {groups.map((group) => {
            const items = navItems.filter(i => i.group === group);
            const label = GROUP_LABELS[group];
            return (
              <div key={group}>
                {label && !collapsed && (
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest px-3 pt-4 pb-1.5">
                    {label}
                  </p>
                )}
                {items.map((item) => (
                  <NavLink key={item.path} to={item.path}
                    title={collapsed && !onClose ? item.label : ""}
                    className={({ isActive }) =>
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all " +
                      (isActive
                        ? "bg-yellow-500/15 text-yellow-400"
                        : "text-white/45 hover:text-white/90 hover:bg-white/6")
                    }
                  >
                    <span className="text-base flex-shrink-0 w-5 text-center">{item.icon}</span>
                    {(!collapsed || onClose) && <span className="truncate">{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="p-3 border-t flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {(!collapsed || onClose) && (
            <div className="px-3 py-2 mb-1">
              <p className="text-white/70 text-xs font-semibold truncate">{user?.name || "Admin"}</p>
              <p className="text-white/30 text-xs truncate mt-0.5">{user?.email}</p>
            </div>
          )}
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition mb-1">
            <span className="text-base flex-shrink-0 w-5 text-center">↗</span>
            {(!collapsed || onClose) && <span>View Live Site</span>}
          </a>
          <button onClick={handleLogout} title={collapsed && !onClose ? "Sign Out" : ""}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-500/10 transition">
            <span className="text-base flex-shrink-0 w-5 text-center">⏻</span>
            {(!collapsed || onClose) && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#090e1c", color: "white", fontFamily: "system-ui,sans-serif" }}>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col flex-shrink-0 transition-all duration-300"
        style={{
          width: collapsed ? "68px" : "248px",
          background: "rgba(255,255,255,0.03)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}>
        <SidebarContent />
      </aside>

      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)} />
          {/* Drawer */}
          <aside className="absolute top-0 left-0 h-full w-72 flex flex-col"
            style={{ background: "#0d1528", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 min-w-0 overflow-auto flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-40 h-14 flex items-center justify-between px-4 md:px-6 border-b"
          style={{ background: "rgba(9,14,28,0.97)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.06)" }}>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition mr-2">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="17" y2="6"/>
              <line x1="3" y1="12" x2="17" y2="12"/>
              <line x1="3" y1="18" x2="17" y2="18"/>
            </svg>
          </button>

          {/* Page title on mobile */}
          <p className="lg:hidden text-white/70 text-sm font-medium flex-1">Admin Panel</p>

          {/* Desktop: breadcrumb / current page */}
          <p className="hidden lg:block text-white/40 text-sm">
            {navItems.find(n => location.pathname === n.path)?.label || "Dashboard"}
          </p>

          {/* Right: status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" title="Server connected" />
            <span className="text-white/30 text-xs hidden sm:block">Connected</span>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
