import React from "react";

const firstFilled = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    return value;
  }
  return undefined;
};

const toText = (value, fallback = "-") => {
  if (value === undefined || value === null) return fallback;
  if (Array.isArray(value)) {
    const parsed = value
      .map((item) => toText(item, ""))
      .filter(Boolean);
    return parsed.length ? parsed.join(", ") : fallback;
  }
  if (typeof value === "object") {
    if (value?.label) return String(value.label);
    if (value?.name) return String(value.name);
    return fallback;
  }
  const parsed = String(value).trim();
  return parsed || fallback;
};

const formatInrCompact = (rawValue) => {
  const value = Number(String(rawValue ?? "").replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(value) || value <= 0) return "";
  const normalized = value < 100000 ? value * 1000 : value;
  if (normalized >= 10000000) return `₹ ${(normalized / 10000000).toFixed(2)} Cr`;
  if (normalized >= 100000) return `₹ ${(normalized / 100000).toFixed(2)} L`;
  return `₹ ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(normalized)}`;
};

const fallbackHighlights = (property) => {
  const details = property?.projectDetails || {};
  const beds = toText(firstFilled(property?.beds, details?.beds), "3");
  const configs = toText(
    firstFilled(
      property?.configurations,
      property?.configuration,
      details?.configurations,
      details?.configuration
    ),
    `${beds} BHK`
  );
  const price = formatInrCompact(firstFilled(property?.price, details?.startingPrice));

  return [
    {
      id: "highlight-config",
      title: "Configurations",
      value: configs,
      iconClass: "icon-apartment-2",
      tone: "blue",
    },
    {
      id: "highlight-possession",
      title: "Possession",
      value: toText(firstFilled(property?.possessionDate, details?.possessionDate), "2029"),
      iconClass: "icon-clock",
      tone: "purple",
    },
    {
      id: "highlight-area",
      title: "Development Area",
      value: toText(firstFilled(property?.developmentArea, details?.developmentArea), "16 Acres"),
      iconClass: "icon-sky-garden",
      tone: "green",
    },
    {
      id: "highlight-units",
      title: "Total Units",
      value: toText(firstFilled(property?.totalUnits, details?.totalUnits), "980 Units"),
      iconClass: "icon-home",
      tone: "orange",
    },
    {
      id: "highlight-rera",
      title: "RERA",
      value: toText(firstFilled(property?.projectReraId, property?.reraId, details?.projectReraId), "PRM/KA/RERA/1250/304/PR/090126/008393"),
      iconClass: "icon-shield",
      tone: "red",
    },
    {
      id: "highlight-price",
      title: "Starting Price",
      value: price || "₹ 1.17 Cr Onwards",
      iconClass: "icon-money",
      tone: "teal",
    },
  ];
};

const normalizeHighlights = (raw, property) => {
  if (!Array.isArray(raw) || raw.length === 0) return fallbackHighlights(property);

  const normalized = raw
    .map((entry, index) => {
      if (typeof entry === "string") {
        const title = entry.trim();
        if (!title) return null;
        return {
          id: `highlight-${index + 1}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          title,
          value: "",
          iconClass: "icon-check",
          tone: "blue",
        };
      }
      if (!entry || typeof entry !== "object") return null;

      const title = toText(firstFilled(entry.title, entry.label, entry.name), "");
      if (!title) return null;

      return {
        id: `highlight-${toText(firstFilled(entry.id, entry.slug, title), title)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
        title,
        value: toText(entry.value, ""),
        iconClass: toText(firstFilled(entry.iconClass, entry.icon), "icon-check"),
        tone: toText(entry.tone, "blue").toLowerCase(),
      };
    })
    .filter(Boolean);

  return normalized.length ? normalized : fallbackHighlights(property);
};

export default function ProjectHighlights({ property }) {
  const source = firstFilled(
    property?.projectHighlights,
    property?.projectDetails?.highlights,
    property?.highlights
  );
  const highlights = normalizeHighlights(source, property);

  return (
    <section className="project-highlights" aria-labelledby="project-highlights-heading">
      <div className="project-section-head">
        <h2 id="project-highlights-heading" className="wg-title text-11 fw-6 text-color-heading">
          Project Highlights
        </h2>
        <p>Quick facts and key USP points for this project.</p>
      </div>

      <div className="project-highlights-grid" role="list" aria-label="Project highlights list">
        {highlights.map((item) => (
          <article
            className={`project-highlight-card tone-${item.tone || "blue"}`}
            role="listitem"
            key={item.id}
          >
            <div className="highlight-icon" aria-hidden="true">
              <i className={item.iconClass} />
            </div>
            <div className="highlight-content">
              <p className="highlight-title">{item.title}</p>
              {item.value ? <p className="highlight-value">{item.value}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
