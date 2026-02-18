"use client";

import { useMemo, useState } from "react";

const DEFAULT_VISIBLE_CONNECTIVITY = 6;

const firstFilled = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    return value;
  }
  return undefined;
};

const toText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  if (typeof value === "object") {
    if (value?.name) return String(value.name);
    if (value?.label) return String(value.label);
    return fallback;
  }
  const parsed = String(value).trim();
  return parsed || fallback;
};

const fallbackConnectivity = [
  { id: "conn-1", place: "Namma Metro - Whitefield", distance: "5.4 km", time: "12 min", type: "Metro" },
  { id: "conn-2", place: "ITPL Tech Park", distance: "6.8 km", time: "15 min", type: "IT Hub" },
  { id: "conn-3", place: "Kempegowda International Airport", distance: "39 km", time: "55 min", type: "Airport" },
  { id: "conn-4", place: "Sakra World Hospital", distance: "7.2 km", time: "16 min", type: "Hospital" },
  { id: "conn-5", place: "Nexus Shantiniketan Mall", distance: "6.1 km", time: "14 min", type: "Mall" },
  { id: "conn-6", place: "ORR - Marathahalli Junction", distance: "8.3 km", time: "20 min", type: "Road Link" },
  { id: "conn-7", place: "National Highway 75 Access", distance: "4.9 km", time: "11 min", type: "Road Link" },
  { id: "conn-8", place: "Vydehi Institute of Medical Sciences", distance: "7.8 km", time: "18 min", type: "Hospital" },
  { id: "conn-9", place: "Forum Shantiniketan", distance: "6.4 km", time: "15 min", type: "Mall" },
  { id: "conn-10", place: "KR Puram Railway Station", distance: "9.1 km", time: "23 min", type: "Railway" },
];

const iconByType = (type = "") => {
  const key = type.toLowerCase();
  if (key.includes("metro") || key.includes("rail")) return "icon-arrow-right-3";
  if (key.includes("airport")) return "icon-send-message";
  if (key.includes("hospital")) return "icon-shield";
  if (key.includes("mall")) return "icon-office";
  if (key.includes("school") || key.includes("college")) return "icon-file";
  if (key.includes("it")) return "icon-settings";
  if (key.includes("road")) return "icon-location-2";
  return "icon-location";
};

const toneByType = (type = "") => {
  const key = type.toLowerCase();
  if (key.includes("metro") || key.includes("rail") || key.includes("road")) return "blue";
  if (key.includes("airport")) return "teal";
  if (key.includes("hospital")) return "red";
  if (key.includes("school") || key.includes("college")) return "purple";
  if (key.includes("it") || key.includes("mall")) return "orange";
  return "green";
};

const normalizeConnectivity = (raw) => {
  const source = Array.isArray(raw) && raw.length ? raw : fallbackConnectivity;

  const normalized = source
    .map((entry, index) => {
      if (typeof entry === "string") {
        const place = entry.trim();
        if (!place) return null;
        return {
          id: `conn-${index + 1}-${place.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          place,
          distance: "",
          time: "",
          type: "Nearby",
        };
      }
      if (!entry || typeof entry !== "object") return null;

      const place = toText(firstFilled(entry.place, entry.name, entry.title, entry.location), "");
      if (!place) return null;
      const type = toText(firstFilled(entry.type, entry.category), "Nearby");

      return {
        id: `conn-${toText(firstFilled(entry.id, entry.slug, place), place)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
        place,
        distance: toText(firstFilled(entry.distance, entry.distanceKm), ""),
        time: toText(firstFilled(entry.time, entry.travelTime), ""),
        type,
      };
    })
    .filter(Boolean);

  const seen = new Set();
  return normalized.filter((item) => {
    const key = `${item.place.toLowerCase()}|${item.type.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export default function ProjectConnectivity({ property }) {
  const source = firstFilled(
    property?.projectConnectivity,
    property?.projectDetails?.connectivity,
    property?.connectivity
  );
  const items = useMemo(() => normalizeConnectivity(source), [source]);
  const typeFilters = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.type).filter(Boolean)))],
    [items]
  );

  const [activeType, setActiveType] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredItems = useMemo(
    () => (activeType === "All" ? items : items.filter((item) => item.type === activeType)),
    [items, activeType]
  );
  const visibleItems = showAll
    ? filteredItems
    : filteredItems.slice(0, DEFAULT_VISIBLE_CONNECTIVITY);
  const hasMore = filteredItems.length > DEFAULT_VISIBLE_CONNECTIVITY;
  const remainingCount = Math.max(0, filteredItems.length - DEFAULT_VISIBLE_CONNECTIVITY);

  return (
    <section className="project-connectivity" aria-labelledby="project-connectivity-heading">
      <div className="project-section-head">
        <h2 id="project-connectivity-heading" className="wg-title text-11 fw-6 text-color-heading">
          Project Connectivity
        </h2>
        <p>Distance and travel time to key city touchpoints.</p>
      </div>

      {typeFilters.length > 1 && (
        <div className="project-connectivity-filters" role="tablist" aria-label="Connectivity category filters">
          {typeFilters.map((type) => (
            <button
              type="button"
              key={`connectivity-filter-${type}`}
              className={`connectivity-filter-chip${activeType === type ? " active" : ""}`}
              onClick={() => {
                setActiveType(type);
                setShowAll(false);
              }}
              role="tab"
              aria-selected={activeType === type}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      <div className="project-connectivity-grid" role="list" aria-label="Project connectivity list">
        {visibleItems.map((item) => (
          <article
            className={`project-connectivity-card tone-${toneByType(item.type)}`}
            role="listitem"
            key={item.id}
          >
            <div className="connectivity-top">
              <span className="connectivity-icon" aria-hidden="true">
                <i className={iconByType(item.type)} />
              </span>
              <span className="connectivity-type">{item.type}</span>
            </div>
            <h3 className="connectivity-place">{item.place}</h3>
            <div className="connectivity-meta">
              {item.distance ? <span>{item.distance}</span> : null}
              {item.time ? <span>{item.time}</span> : null}
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="project-connectivity-actions">
          <button
            type="button"
            className="project-connectivity-toggle"
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
