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
  const parsed = String(value).trim();
  return parsed || fallback;
};

const splitLocation = (location) => {
  if (typeof location !== "string" || !location.trim()) {
    return { city: "Bangalore", state: "Karnataka" };
  }
  const parts = location
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const city = parts[parts.length - 1] || "Bangalore";
  const state = parts[parts.length - 2] || "Karnataka";
  return { city, state };
};

export default function Location({ property }) {
  const mapSource = property?.projectLocationMap || property?.projectDetails?.locationMap || {};
  const details = property?.projectDetails || {};
  const projectName = property?.title || "Godrej Parkshire";
  const address = toText(
    firstFilled(mapSource?.address, property?.location, details?.location),
    "Hoskote, Whitefield, Bangalore"
  );
  const split = splitLocation(address);
  const city = toText(firstFilled(mapSource?.city, details?.city, split.city), "Bangalore");
  const state = toText(firstFilled(mapSource?.state, details?.state, "Karnataka"), "Karnataka");
  const pincode = toText(firstFilled(mapSource?.pincode, details?.pincode), "560066");
  const landmark = toText(firstFilled(mapSource?.landmark, mapSource?.nearbyLandmark), "Near Whitefield Metro Station");
  const mapEmbedUrl =
    firstFilled(mapSource?.embedUrl, mapSource?.iframeUrl) ||
    `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const openMapUrl =
    firstFilled(mapSource?.openMapUrl, mapSource?.googleMapUrl) ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section className="project-location-map" aria-labelledby="project-location-map-heading">
      <div className="project-section-head">
        <h2 id="project-location-map-heading" className="wg-title text-11 fw-6 text-color-heading">
          Project Location Map
        </h2>
        <p>Exact location details and map direction for {projectName}.</p>
      </div>

      <div className="project-location-layout">
        <div className="project-map-frame-wrap">
          <iframe
            className="project-map-frame"
            src={mapEmbedUrl}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <aside className="project-location-panel">
          <h3>{projectName}</h3>
          <p className="address">
            <i className="icon-location" />
            {address}
          </p>

          <div className="location-info-grid">
            <div className="location-info-card">
              <span className="label">City</span>
              <span className="value">{city}</span>
            </div>
            <div className="location-info-card">
              <span className="label">State</span>
              <span className="value">{state}</span>
            </div>
            <div className="location-info-card">
              <span className="label">Pincode</span>
              <span className="value">{pincode}</span>
            </div>
            <div className="location-info-card">
              <span className="label">Landmark</span>
              <span className="value">{landmark}</span>
            </div>
          </div>

          <a href={openMapUrl} target="_blank" rel="noreferrer" className="tf-btn bg-color-primary w-full">
            <i className="icon-location-2" />
            Open in Google Maps
          </a>
        </aside>
      </div>
    </section>
  );
}
