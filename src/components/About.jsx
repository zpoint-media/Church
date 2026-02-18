import { useState, useEffect } from "react";
import { FaBookBible } from "react-icons/fa6";
import { IoIosMan } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { LuCross } from "react-icons/lu";
import { apiFetch } from "../utils/api";

const iconMap = {
  LuCross: <LuCross />,
  FaBookBible: <FaBookBible />,
  FiHeart: <FiHeart />,
  IoIosMan: <IoIosMan />,
};

function About() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/content/aboutPage")
      .then((data) => {
        if (data) {
          setContent(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load about page content:", err);
        setLoading(false);
      });
  }, []);

  // Default values if API fails or data is not set
  const defaultItems = [
    { title: "Glorify God", icon: "LuCross", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
    { title: "Believe the Bible", icon: "FaBookBible", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
    { title: "Love the Community", icon: "FiHeart", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
    { title: "Love People", icon: "IoIosMan", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
    { title: "Christ-Centered Living", icon: "LuCross", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
    { title: "Serve with Purpose", icon: "IoIosMan", description: "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community." },
  ];

  const items = content?.values?.length > 0 ? content.values : defaultItems;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative h-[150px] mt-25 bg-center bg-cover"
        style={{ backgroundImage: "url('/Versebg.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full px-8 md:px-16 flex items-center justify-between text-white">
          <h1 className="text-4xl md:text-5xl font-serif">
            {content?.heroTitle || "About Us"}
          </h1>

          <div className="bg-black px-5 py-2 flex items-center gap-2 text-sm">
            <span className="text-gray-300">{content?.breadcrumbHome || "Home"}</span>
            <span className="text-gray-400">›</span>
            <span className="text-yellow-500">{content?.breadcrumbCurrent || "About Us"}</span>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 text-center px-6">
        <p className="text-yellow-500 italic text-lg mb-2 font-serif">
          {content?.introLabel || "About Us"}
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-6">
          {content?.introHeading || "Welcome to Mafoluku Model Parish 1"}
        </h2>

        <div className="w-20 h-[2px] bg-yellow-500 mx-auto"></div>
      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* IMAGE */}
          <div className="relative">
            <img
              src="/Bible1.jpg"
              alt="Church"
              className="w-full h-150 object-cover rounded-sm"
            />
          </div>

          {/* TEXT */}
          <div>
            {/* HISTORY */}
            <h3 className="text-2xl font-serif text-blue-900 mb-2">
              {content?.historyTitle || "Brief From History"}
            </h3>
            <div className="w-14 h-[2px] bg-yellow-500 mb-6"></div>

            <p className="text-gray-600 leading-8 mb-6">
              {content?.historyParagraph1 ||
                "Mafoluku Model Parish 1 was established with a clear vision to raise a people rooted in faith, truth, and love. From humble beginnings, the church has grown into a vibrant family of believers committed to worship, discipleship, and service."}
            </p>

            <p className="text-gray-600 leading-8 mb-10">
              {content?.historyParagraph2 ||
                "Over the years, the parish has remained steadfast in preaching the undiluted Word of God while responding to the spiritual and practical needs of the community through prayer, outreach, and compassionate service."}
            </p>

            {/* MISSION */}
            <h3 className="text-2xl font-serif text-blue-900 mb-2">
              {content?.missionTitle || "Our Mission"}
            </h3>
            <div className="w-14 h-[2px] bg-yellow-500 mb-6"></div>

            <p className="text-gray-600 leading-8 mb-6">
              {content?.missionParagraph1 ||
                "Our mission is to glorify God by making disciples through the teaching of God's Word, fervent prayer, and Christ-like living. We are committed to nurturing spiritual growth and empowering believers to fulfill God's purpose for their lives."}
            </p>

            <p className="text-gray-600 leading-8">
              {content?.missionParagraph2 ||
                "We seek to build a loving church family where lives are transformed, hope is restored, and the power of the Holy Spirit is evident in every area of life."}
            </p>
          </div>
        </div>

        {/* VALUES */}
        <section className="px-6 md:px-20 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20">
            {items.map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-yellow-500 text-xl">
                    {iconMap[item.icon] || <LuCross />}
                  </span>

                  <h3 className="text-xl font-serif text-blue-900">
                    {item.title}
                  </h3>
                </div>

                <div className="w-20 h-[2px] bg-yellow-500 mb-6"></div>

                <p className="text-gray-600 leading-8 text-[15px]">
                  {item.description ||
                    "We uphold this value as a core part of our faith and daily walk with God. Through obedience, love, and service, we reflect Christ in our homes, church, and community."}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* QUOTE SECTION */}
      <section
        className="relative -mb-140 lg:-mb-110 w-full min-h-[420px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-5xl mx-6 bg-white/15 backdrop-blur-md text-white rounded-3xl px-10 py-12">
          <div className="absolute -bottom-6 left-16 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[24px] border-t-white/15" />

          <p 
            className="text-center text-lg md:text-xl leading-relaxed italic"
            dangerouslySetInnerHTML={{
              __html: content?.quoteText ||
                '<span class="text-amber-400 font-semibold">"Mafoluku Model Parish 1</span> is a church where prayer is a lifestyle, the Word of God is central, and love is lived out daily. We believe that lives are transformed through the power of the <span class="text-amber-400">Holy Spirit</span>, and that every believer is called to grow, serve, and walk faithfully with <span class="text-amber-400">God</span>."'
            }}
          />
        </div>
      </section>
    </>
  );
}

export default About;
