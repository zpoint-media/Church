import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import {
  Field,
  SectionCard,
  SaveBar,
  ArrayItemHeader,
  AddButton,
} from "../components/FieldEditor";

const emptyCard = {
  category: "",
  title: "",
  desc: "",
  scripture: "",
};

export default function SermonsEditor() {
  const [sectionLabel, setSectionLabel] = useState("Join Our Community");
  const [heading, setHeading] = useState("Recent Sermons");
  const [cards, setCards] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("sermons")
      .then((res) => {
        const d = res.data || {};
        setSectionLabel(d.sectionLabel || "Join Our Community");
        setHeading(d.heading || "Recent Sermons");
        setCards(d.cards || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function updateCard(index, field, value) {
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
    setSaved(false);
  }

  function moveCard(index, dir) {
    const arr = [...cards];
    const t = index + dir;
    if (t < 0 || t >= arr.length) return;
    [arr[index], arr[t]] = [arr[t], arr[index]];
    setCards(arr);
    setSaved(false);
  }

  function deleteCard(index) {
    setCards((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  }

  function addCard() {
    setCards((prev) => [...prev, { ...emptyCard }]);
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("sermons", { sectionLabel, heading, cards });
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
          Sermons Section
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Manage the carousel of sermon cards shown on the Sermons page.
        </p>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />

      <div className="space-y-5 mt-2">
        {/* Section header */}
        <SectionCard title="Section Header">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Section Label"
              value={sectionLabel}
              onChange={(v) => { setSectionLabel(v); setSaved(false); }}
              placeholder="Join Our Community"
            />
            <Field
              label="Section Heading"
              value={heading}
              onChange={(v) => { setHeading(v); setSaved(false); }}
              placeholder="Recent Sermons"
            />
          </div>
        </SectionCard>

        {/* Sermon cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest">
              Sermon Cards ({cards.length})
            </h2>
            <span className="text-white/25 text-xs">Dates are auto-calculated from recent Sundays</span>
          </div>

          {cards.map((card, i) => (
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
                total={cards.length}
                label="Sermon"
                onMoveUp={() => moveCard(i, -1)}
                onMoveDown={() => moveCard(i, 1)}
                onDelete={() => deleteCard(i)}
              />

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Category (yellow tag)"
                    value={card.category}
                    onChange={(v) => updateCard(i, "category", v)}
                    placeholder="Faith & Trust"
                  />
                  <Field
                    label="Scripture Reference"
                    value={card.scripture}
                    onChange={(v) => updateCard(i, "scripture", v)}
                    placeholder="2 Corinthians 5:7"
                  />
                </div>
                <Field
                  label="Sermon Title"
                  value={card.title}
                  onChange={(v) => updateCard(i, "title", v)}
                  placeholder="Walking by Faith, Not by Sight"
                />
                <Field
                  label="Description"
                  value={card.desc}
                  onChange={(v) => updateCard(i, "desc", v)}
                  type="textarea"
                  rows={2}
                  placeholder="Learn how to trust God fully even when the path ahead is unclear…"
                />
              </div>
            </div>
          ))}

          <AddButton onClick={addCard} label="Add Sermon Card" />
        </div>
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
