import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useContent } from "../hooks/useContent";

const FALLBACK_EVENTS = [
  { id: 1, date: "14", month: "May", year: "2025", time: "@ 8 to 11 AM", title: "Sharing Our Faith & Love", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
  { id: 2, date: "15", month: "May", year: "2025", time: "@ 10 to 12 AM", title: "Faith and Fellowship", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
  { id: 3, date: "16", month: "May", year: "2025", time: "@ 9 to 11 AM", title: "Community Outreach", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
  { id: 4, date: "17", month: "May", year: "2025", time: "@ 8 to 10 AM", title: "Youth Gathering", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
  { id: 5, date: "18", month: "May", year: "2025", time: "@ 11 to 1 PM", title: "Bible Study Group", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
  { id: 6, date: "19", month: "May", year: "2025", time: "@ 7 to 9 AM", title: "Prayer Meeting", pastor: "Clinith Luis", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
];

const FALLBACK = { sectionLabel: "Join Our Community", heading: "Upcoming Events", events: FALLBACK_EVENTS };

export default function EventsSection() {
  const { data } = useContent("eventsGrid", FALLBACK);
  const d = { ...FALLBACK, ...data };
  const events = d.events?.length ? d.events : FALLBACK_EVENTS;

  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const pages = [];
  for (let i = 0; i < events.length; i += 6) pages.push(events.slice(i, i + 6));

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % pages.length), 6500);
    return () => clearInterval(timer);
  }, [pages.length]);

  return (
    <section className="max-w-[1200px] mx-auto py-16 md:py-20 px-4 sm:px-6">
      <div className="text-center mb-10 md:mb-14">
        <p className="text-yellow-500 italic font-semibold mb-2">{d.sectionLabel}</p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#003F8C] font-semibold">{d.heading}</h2>
        <span className="block h-1 w-20 bg-yellow-500 mx-auto mt-4 rounded-full" />
      </div>
      <div className="relative min-h-[780px] md:min-h-[850px]"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
        onTouchEnd={() => {
          const dist = touchStartX.current - touchEndX.current;
          if (Math.abs(dist) > 60) setIndex((prev) => dist > 0 ? (prev + 1) % pages.length : prev === 0 ? pages.length - 1 : prev - 1);
        }}
      >
        {pages.map((pageEvents, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {pageEvents.map((event, ei) => (
                <article key={ei} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-40 sm:h-52 overflow-hidden">
                    <img src={event.image || "/Bible1.jpg"} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-3 left-3 bg-[#003F8C] text-white rounded-md px-3 py-2 text-center shadow">
                      <div className="text-base font-bold leading-none">{event.date}</div>
                      <div className="text-[10px] uppercase">{event.month}</div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col h-full">
                    <span className="inline-block bg-yellow-400/90 text-[11px] rounded px-3 py-1 mb-2 w-max">{event.time}</span>
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-[#003F8C] transition">{event.title}</h3>
                    <p className="text-[11px] italic text-gray-600 mb-3">{event.address}</p>
                    <button className="  border border-yellow-500 text-yellow-600 rounded-full px-4 py-2 text-[11px] font-semibold hover:bg-yellow-500 hover:text-white transition">JOIN US</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-60 sm:mt-0 flex flex-col items-center gap-6">
       <NavLink
        to="/event"
       className="w-full sm:w-auto mt-5 lg:mt-0 px-10 py-4 rounded-full bg-[#003F8C] text-white font-semibold text-sm hover:bg-[#0052B4] transition text-center"
       >
        VIEW ALL EVENTS
       </NavLink>
      </div>
    </section>
  );
}
