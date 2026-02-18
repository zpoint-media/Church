import { useState, useEffect } from "react";
import { getSection, saveSection } from "../api";
import {
  Field,
  SectionCard,
  SaveBar,
  ArrayItemHeader,
  AddButton,
} from "../components/FieldEditor";

export default function FooterEditor() {
  const [data, setData] = useState({
    newsletterTitle: "Newsletter",
    newsletterDesc: "",
    newsletterCta: "Get Our Newsletter",
    latestNewsTitle: "Latest News",
    latestNewsItems: [],
    usefulLinks: [],
    socialLinks: [],
    copyrightName: "Grace Church",
    designerName: "T-Codes",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("footer")
      .then((res) => setData(res.data || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function set(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  // ── News items ────────────────────────────────────────────────────────────
  function updateNews(i, field, value) {
    const arr = [...data.latestNewsItems];
    arr[i] = { ...arr[i], [field]: value };
    set("latestNewsItems", arr);
  }
  function deleteNews(i) {
    set("latestNewsItems", data.latestNewsItems.filter((_, idx) => idx !== i));
  }
  function addNews() {
    set("latestNewsItems", [...data.latestNewsItems, { title: "", date: "" }]);
  }

  // ── Useful links ──────────────────────────────────────────────────────────
  function updateLink(i, value) {
    const arr = [...data.usefulLinks];
    arr[i] = { label: value };
    set("usefulLinks", arr);
  }
  function deleteLink(i) {
    set("usefulLinks", data.usefulLinks.filter((_, idx) => idx !== i));
  }
  function addLink() {
    set("usefulLinks", [...data.usefulLinks, { label: "" }]);
  }

  // ── Social links ──────────────────────────────────────────────────────────
  function updateSocial(i, field, value) {
    const arr = [...data.socialLinks];
    arr[i] = { ...arr[i], [field]: value };
    set("socialLinks", arr);
  }
  function deleteSocial(i) {
    set("socialLinks", data.socialLinks.filter((_, idx) => idx !== i));
  }
  function addSocial() {
    set("socialLinks", [...data.socialLinks, { name: "", href: "" }]);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await saveSection("footer", data);
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
          Footer
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Edit the newsletter, latest news, links, social icons and copyright text in the footer.
        </p>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />

      <div className="space-y-5 mt-2">
        {/* Newsletter */}
        <SectionCard title="Newsletter Column">
          <Field label="Column Title" value={data.newsletterTitle} onChange={(v) => set("newsletterTitle", v)} placeholder="Newsletter" />
          <Field label="Description" value={data.newsletterDesc} onChange={(v) => set("newsletterDesc", v)} type="textarea" rows={3} placeholder="Stay connected with our community…" />
          <Field label="CTA Label" value={data.newsletterCta} onChange={(v) => set("newsletterCta", v)} placeholder="Get Our Newsletter" />
        </SectionCard>

        {/* Latest News */}
        <SectionCard title="Latest News Column">
          <Field label="Column Title" value={data.latestNewsTitle} onChange={(v) => set("latestNewsTitle", v)} placeholder="Latest News" />
          <div className="space-y-3 mt-2">
            {data.latestNewsItems?.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <ArrayItemHeader
                  index={i}
                  total={data.latestNewsItems.length}
                  label="News"
                  onMoveUp={() => {
                    const arr = [...data.latestNewsItems];
                    if (i === 0) return;
                    [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                    set("latestNewsItems", arr);
                  }}
                  onMoveDown={() => {
                    const arr = [...data.latestNewsItems];
                    if (i === arr.length - 1) return;
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    set("latestNewsItems", arr);
                  }}
                  onDelete={() => deleteNews(i)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Title" value={item.title} onChange={(v) => updateNews(i, "title", v)} placeholder="Lord of our life…" />
                  <Field label="Date" value={item.date} onChange={(v) => updateNews(i, "date", v)} placeholder="12 May 2025" />
                </div>
              </div>
            ))}
            <AddButton onClick={addNews} label="Add News Item" />
          </div>
        </SectionCard>

        {/* Useful Links */}
        <SectionCard title="Useful Links Column">
          <div className="space-y-2">
            {data.usefulLinks?.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <Field
                    label={i === 0 ? "Link Label" : ""}
                    value={link.label}
                    onChange={(v) => updateLink(i, v)}
                    placeholder="Who we are?"
                  />
                </div>
                <button
                  onClick={() => deleteLink(i)}
                  className="mt-1 text-red-400/40 hover:text-red-400 transition text-sm px-2"
                >✕</button>
              </div>
            ))}
            <AddButton onClick={addLink} label="Add Link" />
          </div>
        </SectionCard>

        {/* Social Links */}
        <SectionCard title="Social Links Bar" subtitle="The 5 social links shown as a row">
          <div className="space-y-3">
            {data.socialLinks?.map((social, i) => (
              <div
                key={i}
                className="p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-500/60 text-xs font-semibold uppercase tracking-widest">
                    Social {i + 1}
                  </span>
                  <button
                    onClick={() => deleteSocial(i)}
                    className="text-red-400/40 hover:text-red-400 transition text-xs"
                  >✕</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Display Name" value={social.name} onChange={(v) => updateSocial(i, "name", v)} placeholder="Facebook" />
                  <Field label="URL / href" value={social.href} onChange={(v) => updateSocial(i, "href", v)} placeholder="https://facebook.com" />
                </div>
              </div>
            ))}
            <AddButton onClick={addSocial} label="Add Social Link" />
          </div>
        </SectionCard>

        {/* Copyright */}
        <SectionCard title="Copyright Bar">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Church / Brand Name" value={data.copyrightName} onChange={(v) => set("copyrightName", v)} placeholder="Grace Church" />
            <Field label="Designer Name" value={data.designerName} onChange={(v) => set("designerName", v)} placeholder="T-Codes" />
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
      </div>
    </div>
  );
}
