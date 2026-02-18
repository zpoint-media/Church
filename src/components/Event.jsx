"use client";
import React, { useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

function Event2() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    apiFetch("/content/eventsPage")
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  const events = content?.events || [
    { id: 1, date: "14", month: "May", time: "@ 8 to 11 AM", title: "Sharing Our Faith & Love", address: "PO Box 16122 Collins Street.", image: "/Bible1.jpg" },
  ];

  const sermons = content?.upcomingSermons || [
    { date: "June 2, 2025", category: "Faith & Trust", title: "Walking by Faith, Not by Sight", desc: "Learn how to trust God fully even when the path ahead is unclear.", author: "Pastor Michael" },
  ];

  return (
    <>
      <section
        className="relative h-[150px] mt-25 bg-center bg-cover"
        style={{ backgroundImage: "url('/Versebg.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full px-8 md:px-16 flex items-center justify-between text-white">
          <h1 className="text-4xl md:text-5xl font-serif">{content?.heroTitle || "Events"}</h1>
          <div className="bg-black px-5 py-2 text-sm flex gap-2">
            <span className="text-gray-300">{content?.breadcrumbHome || "Home"}</span>
            <span className="text-gray-400">›</span>
            <span className="text-yellow-500">{content?.breadcrumbCurrent || "Events"}</span>
          </div>
        </div>
      </section>

      <section className="py-20 text-center px-6 ">
        <p className="text-yellow-500 italic font-serif mb-2">{content?.sectionLabel || "Join Us"}</p>
        <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-6">
          {content?.sectionHeading || "Upcoming Events"}
        </h2>
        <div className="w-20 h-[2px] bg-yellow-500 mx-auto" />
      </section>

      <section className="px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <article
              key={event.id || index}
              className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#003F8C] text-white px-3 py-2 rounded text-center">
                  <div className="font-bold">{event.date}</div>
                  <div className="text-xs uppercase">{event.month}</div>
                </div>
              </div>

              <div className="p-4 flex flex-col h-full">
                <span className="bg-yellow-400 text-xs px-3 py-1 rounded w-fit mb-2">
                  {event.time}
                </span>
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <p className="text-xs italic text-gray-600 mb-4">
                  {event.address}
                </p>
                <button className="mt-auto border border-yellow-500 text-yellow-600 rounded-full px-4 py-2 text-xs hover:bg-yellow-500 hover:text-white transition">
                  JOIN US
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative -mb-140 lg:-mb-110 bg-black py-24 px-6">
        <div className="text-center mb-16">
          <p className="text-yellow-500 italic mb-2">{content?.upcomingSermonsLabel || "Join Our Community"}</p>
          <h2 className="text-3xl md:text-4xl font-serif text-white">
            {content?.upcomingSermonsHeading || "Upcoming Sermons"}
          </h2>
          <span className="block h-1 w-20 bg-yellow-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sermons.map((sermon, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-xl p-6 flex flex-col"
            >
              <span className="text-sm italic text-blue-600 mb-2">
                – {sermon.date}
              </span>
              <span className="text-yellow-500 italic mb-2">
                {sermon.category}
              </span>
              <h3 className="font-semibold mb-3">{sermon.title}</h3>
              <div className="h-[2px] w-12 bg-yellow-500 mb-4" />
              <p className="text-sm text-gray-600 flex-grow">{sermon.desc}</p>
              <span className="mt-4 text-sm">
                by{" "}
                <span className="text-blue-600 font-medium">
                  {sermon.author}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Event2;
