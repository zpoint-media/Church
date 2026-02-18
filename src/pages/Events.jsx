import { NavLink, useNavigate } from "react-router-dom";
import { FaPlay, FaPause, FaInstagram } from "react-icons/fa";
import { FaBookBible } from "react-icons/fa6";
import { useRef, useState, useEffect } from "react";
import { useContent } from "../hooks/useContent";

const getNextSunday = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? 7 : 7 - day;
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + diff);
  return nextSunday;
};
const formatEventDate = (date) => ({ day: date.getDate(), month: date.toLocaleString("default", { month: "short" }).toUpperCase() });

const FALLBACK = {
  upcomingEvent: { title: "Sunday Worship Service", time: "9:00 AM – 11:00 AM", location: "Main Sanctuary", description: "A powerful gathering of praise, prayer, and God's Word as we worship together as one family." },
  latestSermon: { title: "Walking in Faith", pastor: "Pastor John Smith", date: "June 16, 2025", quote: "\"For we walk by faith, not by sight.\" – 2 Corinthians 5:7\nIn this sermon, Pastor John teaches how to trust God in all circumstances.", audioSrc: "/Wetin.mp3" },
};

export default function EventAndSermonHighlight() {
  const navigate = useNavigate();
  const { data } = useContent("eventHighlight", FALLBACK);
  const d = { ...FALLBACK, ...data };
  const event = d.upcomingEvent;
  const sermon = d.latestSermon;
  const eventDate = getNextSunday();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);
    return () => { audio.removeEventListener("timeupdate", updateTime); audio.removeEventListener("loadedmetadata", setMeta); };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); } else { audio.play(); setIsPlaying(true); }
  };
  const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60).toString().padStart(2, "0"); return `${mins}:${secs}`; };

  return (
    <section className="bg-[#F8F9FC] py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Event */}
          <div onClick={() => navigate("/event/1")} className="bg-white border border-gray-200 rounded-3xl p-6 cursor-pointer hover:shadow-xl transition-all flex flex-col justify-between h-85">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#003F8C]">Upcoming Event</h2>
              <NavLink to="/event" onClick={(e) => e.stopPropagation()} className="text-sm font-semibold text-[#003F8C] hover:underline">View All →</NavLink>
            </div>
            <div className="flex items-center mt-4 gap-4 flex-1">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#003F8C] text-white flex flex-col items-center justify-center shadow-md flex-shrink-0">
                <span className="text-3xl font-bold">{formatEventDate(eventDate).day}</span>
                <span className="text-xs tracking-widest">{formatEventDate(eventDate).month}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{event?.title}</h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">{event?.description}</p>
                <p className="mt-3 text-gray-500 text-sm">🕘 {event?.time} &nbsp;•&nbsp; 📍 {event?.location}</p>
              </div>
            </div>
          </div>
          {/* Latest Sermon */}
          <div onClick={() => navigate("/sermons/1")} className="bg-white border border-gray-200 rounded-3xl p-6 cursor-pointer hover:shadow-xl transition-all flex flex-col justify-between h-85">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Latest Sermon</h2>
              <NavLink to="/sermons" onClick={(e) => e.stopPropagation()} className="text-sm font-semibold text-[#003F8C] hover:underline">View All →</NavLink>
            </div>
            <div className="mt-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{sermon?.title}</h3>
                <p className="mt-1 text-gray-600 text-base sm:text-lg">{sermon?.pastor}</p>
                <p className="mt-3 text-gray-500 text-sm sm:text-base italic max-w-md">{sermon?.quote}</p>
              </div>
              <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                <span className="text-gray-500 text-sm">{sermon?.date}</span>
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#003F8C] text-white text-sm font-semibold hover:bg-[#0052B4] transition">
                    {isPlaying ? <FaPause /> : <FaPlay />} Play
                  </button>
                  <span className="text-gray-500 text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                  <a href="#" onClick={(e) => e.stopPropagation()} className="text-[#003F8C] text-xl hover:scale-110 transition"><FaInstagram /></a>
                  <a href="#" onClick={(e) => e.stopPropagation()} className="text-[#003F8C] text-xl hover:scale-110 transition"><FaBookBible /></a>
                </div>
                <audio ref={audioRef} src={sermon?.audioSrc || "/Wetin.mp3"} preload="metadata" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
