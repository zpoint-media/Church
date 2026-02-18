import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import {
  Field,
  SectionCard,
  SaveBar,
  ArrayItemHeader,
  AddButton,
} from "../components/FieldEditor";

const emptySlide = {
  subtitle: "",
  title: "",
  text: "",
  primaryBtn: "Donate",
  secondaryBtn: "About Us",
};

export default function HomeEditor() {
  const [slides, setSlides] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("home")
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
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setSlides(arr);
    setSaved(false);
  }

  function deleteSlide(index) {
    if (slides.length <= 1) return alert("You must have at least 1 slide.");
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
      await saveSection("home", { slides });
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
      {/* Page header */}
      <div className="mb-8">
        <p className="text-yellow-500/80 text-sm font-medium mb-1">Page Editor</p>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
          Home Hero Slider
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Edit the full-screen hero slides that appear at the top of the homepage.
        </p>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />

      <div className="space-y-5 mt-2">
        {slides.map((slide, i) => (
          <SectionCard
            key={i}
            title={`Slide ${i + 1}`}
            subtitle={slide.subtitle || "Untitled slide"}
          >
            <ArrayItemHeader
              index={i}
              total={slides.length}
              label="Slide"
              onMoveUp={() => moveSlide(i, -1)}
              onMoveDown={() => moveSlide(i, 1)}
              onDelete={() => deleteSlide(i)}
            />

            <Field
              label="Subtitle (small text above heading)"
              value={slide.subtitle}
              onChange={(v) => updateSlide(i, "subtitle", v)}
              placeholder="Christ Holycross ✝"
            />
            <Field
              label="Title (main heading — use \\n for line break)"
              value={slide.title}
              onChange={(v) => updateSlide(i, "title", v)}
              placeholder="YOUR CHURCH\nIS YOUR HOUSE"
              type="textarea"
              rows={2}
              hint="Use \\n to create a line break in the heading"
            />
            <Field
              label="Body Text"
              value={slide.text}
              onChange={(v) => updateSlide(i, "text", v)}
              placeholder="We come to serving & believing God's Word and Spirit."
              type="textarea"
              rows={2}
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Primary Button Label"
                value={slide.primaryBtn}
                onChange={(v) => updateSlide(i, "primaryBtn", v)}
                placeholder="Donate"
              />
              <Field
                label="Secondary Button Label"
                value={slide.secondaryBtn}
                onChange={(v) => updateSlide(i, "secondaryBtn", v)}
                placeholder="About Us"
              />
            </div>
          </SectionCard>
        ))}

        <AddButton onClick={addSlide} label="Add New Slide" />
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
