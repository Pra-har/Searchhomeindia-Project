"use client";

import { useMemo, useState } from "react";

const DEFAULT_VISIBLE_POINTS = 10;

const FALLBACK_POINTS = [
  "Prime location in Kharghar, Navi Mumbai - a well-developed and rapidly growing suburb.",
  "Spacious and thoughtfully designed 2 & 3 BHK luxury residences.",
  "High-end security systems with 24/7 surveillance.",
  "Excellent connectivity to major highways, railway networks, and upcoming Navi Mumbai International Airport.",
  "Close proximity to reputed schools, colleges, and leading healthcare centres.",
  "Modern lifestyle amenities including a gymnasium, swimming pool, and recreational spaces.",
  "State-of-the-art 50,000 sq.ft. clubhouse with curated leisure and social spaces.",
  "Eco-conscious planning with expansive landscaped open areas.",
  "Well-planned internal infrastructure for comfortable and seamless daily living.",
  "EOI Benefits up to ₹40 Lakhs* | EOI Starts from ₹2 Lakhs*",
];

const firstFilled = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    return value;
  }
  return undefined;
};

const cleanPoint = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/^\s*[→•\-]+\s*/g, "").trim();
};

const normalizeHighlightPoints = (raw) => {
  let base = [];

  if (Array.isArray(raw)) {
    base = raw;
  } else if (typeof raw === "string") {
    base = raw
      .split(/\r?\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  const normalized = base
    .map((entry, index) => {
      if (typeof entry === "string") {
        const text = cleanPoint(entry);
        if (!text) return null;
        return {
          id: `highlight-point-${index + 1}-${text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")}`,
          text,
          iconClass: "icon-check",
          tag: "",
        };
      }

      if (!entry || typeof entry !== "object") return null;
      const pointText = cleanPoint(
        firstFilled(entry.point, entry.text, entry.description, entry.title) || ""
      );
      if (!pointText) return null;

      return {
        id: `highlight-point-${String(firstFilled(entry.id, entry.slug, index + 1))
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`,
        text: pointText,
        iconClass:
          typeof firstFilled(entry.iconClass, entry.icon) === "string"
            ? firstFilled(entry.iconClass, entry.icon)
            : "icon-check",
        tag:
          typeof firstFilled(entry.tag, entry.category, entry.type) === "string"
            ? firstFilled(entry.tag, entry.category, entry.type)
            : "",
      };
    })
    .filter(Boolean);

  const seen = new Set();
  return normalized.filter((item) => {
    const key = item.text.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export default function ProjectHighlights({ property }) {
  const source = firstFilled(
    property?.projectHighlights,
    property?.projectDetails?.highlights,
    property?.highlights
  );

  const points = useMemo(() => {
    const parsed = normalizeHighlightPoints(source);
    return parsed.length ? parsed : normalizeHighlightPoints(FALLBACK_POINTS);
  }, [source]);

  const [showAll, setShowAll] = useState(false);
  const visiblePoints = showAll ? points : points.slice(0, DEFAULT_VISIBLE_POINTS);
  const hasMore = points.length > DEFAULT_VISIBLE_POINTS;
  const remainingCount = Math.max(0, points.length - DEFAULT_VISIBLE_POINTS);

  return (
    <section className="project-highlights" aria-labelledby="project-highlights-heading">
      <div className="project-section-head">
        <h2 id="project-highlights-heading" className="wg-title text-11 fw-6 text-color-heading">
          Project Highlights
        </h2>
        <p>Key points that define project quality, location advantage, and lifestyle value.</p>
      </div>

      <div className="project-highlights-points" role="list" aria-label="Project highlights points">
        {visiblePoints.map((point) => (
          <article className="highlight-point-card" role="listitem" key={point.id}>
            <span className="point-icon" aria-hidden="true">
              <i className={point.iconClass || "icon-check"} />
            </span>
            <div className="point-content">
              <p className="point-text">{point.text}</p>
              {point.tag ? <span className="point-tag">{point.tag}</span> : null}
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="project-highlights-actions">
          <button
            type="button"
            className="project-highlights-toggle"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
          >
            {showAll ? "Show Less" : `Show ${remainingCount} More`}
          </button>
        </div>
      )}
    </section>
  );
}
