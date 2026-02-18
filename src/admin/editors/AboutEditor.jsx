import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import {
  Field,
  SectionCard,
  SaveBar,
  ArrayItemHeader,
  AddButton,
} from "../components/FieldEditor";

const emptyFeature = { icon: "✛", title: "", description: "" };

export default function AboutEditor() {
  const [data, setData] = useState({
    label: "About Us",
    heading: "",
    description: "",
    readMoreLabel: "Read More",
    features: [],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("about")
      .then((res) => setData(res.data || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function set(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function updateFeature(index, field, value) {
    setData((prev) => ({
      ...prev,
      features: prev.features.map((f, i) =>
        i === index ? { ...f, [field]: value } : f
      ),
    }));
    setSaved(false);
  }

  function moveFeature(index, dir) {
    const arr = [...data.features];
    const t = index + dir;
    if (t < 0 || t >= arr.length) return;
    [arr[index], arr[t]] = [arr[t], arr[index]];
    setData((prev) => ({ ...prev, features: arr }));
    setSaved(false);
  }

  function deleteFeature(index) {
    setData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
    setSaved(false);
  }

  function addFeature() {
    setData((prev) => ({
      ...prev,
      features: [...prev.features, { ...emptyFeature }],
    }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("about", data);
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
          About Section
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Edit the parish name, description and the 4 feature cards on the About section.
        </p>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />

      <div className="space-y-5 mt-2">
        {/* Main text */}
        <SectionCard title="Main Content" subtitle="Heading, label and description">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Section Label (italic yellow)"
              value={data.label}
              onChange={(v) => set("label", v)}
              placeholder="About Us"
            />
            <Field
              label="Read More Label"
              value={data.readMoreLabel}
              onChange={(v) => set("readMoreLabel", v)}
              placeholder="Read More"
            />
          </div>
          <Field
            label="Parish / Church Heading"
            value={data.heading}
            onChange={(v) => set("heading", v)}
            placeholder="Mafoluku Model Parish 1"
          />
          <Field
            label="Description Paragraph"
            value={data.description}
            onChange={(v) => set("description", v)}
            type="textarea"
            rows={4}
            placeholder="Mafoluku Model Parish 1 is a parish of the Celestial Church of Christ…"
          />
        </SectionCard>

        {/* Feature cards */}
        <div>
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
            Feature Cards (4 grid items)
          </h2>
          {data.features?.map((feat, i) => (
            <div
              key={i}
              className="mb-4 rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <ArrayItemHeader
                index={i}
                total={data.features.length}
                label="Feature"
                onMoveUp={() => moveFeature(i, -1)}
                onMoveDown={() => moveFeature(i, 1)}
                onDelete={() => deleteFeature(i)}
              />
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-3">
                  <Field
                    label="Icon / Emoji"
                    value={feat.icon}
                    onChange={(v) => updateFeature(i, "icon", v)}
                    placeholder="✛"
                  />
                  <div className="col-span-3">
                    <Field
                      label="Feature Title"
                      value={feat.title}
                      onChange={(v) => updateFeature(i, "title", v)}
                      placeholder="Glorify God"
                    />
                  </div>
                </div>
                <Field
                  label="Description"
                  value={feat.description}
                  onChange={(v) => updateFeature(i, "description", v)}
                  type="textarea"
                  rows={2}
                  placeholder="We exist to glorify God in worship…"
                />
              </div>
            </div>
          ))}
          <AddButton onClick={addFeature} label="Add Feature Card" />
        </div>
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
