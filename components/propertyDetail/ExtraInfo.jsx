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
      icon: "icon-settings",
      value: toDisplayValue(
        property?.statusType ?? property?.status ?? detailsSource.statusType,
        "Ongoing"
      ),
    },
    {
      id: "propertyType",
      label: "Type",
      icon: "icon-home",
      value: propertyType,
    },
    {
      id: "parking",
      label: "Parking",
      icon: "icon-Garage-1",
      value: toDisplayValue(property?.parking ?? detailsSource.parking, "Yes"),
    },
    {
      id: "totalFloors",
      label: "Floors",
      icon: "icon-HouseLine",
      value: toDisplayValue(
        property?.totalFloors ?? property?.floors ?? detailsSource.totalFloors,
        "G+2 & G+3 Villas Floors"
      ),
    },
    {
      id: "projectReraId",
      label: "RERA",
      icon: "icon-file",
      value: reraValue,
      isLong: true,
    },
  ];

  const specifications = [
    {
      id: "configurations",
      label: "Configurations",
      icon: "icon-HouseLine",
      value: configurationsValue,
    },
    {
      id: "bedsBaths",
      label: "BHK / Baths",
      icon: "icon-Bed-2",
      value: `${beds} Beds - ${baths} Baths`,
    },
    {
      id: "sbaPlotSize",
      label: "SBA/Plot Size",
      icon: "icon-Ruler",
      value: toDisplayValue(
        property?.sbaPlotSize ?? property?.plotSize ?? detailsSource.sbaPlotSize,
        "On Request"
      ),
    },
    {
      id: "builtupArea",
      label: "Built-up Area",
      icon: "icon-Crop",
      value: builtupArea,
    },
    {
      id: "facingType",
      label: "Facing",
      icon: "icon-location-2",
      value: toDisplayValue(
        property?.facing ?? detailsSource.facing,
        "East Facing"
      ),
    },
    {
      id: "totalUnits",
      label: "Total Units",
      icon: "icon-office",
      value: toDisplayValue(
        property?.totalUnits ?? detailsSource.totalUnits,
        "250 Units"
      ),
    },
    {
      id: "developmentArea",
      label: "Development Area",
      icon: "icon-location",
      value: toDisplayValue(
        property?.developmentArea ?? detailsSource.developmentArea,
        "16 Acres"
      ),
    },
    {
      id: "possessionDate",
      label: "Possession Date",
      icon: "icon-Hammer",
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
