import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Map() {
  const [mapLoading, setMapLoading] = useState(true);

  return (
    <section className="w-full -mt-60 lg:-mt-20 py-20 flex justify-center relative">
      <div className="relative lg:mt-10 mt-20 w-full max-w-6xl flex flex-col md:flex-row md:absolute md:mt-15">

        {/* Left Panel */}
        <div className="w-full md:w-1/2 bg-[#E3AF4E] text-white p-8 md:p-9 relative z-10 md:h-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center border border-white rounded-full">
              <FaMapMarkerAlt className="text-lg" />
            </div>
            <h2 className="text-2xl font-semibold">Get In Touch</h2>
          </div>

          <p className="text-sm leading-relaxed mb-10 max-w-md">
            We warmly welcome you to worship with us at Mafoluku Model Parish 1.
            Whether you are visiting for the first time or seeking a place of
            prayer and fellowship, feel free to reach out or visit us.{" "}
            <a href="#" className="text-blue-800 underline">
              Contact Us
            </a>
          </p>

          <ul className="space-y-8 text-sm">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center border border-white rounded-full shrink-0">
                <FaMapMarkerAlt />
              </div>
              <span>
                Lagos West A Regional Head 1, Wulemotu Agbo Road, Off Ogunyinka
                Street, 7/8 Bus Stop, Murtala Muhammed Int&apos;l Airport Road,
                Lagos.
              </span>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center border border-white rounded-full shrink-0">
                <FaPhoneAlt />
              </div>
              <span>0916 131 3231</span>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center border border-white rounded-full shrink-0">
                <FaEnvelope />
              </div>
              <span>info@mafolukumodelparish1.org</span>
            </li>
          </ul>
        </div>

        {/* Right Panel (Google Map) */}
        <div className="w-full -mb-158 md:w-1/2 relative h-80 md:h-100 mt-2 md:mt-10 md:-mt-16 overflow-hidden">

          {/* Loading Overlay */}
          {mapLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 text-white">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-3"></div>
              <span className="text-sm tracking-wide">Loading map…</span>
            </div>
          )}

          <iframe
            title="Mafoluku Model Parish 1 Location"
            src="https://www.google.com/maps?q=Wulemotu%20Agbo%20Road,%20Murtala%20Muhammed%20International%20Airport%20Road,%20Lagos&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoading(false)}
          />

          {/* Go To Map Button (desktop only) */}
          <a
            href="https://www.google.com/maps?q=Wulemotu+Agbo+Road,+Murtala+Muhammed+International+Airport+Road,+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block absolute top-20 right-0 bg-blue-800 text-white px-6 py-3 font-medium shadow-lg z-30"
          >
            Go to Map
          </a>
        </div>
      </div>
    </section>
  );
}
