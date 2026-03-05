import React from "react";
import { getPGDetailAdapter } from "./pgDetailAdapter";

export default function PGGlance({ property }) {
  const detailData = getPGDetailAdapter(property);

  const keyPills = [
    { id: "sharingType", label: "Sharing Type", icon: "icon-Bed-2", value: detailData.sharingType },
    {
      id: "foodAvailability",
      label: "Food",
      icon: "icon-family",
      value: detailData.foodAvailability,
      isLong: true,
    },
    { id: "securityDeposit", label: "Security Deposit", icon: "icon-file", value: detailData.securityDeposit },
    {
      id: "availableFor",
      label: "Available For",
      icon: "icon-home",
      value: detailData.availableFor,
      isLong: true,
    },
    { id: "availableFrom", label: "Available From", icon: "icon-clock", value: detailData.availableFrom },
    { id: "floorNumber", label: "Floor", icon: "icon-HouseLine", value: detailData.floorNumber },
  ];

  const specifications = [
    { id: "minPrice", label: "Min Price", icon: "icon-money", value: detailData.minPrice },
    { id: "maxPrice", label: "Max Price", icon: "icon-money", value: detailData.maxPrice },
    { id: "maintenance", label: "Maintenance", icon: "icon-settings", value: detailData.maintenance },
    { id: "acRooms", label: "AC Rooms", icon: "icon-apartment-2", value: detailData.acRooms },
    { id: "lifts", label: "Lifts", icon: "icon-office", value: detailData.lifts },
    { id: "amenitiesLabel", label: "Amenities", icon: "icon-spa", value: detailData.amenitiesLabel },
    { id: "address", label: "Address", icon: "icon-location", value: detailData.address },
  ];

  return (
    <div className="property-at-glance">
      <div className="glance-head">
        <h2 className="wg-title text-11 fw-6 text-color-heading mb-0">{detailData.title}</h2>
        <span className="project-trust-badge is-verified">
          <span className="double-check-icon" aria-hidden="true">
            <i className="icon-check" />
            <i className="icon-check" />
          </span>
          Available
        </span>
      </div>

      <div className="glance-pills" aria-label="PG key details">
        {keyPills.map((item) => (
          <span className={`glance-pill${item.isLong ? " is-long" : ""}`} key={item.id}>
            <i className={item.icon} aria-hidden="true" />
            <strong>{item.label}:</strong> {item.value}
          </span>
        ))}
      </div>

      <div className="property-spec-grid" aria-label="PG property specifications">
        {specifications.map((item) => (
          <article className={`property-spec-item${item.id === "address" ? " is-address" : ""}`} key={item.id}>
            <p className="spec-label">
              <span className="spec-icon" aria-hidden="true">
                <i className={item.icon} />
              </span>
              {item.label}
            </p>
            <p className={`spec-value${item.id === "address" ? " is-address" : ""}`}>{item.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
