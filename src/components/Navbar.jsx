import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiShare2, FiMenu, FiX, FiChevronRight, FiSettings } from "react-icons/fi";

export default function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showBlurBg, setShowBlurBg] = useState(false);

  const desktopSidebarRef = useRef(null);
  const mobileSidebarRef = useRef(null);
  const touchStartX = useRef(0);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const routeMenu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Event", path: "/event" },
    { name: "Gallery", path: "/gallery" },
    { name: "Sermons", path: "/Sermon" },
    { name: "Contact", path: "/Contact" },
  ];

  const sidebarMenu = [
    { label: "Home", target: "home" },
    { label: "About", target: "about" },
    { label: "Event", target: "events" },
    { label: "Verse", target: "verse" },
    { label: "Gallery", target: "gallery" },
    { label: "Sermons", target: "sermons" },
    { label: "Contact", target: "contact" },
  ];

  const socialIcons = [
    { name: "facebook-f", href: "#" },
    { name: "instagram", href: "#" },
    { name: "whatsapp", href: "#" },
    { name: "youtube", href: "#" },
  ];

  useEffect(() => {
    const onScroll = () => setShowBlurBg(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openMobileMenu || openSidebar ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openMobileMenu, openSidebar]);

  useEffect(() => {
    setOpenMobileMenu(false);
    setOpenSidebar(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (openSidebar && desktopSidebarRef.current && !desktopSidebarRef.current.contains(e.target)) {
        setOpenSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openSidebar]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - touchStartX.current;
    if (deltaX < -80) setOpenMobileMenu(false);
  };

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpenSidebar(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* BLUR BG */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${showBlurBg ? "opacity-100 backdrop-blur-lg bg-white/20" : "opacity-0"}`} />

      {/* NAV BAR */}
      <div className="relative max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
        {/* LOGO */}
        <NavLink to="/">
          <img src="/Logo.png" alt="Mafoluku Model Parish 1" className="h-25" />
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex gap-10 font-serif text-[17px]">
          {routeMenu.map((item) => (
            <NavLink key={item.name} to={item.path}
              className={({ isActive }) =>
                `relative pb-2 transition-all ${isActive ? "text-black after:w-8" : "text-black hover:text-[#003F8C] after:w-0 hover:after:w-8"} after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:bg-[#003F8C] after:-translate-x-1/2 after:transition-all`
              }>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {/* ADMIN BUTTON — desktop */}
          <NavLink to="/admin"
            className="hidden md:inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#003F8C] text-white font-semibold text-sm hover:bg-[#0052B4] transition">
            <FiSettings size={14} />
            ADMIN
          </NavLink>

          {/* SHARE — desktop */}
          <div className="relative hidden md:inline-flex group">
            <button className="text-[#0052B4]"><FiShare2 size={20} /></button>
            <div className="absolute top-10 right-1/2 translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <div className="w-3 h-3 bg-white rotate-45 mx-auto -mb-1 border-l border-t border-gray-200" />
              <div className="bg-white border border-gray-200 rounded-md shadow-lg flex flex-col items-center py-3 px-4 space-y-3">
                {socialIcons.map((icon) => (
                  <a key={icon.name} href={icon.href}><i className={`fab fa-${icon.name}`} /></a>
                ))}
              </div>
            </div>
          </div>

          {/* DESKTOP SIDEBAR TOGGLE — home only */}
          {isHome && (
            <button onClick={() => setOpenSidebar(true)} className="hidden lg:inline-flex text-[#0052B4]">
              <FiMenu size={26} />
            </button>
          )}

          {/* MOBILE HAMBURGER */}
          <button onClick={() => setOpenMobileMenu(true)} className="lg:hidden text-[#0052B4]">
            <FiMenu size={26} />
          </button>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside ref={desktopSidebarRef}
        className={`fixed top-0 right-0 h-full w-80 bg-[#003F8C] transition-transform duration-500 ${openSidebar ? "translate-x-0" : "translate-x-full"}`}>
        <button onClick={() => setOpenSidebar(false)} className="absolute top-6 left-6 text-white">
          <FiX size={30} />
        </button>
        <nav className="flex flex-col h-full items-center justify-center gap-10 text-xl font-serif text-white">
          {sidebarMenu.map((item) => (
            <button key={item.label} onClick={() => scrollToSection(item.target)}>{item.label}</button>
          ))}
        </nav>
      </aside>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-50 lg:hidden ${openMobileMenu ? "visible" : "invisible"}`}>
        <div onClick={() => setOpenMobileMenu(false)}
          className={`absolute inset-0 bg-black/40 ${openMobileMenu ? "opacity-100" : "opacity-0"}`} />

        <aside ref={mobileSidebarRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
          className={`absolute top-0 left-0 h-full w-[85%] max-w-sm bg-white transition-transform duration-500 flex flex-col ${openMobileMenu ? "translate-x-0" : "-translate-x-full"}`}>

          {/* Header */}
          <div className="flex items-center justify-between px-6 h-20 border-b flex-shrink-0">
            <img src="/Logo.png" alt="Mafoluku Parish" className="h-10" />
            <button onClick={() => setOpenMobileMenu(false)}><FiX size={24} /></button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col divide-y flex-1 overflow-y-auto">
            {routeMenu.map((item) => (
              <NavLink key={item.name} to={item.path}
                className="flex justify-between items-center px-6 py-4 text-gray-800 hover:bg-gray-50 transition">
                {item.name}
                <FiChevronRight className="text-gray-400" />
              </NavLink>
            ))}
          </nav>

          {/* ADMIN button in mobile menu */}
          <div className="p-6 border-t flex-shrink-0">
            <NavLink to="/admin" onClick={() => setOpenMobileMenu(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#003F8C] text-white font-semibold text-sm hover:bg-[#0052B4] transition">
              <FiSettings size={15} />
              Admin Panel
            </NavLink>
          </div>
        </aside>
      </div>
    </header>
  );
}
