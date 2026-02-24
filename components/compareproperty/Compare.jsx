"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getPropertyDetailAdapter } from "@/components/properties/propertyDetail/propertyDetailAdapter";
import {
  addCompareProperty,
  clearCompareProperties,
  COMPARE_EVENT,
  getComparedProperties,
  popCompareNotice,
  removeCompareProperty,
  replaceComparedProperties,
} from "@/utils/compare";

const MAX_COMPARE = 4;
const MIN_COMPARE = 2;

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

const formatPriceLabel = (value) => {
  if (value === undefined || value === null || value === "") return "Price on Request";
  if (typeof value === "string") return value;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return String(value);
  if (parsed >= 10000000) return `\u20B9 ${(parsed / 10000000).toFixed(2)} Cr`;
  if (parsed >= 100000) return `\u20B9 ${(parsed / 100000).toFixed(2)} L`;
  return `\u20B9 ${formatNumber(parsed)}`;
};

const slugifyText = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getPropertyUrl = (property = {}) =>
  property?.url || `/property-detail/${property?.slug || property?.id || slugifyText(property?.title)}`;

const normalizeText = (value, fallback = "-") => {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = String(value).trim();
  return parsed || fallback;
};

const toNumeric = (value, fallback = NaN) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const toCompactInr = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return "N/A";
  if (parsed >= 10000000) return `\u20B9 ${(parsed / 10000000).toFixed(2)} Cr`;
  if (parsed >= 100000) return `\u20B9 ${(parsed / 100000).toFixed(2)} L`;
  return `\u20B9 ${formatNumber(parsed)}`;
};

const getDummyRating = (property = {}) => {
  const seed = String(property?.id || property?.slug || property?.title || "shi");
  const hash = seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rating = 4.1 + (hash % 8) * 0.1; // 4.1 to 4.8
  return Math.round(rating * 10) / 10;
};

const getProjectRating = (property = {}) => {
  if (!property) return null;

  const maybeRating = [
    property?.rating,
    property?.projectRating,
    property?.projectDetails?.rating,
    property?.projectDetails?.projectRating,
  ].find((item) => item !== undefined && item !== null && item !== "");

  if (maybeRating === undefined) return getDummyRating(property);
  const parsed = toNumeric(maybeRating, NaN);
  if (!Number.isFinite(parsed)) return getDummyRating(property);
  const clamped = Math.max(0, Math.min(5, parsed));
  return Math.round(clamped * 10) / 10;
};

const getPriceRange = (property = {}) => {
  if (!property) return "N/A";

  const minPrice =
    toNumeric(property?.priceMin, NaN) ||
    toNumeric(property?.minPrice, NaN) ||
    toNumeric(property?.startingPrice, NaN);
  const maxPrice =
    toNumeric(property?.priceMax, NaN) ||
    toNumeric(property?.maxPrice, NaN) ||
    toNumeric(property?.endingPrice, NaN);

  if (Number.isFinite(minPrice) && Number.isFinite(maxPrice) && maxPrice >= minPrice) {
    return `${toCompactInr(minPrice)} - ${toCompactInr(maxPrice)} * onwards`;
  }

  const numericPrice = toNumeric(property?.price, NaN);
  if (Number.isFinite(numericPrice) && numericPrice > 0) {
    const derivedMax = Math.round(numericPrice * 1.35);
    return `${toCompactInr(numericPrice)} - ${toCompactInr(derivedMax)} * onwards`;
  }

  if (typeof property?.price === "string" && property.price.trim()) {
    const txt = property.price.trim();
    if (txt.toLowerCase().includes("onward")) return txt;
    if (txt.includes("-")) return `${txt} * onwards`;
    return txt;
  }

  return "N/A";
};

const getMapSearchUrl = (property = {}) => {
  const location = normalizeText(property?.location, "");
  if (!location) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
};

const buildComparisonRows = (detailColumns = []) => [
  {
    key: "projectRating",
    label: "Project Rating",
    type: "rating",
    values: detailColumns.map((item) => getProjectRating(item?.property)),
  },
  {
    key: "priceRange",
    label: "Price Range",
    values: detailColumns.map((item) => getPriceRange(item?.property)),
  },
  {
    key: "configurations",
    label: "Configurations",
    values: detailColumns.map((item) => normalizeText(item?.details?.configurations)),
  },
  {
    key: "possessionDate",
    label: "Possession Date",
    values: detailColumns.map((item) => normalizeText(item?.details?.possessionDate)),
  },
  {
    key: "avgPricePerSqft",
    label: "Avg. Price / sq.ft",
    values: detailColumns.map((item) => {
      const value = item?.details?.avgPricePerSqft;
      if (!value) return "-";
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) return normalizeText(value);
      return `\u20B9 ${formatNumber(parsed)} / sq.ft`;
    }),
  },
  {
    key: "builtUpRange",
    label: "Sizes (Built-up)",
    values: detailColumns.map((item) => normalizeText(item?.details?.builtUpRange)),
  },
  {
    key: "carpetArea",
    label: "Carpet Area",
    values: detailColumns.map((item) => normalizeText(item?.details?.carpetArea)),
  },
  {
    key: "builtUpArea",
    label: "Built-up Area",
    values: detailColumns.map((item) => normalizeText(item?.details?.builtUpArea)),
  },
  {
    key: "developmentArea",
    label: "Development Area",
    values: detailColumns.map((item) => normalizeText(item?.details?.developmentArea)),
  },
  {
    key: "totalUnits",
    label: "Total Units",
    values: detailColumns.map((item) => normalizeText(item?.details?.totalUnits)),
  },
  {
    key: "parking",
    label: "Parking",
    values: detailColumns.map((item) => normalizeText(item?.details?.parking)),
  },
  {
    key: "facing",
    label: "Facing",
    values: detailColumns.map((item) => normalizeText(item?.details?.facing)),
  },
  {
    key: "totalFloors",
    label: "Total Floors",
    values: detailColumns.map((item) => normalizeText(item?.details?.totalFloors)),
  },
  {
    key: "statusType",
    label: "Status",
    values: detailColumns.map((item) => normalizeText(item?.details?.statusType)),
  },
  {
    key: "propertyType",
    label: "Property Type",
    values: detailColumns.map((item) => normalizeText(item?.details?.propertyType)),
  },
  {
    key: "reraId",
    label: "Project RERA ID",
    values: detailColumns.map((item) => normalizeText(item?.details?.reraId)),
  },
  {
    key: "actions",
    label: "Actions",
    type: "actions",
    values: detailColumns.map((item) => item?.property || null),
  },
];

export default function Compare({ suggestions = [], initialSelected = [] }) {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSlot, setPickerSlot] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    const syncComparedProperties = () => {
      setSelectedProperties(getComparedProperties().slice(0, MAX_COMPARE));
    };

    if (typeof window === "undefined") return undefined;

    if (!getComparedProperties().length && Array.isArray(initialSelected) && initialSelected.length) {
      replaceComparedProperties(initialSelected, MAX_COMPARE);
    }

    const notice = popCompareNotice();
    if (notice) setStatusMessage(notice);

    syncComparedProperties();
    window.addEventListener(COMPARE_EVENT, syncComparedProperties);
    window.addEventListener("storage", syncComparedProperties);

    return () => {
      window.removeEventListener(COMPARE_EVENT, syncComparedProperties);
      window.removeEventListener("storage", syncComparedProperties);
    };
  }, [initialSelected]);

  const compareSlots = useMemo(
    () => Array.from({ length: MAX_COMPARE }, (_, index) => selectedProperties[index] || null),
    [selectedProperties]
  );

  const detailColumns = useMemo(
    () =>
      compareSlots.map((property, index) => {
        if (!property) return { slotKey: `slot-${index + 1}`, property: null, details: null };
        return {
          slotKey: normalizeText(property?.id, `slot-${index + 1}`),
          property,
          details: getPropertyDetailAdapter(property),
        };
      }),
    [compareSlots]
  );

  const helperMessage =
    selectedProperties.length < MIN_COMPARE
      ? "Please select at least 2 properties to compare."
      : "";
  const comparisonRows = useMemo(() => buildComparisonRows(detailColumns), [detailColumns]);
  const selectedIds = useMemo(
    () => new Set(selectedProperties.map((item) => String(item.id))),
    [selectedProperties]
  );

  const suggestionPool = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLowerCase();
    const baseItems = Array.isArray(suggestions) ? suggestions : [];
    return baseItems
      .filter((item) => !selectedIds.has(String(item?.id)))
      .filter((item) => {
        if (!normalizedQuery) return true;
        const haystack = `${normalizeText(item?.title, "")} ${normalizeText(item?.location, "")}`
          .toLowerCase()
          .trim();
        return haystack.includes(normalizedQuery);
      })
      .slice(0, 16);
  }, [searchValue, selectedIds, suggestions]);

  const openPickerForSlot = (slotIndex) => {
    setPickerSlot(slotIndex);
    setSearchValue("");
    setPickerOpen(true);
  };

  const closePicker = () => {
    setPickerOpen(false);
    setPickerSlot(0);
    setSearchValue("");
  };

  const handleAddProperty = (property) => {
    const result = addCompareProperty(property, { max: MAX_COMPARE });
    if (result.status === "limit") {
      setStatusMessage("Maximum 4 properties can be compared at a time.");
      return;
    }
    if (result.status === "exists") {
      setStatusMessage("This property is already selected for comparison.");
      return;
    }
    setStatusMessage("");
    closePicker();
  };

  const handleRemoveProperty = (id) => {
    removeCompareProperty(id);
    setStatusMessage("");
  };

  const handleClearAll = () => {
    clearCompareProperties();
    setStatusMessage("");
  };

  const handleCompareNow = () => {
    if (selectedProperties.length < MIN_COMPARE) {
      setStatusMessage("Please select at least 2 properties to compare.");
      return;
    }
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!pickerOpen) return undefined;

    const onEscape = (event) => {
      if (event.key === "Escape") closePicker();
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [pickerOpen]);

  return (
    <section className="section-compare-v2 tf-spacing-7 pt-0">
      <div className="tf-container">
        <div className="compare-v2-head">
          <div className="left">
            <h1 className="title">Compare Properties</h1>
            <p className="subtitle">
              Selected: <strong>{selectedProperties.length}</strong> / {MAX_COMPARE}
            </p>
          </div>
          <div className="actions">
            <button
              type="button"
              className="tf-btn style-border pd-4"
              onClick={handleClearAll}
              disabled={!selectedProperties.length}
            >
              Clear All
            </button>
            <button
              type="button"
              className="tf-btn bg-color-primary pd-4"
              disabled={selectedProperties.length < MIN_COMPARE}
              aria-disabled={selectedProperties.length < MIN_COMPARE}
              onClick={handleCompareNow}
            >
              Compare Now
            </button>
          </div>
        </div>

        {statusMessage ? (
          <div className="compare-v2-notice warning">{statusMessage}</div>
        ) : null}
        {helperMessage ? <div className="compare-v2-notice info">{helperMessage}</div> : null}

        <div className="compare-v2-slots-wrap">
          <div className="compare-v2-slots">
            {compareSlots.map((property, index) => (
              <div className="compare-v2-slot" key={`compare-slot-${index + 1}`}>
                {property ? (
                  <article className="compare-property-card">
                    <div className="image-wrap">
                      <Image
                        src={property.imageSrc || "/images/section/box-house.jpg"}
                        alt={property.title || "Property image"}
                        width={430}
                        height={260}
                      />
                    </div>
                    <div className="content">
                      <h3 className="name line-clamp-1">
                        <Link href={getPropertyUrl(property)}>{property.title}</Link>
                      </h3>
                      <p className="location line-clamp-1">
                        <i className="icon-location" />
                        {property.location}
                      </p>
                      <p className="price">{formatPriceLabel(property.price)}</p>
                      <div className="card-actions">
                        <button
                          type="button"
                          className="tf-btn style-border pd-4"
                          onClick={() => handleRemoveProperty(property.id)}
                        >
                          Remove
                        </button>
                        <Link className="tf-btn bg-color-primary pd-4" href={getPropertyUrl(property)}>
                          Open
                        </Link>
                      </div>
                    </div>
                  </article>
                ) : (
                  <div className="compare-empty-slot">
                    <button
                      type="button"
                      className="add-property-btn"
                      onClick={() => openPickerForSlot(index)}
                      aria-label={`Add property to slot ${index + 1}`}
                    >
                      <span className="plus">+</span>
                      <span className="text">Add Property</span>
                    </button>
                    <p>Add property to compare</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="compare-v2-table-wrap" ref={tableRef}>
          <table className="compare-v2-table">
            <thead>
              <tr>
                <th>Specification</th>
                {detailColumns.map((column, index) => (
                  <th key={`head-${column.slotKey}-${index}`}>
                    {column?.details?.title || `Slot ${index + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.key}>
                  <td className="label">{row.label}</td>
                  {row.values.map((value, index) => {
                    if (row.type === "rating") {
                      const numericRating =
                        typeof value === "number" && Number.isFinite(value) ? value : null;
                      return (
                        <td key={`${row.key}-${index}`}>
                          {numericRating === null ? (
                            "N/A"
                          ) : (
                            <div className="compare-rating-cell">
                              <div className="stars" aria-label={`Rating ${numericRating} out of 5`}>
                                {Array.from({ length: 5 }, (_, starIndex) => (
                                  <i
                                    key={`rating-star-${index}-${starIndex}`}
                                    className={`icon-star${
                                      starIndex + 1 <= Math.floor(numericRating)
                                        ? " is-filled"
                                        : ""
                                    }`}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                              <span className="value">{numericRating.toFixed(1)} / 5</span>
                            </div>
                          )}
                        </td>
                      );
                    }

                    if (row.type === "actions") {
                      if (!value) {
                        return <td key={`${row.key}-${index}`}>N/A</td>;
                      }
                      const detailsUrl = getPropertyUrl(value);
                      const mapUrl = getMapSearchUrl(value);
                      return (
                        <td key={`${row.key}-${index}`}>
                          <div className="compare-actions-cell">
                            <Link className="tf-btn style-border pd-4" href={detailsUrl}>
                              View Details
                            </Link>
                            {mapUrl ? (
                              <a
                                className="tf-btn style-border pd-4"
                                href={mapUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                See Map
                              </a>
                            ) : (
                              <span className="map-fallback">N/A</span>
                            )}
                          </div>
                        </td>
                      );
                    }

                    return <td key={`${row.key}-${index}`}>{value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pickerOpen ? (
        <div
          className="compare-picker-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) closePicker();
          }}
        >
          <div className="compare-picker">
            <div className="picker-head">
              <h4>Add Property (Slot {pickerSlot + 1})</h4>
              <button type="button" className="picker-close" onClick={closePicker} aria-label="Close">
                <i className="icon-close" />
              </button>
            </div>

            <div className="picker-search">
              <i className="icon-search" />
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search by project or city"
              />
            </div>

            <div className="picker-list">
              {suggestionPool.length ? (
                suggestionPool.map((item) => (
                  <article className="picker-item" key={`picker-${item.id}`}>
                    <div className="thumb">
                      <Image
                        src={item.imageSrc || "/images/section/box-house.jpg"}
                        alt={item.title || "Property image"}
                        width={110}
                        height={80}
                      />
                    </div>
                    <div className="info">
                      <h5 className="line-clamp-1">{item.title}</h5>
                      <p className="line-clamp-1">{item.location}</p>
                      <span>{formatPriceLabel(item.price)}</span>
                    </div>
                    <button
                      type="button"
                      className="tf-btn style-border pd-4"
                      onClick={() => handleAddProperty(item)}
                    >
                      Add
                    </button>
                  </article>
                ))
              ) : (
                <div className="picker-empty">No properties found. Try a different keyword.</div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
