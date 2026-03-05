import React from "react";
import { getRentalDetailAdapter } from "./rentalDetailAdapter";

export default function RentalGlance({ property }) {
  const detailData = getRentalDetailAdapter(property);

  const keyPills = [
    {
      id: "apartmentType",
      label: "Apartment/RK Type",
      icon: "icon-Bed-2",
      value: detailData.apartmentType,
      isLong: true,
    },
    { id: "availableFrom", label: "Available From", icon: "icon-clock", value: detailData.availableFrom },
    { id: "securityDeposit", label: "Security Deposit", icon: "icon-file", value: detailData.securityDeposit },
    {
      id: "availableFor",
      label: "Available For",
      icon: "icon-family",
      value: detailData.availableFor,
      isLong: true,
    },
    { id: "furnishingStatus", label: "Furnished Status", icon: "icon-home", value: detailData.furnishingStatus },
    { id: "lifts", label: "Lifts", icon: "icon-office", value: detailData.lifts },
    { id: "floorNumber", label: "Floor", icon: "icon-HouseLine", value: detailData.floorNumber },
    { id: "noticePeriod", label: "Notice Period", icon: "icon-settings", value: detailData.noticePeriod },
    { id: "facing", label: "Facing", icon: "icon-location-2", value: detailData.facing },
  ];

  const specifications = [
    { id: "maxPricing", label: "Max. Pricing", icon: "icon-money", value: detailData.maxPricing },
    {
      id: "maintenanceCharge",
      label: "Maintenance",
      icon: "icon-settings",
      value: detailData.maintenanceCharge,
    },
    { id: "ageOfConstruction", label: "Age of Construction", icon: "icon-clock", value: detailData.ageOfConstruction },
    { id: "acRooms", label: "AC Rooms", icon: "icon-apartment-2", value: detailData.acRooms },
    { id: "powerBackup", label: "Power Backup", icon: "icon-check-cycle", value: detailData.powerBackup },
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
          Rental Active
        </span>
      </div>

      <div className="glance-pills" aria-label="Rental key details">
        {keyPills.map((item) => (
          <span className={`glance-pill${item.isLong ? " is-long" : ""}`} key={item.id}>
            <i className={item.icon} aria-hidden="true" />
            <strong>{item.label}:</strong> {item.value}
          </span>
        ))}
      </div>

      <div className="property-spec-grid" aria-label="Rental specifications">
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
