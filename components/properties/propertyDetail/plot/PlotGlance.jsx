import React from "react";
import { getPlotDetailAdapter } from "./plotDetailAdapter";

export default function PlotGlance({ property }) {
  const detailData = getPlotDetailAdapter(property);

  const keyPills = [
    { id: "plotArea", label: "Plot Area", icon: "icon-Crop", value: detailData.plotArea },
    { id: "plotType", label: "Plot Type", icon: "icon-home", value: detailData.plotType },
    { id: "reraId", label: "RERA", icon: "icon-check-cycle", value: detailData.reraId },
    { id: "facing", label: "Facing", icon: "icon-location-2", value: detailData.facing },
    { id: "roadWidth", label: "Road Width", icon: "icon-Ruler", value: detailData.roadWidth },
    { id: "isCornerPlot", label: "Corner Plot", icon: "icon-settings", value: detailData.isCornerPlot },
  ];

  const specifications = [
    {
      id: "transactionType",
      label: "Transaction Type",
      icon: "icon-file",
      value: detailData.transactionType,
    },
    { id: "price", label: "Price", icon: "icon-money", value: detailData.price },
    { id: "pricePerSqft", label: "Price / sq.ft", icon: "icon-Ruler", value: detailData.pricePerSqft },
    { id: "approvals", label: "Approvals", icon: "icon-check", value: detailData.approvals },
    { id: "plotDimension", label: "Dimension", icon: "icon-Crop", value: detailData.plotDimension },
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
          Land Verified
        </span>
      </div>

      <div className="glance-pills" aria-label="Plot key details">
        {keyPills.map((item) => (
          <span className="glance-pill" key={item.id}>
            <i className={item.icon} aria-hidden="true" />
            <strong>{item.label}:</strong> {item.value}
          </span>
        ))}
      </div>

      <div className="property-spec-grid" aria-label="Plot specifications">
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
