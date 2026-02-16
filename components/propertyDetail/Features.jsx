"use client";

import { useMemo, useState } from "react";

const FALLBACK_AMENITIES = [
  "Garden",
  "Library",
  "Maintenance Staff",
  "Power Backup",
  "Elevator",
  "Indoor Games",
  "Party Hall",
  "24x7 Water Supply",
  "Car Parking",
  "CCTV",
  "Club House",
  "Gymnasium",
  "Jogging Track",
  "Rainwater Harvesting",
  "Sewage Treatment Plant",
  "Swimming Pool",
  "Kids Play Area",
  "Multipurpose Court",
  "Yoga / Meditation Zone",
  "24x7 Security",
  "Terrace Garden",
  "Community Hall",
  "Fire Fighting System",
  "Energy Management",
];

const DEFAULT_VISIBLE_COUNT = 18;

const firstFilled = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    return value;
  }
  return undefined;
};

const textOf = (value) => (typeof value === "string" ? value.trim() : "");

const iconByAmenityName = (name = "") => {
  const key = name.toLowerCase();
  if (key.includes("garden") || key.includes("landscape")) return "icon-sky-garden";
  if (key.includes("library")) return "icon-file";
  if (key.includes("maintenance")) return "icon-settings";
  if (key.includes("power")) return "icon-check-cycle";
  if (key.includes("elevator") || key.includes("lift")) return "icon-apartment-2";
  if (key.includes("indoor")) return "icon-home";
  if (key.includes("party")) return "icon-family";
  if (key.includes("water")) return "icon-Bathtub";
  if (key.includes("parking")) return "icon-garage";
  if (key.includes("cctv")) return "icon-view";
  if (key.includes("club")) return "icon-office";
  if (key.includes("gym")) return "icon-spa";
  if (key.includes("jog") || key.includes("cycle")) return "icon-check-cycle";
  if (key.includes("swimming") || key.includes("pool")) return "icon-swimming-pool";
  if (key.includes("kids") || key.includes("play")) return "icon-children-play";
  if (key.includes("security")) return "icon-shield";
  if (key.includes("community")) return "icon-home";
  if (key.includes("fire")) return "icon-settings";
  return "icon-check";
};

const toneByAmenityName = (name = "") => {
  const key = name.toLowerCase();
  if (
    key.includes("garden") ||
    key.includes("landscape") ||
    key.includes("rainwater") ||
    key.includes("sewage") ||
    key.includes("terrace") ||
    key.includes("energy")
  ) {
    return "nature";
  }
  if (
    key.includes("gym") ||
    key.includes("jog") ||
    key.includes("cycle") ||
    key.includes("swimming") ||
    key.includes("pool") ||
    key.includes("yoga") ||
    key.includes("court") ||
    key.includes("kids") ||
    key.includes("play")
  ) {
    return "sport";
  }
  if (
    key.includes("cctv") ||
    key.includes("security") ||
    key.includes("fire") ||
    key.includes("maintenance")
  ) {
    return "safety";
  }
  if (
    key.includes("power") ||
    key.includes("elevator") ||
    key.includes("lift") ||
    key.includes("water") ||
    key.includes("parking")
  ) {
    return "utility";
  }
  if (
    key.includes("club") ||
    key.includes("party") ||
    key.includes("community") ||
    key.includes("library") ||
    key.includes("hall")
  ) {
    return "social";
  }
  return "neutral";
};

const normalizeAmenities = (rawAmenities) => {
  if (!Array.isArray(rawAmenities)) return [];

  const items = rawAmenities
    .map((entry, index) => {
      if (typeof entry === "string") {
        const name = entry.trim();
        if (!name) return null;
        return {
          id: `amenity-${index + 1}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          name,
          iconClass: iconByAmenityName(name),
          iconUrl: "",
          tone: toneByAmenityName(name),
        };
      }

      if (entry && typeof entry === "object") {
        const name = textOf(firstFilled(entry.name, entry.label, entry.title));
        if (!name) return null;
        const iconClass = textOf(firstFilled(entry.iconClass, entry.icon, entry.iconName));
        const iconUrl = textOf(firstFilled(entry.iconUrl, entry.iconImage, entry.image));
        const idSource = textOf(firstFilled(entry.id, entry.slug, name));
        return {
          id: `amenity-${idSource.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
          name,
          iconClass: iconClass || iconByAmenityName(name),
          iconUrl,
          tone: textOf(entry.tone) || toneByAmenityName(name),
        };
      }

      return null;
    })
    .filter(Boolean);

  const seen = new Set();
  return items.filter((item) => {
    const key = item.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export default function Features({ property }) {
  const projectName = property?.title || "Godrej Parkshire";
  const amenitiesSource = firstFilled(
    property?.amenities,
    property?.projectDetails?.amenities,
    property?.aboutProject?.amenities
  );

  const amenities = useMemo(() => {
    const normalized = normalizeAmenities(amenitiesSource);
    return normalized.length
      ? normalized
      : normalizeAmenities(FALLBACK_AMENITIES);
  }, [amenitiesSource]);

  const [showAll, setShowAll] = useState(false);
  const visibleAmenities = showAll
    ? amenities
    : amenities.slice(0, DEFAULT_VISIBLE_COUNT);
  const hasMore = amenities.length > DEFAULT_VISIBLE_COUNT;
  const remainingCount = Math.max(0, amenities.length - DEFAULT_VISIBLE_COUNT);
  const toggleLabel = showAll ? "Show Less" : `Show More`;

  return (
    <section className="project-amenities" aria-labelledby="project-amenities-heading">
      <div className="amenities-head">
        <h2 id="project-amenities-heading" className="wg-title text-11 fw-6 text-color-heading">
          Project Amenities
        </h2>
        <p>
          Lifestyle and infrastructure amenities at {projectName}.
        </p>
      </div>

      <div className="amenities-grid" role="list" aria-label="Project amenities list">
        {visibleAmenities.map((item) => (
          <article
            className={`amenity-card amenity-tone--${item.tone || "neutral"}`}
            role="listitem"
            key={item.id}
          >
            <div className="amenity-icon" aria-hidden="true">
              {item.iconUrl ? (
                <img src={item.iconUrl} alt="" loading="lazy" />
              ) : (
                <i className={item.iconClass} />
              )}
            </div>
            <h3 className="amenity-name">{item.name}</h3>
          </article>
        ))}

        {hasMore && (
          <button
            type="button"
            className="amenity-card amenity-card--toggle"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
            aria-label={toggleLabel}
          >
            <span className="toggle-title">{toggleLabel}</span>
            {!showAll && <span className="toggle-sub">+{remainingCount} more</span>}
          </button>
        )}
      </div>
    </section>
  );
}
