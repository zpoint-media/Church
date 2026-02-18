import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api";
import { useAuth } from "./context/AuthContext";

// Detect real mobile devices (iPhone, iPad, Android) AND small screens
function checkIsMobile() {
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isSmallScreen = window.innerWidth < 1024;
  return isIOS || isAndroid || isSmallScreen;
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [isMobile, setIsMobile] = useState(checkIsMobile);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => setIsMobile(checkIsMobile());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      signIn(data.token, data.user);
      navigate("/admin/dashboard");
    } catch (err) {
      const m = err.message || "Login failed";
      setError(m.includes("reach server") ? "Backend server not running — start with: npm run dev" : m);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: isMobile
          ? "#090e1c"
          : "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a0f1e 100%)",
      }}
    >
      {/* Background cross watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-white/[0.03] font-bold select-none"
          style={{ fontSize: "40rem", lineHeight: 1 }}
        >
          ✝
        </span>
      </div>

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(218,165,32,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Gold top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />

        <div className="p-10">
          {/* Logo */}
          <div className="text-center mb-10">
            <img
              src="/Logo.png"
              alt="Church Logo"
              className="h-14 mx-auto mb-4 opacity-90"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <h1
              className="text-2xl font-semibold text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Admin Panel
            </h1>
            <p className="text-sm text-white/40 mt-1">
              Mafoluku Model Parish 1
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@church.com"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(218,165,32,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.1)")
                }
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 text-sm outline-none transition-all pr-12"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.border =
                      "1px solid rgba(218,165,32,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.border =
                      "1px solid rgba(255,255,255,0.1)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition text-sm"
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="text-red-400 text-sm">⚠ {error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, #b8860b 0%, #daa520 50%, #b8860b 100%)",
                color: "#0a0f1e",
                boxShadow: loading
                  ? "none"
                  : "0 8px 24px rgba(218,165,32,0.3)",
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-white/20 text-xs mt-8">
             
          </p>
        </div>
      </div>
    </div>
  );
}
