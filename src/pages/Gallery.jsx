import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";

const categories = [
  "All",
  "Christmas",
  "Holy Week",
  "Church",
  "Event",
  "Pastors",
];

const galleryData = {
  All: [
    "/Gallery/Gallery1.jpg",
    "/Gallery/Gallery2.jpg",
    "/Gallery/Gallery3.jpg",
    "/Gallery/Gallery4.jpg",
    "/Gallery/Gallery5.jpg",
    "/Gallery/Gallery6.jpg",
  ],
  Christmas: [
    "/Gallery/Gallery7.jpg",
    "/Gallery/Gallery8.jpg",
    "/Gallery/Gallery9.jpg",
    "/Gallery/Gallery10.jpg",
    "/Gallery/Gallery11.jpg",
    "/Gallery/Gallery12.jpg",
  ],
  "Holy Week": [
   "/Gallery/Gallery1.jpg",
    "/Gallery/Gallery2.jpg",
    "/Gallery/Gallery3.jpg",
    "/Gallery/Gallery4.jpg",
    "/Gallery/Gallery5.jpg",
    "/Gallery/Gallery6.jpg",
  ],
  Church: [
    "/Gallery/Gallery7.jpg",
    "/Gallery/Gallery8.jpg",
    "/Gallery/Gallery9.jpg",
    "/Gallery/Gallery10.jpg",
    "/Gallery/Gallery11.jpg",
    "/Gallery/Gallery12.jpg",
  ],
  Event: [
   "/Gallery/Gallery1.jpg",
    "/Gallery/Gallery2.jpg",
    "/Gallery/Gallery3.jpg",
    "/Gallery/Gallery4.jpg",
    "/Gallery/Gallery5.jpg",
    "/Gallery/Gallery6.jpg",
  ],
  Pastors: [
    "/Gallery/Gallery7.jpg",
    "/Gallery/Gallery8.jpg",
    "/Gallery/Gallery9.jpg",
    "/Gallery/Gallery10.jpg",
    "/Gallery/Gallery11.jpg",
    "/Gallery/Gallery12.jpg",
  ],
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Header */}
        <p className="text-orange-400 italic mb-2" data-aos="fade-up">
          Church Gallery
        </p>

        <h2
          className="text-4xl font-semibold text-blue-900 mb-6"
          data-aos="fade-up"
        >
         Mafoluku Model Parish 1 Photo Gallery
        </h2>

        <div className="flex justify-center mb-10">
          <span className="w-16 h-1 bg-orange-400 rounded"></span>
        </div>

        {/* Tabs */}
        <div
          className="flex justify-center gap-6 flex-wrap mb-14 text-sm font-medium"
          data-aos="fade-up"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative transition ${
                activeCategory === cat
                  ? "text-blue-900"
                  : "text-gray-600 hover:text-blue-900"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900"></span>
              )}
            </button>
          ))}
        </div>

        {/* Gallery Grid – EXACT 6 IMAGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {galleryData[activeCategory].map((img, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              className="overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setLightbox(img)}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-14">
           <NavLink
        to="/Gallery"
       className="w-full sm:w-auto bg-[#003F8C] hover:bg-[#0052B4] text-white  px-10 py-3 rounded-full font-medium transition"
       >
        VIEW ALL 
       </NavLink>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            className="max-w-4xl max-h-[90vh] rounded-lg"
            alt=""
          />
        </div>
      )}
    </section>
  );
}
