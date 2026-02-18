import React from "react";
import { getPropertyDetailAdapter } from "./propertyDetailAdapter";

export default function ExtraInfo({ property }) {
  const detailData = getPropertyDetailAdapter(property);
  const trustBadge = detailData.trustBadge;

  const keyPills = [
    {
      id: "statusType",
      label: "Status",
      icon: "icon-settings",
      value: detailData.statusType,
    },
    {
      id: "propertyType",
      label: "Type",
      icon: "icon-home",
      value: detailData.propertyType,
    },
    {
      id: "parking",
      label: "Parking",
      icon: "icon-Garage-1",
      value: detailData.parking,
    },
    {
      id: "totalFloors",
      label: "Floors",
      icon: "icon-HouseLine",
      value: detailData.totalFloors,
    },
    {
      id: "reraId",
      label: "RERA",
      icon: "icon-file",
      value: detailData.reraId,
      isLong: true,
    },
  ];

  const specifications = [
    {
      id: "carpetArea",
      label: "Carpet Area",
      icon: "icon-Crop",
      value: detailData.carpetArea,
    },
    {
      id: "builtUpArea",
      label: "Built-up Area",
      icon: "icon-Ruler",
      value: detailData.builtUpArea,
    },
    {
      id: "developmentArea",
      label: "Development Area",
      icon: "icon-location",
      value: detailData.developmentArea,
    },
    {
      id: "bhkBaths",
      label: "BHK / Baths",
      icon: "icon-Bed-2",
      value: `${detailData.beds} Beds - ${detailData.baths} Baths`,
    },
    {
      id: "totalUnits",
      label: "Total Units",
      icon: "icon-office",
      value: detailData.totalUnits,
    },
    {
      id: "facing",
      label: "Facing",
      icon: "icon-location-2",
      value: detailData.facing,
    },
  ];

  return (
    <div className="property-at-glance">
      <div className="glance-head">
        <h2 className="wg-title text-11 fw-6 text-color-heading mb-0">{detailData.title}</h2>
        <span className={`project-trust-badge is-${trustBadge.type}`}>
          {trustBadge.type === "verified" ? (
            <span className="double-check-icon" aria-hidden="true">
              <i className="icon-check" />
              <i className="icon-check" />
            </span>
          ) : (
            <i className={trustBadge.iconClass} aria-hidden="true" />
          )}
          {trustBadge.label}
        </span>
      </div>

      <div className="glance-location text-1 flex items-center gap-8">
        <i className="icon-location" />
        {detailData.location}
      </div>

      <div className="glance-pills" aria-label="Key property facts">
        {keyPills.map((item) => (
          <span
            className={`glance-pill${item.isLong ? " is-long" : ""}`}
            key={item.id}
          >
            {item.icon ? <i className={item.icon} aria-hidden="true" /> : null}
            <strong>{item.label}:</strong> {item.value}
          </span>
        ))}
      </div>

      <div className="property-spec-grid" aria-label="Property specifications">
        {specifications.map((item) => (
          <article className="property-spec-item" key={item.id}>
            <p className="spec-label">
              {item.icon ? (
                <span className="spec-icon" aria-hidden="true">
                  <i className={item.icon} />
                </span>
              ) : null}
              {item.label}
            </p>
            <p className="spec-value">{item.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
