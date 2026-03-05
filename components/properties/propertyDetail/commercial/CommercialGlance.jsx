import React from "react";
import { getCommercialDetailAdapter } from "./commercialDetailAdapter";

export default function CommercialGlance({ property }) {
  const detailData = getCommercialDetailAdapter(property);

  const keyPills = [
    { id: "subType", label: "Sub-Type", icon: "icon-office", value: detailData.subType },
    {
      id: "possessionStatus",
      label: "Possession",
      icon: "icon-settings",
      value: detailData.possessionStatus,
    },
    { id: "carpetArea", label: "Carpet Area", icon: "icon-Crop", value: detailData.carpetArea },
    {
      id: "superBuiltUpArea",
      label: "Super Built-up",
      icon: "icon-Ruler",
      value: detailData.superBuiltUpArea,
    },
    { id: "floorNumber", label: "Floor", icon: "icon-HouseLine", value: detailData.floorNumber },
    { id: "parking", label: "Parking", icon: "icon-Garage-1", value: detailData.parking },
  ];

  const specifications = [
    {
      id: "transactionType",
      label: "Transaction Type",
      icon: "icon-file",
      value: detailData.transactionType,
    },
    { id: "price", label: "Price", icon: "icon-money", value: detailData.price },
    {
      id: "maintenanceCharge",
      label: "Maintenance",
      icon: "icon-settings",
      value: detailData.maintenanceCharge,
    },
    { id: "reraId", label: "RERA", icon: "icon-check-cycle", value: detailData.reraId },
    { id: "totalFloors", label: "Total Floors", icon: "icon-home", value: detailData.totalFloors },
    { id: "facing", label: "Facing", icon: "icon-location-2", value: detailData.facing },
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
          Commercial Active
        </span>
      </div>

      <div className="glance-pills" aria-label="Commercial key details">
        {keyPills.map((item) => (
          <span className="glance-pill" key={item.id}>
            <i className={item.icon} aria-hidden="true" />
            <strong>{item.label}:</strong> {item.value}
          </span>
        ))}
      </div>

      <div className="property-spec-grid" aria-label="Commercial property specifications">
        {specifications.map((item) => (
          <article className="property-spec-item" key={item.id}>
            <p className="spec-label">
              <span className="spec-icon" aria-hidden="true">
                <i className={item.icon} />
              </span>
              {item.label}
            </p>
            <p className="spec-value">{item.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
