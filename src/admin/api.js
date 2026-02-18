// Use environment variable for production, fall back to relative path for dev
const BASE = import.meta.env.VITE_API_URL || "/api";

function getToken() {
  return localStorage.getItem("church_admin_token");
}

/** Safe JSON parse — returns null instead of throwing on empty/HTML body */
async function safeJson(res) {
  const text = await res.text();
  if (!text || !text.trim()) return null;
  try { return JSON.parse(text); } catch { return null; }
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let res;
  try {
    res = await fetch(`${BASE}${path}`, { ...options, headers });
  } catch (networkErr) {
    throw new Error("Cannot reach server — is it running? (npm run dev)");
  }

  const data = await safeJson(res);

  if (!res.ok) {
    throw new Error(data?.message || `Server error ${res.status}`);
  }

  if (data === null) {
    throw new Error("Server returned an empty response");
  }

  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = (email, password) =>
  request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const setup = (email, password, name) =>
  request("/auth/setup", { method: "POST", body: JSON.stringify({ email, password, name }) });

export const getMe = () => request("/auth/me");

export const changePassword = (currentPassword, newPassword) =>
  request("/auth/password", { method: "PUT", body: JSON.stringify({ currentPassword, newPassword }) });

// ── Content ───────────────────────────────────────────────────────────────────
export const getAllContent = () => request("/content");

export const getSection = (section) => request(`/content/${section}`);

export const saveSection = (section, data) =>
  request(`/content/${section}`, { method: "PUT", body: JSON.stringify(data) });
