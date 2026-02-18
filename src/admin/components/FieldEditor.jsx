// ─── Shared field components used across all editors ─────────────────────────

export function Field({ label, value, onChange, type = "text", rows, placeholder, hint }) {
  const inputClass =
    "w-full px-3 py-2.5 rounded-lg text-sm text-white/90 outline-none transition-all resize-none " +
    "bg-white/5 border border-white/10 focus:border-yellow-500/50 focus:bg-white/8 placeholder-white/20";

  return (
    <div>
      <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 3}
          placeholder={placeholder}
          className={inputClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {hint && <p className="text-white/25 text-xs mt-1">{hint}</p>}
    </div>
  );
}

export function SectionCard({ title, subtitle, children }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="px-6 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <h3 className="font-semibold text-white text-sm">{title}</h3>
        {subtitle && (
          <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

export function SaveBar({ saving, saved, error, onSave }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        {error && <span className="text-red-400 text-sm">⚠ {error}</span>}
        {saved && !error && (
          <span className="text-green-400 text-sm">✓ Changes saved</span>
        )}
      </div>
      <button
        onClick={onSave}
        disabled={saving}
        className="px-6 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50 transition-all"
        style={{
          background: "linear-gradient(135deg, #b8860b, #daa520)",
          color: "#0a0f1e",
          boxShadow: saving ? "none" : "0 4px 16px rgba(218,165,32,0.25)",
        }}
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}

export function ArrayItemHeader({ index, total, onMoveUp, onMoveDown, onDelete, label }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-yellow-500/80 text-xs font-semibold uppercase tracking-widest">
        {label} {index + 1}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="p-1 rounded text-white/30 hover:text-white/70 disabled:opacity-20 transition text-xs"
          title="Move up"
        >↑</button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="p-1 rounded text-white/30 hover:text-white/70 disabled:opacity-20 transition text-xs"
          title="Move down"
        >↓</button>
        <button
          onClick={onDelete}
          className="p-1 rounded text-red-400/50 hover:text-red-400 transition text-xs ml-1"
          title="Delete"
        >✕</button>
      </div>
    </div>
  );
}

export function AddButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 rounded-xl text-sm font-medium transition-all border border-dashed"
      style={{
        borderColor: "rgba(218,165,32,0.3)",
        color: "rgba(218,165,32,0.7)",
      }}
      onMouseEnter={(e) => {
        e.target.style.borderColor = "rgba(218,165,32,0.6)";
        e.target.style.color = "rgba(218,165,32,1)";
        e.target.style.background = "rgba(218,165,32,0.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.borderColor = "rgba(218,165,32,0.3)";
        e.target.style.color = "rgba(218,165,32,0.7)";
        e.target.style.background = "transparent";
      }}
    >
      + {label}
    </button>
  );
}
