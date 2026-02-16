import React from "react";

const toDisplayValue = (value, fallback = "-") => {
  if (value === undefined || value === null) return fallback;

  if (Array.isArray(value)) {
    const parsed = value
      .map((entry) => toDisplayValue(entry, ""))
      .filter(Boolean);
    return parsed.length ? parsed.join(", ") : fallback;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    if (value?.label) return String(value.label);
    if (value?.name) return String(value.name);
    return fallback;
  }

  const parsed = String(value).trim();
  return parsed || fallback;
};

export default function ExtraInfo({ property }) {
  const detailsSource = property?.projectDetails || {};

  const title = toDisplayValue(property?.title, "Property At a Glance");
  const propertyType = toDisplayValue(
    property?.propertyType ||
      property?.type ||
      (Array.isArray(property?.categories) && property.categories[0]) ||
      detailsSource.propertyType,
    "Apartment"
  );

  const beds = toDisplayValue(property?.beds ?? detailsSource.beds, "3");
  const baths = toDisplayValue(property?.baths ?? detailsSource.baths, "3");
  const location = toDisplayValue(
    property?.location ?? detailsSource.location,
    "Hoskote, Whitefield, Bangalore"
  );

  const sqftRaw =
    property?.sqft ?? property?.builtupArea ?? property?.sbaPlotSize ?? detailsSource.sbaPlotSize;
  const builtupArea = typeof sqftRaw === "number" ? `${sqftRaw} Sq.Ft` : toDisplayValue(sqftRaw, "4,043 Sq.Ft");

  const configurationsValue = toDisplayValue(
    property?.configurations ??
      property?.configuration ??
      property?.bhkType ??
      detailsSource.configurations ??
      detailsSource.configuration,
    "1, 2, 3 BHK"
  );

  const reraValue = toDisplayValue(
    property?.projectReraId ?? property?.reraId ?? detailsSource.projectReraId,
    "PRM/KA/RERA/1250/304/PR/090126/008393"
  );

  const keyPills = [
    {
      id: "statusType",
      label: "Status",
      value: toDisplayValue(
        property?.statusType ?? property?.status ?? detailsSource.statusType,
        "Ongoing"
      ),
    },
    {
      id: "propertyType",
      label: "Type",
      value: propertyType,
    },
    {
      id: "parking",
      label: "Parking",
      value: toDisplayValue(property?.parking ?? detailsSource.parking, "Yes"),
    },
    {
      id: "totalFloors",
      label: "Floors",
      value: toDisplayValue(
        property?.totalFloors ?? property?.floors ?? detailsSource.totalFloors,
        "G+2 & G+3 Villas Floors"
      ),
    },
    {
      id: "projectReraId",
      label: "RERA",
      value: reraValue,
      isLong: true,
    },
  ];

  const specifications = [
    {
      id: "configurations",
      label: "Configurations",
      value: configurationsValue,
    },
    {
      id: "bedsBaths",
      label: "BHK / Baths",
      value: `${beds} Beds - ${baths} Baths`,
    },
    {
      id: "sbaPlotSize",
      label: "SBA/Plot Size",
      value: toDisplayValue(
        property?.sbaPlotSize ?? property?.plotSize ?? detailsSource.sbaPlotSize,
        "On Request"
      ),
    },
    {
      id: "builtupArea",
      label: "Built-up Area",
      value: builtupArea,
    },
    {
      id: "facingType",
      label: "Facing",
      value: toDisplayValue(
        property?.facing ?? detailsSource.facing,
        "East Facing"
      ),
    },
    {
      id: "totalUnits",
      label: "Total Units",
      value: toDisplayValue(
        property?.totalUnits ?? detailsSource.totalUnits,
        "250 Units"
      ),
    },
    {
      id: "developmentArea",
      label: "Development Area",
      value: toDisplayValue(
        property?.developmentArea ?? detailsSource.developmentArea,
        "16 Acres"
      ),
    },
    {
      id: "possessionDate",
      label: "Possession Date",
      value: toDisplayValue(
        property?.possessionDate ?? detailsSource.possessionDate,
        "2029"
      ),
    },
  ];

  return (
    <div className="property-at-glance">
      <div className="glance-head">
        <h2 className="wg-title text-11 fw-6 text-color-heading mb-0">{title}</h2>
      </div>

      <div className="glance-location text-1 flex items-center gap-8">
        <i className="icon-location" />
        {location}
      </div>

      <div className="glance-pills" aria-label="Key property facts">
        {keyPills.map((item) => (
          <span
            className={`glance-pill${item.isLong ? " is-long" : ""}`}
            key={item.id}
          >
            <strong>{item.label}:</strong> {item.value}
          </span>
        ))}
      </div>

      <div className="property-spec-grid" aria-label="Property specifications">
        {specifications.map((item) => (
          <article className="property-spec-item" key={item.id}>
            <p className="spec-label">{item.label}</p>
            <p className="spec-value">{item.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
