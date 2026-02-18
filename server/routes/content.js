const express = require("express");
const Content = require("../models/Content");
const protect = require("../middleware/auth");

const router = express.Router();

/** Strip Mongoose internal fields from a plain object */
function clean(obj) {
  if (!obj) return {};
  const plain = typeof obj.toObject === "function" ? obj.toObject() : { ...obj };
  const { _id, __v, createdAt, updatedAt, ...rest } = plain;
  return rest;
}

// ─── GET all sections ─────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const docs = await Content.find({});
    const result = {};
    docs.forEach((doc) => {
      result[doc.section] = clean(doc[doc.section]);
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── GET single section ───────────────────────────────────────────────────────
router.get("/:section", async (req, res) => {
  try {
    const doc = await Content.findOne({ section: req.params.section });
    if (!doc) {
      return res.status(404).json({ message: "Section not found", data: {} });
    }
    const payload = clean(doc[req.params.section]);
    // Return payload both flat AND under 'data' key for compatibility
    res.json({ ...payload, data: payload, section: req.params.section });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
});

// ─── PUT update a section (JWT protected) ────────────────────────────────────
router.put("/:section", protect, async (req, res) => {
  try {
    const { section } = req.params;
    const payload = req.body;

    const doc = await Content.findOneAndUpdate(
      { section },
      { $set: { [section]: payload, section } },
      { new: true, upsert: true, runValidators: false }
    );

    const saved = clean(doc[section]);
    res.json({ message: "Saved successfully", section, data: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
