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
  month: "",
  time: "",
  title: "",
  address: "",
  image: "/Bible1.jpg",
};

const emptyUpcomingSermon = {
  date: "",
  category: "",
  title: "",
  desc: "",
  author: "",
};

export default function EventsPageEditor() {
  const [data, setData] = useState({
    heroTitle: "",
    breadcrumbHome: "",
    breadcrumbCurrent: "",
    sectionLabel: "",
    sectionHeading: "",
    events: [],
    upcomingSermonsLabel: "",
    upcomingSermonsHeading: "",
    upcomingSermons: [],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("eventsPage")
      .then((res) => {
        if (res.data) {
          setData({
            heroTitle: res.data?.heroTitle || "Events",
            breadcrumbHome: res.data?.breadcrumbHome || "Home",
            breadcrumbCurrent: res.data?.breadcrumbCurrent || "Events",
            sectionLabel: res.data?.sectionLabel || "Join Us",
            sectionHeading: res.data?.sectionHeading || "Upcoming Events",
            events: res.data?.events || [],
            upcomingSermonsLabel: res.data?.upcomingSermonsLabel || "Join Our Community",
            upcomingSermonsHeading: res.data?.upcomingSermonsHeading || "Upcoming Sermons",
            upcomingSermons: res.data?.upcomingSermons || [],
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

  function updateEvent(index, field, value) {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    setSaved(false);
  }

  function moveEvent(index, dir) {
    const arr = [...data.events];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setData((prev) => ({ ...prev, events: arr }));
    setSaved(false);
  }

  function deleteEvent(index) {
    setData((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index),
    }));
    setSaved(false);
  }

  function addEvent() {
    setData((prev) => ({
      ...prev,
      events: [...prev.events, { ...emptyEvent }],
    }));
    setSaved(false);
  }

  function updateSermon(index, field, value) {
    setData((prev) => ({
      ...prev,
      upcomingSermons: prev.upcomingSermons.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    setSaved(false);
  }

  function moveSermon(index, dir) {
    const arr = [...data.upcomingSermons];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setData((prev) => ({ ...prev, upcomingSermons: arr }));
    setSaved(false);
  }

  function deleteSermon(index) {
    setData((prev) => ({
      ...prev,
      upcomingSermons: prev.upcomingSermons.filter((_, i) => i !== index),
    }));
    setSaved(false);
  }

  function addSermon() {
    setData((prev) => ({
      ...prev,
      upcomingSermons: [...prev.upcomingSermons, { ...emptyUpcomingSermon }],
    }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("eventsPage", data);
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
          Events Page
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Edit all events and upcoming sermons on the Events page
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
            placeholder="Events"
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
              placeholder="Events"
            />
          </div>
        </SectionCard>

        {/* Intro Section */}
        <SectionCard title="Events Intro Section" subtitle="Section heading">
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
            placeholder="Upcoming Events"
          />
        </SectionCard>

        {/* Events Grid */}
        <div className="text-white/60 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="font-medium mb-1">📅 Event Cards ({data.events.length})</p>
          <p className="text-white/40 text-xs">
            Events are displayed in a grid layout with date badge, time, title, and address.
          </p>
        </div>

        {data.events.map((event, i) => (
          <SectionCard
            key={i}
            title={`Event ${i + 1}`}
            subtitle={event.title || "Untitled event"}
          >
            <ArrayItemHeader
              index={i}
              total={data.events.length}
              label="Event"
              onMoveUp={() => moveEvent(i, -1)}
              onMoveDown={() => moveEvent(i, 1)}
              onDelete={() => deleteEvent(i)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Date (number)"
                value={event.date}
                onChange={(v) => updateEvent(i, "date", v)}
                placeholder="14"
              />
              <Field
                label="Month"
                value={event.month}
                onChange={(v) => updateEvent(i, "month", v)}
                placeholder="May"
              />
            </div>
            <Field
              label="Time"
              value={event.time}
              onChange={(v) => updateEvent(i, "time", v)}
              placeholder="@ 8 to 11 AM"
            />
            <Field
              label="Event Title"
              value={event.title}
              onChange={(v) => updateEvent(i, "title", v)}
              placeholder="Sharing Our Faith & Love"
            />
            <Field
              label="Address"
              value={event.address}
              onChange={(v) => updateEvent(i, "address", v)}
              placeholder="PO Box 16122 Collins Street."
            />
            <Field
              label="Image Path"
              value={event.image}
              onChange={(v) => updateEvent(i, "image", v)}
              placeholder="/Bible1.jpg"
              hint="Path to image file in the public folder"
            />
          </SectionCard>
        ))}

        <AddButton onClick={addEvent} label="Add New Event" />

        {/* Upcoming Sermons Section */}
        <SectionCard
          title="Upcoming Sermons Section"
          subtitle="Bottom section heading"
        >
          <Field
            label="Section Label"
            value={data.upcomingSermonsLabel}
            onChange={(v) => updateField("upcomingSermonsLabel", v)}
            placeholder="Join Our Community"
          />
          <Field
            label="Section Heading"
            value={data.upcomingSermonsHeading}
            onChange={(v) => updateField("upcomingSermonsHeading", v)}
            placeholder="Upcoming Sermons"
          />
        </SectionCard>

        <div className="text-white/60 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="font-medium mb-1">📖 Upcoming Sermon Cards ({data.upcomingSermons.length})</p>
          <p className="text-white/40 text-xs">
            These sermons appear at the bottom of the events page in a dark section.
          </p>
        </div>

        {data.upcomingSermons.map((sermon, i) => (
          <SectionCard
            key={i}
            title={`Upcoming Sermon ${i + 1}`}
            subtitle={sermon.title || "Untitled sermon"}
          >
            <ArrayItemHeader
              index={i}
              total={data.upcomingSermons.length}
              label="Sermon"
              onMoveUp={() => moveSermon(i, -1)}
              onMoveDown={() => moveSermon(i, 1)}
              onDelete={() => deleteSermon(i)}
            />
            <Field
              label="Date"
              value={sermon.date}
              onChange={(v) => updateSermon(i, "date", v)}
              placeholder="June 2, 2025"
            />
            <Field
              label="Category"
              value={sermon.category}
              onChange={(v) => updateSermon(i, "category", v)}
              placeholder="Faith & Trust"
            />
            <Field
              label="Sermon Title"
              value={sermon.title}
              onChange={(v) => updateSermon(i, "title", v)}
              placeholder="Walking by Faith, Not by Sight"
            />
            <Field
              label="Description"
              value={sermon.desc}
              onChange={(v) => updateSermon(i, "desc", v)}
              placeholder="Learn how to trust God fully..."
              type="textarea"
              rows={2}
            />
            <Field
              label="Author/Pastor"
              value={sermon.author}
              onChange={(v) => updateSermon(i, "author", v)}
              placeholder="Pastor Michael"
            />
          </SectionCard>
        ))}

        <AddButton onClick={addSermon} label="Add New Upcoming Sermon" />
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
