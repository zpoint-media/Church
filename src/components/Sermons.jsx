"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaBookBible } from "react-icons/fa6";
import { apiFetch } from "../utils/api";

export default function Sermonmain() {
  const [content, setContent] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRefs = useRef([]);
  const [times, setTimes] = useState({});

  useEffect(() => {
    apiFetch("/content/sermonsPage")
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => console.error("Failed to load sermons:", err));
  }, []);

  const sermonPages = content?.sermons 
    ? [
        { sermons: content.sermons.slice(0, 6) },
        { sermons: content.sermons.slice(6, 12) }
      ].filter(page => page.sermons.length > 0)
    : [
        { sermons: [
          { title: "Walking in Faith", preacher: "Pastor John Smith", date: "June 16, 2025", desc: "Learning to trust God even when the path is unclear.", audio: "/Wetin.mp3" },
        ]}
      ];

  const formatTime = (secs = 0) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const togglePlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    const audio = audioRefs.current[index];
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPlayingIndex(index);
    } else {
      audio.pause();
      setPlayingIndex(null);
    }
  };

  return (
    <>
      <section
        className="relative h-[150px] mt-25 bg-center bg-cover"
        style={{ backgroundImage: "url('/Versebg.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full px-8 md:px-16 flex items-center justify-between text-white">
          <h1 className="text-4xl md:text-5xl font-serif">{content?.heroTitle || "Church Sermons"}</h1>
          <div className="bg-black px-5 py-2 text-sm flex gap-2">
            <span className="text-gray-300">{content?.breadcrumbHome || "Home"}</span>
            <span className="text-gray-400">›</span>
            <span className="text-yellow-500">{content?.breadcrumbCurrent || "Sermons"}</span>
          </div>
        </div>
      </section>

      <section className="py-20 text-center px-6">
        <p className="text-yellow-500 italic font-serif mb-2">{content?.sectionLabel || "Join Us"}</p>
        <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-6">
          {content?.sectionHeading || "Recent Sermons"}
        </h2>
        <div className="w-20 h-[2px] bg-yellow-500 mx-auto" />
      </section>

      <section className="max-w-7xl -mt-20 mx-auto px-6 py-20">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activePage * 100}%)` }}
          >
            {sermonPages.map((page, pageIndex) => (
              <div key={pageIndex} className="min-w-full box-border">
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-10">
                  {page.sermons.map((sermon, i) => {
                    const index = pageIndex * 6 + i;
                    const time = times[index] || { current: 0, duration: 0 };

                    return (
                      <div
                        key={index}
                        className="bg-white border rounded-3xl p-6"
                      >
                        <h3 className="text-2xl font-bold text-gray-900">
                          {sermon.title}
                        </h3>

                        <p className="text-gray-600">{sermon.preacher}</p>

                        <p className="mt-3 text-gray-500 italic text-sm">
                          {sermon.desc}
                        </p>

                        <div className="flex items-center justify-between mt-6">
                          <span className="text-gray-400 text-sm">
                            {sermon.date}
                          </span>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => togglePlay(index)}
                              className="inline-flex items-center gap-2 px-4 py-2
                              rounded-full bg-[#003F8C] text-white text-sm font-semibold"
                            >
                              {playingIndex === index ? <FaPause /> : <FaPlay />}
                              Play
                            </button>

                            <span className="text-gray-500 text-sm">
                              {formatTime(time.current)} /{" "}
                              {formatTime(time.duration)}
                            </span>

                            <FaBookBible className="text-[#003F8C]" />
                          </div>

                          <audio
                            ref={(el) => (audioRefs.current[index] = el)}
                            src={sermon.audio}
                            preload="metadata"
                            onLoadedMetadata={(e) =>
                              setTimes((t) => ({
                                ...t,
                                [index]: {
                                  current: 0,
                                  duration: e.target.duration,
                                },
                              }))
                            }
                            onTimeUpdate={(e) =>
                              setTimes((t) => ({
                                ...t,
                                [index]: {
                                  ...t[index],
                                  current: e.target.currentTime,
                                },
                              }))
                            }
                            onEnded={() =>
                              setPlayingIndex(null)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {sermonPages.length > 1 && (
          <div className="flex -mb-140 lg:-mb-110 justify-center items-center gap-4 mt-20">
            {sermonPages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePage(i)}
                className={`w-12 h-12 rounded-full border ${
                  activePage === i ? "bg-black text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
