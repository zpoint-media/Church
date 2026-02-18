import { useEffect, useState } from "react";

const WEEKDAY_VERSES = {
  0: ["psalm 23:1", "john 3:16", "romans 8:11"],
  1: ["lamentations 3:22-23", "isaiah 40:31", "psalm 118:24"],
  2: ["proverbs 3:5-6", "psalm 37:5", "james 1:5"],
  3: ["psalm 46:1", "john 14:27", "philippians 4:6-7"],
  4: ["psalm 121:1-2", "isaiah 41:10", "hebrews 13:6"],
  5: ["micah 6:8", "galatians 2:20", "psalm 16:8"],
  6: ["psalm 118:24", "hebrews 4:9-10", "revelation 21:4"],
};

const OFFLINE_FALLBACK = [
  {
    id: 1,
    title: "Verse Of The Day:",
    verse:
      "Heaven and earth will pass away, but my words will never pass away.",
    ref: "Bible: Matthew 24:35",
    image: "/Versebg.webp",
  },
  {
    id: 2,
    title: "Verse Of The Day:",
    verse: "Peace I leave with you; my peace I give you.",
    ref: "Bible: John 14:27",
    image: "/Versebg.webp",
  },
  {
    id: 3,
    title: "Verse Of The Day:",
    verse: "I am with you always, to the very end of the age.",
    ref: "Bible: Matthew 28:20",
    image: "/Versebg.webp",
  },
];

export default function Verse() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  const weekday = new Date().getDay();
  const refs = WEEKDAY_VERSES[weekday];
  const cacheKey = `weekday-verses-${weekday}`;

  /* FETCH VERSES WITH OFFLINE FALLBACK */
  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setSlides(JSON.parse(cached));
      return;
    }

    async function fetchVerses() {
      try {
        const responses = await Promise.all(
          refs.map((ref) =>
            fetch(`https://bible-api.com/${encodeURIComponent(ref)}`).then(
              (r) => r.json()
            )
          )
        );

        const formatted = responses.map((data, i) => ({
          id: i + 1,
          title: "Verse Of The Day:",
          verse: data.text.trim(),
          ref: data.reference,
          image: "/Versebg.webp",
        }));

        setSlides(formatted);
        localStorage.setItem(cacheKey, JSON.stringify(formatted));
      } catch {
        setSlides(OFFLINE_FALLBACK);
      }
    }

    fetchVerses();
  }, [cacheKey, refs]);

  /* AUTO SLIDE (RESTORED) */
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <section className="relative h-[90vh] lg:h-0 min-h-[400px] w-full overflow-hidden bg-black">
      {slides.map((slide, i) => {
        const active = i === index;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* BG */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/82" />

            {/* CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
              <div className="grid md:grid-cols-[220px_1fr] gap-10 items-center">
                {/* LOGO */}
                <div className="flex justify-center">
                  <div className="w-44 h-44 rounded-full border flex items-center justify-center">
                    <img
                      src="/Bible1.jpg"
                      className="w-44 h-44 rounded-full opacity-90"
                      alt="Bible"
                    />
                  </div>
                </div>

                {/* TEXT WITH ANIMATION */}
                <div className="text-center md:text-left overflow-hidden">
                  <h3
                    className={`font-serif italic text-white text-xl md:text-2xl mb-4
                    transition-all duration-700
                    ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  >
                    {slide.title}
                  </h3>

                  <p
                    className={`text-yellow-400 text-lg md:text-2xl leading-relaxed font-serif max-w-3xl
                    transition-all duration-1000 delay-200
                    ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  >
                    “{slide.verse}”
                  </p>

                  <p
                    className={`mt-6 text-white/60 italic text-sm
                    transition-all duration-1000 delay-500
                    ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  >
                    {slide.ref}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* DESKTOP VERTICAL NAVIGATOR (RESTORED) */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center">
        <div className="relative h-40 w-px bg-white/20">
          <span
            className="absolute left-1/2 -translate-x-1/2 w-[2px] h-10 bg-yellow-400 transition-all duration-700"
            style={{ top: `${(index / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* MOBILE NAVIGATOR (RESTORED) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-4 md:hidden">
        {slides.map((_, i) => (
          <span
            key={i}
            className={` h-[2px] w-8 transition-all duration-500 ${
              i === index ? "bg-yellow-400" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
