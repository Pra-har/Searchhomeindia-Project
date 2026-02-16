import Link from "next/link";
import React from "react";

const MAX_VISIBLE_CHIPS = 3;

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
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string") {
    const parsed = value.trim();
    return parsed || fallback;
  }
  return fallback;
};

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item && typeof item === "object") {
          return toText(firstFilled(item.name, item.label, item.title), "");
        }
        return "";
      })
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/[|,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const toNumberText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string") {
    const parsed = value.replace(/[^0-9]/g, "");
    return parsed || fallback;
  }
  return fallback;
};

const formatStat = (value, suffix = "") => {
  if (!value) return "N/A";
  return `${value}${suffix}`;
};

export default function AboutBuilder({ property }) {
  const builderSource = firstFilled(
    property?.aboutBuilder,
    property?.builderProfile,
    property?.builderDetails,
    property?.developer,
    property?.projectDetails?.builderInfo,
    {}
  );

  const builderName = firstFilled(
    toText(firstFilled(builderSource?.name, builderSource?.builderName), ""),
    toText(property?.builder, ""),
    toText(property?.projectDetails?.builder, ""),
    "Godrej Properties"
  );

  const builderLogo = firstFilled(
    toText(firstFilled(builderSource?.logo, builderSource?.logoUrl, builderSource?.image), ""),
    toText(property?.builderLogo, ""),
    toText(property?.developer?.logo, ""),
    toText(property?.aboutProject?.logo, ""),
    "/images/logo/favicon.png"
  );

  const tagline = firstFilled(
    toText(firstFilled(builderSource?.tagline, builderSource?.subtitle), ""),
    "Trusted real estate developer with a strong delivery track record."
  );

  const aboutText = firstFilled(
    toText(firstFilled(builderSource?.description, builderSource?.about, builderSource?.overview), ""),
    `${builderName} has developed residential communities across major Indian markets with a focus on quality construction, timely handover, and long-term value for homeowners.`
  );

  const establishedYear = toText(
    firstFilled(
      builderSource?.establishedYear,
      builderSource?.foundedYear,
      builderSource?.since
    ),
    "1990"
  );
  const deliveredCount = toNumberText(
    firstFilled(builderSource?.deliveredProjects, builderSource?.projectsDelivered),
    "120"
  );
  const ongoingCount = toNumberText(
    firstFilled(builderSource?.ongoingProjects, builderSource?.activeProjects),
    "45"
  );
  const cityCount = toNumberText(
    firstFilled(builderSource?.citiesCount, builderSource?.cityPresence),
    "10"
  );

  const cityCoverage = toArray(
    firstFilled(
      builderSource?.cities,
      builderSource?.cityCoverage,
      builderSource?.presenceCities
    )
  );
  const visibleCities =
    cityCoverage.length > 0
      ? cityCoverage
      : ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Chennai", "Pune"];

  const keyProjects = toArray(
    firstFilled(builderSource?.keyProjects, builderSource?.landmarkProjects)
  );
  const visibleProjects =
    keyProjects.length > 0
      ? keyProjects
      : [
          "Godrej Park Retreat - Bangalore",
          "Godrej Woods - Noida",
          "Godrej Urban Park - Mumbai",
        ];

  const listingPath = toText(
    firstFilled(property?.routes?.listing, property?.routes?.listingPath),
    "/property-listing"
  );

  const shownCities = visibleCities.slice(0, MAX_VISIBLE_CHIPS);
  const shownProjects = visibleProjects.slice(0, MAX_VISIBLE_CHIPS);
  const hiddenCitiesCount = Math.max(0, visibleCities.length - shownCities.length);
  const hiddenProjectsCount = Math.max(0, visibleProjects.length - shownProjects.length);

  const website = toText(firstFilled(builderSource?.website, builderSource?.url), "");

  return (
    <section className="project-builder" aria-labelledby="project-builder-heading">
      <div className="project-section-head">
        <h2 id="project-builder-heading" className="wg-title text-11 fw-6 text-color-heading">
          About Builder
        </h2>
        <p>Builder profile, delivery record, and key city presence.</p>
      </div>

      <div className="builder-panel">
        <div className="builder-brand-row">
          <div className="builder-brand">
            <span className="builder-logo">
              <img src={builderLogo} alt={`${builderName} logo`} loading="lazy" />
            </span>
            <div className="builder-title-wrap">
              <h3>{builderName}</h3>
              <p>{tagline}</p>
            </div>
          </div>
          {website ? (
            <a href={website} target="_blank" rel="noreferrer" className="builder-website">
              <i className="icon-send-message" />
              Visit Website
            </a>
          ) : null}
        </div>

        <p className="builder-description">{aboutText}</p>

        <div className="builder-stats" role="list" aria-label="Builder key stats">
          <article className="builder-stat-item" role="listitem">
            <p className="label">Established</p>
            <p className="value">{formatStat(establishedYear)}</p>
          </article>
          <article className="builder-stat-item" role="listitem">
            <p className="label">Projects Delivered</p>
            <p className="value">{formatStat(deliveredCount, "+")}</p>
          </article>
          <article className="builder-stat-item" role="listitem">
            <p className="label">Ongoing Projects</p>
            <p className="value">{formatStat(ongoingCount, "+")}</p>
          </article>
          <article className="builder-stat-item" role="listitem">
            <p className="label">Cities Presence</p>
            <p className="value">{formatStat(cityCount, "+")}</p>
          </article>
        </div>

        <div className="builder-bottom-grid">
          <div className="builder-chip-group">
            <p className="group-title">Active Cities</p>
            <div className="chip-wrap">
              {shownCities.map((city, idx) => (
                <Link
                  href={{
                    pathname: listingPath,
                    query: { city, builder: builderName },
                  }}
                  className="chip chip-link"
                  key={`builder-city-${idx}-${city}`}
                >
                  <i className="icon-location" />
                  {city}
                </Link>
              ))}
              {hiddenCitiesCount > 0 ? (
                <span className="chip chip-ellipsis" title={`${hiddenCitiesCount} more cities`}>
                  ...
                </span>
              ) : null}
            </div>
          </div>

          <div className="builder-chip-group">
            <p className="group-title">Popular Projects</p>
            <div className="chip-wrap">
              {shownProjects.map((projectName, idx) => (
                <Link
                  href={{
                    pathname: listingPath,
                    query: { project: projectName, builder: builderName },
                  }}
                  className="chip chip-project chip-link"
                  key={`builder-project-${idx}-${projectName}`}
                >
                  <i className="icon-home" />
                  {projectName}
                </Link>
              ))}
              {hiddenProjectsCount > 0 ? (
                <span className="chip chip-ellipsis" title={`${hiddenProjectsCount} more projects`}>
                  ...
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
