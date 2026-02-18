"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import "swiper/css";
import { useContent } from "../hooks/useContent";

const getRecentSundays = (count = 6) => {
  const sundays = [];
  const today = new Date();
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - today.getDay());
  for (let i = 0; i < count; i++) {
    const d = new Date(lastSunday);
    d.setDate(lastSunday.getDate() - i * 7);
    sundays.push(d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
  }
  return sundays.reverse();
};

const FALLBACK_CARDS = [
  { category: "Faith & Trust", title: "Walking by Faith, Not by Sight", desc: "Learn how to trust God fully even when the path ahead is unclear.", scripture: "2 Corinthians 5:7" },
  { category: "Prayer", title: "The Power of a Praying Church", desc: "Discover how united prayer brings revival, strength, and transformation.", scripture: "James 5:16" },
  { category: "Spiritual Growth", title: "Growing Deeper in Christ", desc: "A call to maturity, discipline, and consistency in your walk with God.", scripture: "Colossians 2:6–7" },
  { category: "Hope", title: "Hope That Never Fails", desc: "Even in dark times, God's promises remain sure and unchanging.", scripture: "Romans 15:13" },
  { category: "Purpose", title: "Created for a Purpose", desc: "Understand God's design for your life and walk confidently in your calling.", scripture: "Jeremiah 29:11" },
  { category: "Christian Living", title: "Living as Light in the World", desc: "Practical ways to reflect Christ's love in everyday life.", scripture: "Matthew 5:14–16" },
];

const FALLBACK = { sectionLabel: "Join Our Community", heading: "Recent Sermons", cards: FALLBACK_CARDS };

export default function Sermon() {
  const { data } = useContent("sermons", FALLBACK);
  const d = { ...FALLBACK, ...data };
  const sundayDates = getRecentSundays(d.cards?.length || 6);
  const sermons = (d.cards || FALLBACK_CARDS).map((card, i) => ({ ...card, date: sundayDates[i] || sundayDates[0] }));

  const slides = Array.from({ length: Math.ceil(sermons.length / 3) });
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [groupSize] = useState(3);

  return (
    <section className="relative min-h-[90vh] w-full bg-black overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/bg.jpg')" }} />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 pt-28 pb-44 text-center px-6">
        <p className="text-yellow-500 italic font-semibold mb-2">{d.sectionLabel}</p>
        <h2 className="text-3xl md:text-4xl font-serif text-white font-semibold">{d.heading}</h2>
        <span className="block h-1 w-20 bg-yellow-500 mx-auto mt-4 rounded-full" />
      </div>
      <div className="relative z-20 -mt-36 px-4 md:px-10 lg:px-16">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={24} slidesPerView={3} slidesPerGroup={3} loop
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSlideChange={(swiper) => setIndex(Math.floor(swiper.realIndex / groupSize))}
          breakpoints={{ 0: { slidesPerView: 1, slidesPerGroup: 1 }, 640: { slidesPerView: 2, slidesPerGroup: 2 }, 1024: { slidesPerView: 3, slidesPerGroup: 3 } }}
        >
          {sermons.map((sermon, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full">
                <div className="p-6 flex flex-col h-full">
                  <span className="text-sm text-blue-600 italic mb-2">– {sermon.date}</span>
                  <span className="text-yellow-500 italic font-medium mb-2">{sermon.category}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{sermon.title}</h3>
                  <div className="h-[2px] w-12 bg-yellow-500 mb-4" />
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{sermon.desc}</p>
                  <span className="text-sm italic text-gray-700 mt-auto">"{sermon.scripture}"</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative py-12">
        <div className="flex justify-center gap-4">
          {slides.map((_, i) => {
            const active = i === index;
            return (
              <button key={i} onClick={() => { setIndex(i); swiperRef.current?.slideToLoop(i * groupSize); }}
                className={`h-[4px] rounded-full transition-all duration-500 ${active ? "w-14 bg-yellow-500" : "w-8 bg-gray-300"}`}
                style={active ? { boxShadow: "0 0 12px rgba(234,179,8,0.9)" } : {}}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
