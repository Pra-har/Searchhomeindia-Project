"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const fallbackPlanImages = [
  "/images/section/floor.jpg",
  "/images/section/property-details-thumbs-3.jpg",
  "/images/section/property-details-thumbs-4.jpg",
  "/images/section/property-details-thumbs-5.jpg",
  "/images/section/property-details-thumbs-6.jpg",
  "/images/section/property-details-thumbs-7.jpg",
];

const fallbackBhkPlans = [
  {
    id: "1-bhk-compact",
    bhk: "1 BHK",
    type: "1 BHK Compact",
    area: "690 Sq.Ft",
    price: "Rs. 72.0 L*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[0],
    highlights: ["Smart compact layout", "Utility niche", "Wide windows"],
  },
  {
    id: "1-bhk-premium",
    bhk: "1 BHK",
    type: "1 BHK Premium",
    area: "760 Sq.Ft",
    price: "Rs. 81.0 L*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[1],
    highlights: ["Bigger living room", "Work-from-home nook", "Balcony deck"],
  },
  {
    id: "1-5-bhk-flex",
    bhk: "1.5 BHK",
    type: "1.5 BHK Flexi",
    area: "890 Sq.Ft",
    price: "Rs. 96.0 L*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[2],
    highlights: ["Extra study room", "Premium kitchen", "Cross ventilation"],
  },
  {
    id: "2-bhk-premium",
    bhk: "2 BHK",
    type: "2 BHK Premium",
    area: "1050 Sq.Ft",
    price: "Rs. 1.17 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[0],
    highlights: [
      "Living Room / Hall 10'0\" x 8'0\"",
      "Attached Balcony 10'6\" x 4'0\"",
      "Entrance Foyer 4'9\" x 4'8\"",
    ],
  },
  {
    id: "2-bhk-luxe",
    bhk: "2 BHK",
    type: "2 BHK Luxe",
    area: "1200 Sq.Ft",
    price: "Rs. 1.32 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[1],
    highlights: [
      "Larger Utility + Kitchen Layout",
      "Dedicated Dining Niche",
      "Wide Deck Balcony",
    ],
  },
  {
    id: "2-bhk-signature",
    bhk: "2 BHK",
    type: "2 BHK Signature",
    area: "1275 - 1500 Sq.Ft",
    price: "Rs. 1.39 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[2],
    highlights: ["Large kitchen", "2 balconies", "Utility space"],
  },
  {
    id: "2-bhk-grand",
    bhk: "2 BHK",
    type: "2 BHK Grand",
    area: "1345 Sq.Ft",
    price: "Rs. 1.46 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[3],
    highlights: ["Foyer entry", "Master suite", "Wide living room"],
  },
  {
    id: "2-bhk-smart",
    bhk: "2 BHK",
    type: "2 BHK Smart Plus",
    area: "1120 Sq.Ft",
    price: "Rs. 1.25 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[4],
    highlights: ["Efficient carpet area", "Separate utility", "Dining niche"],
  },
  {
    id: "2-bhk-skydeck",
    bhk: "2 BHK",
    type: "2 BHK Sky Deck",
    area: "1380 Sq.Ft",
    price: "Rs. 1.52 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[5],
    highlights: ["Sky balcony", "Extra wardrobe", "Premium fittings"],
  },
  {
    id: "2-bhk-jodi-core",
    bhk: "2 BHK",
    type: "2 BHK Jodi Core",
    area: "1450 Sq.Ft",
    price: "Rs. 1.58 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[0],
    highlights: ["Dual entrance concept", "Large family area", "Two utility zones"],
  },
  {
    id: "2-bhk-terrace",
    bhk: "2 BHK",
    type: "2 BHK Terrace",
    area: "1505 Sq.Ft",
    price: "Rs. 1.63 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[1],
    highlights: ["Private terrace", "Open kitchen option", "Premium deck"],
  },
  {
    id: "2-5-bhk-flex",
    bhk: "2.5 BHK",
    type: "2.5 BHK Flexi",
    area: "1520 Sq.Ft",
    price: "Rs. 1.68 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[2],
    highlights: ["Small study room", "Expanded dining", "Extra storage"],
  },
  {
    id: "3-bhk-premium",
    bhk: "3 BHK",
    type: "3 BHK Premium",
    area: "1600 Sq.Ft",
    price: "Rs. 1.76 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[2],
    highlights: [
      "3-Side Ventilated Plan",
      "Spacious Living + Dining",
      "Foyer + Utility Zone",
    ],
  },
  {
    id: "3-bhk-luxe",
    bhk: "3 BHK",
    type: "3 BHK Luxe",
    area: "1750 Sq.Ft",
    price: "Rs. 1.92 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[3],
    highlights: [
      "Family Lounge / Study Nook",
      "Bigger Master Bedroom",
      "Premium Balcony Frontage",
    ],
  },
  {
    id: "3-bhk-signature",
    bhk: "3 BHK",
    type: "3 BHK Signature",
    area: "1860 Sq.Ft",
    price: "Rs. 2.04 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[4],
    highlights: ["3 side open plan", "Large utility", "Family lounge"],
  },
  {
    id: "3-bhk-skyvilla",
    bhk: "3 BHK",
    type: "3 BHK Sky Villa",
    area: "1980 Sq.Ft",
    price: "Rs. 2.18 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[5],
    highlights: ["Sky deck balcony", "Bigger master suite", "Designer foyer"],
  },
  {
    id: "4-bhk-villa",
    bhk: "4 BHK",
    type: "4 BHK Villa",
    area: "2450 Sq.Ft",
    price: "Rs. 2.55 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[4],
    highlights: [
      "Private Garden Access",
      "4 Baths + Powder Room",
      "Large Family Living",
    ],
  },
  {
    id: "4-bhk-jodi",
    bhk: "4 BHK",
    type: "4 BHK Jodi Apartment",
    area: "2700 Sq.Ft",
    price: "Rs. 2.82 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[5],
    highlights: [
      "Dual-Door Entry Concept",
      "Two Utility Spaces",
      "Enhanced Carpet Efficiency",
    ],
  },
  {
    id: "4-bhk-luxe-duplex",
    bhk: "4 BHK",
    type: "4 BHK Luxe Duplex",
    area: "2890 Sq.Ft",
    price: "Rs. 3.08 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[0],
    highlights: ["Duplex layout", "Double-height living", "Private deck"],
  },
  {
    id: "5-bhk-villa-estate",
    bhk: "5 BHK",
    type: "5 BHK Villa Estate",
    area: "3380 Sq.Ft",
    price: "Rs. 3.78 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[1],
    highlights: ["Private lawn", "5 baths", "Home office space"],
  },
  {
    id: "5-bhk-penthouse",
    bhk: "5 BHK",
    type: "5 BHK Penthouse",
    area: "3625 Sq.Ft",
    price: "Rs. 4.15 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[2],
    highlights: ["Sky lounge", "Terrace deck", "Premium interiors"],
  },
  {
    id: "villa-row",
    bhk: "Villa",
    type: "4 BHK Row Villa",
    area: "2650 Sq.Ft",
    price: "Rs. 2.88 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[3],
    highlights: ["Row villa entry", "Private parking", "Large balconies"],
  },
  {
    id: "jodi-apartment",
    bhk: "Jodi Apartment",
    type: "3+3 BHK Jodi Apartment",
    area: "3200 Sq.Ft",
    price: "Rs. 3.42 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[4],
    highlights: ["Combined units", "Dual kitchen option", "Two entry doors"],
  },
  {
    id: "6-bhk-mansion",
    bhk: "6 BHK",
    type: "6 BHK Mansion",
    area: "4200 Sq.Ft",
    price: "Rs. 5.25 Cr*",
    priceNote: "Onwards Price",
    floorPlanImage: fallbackPlanImages[5],
    highlights: ["Private lift lobby", "Home theater space", "Luxury terrace"],
  },
];

const ScrollArrowIcon = ({ direction = "left" }) => {
  const rotation = {
    left: "0deg",
    right: "180deg",
    up: "90deg",
    down: "-90deg",
  }[direction];

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation || "0deg"})` }}
      aria-hidden="true"
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const compactInr = (value) => {
  if (!Number.isFinite(value) || value <= 0) return "";
  if (value >= 10000000) return `\u20B9 ${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `\u20B9 ${(value / 100000).toFixed(2)} L`;
  return `\u20B9 ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
};

const parsePriceToNumber = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;

  const sanitized = value.toLowerCase().replace(/,/g, "").trim();
  const crMatch = sanitized.match(/(\d+(\.\d+)?)\s*cr/);
  if (crMatch) return Number(crMatch[1]) * 10000000;

  const lakhMatch = sanitized.match(/(\d+(\.\d+)?)\s*(l|lac|lakh)/);
  if (lakhMatch) return Number(lakhMatch[1]) * 100000;

  const num = Number(sanitized.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(num) || num <= 0) return null;
  return num >= 100000 ? num : null;
};

const formatPriceText = (value, fallback = "\u20B9 1.17 Cr*") => {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return compactInr(value);
  }

  if (typeof value === "string" && value.trim()) {
    const cleaned = value
      .replace(/rs\.?/gi, "\u20B9")
      .replace(/\s+/g, " ")
      .trim();
    return cleaned.startsWith("\u20B9") ? cleaned : `\u20B9 ${cleaned}`;
  }

  return fallback;
};

const formatAreaText = (value, fallback = "1050 Sq.Ft") => {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return `${new Intl.NumberFormat("en-IN").format(value)} Sq.Ft`;
  }
  if (typeof value === "string" && value.trim()) return value.trim();
  return fallback;
};

const normalizeBhkLabel = (value, fallback = "2 BHK") => {
  if (typeof value !== "string" || !value.trim()) return fallback;
  const raw = value.trim();
  const bhkMatch = raw.match(/(\d+(\.\d+)?)\s*bhk/i);
  if (bhkMatch) return `${bhkMatch[1]} BHK`;
  if (/jodi/i.test(raw)) return "Jodi Apartment";
  if (/villa/i.test(raw)) return "Villa";
  return raw;
};

const normalizePlan = (item, index) => {
  const bhkRaw =
    item?.bhk ||
    item?.bhkType ||
    item?.configuration ||
    item?.unitType ||
    item?.category ||
    item?.type ||
    "";
  const bhk = normalizeBhkLabel(bhkRaw);

  const typeSource = item?.type || item?.name || item?.title || `${bhk} Premium`;
  const type = String(typeSource).trim() || `${bhk} Premium`;

  const area = formatAreaText(
    item?.area || item?.superBuiltUpArea || item?.sba || item?.sqft
  );

  const price = formatPriceText(item?.price || item?.startingPrice || item?.amount);

  const highlights = Array.isArray(item?.highlights)
    ? item.highlights.filter((point) => typeof point === "string" && point.trim())
    : [];

  const baseId = String(
    item?.id || `${bhk.toLowerCase().replace(/\s+/g, "-")}-${type.toLowerCase().replace(/\s+/g, "-")}`
  )
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-");

  return {
    id: `${baseId}-${index + 1}`,
    bhk,
    type,
    area,
    price,
    priceNote: item?.priceNote || item?.note || "Onwards Price",
    floorPlanImage:
      item?.floorPlanImage ||
      item?.planImage ||
      item?.image ||
      fallbackPlanImages[index % fallbackPlanImages.length],
    highlights,
    numericPrice: parsePriceToNumber(item?.price || item?.startingPrice || item?.amount),
  };
};

const getRawPlans = (property) => {
  const candidates = [
    property?.bhkPricingPlans,
    property?.priceFloorPlans,
    property?.floorPlans,
    property?.unitPlans,
    property?.projectDetails?.bhkPricingPlans,
    property?.projectDetails?.floorPlans,
  ];

  const firstValid = candidates.find((entry) => Array.isArray(entry) && entry.length > 0);
  return firstValid || fallbackBhkPlans;
};

const getPreferredBhk = (tabs) =>
  tabs.find((tab) => /^2\s*BHK$/i.test(String(tab || "").trim())) || tabs[0] || "";

export default function FloorPlan({ property }) {
  const tabsRef = useRef(null);

  const planOptions = useMemo(
    () => getRawPlans(property).map((item, index) => normalizePlan(item, index)),
    [property]
  );

  const bhkTabs = useMemo(
    () => [...new Set(planOptions.map((item) => item.bhk).filter(Boolean))],
    [planOptions]
  );

  const [activeBhk, setActiveBhk] = useState(() => getPreferredBhk(bhkTabs));
  const [activePlanId, setActivePlanId] = useState(() => planOptions[0]?.id || "");
  const [canTabsScrollLeft, setCanTabsScrollLeft] = useState(false);
  const [canTabsScrollRight, setCanTabsScrollRight] = useState(false);

  useEffect(() => {
    if (!bhkTabs.includes(activeBhk)) {
      setActiveBhk(getPreferredBhk(bhkTabs));
    }
  }, [bhkTabs, activeBhk]);

  const filteredPlans = useMemo(() => {
    if (!activeBhk) return planOptions;
    return planOptions.filter((item) => item.bhk === activeBhk);
  }, [planOptions, activeBhk]);

  const updateTabsScrollState = () => {
    const node = tabsRef.current;
    if (!node) {
      setCanTabsScrollLeft(false);
      setCanTabsScrollRight(false);
      return;
    }

    setCanTabsScrollLeft(node.scrollLeft > 2);
    setCanTabsScrollRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 2);
  };

  useEffect(() => {
    if (!filteredPlans.find((item) => item.id === activePlanId)) {
      setActivePlanId(filteredPlans[0]?.id || planOptions[0]?.id || "");
    }
  }, [filteredPlans, activePlanId, planOptions]);

  useEffect(() => {
    updateTabsScrollState();
    const node = tabsRef.current;
    if (!node) return undefined;

    const onScroll = () => updateTabsScrollState();
    const onResize = () => updateTabsScrollState();

    node.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      node.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [bhkTabs.length, activeBhk]);

  const activePlan =
    filteredPlans.find((item) => item.id === activePlanId) ||
    filteredPlans[0] ||
    planOptions[0];

  if (!activePlan) return null;

  const summaryPrices = filteredPlans
    .map((item) => item.numericPrice)
    .filter((value) => Number.isFinite(value));

  const minPrice = summaryPrices.length > 0 ? Math.min(...summaryPrices) : null;
  const maxPrice = summaryPrices.length > 0 ? Math.max(...summaryPrices) : null;

  const summaryText =
    minPrice && maxPrice
      ? `${filteredPlans.length} variants | ${compactInr(minPrice)} - ${compactInr(maxPrice)}`
      : `${filteredPlans.length} variants available`;

  const activeHighlights =
    activePlan.highlights.length > 0
      ? activePlan.highlights
      : [
          "Optimized layout with efficient carpet area",
          "Functional kitchen and utility design",
          "Natural light and cross ventilation",
        ];

  const scrollTabsBy = (delta) => {
    const node = tabsRef.current;
    if (!node) return;
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleTabsWheel = (event) => {
    const node = tabsRef.current;
    if (!node) return;
    const canScrollX = node.scrollWidth > node.clientWidth + 2;
    if (!canScrollX) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      node.scrollBy({ left: event.deltaY, behavior: "auto" });
    }
  };

  return (
    <>
      <h2 className="wg-title text-11 fw-6 text-color-heading">Price &amp; Floor Plan</h2>

      <div className="bhk-floor-plan" aria-label="Price and floor plan configurations">
        <div className="bhk-floor-plan-head">
          <div className="left">
            <h3>{property?.title || "Godrej Parkshire"} Configurations</h3>
            <p>
              {activeBhk} | {summaryText}
            </p>
          </div>
          <button type="button" className="download-link">
            <i className="icon icon-DownloadSimple" />
            Download Brochure
          </button>
        </div>

        <div className="bhk-tabs-wrap">
          <button
            type="button"
            className={`tabs-nav-btn${canTabsScrollLeft ? "" : " is-disabled"}`}
            onClick={() => scrollTabsBy(-220)}
            aria-label="Scroll BHK tabs left"
            disabled={!canTabsScrollLeft}
          >
            <ScrollArrowIcon direction="left" />
          </button>

          <div
            className="bhk-tabs"
            role="tablist"
            aria-label="BHK tabs"
            ref={tabsRef}
            onWheel={handleTabsWheel}
          >
            {bhkTabs.map((tab) => (
              <button
                type="button"
                key={tab}
                role="tab"
                aria-selected={activeBhk === tab}
                className={`bhk-tab${activeBhk === tab ? " active" : ""}`}
                onClick={() => setActiveBhk(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`tabs-nav-btn${canTabsScrollRight ? "" : " is-disabled"}`}
            onClick={() => scrollTabsBy(220)}
            aria-label="Scroll BHK tabs right"
            disabled={!canTabsScrollRight}
          >
            <ScrollArrowIcon direction="right" />
          </button>
        </div>

        <div className="bhk-floor-plan-layout">
          <article className="floor-preview-card">
            <div className="plan-image-wrap">
              <Image
                src={activePlan.floorPlanImage}
                alt={`${activePlan.type} floor plan`}
                fill
                sizes="(max-width: 991px) 100vw, 45vw"
              />
              <span className="plan-chip">{activePlan.type}</span>
            </div>

            <div className="plan-preview-meta">
              <div className="meta-row">
                <span className="meta-item">
                  <i className="icon icon-Crop" />
                  {activePlan.area}
                </span>
                <span className="meta-item price">{activePlan.price}</span>
              </div>
              <div className="highlight-grid">
                {activeHighlights.map((point, index) => (
                  <span key={`${activePlan.id}-point-${index}`} className="highlight-pill">
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="floor-pricing-card">
            <div className="pricing-head-wrap">
              <div className="pricing-head">
                <span>Type</span>
                <span>Area</span>
                <span>Price</span>
              </div>
            </div>

            <div className="pricing-body" aria-label={`${activeBhk} variants pricing list`}>
              {filteredPlans.map((plan) => (
                <button
                  type="button"
                  key={plan.id}
                  className={`pricing-row${activePlanId === plan.id ? " active" : ""}`}
                  onClick={() => setActivePlanId(plan.id)}
                >
                  <span className="type">{plan.type}</span>
                  <span className="area">{plan.area}</span>
                  <span className="price">
                    <strong>{plan.price}</strong>
                    <small>{plan.priceNote}</small>
                  </span>
                </button>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
