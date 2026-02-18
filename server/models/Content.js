const mongoose = require("mongoose");

// ─── Section-specific sub-schemas ────────────────────────────────────────────

const homeSlideSchema = new mongoose.Schema({
  subtitle: String,
  title: String,
  text: String,
  primaryBtn: String,
  secondaryBtn: String,
});

const aboutFeatureSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
});

const eventCardSchema = new mongoose.Schema({
  date: String,
  month: String,
  year: String,
  time: String,
  title: String,
  pastor: String,
  address: String,
  image: String,
});

const sermonCardSchema = new mongoose.Schema({
  category: String,
  title: String,
  desc: String,
  scripture: String,
});

const footerLinkSchema = new mongoose.Schema({
  name: String,
  href: String,
});

// ─── Main content schema ──────────────────────────────────────────────────────
const contentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "home",
        "about",
        "eventHighlight",
        "sermons",
        "eventsGrid",
        "verse",
        "footer",
        "navbar",
        "aboutPage",
        "contactPage",
        "sermonsPage",
        "eventsPage",
      ],
    },

    // ── HOME ──────────────────────────────────────────────────────────────
    home: {
      slides: [homeSlideSchema],
    },

    // ── ABOUT ─────────────────────────────────────────────────────────────
    about: {
      label: String,
      heading: String,
      description: String,
      readMoreLabel: String,
      features: [aboutFeatureSchema],
    },

    // ── EVENT HIGHLIGHT (Events.jsx) ──────────────────────────────────────
    eventHighlight: {
      upcomingEvent: {
        title: String,
        time: String,
        location: String,
        description: String,
      },
      latestSermon: {
        title: String,
        pastor: String,
        date: String,
        quote: String,
        audioSrc: String,
      },
    },

    // ── SERMONS PAGE ──────────────────────────────────────────────────────
    sermons: {
      sectionLabel: String,
      heading: String,
      cards: [sermonCardSchema],
    },

    // ── EVENTS GRID (Eventstwo.jsx) ───────────────────────────────────────
    eventsGrid: {
      sectionLabel: String,
      heading: String,
      events: [eventCardSchema],
    },

    // ── VERSE SECTION ─────────────────────────────────────────────────────
    verse: {
      slides: [
        {
          title: String,
          verse: String,
          ref: String,
        },
      ],
    },

    // ── FOOTER ────────────────────────────────────────────────────────────
    footer: {
      newsletterTitle: String,
      newsletterDesc: String,
      newsletterCta: String,
      latestNewsTitle: String,
      latestNewsItems: [
        {
          title: String,
          date: String,
        },
      ],
      usefulLinks: [
        {
          label: String,
        },
      ],
      socialLinks: [footerLinkSchema],
      copyrightName: String,
      designerName: String,
    },

    // ── NAVBAR ────────────────────────────────────────────────────────────
    navbar: {
      donateLabel: String,
    },

    // ── ABOUT PAGE ────────────────────────────────────────────────────────
    aboutPage: {
      heroTitle: String,
      breadcrumbHome: String,
      breadcrumbCurrent: String,
      introLabel: String,
      introHeading: String,
      historyTitle: String,
      historyParagraph1: String,
      historyParagraph2: String,
      missionTitle: String,
      missionParagraph1: String,
      missionParagraph2: String,
      valuesTitle: String,
      values: [
        {
          title: String,
          icon: String,
          description: String,
        },
      ],
      quoteText: String,
    },

    // ── CONTACT PAGE ──────────────────────────────────────────────────────
    contactPage: {
      heroTitle: String,
      breadcrumbHome: String,
      breadcrumbCurrent: String,
      sectionLabel: String,
      sectionHeading: String,
      formNamePlaceholder: String,
      formEmailPlaceholder: String,
      formSubjectPlaceholder: String,
      formMessagePlaceholder: String,
      submitButtonText: String,
      successMessage: String,
      errorMessage: String,
    },

    // ── SERMONS PAGE ──────────────────────────────────────────────────────
    sermonsPage: {
      heroTitle: String,
      breadcrumbHome: String,
      breadcrumbCurrent: String,
      sectionLabel: String,
      sectionHeading: String,
      sermons: [
        {
          title: String,
          preacher: String,
          date: String,
          desc: String,
          audio: String,
        },
      ],
    },

    // ── EVENTS PAGE ───────────────────────────────────────────────────────
    eventsPage: {
      heroTitle: String,
      breadcrumbHome: String,
      breadcrumbCurrent: String,
      sectionLabel: String,
      sectionHeading: String,
      events: [
        {
          date: String,
          month: String,
          time: String,
          title: String,
          address: String,
          image: String,
        },
      ],
      upcomingSermonsLabel: String,
      upcomingSermonsHeading: String,
      upcomingSermons: [
        {
          date: String,
          category: String,
          title: String,
          desc: String,
          author: String,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
