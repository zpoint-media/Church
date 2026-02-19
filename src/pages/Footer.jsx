import React from "react";
import { useContent } from "../hooks/useContent";

const FALLBACK = {
  newsletterTitle: "Newsletter",
  newsletterDesc:
    "Stay connected with our community. Receive updates on services, events, and devotionals.",
  newsletterCta: "Get Our Newsletter",
  latestNewsTitle: "Latest News",
  latestNewsItems: [
    { title: "Lord of our life & our salvation", date: "12 May 2025" },
    { title: "Community outreach this weekend", date: "8 May 2025" },
  ],
  instagramImages: [
    "/Gallery/Gallery1.jpg",
    "/Gallery/Gallery2.jpg",
    "/Gallery/Gallery3.jpg",
    "/Gallery/Gallery4.jpg",
    "/Gallery/Gallery5.jpg",
    "/Gallery/Gallery6.jpg",
  ],
  usefulLinks: [
    { label: "Who we are?" },
    { label: "Support and FAQ's" },
    { label: "Payments" },
    { label: "Donations Terms" },
    { label: "Volunteer" },
  ],
  socialLinks: [
    {
      name: "Facebook",
      href: "https://web.facebook.com/profile.php?id=100063764881610",
    },
    { name: "Whatsapp", href: "https://wa.me" },
    {
      name: "Youtube",
      href: "https://www.youtube.com/channel/UCRL2oMXIoUajvveVrMaCz8Q",
    },
    { name: "Gmail", href: "" },
    {
      name: "Instagram",
      href: "https://www.instagram.com/cccmaf1modelparish/",
    },
  ],
  copyrightName: "Mafoluku Model Parish 1",
  designerName: [{ name: "T-Codes", href: "https://t-codes.com" }],
};

export default function Footer() {
  const { data } = useContent("footer", FALLBACK);

  const d = { ...FALLBACK, ...data };

  /* 🔥 NORMALIZE DATA SHAPES */
  const designerList = Array.isArray(d.designerName)
    ? d.designerName
    : d.designerName
    ? [d.designerName]
    : [];

  const socialLinks = Array.isArray(d.socialLinks)
    ? d.socialLinks
    : [];

  const latestNews = Array.isArray(d.latestNewsItems)
    ? d.latestNewsItems
    : [];

  const usefulLinks = Array.isArray(d.usefulLinks)
    ? d.usefulLinks
    : [];

  const instagramImages = Array.isArray(d.instagramImages)
    ? d.instagramImages
    : [];

  return (
    <footer className="lg:mt-110 mt-140 relative w-full bg-black text-white mt-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-5 mb-20">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 text-center py-4 text-sm hover:bg-white/30 transition"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Latest News */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              {d.latestNewsTitle}
            </h3>
            {latestNews.map((item, i) => (
              <div key={i} className="mb-4 text-sm">
                <p>{item.title}</p>
                <p className="text-yellow-500">{item.date}</p>
              </div>
            ))}
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Useful Links
            </h3>
            <ul className="space-y-3 text-sm">
              {usefulLinks.map((link, i) => (
                <li key={i}>{link.label}</li>
              ))}
            </ul>
          </div>

          {/* Instagram */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Instagram
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {instagramImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`instagram ${i}`}
                  className="h-20 object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} {d.copyrightName}. All Rights Reserved.
        <div className="mt-2">
          Designed by{" "}
          {designerList.map((designer, i) => (
            <a
              key={i}
              href={designer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline ml-1"
            >
              {designer.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
