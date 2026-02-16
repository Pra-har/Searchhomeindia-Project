"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const NAV_ITEMS = [
  { id: "property-overview-section", label: "Overview", icon: "overview" },
  { id: "gallery-swiper-started", label: "Gallery", icon: "gallery" },
  { id: "about-project-section", label: "About", icon: "about" },
  { id: "floor-plan-section", label: "Floor Plan", icon: "floor" },
  { id: "project-highlights-section", label: "Highlights", icon: "highlights" },
  { id: "project-amenities-section", label: "Amenities", icon: "amenities" },
  { id: "project-connectivity-section", label: "Connectivity", icon: "connectivity" },
  { id: "about-builder-section", label: "Builder", icon: "builder" },
  { id: "project-location-section", label: "Location", icon: "location" },
  { id: "video-review-section", label: "Video", icon: "video" },
];

const getSectionsFromDom = (items) =>
  items.filter((item) => typeof document !== "undefined" && document.getElementById(item.id));

const QuickNavIcon = ({ icon }) => {
  const common = {
    width: 13,
    height: 13,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (icon) {
    case "gallery":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2.8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 15L8 10L13 14L16 12L21 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        </svg>
      );
    case "overview":
      return (
        <svg {...common}>
          <path d="M4 11.5L12 5L20 11.5V19H4V11.5Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.2 19V14.2H14.8V19" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "about":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 10V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="7.4" r="1.2" fill="currentColor" />
        </svg>
      );
    case "floor":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 8H11V12H8V8Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13 8H16V10.7H13V8Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13 12.2H16V16H13V12.2Z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "highlights":
      return (
        <svg {...common}>
          <path
            d="M12 3L14.9 8.7L21 9.6L16.5 14L17.6 20L12 17.1L6.4 20L7.5 14L3 9.6L9.1 8.7L12 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "amenities":
      return (
        <svg {...common}>
          <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 12V8.8A2.8 2.8 0 0 1 9.8 6H14.2A2.8 2.8 0 0 1 17 8.8V12" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 12V18M18 12V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "connectivity":
      return (
        <svg {...common}>
          <circle cx="6.5" cy="6.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.5" cy="17.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8.4 8.4L15.6 15.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "builder":
      return (
        <svg {...common}>
          <path d="M6 20V6H18V20" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 9H11M13 9H15M9 12H11M13 12H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M10 20V16H14V20" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "location":
      return (
        <svg {...common}>
          <path
            d="M12 20C15.9 16.2 18 13.6 18 10.2C18 6.8 15.3 4 12 4C8.7 4 6 6.8 6 10.2C6 13.6 8.1 16.2 12 20Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="10.3" r="2.2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "video":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.2" width="17" height="13.6" rx="2.6" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 9L15 12L10 15V9Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};

export default function PropertyQuickNav() {
  const [activeId, setActiveId] = useState("property-overview-section");
  const [availableItems, setAvailableItems] = useState(NAV_ITEMS);
  const [stickyTop, setStickyTop] = useState(82);
  const wrapRef = useRef(null);

  const items = useMemo(() => availableItems, [availableItems]);

  const getTargetOffset = () => {
    const navHeight = wrapRef.current?.offsetHeight || 44;
    return stickyTop + navHeight + 14;
  };

  const getActiveOffset = () => {
    const navHeight = wrapRef.current?.offsetHeight || 44;
    return stickyTop + navHeight + 4;
  };

  useEffect(() => {
    const syncItems = () => {
      const next = getSectionsFromDom(NAV_ITEMS);
      setAvailableItems(next.length ? next : NAV_ITEMS);
    };
    syncItems();
    window.addEventListener("resize", syncItems);
    return () => window.removeEventListener("resize", syncItems);
  }, []);

  useEffect(() => {
    const updateTop = () => {
      const headerNode = document.querySelector("header.header");
      const headerHeight = headerNode ? Math.ceil(headerNode.getBoundingClientRect().height) : 82;
      setStickyTop(Math.max(55, headerHeight - 1));
    };
    updateTop();
    window.addEventListener("resize", updateTop);
    return () => window.removeEventListener("resize", updateTop);
  }, []);

  useEffect(() => {
    const navHeight = wrapRef.current?.offsetHeight || 44;
    const resolvedOffset = stickyTop + navHeight + 10;
    document.documentElement.style.setProperty("--property-sticky-offset", `${resolvedOffset}px`);
    return () => {
      document.documentElement.style.removeProperty("--property-sticky-offset");
    };
  }, [stickyTop, items.length]);

  useEffect(() => {
    if (!items.length) return undefined;
    const trackItems = items.filter((item) => item.id !== "gallery-swiper-started");

    const onScroll = () => {
      const scrollMark = window.scrollY + getActiveOffset();
      let currentId = trackItems[0]?.id || items[0].id;

      for (let index = 0; index < trackItems.length; index += 1) {
        const item = trackItems[index];
        const section = document.getElementById(item.id);
        if (!section) continue;

        const nextItem = trackItems[index + 1];
        const nextSection = nextItem ? document.getElementById(nextItem.id) : null;
        const sectionTop = section.offsetTop;
        const nextSectionTop = nextSection ? nextSection.offsetTop : Number.POSITIVE_INFINITY;

        if (scrollMark >= sectionTop && scrollMark < nextSectionTop) {
          currentId = item.id;
          break;
        }

        if (scrollMark >= sectionTop) currentId = item.id;
      }

      setActiveId(currentId);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items, stickyTop]);

  const scrollToSection = (id) => {
    if (id === "gallery-swiper-started") {
      window.dispatchEvent(
        new CustomEvent("openPropertyHeroLightbox", {
          detail: { source: "quick-nav" },
        })
      );
      setActiveId(id);
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;
    const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY - getTargetOffset());
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveId(id);
  };

  if (!items.length) return null;

  return (
    <div className="property-quick-nav-wrap" ref={wrapRef} style={{ top: `${stickyTop}px` }}>
      <div className="tf-container">
        <div className="property-quick-nav-shell">
          <nav className="property-quick-nav" aria-label="Property detail quick navigation">
            {items.map((item) => (
              <button
                type="button"
                key={`quick-nav-${item.id}`}
                className={`quick-nav-chip${activeId === item.id ? " active" : ""}`}
                onClick={() => scrollToSection(item.id)}
                aria-current={activeId === item.id ? "true" : undefined}
              >
                <span className="chip-icon" aria-hidden="true">
                  <QuickNavIcon icon={item.icon} />
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
