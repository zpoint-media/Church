import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useContent } from "../hooks/useContent";

const FALLBACK_SLIDES = [
  {
    subtitle: "Christ Holycross ✝",
    title: "YOUR CHURCH\nIS YOUR HOUSE",
    text: "We come to serving & believing God's Word and Spirit.",
    primaryBtn: "Contact Us",
    primaryLink: "/Contact",
    secondaryBtn: "About Us",
    secondaryLink: "/About",
  },
  {
    subtitle: "Faith • Hope • Love",
    title: "GROW IN FAITH\nWALK IN TRUTH",
    text: "A place where the Word is alive and lives are transformed.",
    primaryBtn: "Join Us",
    primaryLink: "/event",
    secondaryBtn: "Sermons",
    secondaryLink: "/Sermon",
  },
  {
    subtitle: "Welcome Home",
    title: "A FAMILY\nBUILT ON CHRIST",
    text: "Experience worship, love, and spiritual growth together.",
    primaryBtn: "Visit Us",
    primaryLink: "/Contact",
    secondaryBtn: "About Us",
    secondaryLink: "/About",
  },
];

export default function HeroSlider() {
  const { data } = useContent("home", { slides: FALLBACK_SLIDES });
  const slides = data?.slides?.length ? data.slides : FALLBACK_SLIDES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      6500
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <div className="relative z-10 max-w-[1400px] mx-auto h-full px-6">
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="lg:ml-25 lg:mt-15 text-center lg:text-left text-white space-y-5">
                <p className="font-serif text-sm tracking-widest uppercase opacity-90">{slide.subtitle}</p>
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold leading-tight whitespace-pre-line">{slide.title}</h1>
                <p className="text-sm md:text-base opacity-90 leading-relaxed">{slide.text}</p>
                <div className="flex justify-center lg:justify-start gap-4 pt-6">
                   <NavLink to={slide.primaryLink || "/Contact"} className="px-8 py-3 rounded-full bg-[#003F8C] text-white text-sm font-semibold hover:bg-[#0052B4] transition">
                    {slide.primaryBtn || "Contact Us"}
                   </NavLink>
                   <NavLink to={slide.secondaryLink || "/About"} className="px-8 py-3 rounded-full border border-white/50 text-white text-sm hover:bg-white hover:text-[#003F8C] transition">
  {slide.secondaryBtn || "About Us"}
                   </NavLink>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-[3px] w-10 transition-all ${i === index ? "bg-white" : "bg-white/30"}`} />
        ))}
      </div>
    </section>
  );
}
