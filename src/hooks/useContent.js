import { useState, useEffect } from "react";

/** Safe fetch + JSON parse — never throws on empty body or HTML error pages */
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    if (!text || !text.trim()) return null;
    try { return JSON.parse(text); } catch { return null; }
  } catch {
    return null;
  }
}

/**
 * Fetch a content section from the API.
 * Uses VITE_API_URL environment variable in production, falls back to relative path in dev.
 * Falls back gracefully to `fallback` if server is down or returns invalid data.
 */
export function useContent(section, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Warm from session cache immediately for instant render
    const cached = sessionStorage.getItem(`content_${section}`);
    if (cached) {
      try {
        setData(JSON.parse(cached));
      } catch {}
      setLoading(false);
    }

    // Use environment variable for API URL, fall back to relative path
    const BASE_URL = import.meta.env.VITE_API_URL || "/api";
    
    safeFetch(`${BASE_URL}/content/${section}`)
      .then((res) => {
        if (!res) return; // server down or empty — keep fallback/cache
        // Route returns { ...sectionData, data: sectionData, section }
        // Pull out the nested `data` object which is the cleanest version
        const payload = res.data ?? res;
        // Remove meta fields
        const { section: _s, __v, _id, createdAt, updatedAt, ...clean } = payload;
        const final = Object.keys(clean).length > 0 ? clean : fallback;
        setData(final);
        sessionStorage.setItem(`content_${section}`, JSON.stringify(final));
      })
      .finally(() => setLoading(false));
  }, [section]);

  return { data, loading };
}
