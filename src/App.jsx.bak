import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Layout from "./layout/Layout";
import Event from "./pages/Events";
import About from "./components/About";
import Footer from "./pages/Footer";
import Event2 from "./components/Event";
import Gallerymain from "./components/Gallery";
import Sermonmain from "./components/Sermons";
import Contactmain from "./components/Contact";
import AdminApp from "./admin/AdminApp";

function PublicSite() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/About" element={<About />} />
        <Route path="/event" element={<Event2 />} />
        <Route path="/Gallery" element={<Gallerymain />} />
        <Route path="/Sermon" element={<Sermonmain />} />
        <Route path="Contact" element={<Contactmain />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return <AdminApp />;
  }

  return <PublicSite />;
}

export default App;
