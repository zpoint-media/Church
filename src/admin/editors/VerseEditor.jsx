import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import {
  Field,
  SectionCard,
  SaveBar,
  ArrayItemHeader,
  AddButton,
} from "../components/FieldEditor";

const emptySlide = { title: "Verse Of The Day:", verse: "", ref: "" };

export default function VerseEditor() {
  const [slides, setSlides] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("verse")
      .then((res) => setSlides(res.data?.slides || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function updateSlide(index, field, value) {
    setSlides((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
    setSaved(false);
  }

  function moveSlide(index, dir) {
    const arr = [...slides];
    const t = index + dir;
    if (t < 0 || t >= arr.length) return;
    [arr[index], arr[t]] = [arr[t], arr[index]];
    setSlides(arr);
    setSaved(false);
  }

  function deleteSlide(index) {
    if (slides.length <= 1) return alert("Need at least 1 verse slide.");
    setSlides((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  }

  function addSlide() {
    setSlides((prev) => [...prev, { ...emptySlide }]);
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("verse", { slides });
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return <div className="text-white/40 text-sm py-8">Loading…</div>;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <p className="text-yellow-500/80 text-sm font-medium mb-1">Page Editor</p>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
          Verse Section
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Edit the Bible verse slides shown in the full-screen verse/scripture section.
          These are used as a fallback — live verses are fetched from the Bible API.
        </p>
      </div>

      {/* Info banner */}
      <div
        className="mb-6 rounded-xl p-4 flex gap-3"
        style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}
      >
        <span className="text-blue-400 text-sm flex-shrink-0">ℹ</span>
        <p className="text-blue-400/80 text-xs leading-relaxed">
          The live site fetches daily verses from <strong>bible-api.com</strong> automatically.
          The slides you edit here are <strong>offline fallback verses</strong> shown when the API is unreachable.
        </p>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />

      <div className="space-y-5 mt-2">
        {slides.map((slide, i) => (
          <SectionCard
            key={i}
            title={`Verse Slide ${i + 1}`}
            subtitle={slide.ref || "No reference set"}
          >
            <ArrayItemHeader
              index={i}
              total={slides.length}
              label="Verse"
              onMoveUp={() => moveSlide(i, -1)}
              onMoveDown={() => moveSlide(i, 1)}
              onDelete={() => deleteSlide(i)}
            />

            <Field
              label="Title Label"
              value={slide.title}
              onChange={(v) => updateSlide(i, "title", v)}
              placeholder="Verse Of The Day:"
            />
            <Field
              label="Verse Text"
              value={slide.verse}
              onChange={(v) => updateSlide(i, "verse", v)}
              type="textarea"
              rows={3}
              placeholder="Heaven and earth will pass away, but my words will never pass away."
            />
            <Field
              label="Scripture Reference"
              value={slide.ref}
              onChange={(v) => updateSlide(i, "ref", v)}
              placeholder="Matthew 24:35"
            />
          </SectionCard>
        ))}

        <AddButton onClick={addSlide} label="Add Verse Slide" />
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
