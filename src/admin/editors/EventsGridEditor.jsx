import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import {
  Field,
  SectionCard,
  SaveBar,
  ArrayItemHeader,
  AddButton,
} from "../components/FieldEditor";

const emptyEvent = {
  date: "",
  month: "Jan",
  year: new Date().getFullYear().toString(),
  time: "@ 9 to 11 AM",
  title: "",
  pastor: "",
  address: "",
  image: "/Bible1.jpg",
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function EventsGridEditor() {
  const [sectionLabel, setSectionLabel] = useState("Join Our Community");
  const [heading, setHeading] = useState("Upcoming Events");
  const [events, setEvents] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("eventsGrid")
      .then((res) => {
        const d = res.data || {};
        setSectionLabel(d.sectionLabel || "Join Our Community");
        setHeading(d.heading || "Upcoming Events");
        setEvents(d.events || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function updateEvent(index, field, value) {
    setEvents((prev) =>
      prev.map((e, i) => (i === index ? { ...e, [field]: value } : e))
    );
    setSaved(false);
  }

  function moveEvent(index, dir) {
    const arr = [...events];
    const t = index + dir;
    if (t < 0 || t >= arr.length) return;
    [arr[index], arr[t]] = [arr[t], arr[index]];
    setEvents(arr);
    setSaved(false);
  }

  function deleteEvent(index) {
    setEvents((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  }

  function addEvent() {
    setEvents((prev) => [...prev, { ...emptyEvent }]);
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("eventsGrid", { sectionLabel, heading, events });
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
          Events Grid
        </h1>
        <p className="text-white/40 text-sm mt-2">
          All event cards displayed in the grid — each with date, title, time, and address.
        </p>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />

      <div className="space-y-5 mt-2">
        {/* Section header */}
        <SectionCard title="Section Header">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Section Label (small yellow italic)"
              value={sectionLabel}
              onChange={(v) => { setSectionLabel(v); setSaved(false); }}
              placeholder="Join Our Community"
            />
            <Field
              label="Section Heading"
              value={heading}
              onChange={(v) => { setHeading(v); setSaved(false); }}
              placeholder="Upcoming Events"
            />
          </div>
        </SectionCard>

        {/* Event cards */}
        <div>
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
            Event Cards ({events.length})
          </h2>

          {events.map((ev, i) => (
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
                total={events.length}
                label="Event"
                onMoveUp={() => moveEvent(i, -1)}
                onMoveDown={() => moveEvent(i, 1)}
                onDelete={() => deleteEvent(i)}
              />

              <div className="space-y-3">
                <Field
                  label="Event Title"
                  value={ev.title}
                  onChange={(v) => updateEvent(i, "title", v)}
                  placeholder="Sharing Our Faith & Love"
                />

                <div className="grid grid-cols-3 gap-3">
                  <Field
                    label="Day"
                    value={ev.date}
                    onChange={(v) => updateEvent(i, "date", v)}
                    placeholder="14"
                  />
                  <div>
                    <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-1.5">
                      Month
                    </label>
                    <select
                      value={ev.month}
                      onChange={(e) => updateEvent(i, "month", e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg text-sm text-white/90 outline-none bg-white/5 border border-white/10"
                    >
                      {MONTHS.map((m) => (
                        <option key={m} value={m} style={{ background: "#0d1b3e" }}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <Field
                    label="Year"
                    value={ev.year}
                    onChange={(v) => updateEvent(i, "year", v)}
                    placeholder="2025"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Time"
                    value={ev.time}
                    onChange={(v) => updateEvent(i, "time", v)}
                    placeholder="@ 8 to 11 AM"
                  />
                  <Field
                    label="Pastor / Speaker"
                    value={ev.pastor}
                    onChange={(v) => updateEvent(i, "pastor", v)}
                    placeholder="Clinith Luis"
                  />
                </div>

                <Field
                  label="Address"
                  value={ev.address}
                  onChange={(v) => updateEvent(i, "address", v)}
                  placeholder="PO Box 16122 Collins Street."
                />
              </div>
            </div>
          ))}

          <AddButton onClick={addEvent} label="Add Event Card" />
        </div>
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
