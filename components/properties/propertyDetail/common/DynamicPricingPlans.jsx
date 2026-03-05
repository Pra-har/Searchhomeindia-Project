"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { normalizeText, pickFirst } from "./detailAdapterHelpers";

const fallbackPlanImages = [
  "/images/section/floor.jpg",
  "/images/section/property-details-thumbs-3.jpg",
  "/images/section/property-details-thumbs-4.jpg",
  "/images/section/property-details-thumbs-5.jpg",
  "/images/section/property-details-thumbs-6.jpg",
  "/images/section/property-details-thumbs-7.jpg",
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

const getPlanId = (plan, index) =>
  normalizeText(
    plan?.id,
    `${normalizeText(plan?.tab, "tab").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`
  );

const normalizePlan = (plan, index) => {
  const tab = normalizeText(pickFirst(plan?.tab, plan?.category, plan?.bhk), "All");
  const type = normalizeText(pickFirst(plan?.type, plan?.sharingType, plan?.unitType), "Plan");
  const area = normalizeText(pickFirst(plan?.area, plan?.dimension), "N/A");
  const price = normalizeText(plan?.price, "N/A");
  const priceNote = normalizeText(plan?.priceNote, normalizeText(plan?.note, "Onwards Price"));
  const image = normalizeText(
    pickFirst(plan?.image, plan?.floorPlanImage, plan?.planImage),
    fallbackPlanImages[index % fallbackPlanImages.length]
  );
  const highlights = Array.isArray(plan?.highlights)
    ? plan.highlights.map((item) => normalizeText(item, "")).filter(Boolean)
    : [];

  return {
    ...plan,
    id: getPlanId(plan, index),
    tab,
    type,
    area,
    price,
    priceNote,
    image,
    highlights,
  };
};

const getPreferredTab = (tabs, preferred) => {
  if (!tabs.length) return "";
  if (!preferred) return tabs[0];
  const found = tabs.find((tab) => tab.toLowerCase() === preferred.toLowerCase());
  return found || tabs[0];
};

export default function DynamicPricingPlans({
  sectionTitle = "Pricing Plans",
  headTitle = "Configurations",
  headSubtitle = "",
  propertyTitle = "Property",
  plans = [],
  tableHead = { type: "Type", area: "Area", price: "Price" },
  downloadLabel = "Download Brochure",
  preferredTab,
}) {
  const tabsRef = useRef(null);
  const normalizedPlans = useMemo(() => plans.map((plan, idx) => normalizePlan(plan, idx)), [plans]);
  const tabs = useMemo(
    () => Array.from(new Set(normalizedPlans.map((plan) => plan.tab).filter(Boolean))),
    [normalizedPlans]
  );

  const [activeTab, setActiveTab] = useState(() => getPreferredTab(tabs, preferredTab));
  const [activePlanId, setActivePlanId] = useState(() => normalizedPlans[0]?.id || "");
  const [canTabsScrollLeft, setCanTabsScrollLeft] = useState(false);
  const [canTabsScrollRight, setCanTabsScrollRight] = useState(false);

  useEffect(() => {
    if (!tabs.includes(activeTab)) {
      setActiveTab(getPreferredTab(tabs, preferredTab));
    }
  }, [tabs, activeTab, preferredTab]);

  const filteredPlans = useMemo(() => {
    if (!activeTab) return normalizedPlans;
    return normalizedPlans.filter((plan) => plan.tab === activeTab);
  }, [normalizedPlans, activeTab]);

  useEffect(() => {
    if (!filteredPlans.find((plan) => plan.id === activePlanId)) {
      setActivePlanId(filteredPlans[0]?.id || normalizedPlans[0]?.id || "");
    }
  }, [filteredPlans, activePlanId, normalizedPlans]);

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
  }, [tabs.length, activeTab]);

  const activePlan =
    filteredPlans.find((plan) => plan.id === activePlanId) || filteredPlans[0] || normalizedPlans[0];

  if (!activePlan) return null;

  const activeHighlights =
    activePlan.highlights.length > 0
      ? activePlan.highlights
      : [normalizeText(activePlan.note, "Well-planned layout"), "Prime location", "Ready for site visit"];

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
      <h2 className="wg-title text-11 fw-6 text-color-heading">{sectionTitle}</h2>

      <div className="bhk-floor-plan" aria-label={`${propertyTitle} pricing plans`}>
        <div className="bhk-floor-plan-head">
          <div className="left">
            <h3>{headTitle}</h3>
            {headSubtitle ? <p>{headSubtitle}</p> : null}
          </div>
          <button type="button" className="download-link">
            <i className="icon icon-DownloadSimple" />
            {downloadLabel}
          </button>
        </div>

        <div className="bhk-tabs-wrap">
          <button
            type="button"
            className={`tabs-nav-btn${canTabsScrollLeft ? "" : " is-disabled"}`}
            onClick={() => scrollTabsBy(-220)}
            aria-label="Scroll tabs left"
            disabled={!canTabsScrollLeft}
          >
            <ScrollArrowIcon direction="left" />
          </button>

          <div className="bhk-tabs" role="tablist" aria-label={`${sectionTitle} tabs`} ref={tabsRef} onWheel={handleTabsWheel}>
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`bhk-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`tabs-nav-btn${canTabsScrollRight ? "" : " is-disabled"}`}
            onClick={() => scrollTabsBy(220)}
            aria-label="Scroll tabs right"
            disabled={!canTabsScrollRight}
          >
            <ScrollArrowIcon direction="right" />
          </button>
        </div>

        <div className="bhk-floor-plan-layout">
          <article className="floor-preview-card">
            <div className="plan-image-wrap">
              <Image
                src={activePlan.image}
                alt={`${activePlan.type} plan`}
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
                <span>{tableHead.type || "Type"}</span>
                <span>{tableHead.area || "Area"}</span>
                <span>{tableHead.price || "Price"}</span>
              </div>
            </div>

            <div className="pricing-body" aria-label={`${sectionTitle} rows`}>
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
                    {plan.priceNote ? <small>{plan.priceNote}</small> : null}
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
