import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import { Field, SectionCard, SaveBar } from "../components/FieldEditor";

export default function ContactPageEditor() {
  const [data, setData] = useState({
    heroTitle: "",
    breadcrumbHome: "",
    breadcrumbCurrent: "",
    sectionLabel: "",
    sectionHeading: "",
    formNamePlaceholder: "",
    formEmailPlaceholder: "",
    formSubjectPlaceholder: "",
    formMessagePlaceholder: "",
    submitButtonText: "",
    successMessage: "",
    errorMessage: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("contactPage")
      .then((res) => {
        if (res.data) {
          setData({
            heroTitle: res.data?.heroTitle || "Events",
            breadcrumbHome: res.data?.breadcrumbHome || "Home",
            breadcrumbCurrent: res.data?.breadcrumbCurrent || "Events",
            sectionLabel: res.data?.sectionLabel || "Contact Us?",
            sectionHeading: res.data?.sectionHeading || "Get in Touch",
            formNamePlaceholder: res.data?.formNamePlaceholder || "Full Name*",
            formEmailPlaceholder: res.data?.formEmailPlaceholder || "Email*",
            formSubjectPlaceholder: res.data?.formSubjectPlaceholder || "Subject",
            formMessagePlaceholder: res.data?.formMessagePlaceholder || "Message",
            submitButtonText: res.data?.submitButtonText || "SEND NOW!",
            successMessage: res.data?.successMessage || "Message sent successfully!",
            errorMessage: res.data?.errorMessage || "Failed to send message. Try again later.",
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

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("contactPage", data);
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
          Contact Page
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Edit all text content on the Contact page
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

        {/* Contact Form Section */}
        <SectionCard title="Contact Form Section" subtitle="Get in touch heading">
          <Field
            label="Section Label"
            value={data.sectionLabel}
            onChange={(v) => updateField("sectionLabel", v)}
            placeholder="Contact Us?"
          />
          <Field
            label="Section Heading"
            value={data.sectionHeading}
            onChange={(v) => updateField("sectionHeading", v)}
            placeholder="Get in Touch"
          />
        </SectionCard>

        {/* Form Fields */}
        <SectionCard title="Form Placeholders" subtitle="Input field labels">
          <Field
            label="Name Field Placeholder"
            value={data.formNamePlaceholder}
            onChange={(v) => updateField("formNamePlaceholder", v)}
            placeholder="Full Name*"
          />
          <Field
            label="Email Field Placeholder"
            value={data.formEmailPlaceholder}
            onChange={(v) => updateField("formEmailPlaceholder", v)}
            placeholder="Email*"
          />
          <Field
            label="Subject Field Placeholder"
            value={data.formSubjectPlaceholder}
            onChange={(v) => updateField("formSubjectPlaceholder", v)}
            placeholder="Subject"
          />
          <Field
            label="Message Field Placeholder"
            value={data.formMessagePlaceholder}
            onChange={(v) => updateField("formMessagePlaceholder", v)}
            placeholder="Message"
          />
        </SectionCard>

        {/* Button and Messages */}
        <SectionCard title="Submit Button & Messages" subtitle="Button text and notifications">
          <Field
            label="Submit Button Text"
            value={data.submitButtonText}
            onChange={(v) => updateField("submitButtonText", v)}
            placeholder="SEND NOW!"
          />
          <Field
            label="Success Message"
            value={data.successMessage}
            onChange={(v) => updateField("successMessage", v)}
            placeholder="Message sent successfully!"
          />
          <Field
            label="Error Message"
            value={data.errorMessage}
            onChange={(v) => updateField("errorMessage", v)}
            placeholder="Failed to send message. Try again later."
          />
        </SectionCard>
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
