import React from "react";
import { FaBookBible } from "react-icons/fa6";
import { IoIosMan } from "react-icons/io";
import { useContent } from "../hooks/useContent";

const FALLBACK = {
  label: "About Us",
  heading: "Mafoluku Model Parish 1",
  description: "Mafoluku Model Parish 1 is a parish of the Celestial Church of Christ in Nigeria, devoted to the worship of the Almighty God through holiness, prayer, and obedience to the teachings of Jesus Christ.",
  readMoreLabel: "Read More",
  features: [
    { icon: "✛", title: "Glorify God", description: "We exist to glorify God in worship, prayer, and total submission to His divine will." },
    { icon: "📖", title: "Believe the Holy Bible", description: "The Holy Bible is our foundation, guiding our faith, doctrine, and daily Christian living." },
    { icon: "♥", title: "Love the Body of Christ", description: "We practice love, unity, and compassion as taught by Christ, serving one another in humility." },
    { icon: "🙏", title: "Live a Holy Life", description: "We encourage a life of holiness, righteousness, and obedience, walking in the light of Christ." },
  ],
};

export default function AboutPage() {
  const { data } = useContent("about", FALLBACK);
  const d = { ...FALLBACK, ...data };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)), url('/aboutbg.webp')` }} />
      <div className="relative z-10 mt-15 max-w-6xl w-full flex flex-col md:flex-row gap-10 rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <img src="./Bible2.jpg" alt="Celestial Church of Christ" className="w-150 h-100 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 -mt-7 flex flex-col justify-center p-10 text-white">
          <p className="text-yellow-400 italic font-semibold mb-2">{d.label}</p>
          <h1 className="text-3xl font-semibold border-b border-white pb-2 mb-4">{d.heading}</h1>
          <p className="text-sm leading-relaxed opacity-90 mb-6 max-w-lg">
            {d.description}{" "}
            <span className="text-yellow-400 font-semibold cursor-pointer">{d.readMoreLabel}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(d.features || []).map((feat, i) => (
              <div key={i}>
                <h3 className="flex items-center gap-2 font-semibold border-b border-white pb-1 mb-2">
                  <span className="text-yellow-400 text-lg">{feat.icon}</span> {feat.title}
                </h3>
                <p className="text-xs leading-snug opacity-90">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
