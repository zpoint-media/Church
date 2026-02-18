import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import {
  Field,
  SectionCard,
  SaveBar,
  ArrayItemHeader,
  AddButton,
} from "../components/FieldEditor";

const emptyValue = {
  title: "",
  icon: "LuCross",
  description: "",
};

export default function AboutPageEditor() {
  const [data, setData] = useState({
    heroTitle: "",
    breadcrumbHome: "",
    breadcrumbCurrent: "",
    introLabel: "",
    introHeading: "",
    historyTitle: "",
    historyParagraph1: "",
    historyParagraph2: "",
    missionTitle: "",
    missionParagraph1: "",
    missionParagraph2: "",
    valuesTitle: "",
    values: [],
    quoteText: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("aboutPage")
      .then((res) => {
        if (res.data) {
          setData({
            heroTitle: res.data?.heroTitle || "About Us",
            breadcrumbHome: res.data?.breadcrumbHome || "Home",
            breadcrumbCurrent: res.data?.breadcrumbCurrent || "About Us",
            introLabel: res.data?.introLabel || "About Us",
            introHeading: res.data?.introHeading || "Welcome to Mafoluku Model Parish 1",
            historyTitle: res.data?.historyTitle || "Brief From History",
            historyParagraph1: res.data?.historyParagraph1 || "",
            historyParagraph2: res.data?.historyParagraph2 || "",
            missionTitle: res.data?.missionTitle || "Our Mission",
            missionParagraph1: res.data?.missionParagraph1 || "",
            missionParagraph2: res.data?.missionParagraph2 || "",
            valuesTitle: res.data?.valuesTitle || "Our Values",
            values: res.data?.values || [],
            quoteText: res.data?.quoteText || "",
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

  function updateValue(index, field, value) {
    setData((prev) => ({
      ...prev,
      values: prev.values.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    setSaved(false);
  }

  function moveValue(index, dir) {
    const arr = [...data.values];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setData((prev) => ({ ...prev, values: arr }));
    setSaved(false);
  }

  function deleteValue(index) {
    setData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
    setSaved(false);
  }

  function addValue() {
    setData((prev) => ({
      ...prev,
      values: [...prev.values, { ...emptyValue }],
    }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("aboutPage", data);
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
          About Page
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Edit all text content on the About Us page
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
            placeholder="About Us"
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
              placeholder="About Us"
            />
          </div>
        </SectionCard>

        {/* Intro Section */}
        <SectionCard title="Intro Section" subtitle="Welcome heading">
          <Field
            label="Section Label"
            value={data.introLabel}
            onChange={(v) => updateField("introLabel", v)}
            placeholder="About Us"
          />
          <Field
            label="Main Heading"
            value={data.introHeading}
            onChange={(v) => updateField("introHeading", v)}
            placeholder="Welcome to Mafoluku Model Parish 1"
          />
        </SectionCard>

        {/* History Section */}
        <SectionCard title="History Section" subtitle="Brief from history">
          <Field
            label="Section Title"
            value={data.historyTitle}
            onChange={(v) => updateField("historyTitle", v)}
            placeholder="Brief From History"
          />
          <Field
            label="First Paragraph"
            value={data.historyParagraph1}
            onChange={(v) => updateField("historyParagraph1", v)}
            placeholder="Mafoluku Model Parish 1 was established..."
            type="textarea"
            rows={4}
          />
          <Field
            label="Second Paragraph"
            value={data.historyParagraph2}
            onChange={(v) => updateField("historyParagraph2", v)}
            placeholder="Over the years, the parish has remained..."
            type="textarea"
            rows={4}
          />
        </SectionCard>

        {/* Mission Section */}
        <SectionCard title="Mission Section" subtitle="Our mission statement">
          <Field
            label="Section Title"
            value={data.missionTitle}
            onChange={(v) => updateField("missionTitle", v)}
            placeholder="Our Mission"
          />
          <Field
            label="First Paragraph"
            value={data.missionParagraph1}
            onChange={(v) => updateField("missionParagraph1", v)}
            placeholder="Our mission is to glorify God..."
            type="textarea"
            rows={4}
          />
          <Field
            label="Second Paragraph"
            value={data.missionParagraph2}
            onChange={(v) => updateField("missionParagraph2", v)}
            placeholder="We seek to build a loving church..."
            type="textarea"
            rows={4}
          />
        </SectionCard>

        {/* Values Section */}
        <SectionCard title="Values Section" subtitle="Core values grid">
          <Field
            label="Section Title (not displayed currently)"
            value={data.valuesTitle}
            onChange={(v) => updateField("valuesTitle", v)}
            placeholder="Our Values"
          />
        </SectionCard>

        {/* Values Items */}
        {data.values.map((value, i) => (
          <SectionCard
            key={i}
            title={`Value ${i + 1}`}
            subtitle={value.title || "Untitled value"}
          >
            <ArrayItemHeader
              index={i}
              total={data.values.length}
              label="Value"
              onMoveUp={() => moveValue(i, -1)}
              onMoveDown={() => moveValue(i, 1)}
              onDelete={() => deleteValue(i)}
            />
            <Field
              label="Title"
              value={value.title}
              onChange={(v) => updateValue(i, "title", v)}
              placeholder="Glorify God"
            />
            <Field
              label="Icon Name (LuCross, FaBookBible, FiHeart, IoIosMan)"
              value={value.icon}
              onChange={(v) => updateValue(i, "icon", v)}
              placeholder="LuCross"
              hint="Use: LuCross, FaBookBible, FiHeart, IoIosMan"
            />
            <Field
              label="Description"
              value={value.description}
              onChange={(v) => updateValue(i, "description", v)}
              placeholder="We uphold this value as a core part..."
              type="textarea"
              rows={3}
            />
          </SectionCard>
        ))}

        <AddButton onClick={addValue} label="Add New Value" />

        {/* Quote Section */}
        <SectionCard title="Quote Section" subtitle="Inspirational quote">
          <Field
            label="Quote Text"
            value={data.quoteText}
            onChange={(v) => updateField("quoteText", v)}
            placeholder="Mafoluku Model Parish 1 is a church where prayer is a lifestyle..."
            type="textarea"
            rows={5}
            hint="Use HTML markup like <span class='text-amber-400'>text</span> for highlights"
          />
        </SectionCard>
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
