import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import { Field, SectionCard, SaveBar } from "../components/FieldEditor";

export default function EventHighlightEditor() {
  const [data, setData] = useState({
    upcomingEvent: { title: "", time: "", location: "", description: "" },
    latestSermon: { title: "", pastor: "", date: "", quote: "", audioSrc: "" },
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("eventHighlight")
      .then((res) => setData(res.data || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function setEvent(field, value) {
    setData((prev) => ({
      ...prev,
      upcomingEvent: { ...prev.upcomingEvent, [field]: value },
    }));
    setSaved(false);
  }

  function setSermon(field, value) {
    setData((prev) => ({
      ...prev,
      latestSermon: { ...prev.latestSermon, [field]: value },
    }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("eventHighlight", data);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return <div className="text-white/40 text-sm py-8">Loading…</div>;

  const ev = data.upcomingEvent;
  const sermon = data.latestSermon;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <p className="text-yellow-500/80 text-sm font-medium mb-1">Page Editor</p>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
          Event Highlight Section
        </h1>
        <p className="text-white/40 text-sm mt-2">
          The two-card highlight block on the homepage — upcoming event card and latest sermon card.
        </p>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />

      <div className="space-y-5 mt-2">
        {/* Upcoming Event card */}
        <SectionCard
          title="Upcoming Event Card"
          subtitle="Left card on homepage — shows next service"
        >
          <Field
            label="Event Title"
            value={ev.title}
            onChange={(v) => setEvent("title", v)}
            placeholder="Sunday Worship Service"
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Time"
              value={ev.time}
              onChange={(v) => setEvent("time", v)}
              placeholder="9:00 AM – 11:00 AM"
            />
            <Field
              label="Location"
              value={ev.location}
              onChange={(v) => setEvent("location", v)}
              placeholder="Main Sanctuary"
            />
          </div>
          <Field
            label="Description"
            value={ev.description}
            onChange={(v) => setEvent("description", v)}
            type="textarea"
            rows={3}
            placeholder="A powerful gathering of praise, prayer, and God's Word…"
          />
        </SectionCard>

        {/* Latest Sermon card */}
        <SectionCard
          title="Latest Sermon Card"
          subtitle="Right card on homepage — audio player sermon"
        >
          <Field
            label="Sermon Title"
            value={sermon.title}
            onChange={(v) => setSermon("title", v)}
            placeholder="Walking in Faith"
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Pastor / Speaker"
              value={sermon.pastor}
              onChange={(v) => setSermon("pastor", v)}
              placeholder="Pastor John Smith"
            />
            <Field
              label="Date"
              value={sermon.date}
              onChange={(v) => setSermon("date", v)}
              placeholder="June 16, 2025"
            />
          </div>
          <Field
            label="Quote / Excerpt"
            value={sermon.quote}
            onChange={(v) => setSermon("quote", v)}
            type="textarea"
            rows={3}
            placeholder="For we walk by faith, not by sight…"
          />
          <Field
            label="Audio File Path (in /public)"
            value={sermon.audioSrc}
            onChange={(v) => setSermon("audioSrc", v)}
            placeholder="/Wetin.mp3"
            hint="Place audio files in the /public folder and reference them here"
          />
        </SectionCard>
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
