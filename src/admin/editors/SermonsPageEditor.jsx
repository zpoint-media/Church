import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import {
  Field,
  SectionCard,
  SaveBar,
  ArrayItemHeader,
  AddButton,
} from "../components/FieldEditor";

const emptySermon = {
  title: "",
  preacher: "",
  date: "",
  desc: "",
  audio: "/Wetin.mp3",
};

export default function SermonsPageEditor() {
  const [data, setData] = useState({
    heroTitle: "",
    breadcrumbHome: "",
    breadcrumbCurrent: "",
    sectionLabel: "",
    sectionHeading: "",
    sermons: [],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("sermonsPage")
      .then((res) => {
        if (res.data) {
          setData({
            heroTitle: res.data?.heroTitle || "Church Sermons",
            breadcrumbHome: res.data?.breadcrumbHome || "Home",
            breadcrumbCurrent: res.data?.breadcrumbCurrent || "Sermons",
            sectionLabel: res.data?.sectionLabel || "Join Us",
            sectionHeading: res.data?.sectionHeading || "Recent Sermons",
            sermons: res.data?.sermons || [],
          });
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function updateField(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function updateSermon(index, field, value) {
    setData((prev) => ({
      ...prev,
      sermons: prev.sermons.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    setSaved(false);
  }

  function moveSermon(index, dir) {
    const arr = [...data.sermons];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setData((prev) => ({ ...prev, sermons: arr }));
    setSaved(false);
  }

  function deleteSermon(index) {
    setData((prev) => ({
      ...prev,
      sermons: prev.sermons.filter((_, i) => i !== index),
    }));
    setSaved(false);
  }

  function addSermon() {
    setData((prev) => ({
      ...prev,
      sermons: [...prev.sermons, { ...emptySermon }],
    }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("sermonsPage", data);
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
        <p className="text-yellow-500/80 text-sm font-medium mb-1">
          Page Editor
        </p>
        <h1
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Sermons Page
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Edit all sermon entries on the Sermons page
        </p>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />

      <div className="space-y-5 mt-2">
        {/* Hero Section */}
        <SectionCard title="Hero Section" subtitle="Page header and breadcrumb">
          <Field
            label="Hero Title"
            value={data.heroTitle}
            onChange={(v) => updateField("heroTitle", v)}
            placeholder="Church Sermons"
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Breadcrumb Home Text"
              value={data.breadcrumbHome}
              onChange={(v) => updateField("breadcrumbHome", v)}
              placeholder="Home"
            />
            <Field
              label="Breadcrumb Current Text"
              value={data.breadcrumbCurrent}
              onChange={(v) => updateField("breadcrumbCurrent", v)}
              placeholder="Sermons"
            />
          </div>
        </SectionCard>

        {/* Intro Section */}
        <SectionCard title="Intro Section" subtitle="Section heading">
          <Field
            label="Section Label"
            value={data.sectionLabel}
            onChange={(v) => updateField("sectionLabel", v)}
            placeholder="Join Us"
          />
          <Field
            label="Section Heading"
            value={data.sectionHeading}
            onChange={(v) => updateField("sectionHeading", v)}
            placeholder="Recent Sermons"
          />
        </SectionCard>

        {/* Sermons */}
        <div className="text-white/60 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="font-medium mb-1">📖 Sermon Entries ({data.sermons.length})</p>
          <p className="text-white/40 text-xs">
            Sermons are displayed in a carousel with 6 items per page. The audio player will only work if the audio file exists.
          </p>
        </div>

        {data.sermons.map((sermon, i) => (
          <SectionCard
            key={i}
            title={`Sermon ${i + 1}`}
            subtitle={sermon.title || "Untitled sermon"}
          >
            <ArrayItemHeader
              index={i}
              total={data.sermons.length}
              label="Sermon"
              onMoveUp={() => moveSermon(i, -1)}
              onMoveDown={() => moveSermon(i, 1)}
              onDelete={() => deleteSermon(i)}
            />
            <Field
              label="Sermon Title"
              value={sermon.title}
              onChange={(v) => updateSermon(i, "title", v)}
              placeholder="Walking in Faith"
            />
            <Field
              label="Preacher Name"
              value={sermon.preacher}
              onChange={(v) => updateSermon(i, "preacher", v)}
              placeholder="Pastor John Smith"
            />
            <Field
              label="Date"
              value={sermon.date}
              onChange={(v) => updateSermon(i, "date", v)}
              placeholder="June 16, 2025"
            />
            <Field
              label="Description"
              value={sermon.desc}
              onChange={(v) => updateSermon(i, "desc", v)}
              placeholder="Learning to trust God even when the path is unclear."
              type="textarea"
              rows={2}
            />
            <Field
              label="Audio File Path"
              value={sermon.audio}
              onChange={(v) => updateSermon(i, "audio", v)}
              placeholder="/Wetin.mp3"
              hint="Path to audio file in the public folder"
            />
          </SectionCard>
        ))}

        <AddButton onClick={addSermon} label="Add New Sermon" />
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
