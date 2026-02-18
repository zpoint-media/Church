// API utility for consistent API URL usage
// Uses VITE_API_URL environment variable in production, falls back to /api in dev

const API_BASE = import.meta.env.VITE_API_URL || "/api";

/**
 * Safe fetch with JSON parsing that never throws
 */
export async function apiFetch(path) {
  try {
    const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
    const res = await fetch(url);
    const text = await res.text();
    
    if (!text || !text.trim()) {
      return null;
    }
    
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  } catch (err) {
    console.error(`API fetch error for ${path}:`, err);
    return null;
  }
}

export default API_BASE;
