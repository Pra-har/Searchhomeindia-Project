"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { usePathname, useRouter } from "next/navigation";
import SearchForm from "@/components/common/SearchForm";

const heroSlides = [
  {
    id: 1,
    image: "/images/section/page-title-4.jpg",
  },
  {
    id: 2,
    image: "/images/section/page-title-4.jpg",
  },
  {
    id: 3,
    image: "/images/section/page-title-5.jpg",
  },
  {
    id: 4,
    image: "/images/section/page-title-1.jpg",
  },
];

const cityContent = {
  bangalore: {
    city: "Bangalore",
    title: "Real Estate Made Real Easy",
    subtitle:
      "We have got you covered. From finding the perfect property to financing.",
  },
  mumbai: {
    city: "Mumbai",
    title: "Find Homes In Prime Locations",
    subtitle:
      "Buy, rent, and invest with confidence through trusted local experts.",
  },
  delhi: {
    city: "Delhi",
    title: "Search Smarter, Move Faster",
    subtitle:
      "Compare projects, connect with agents, and close deals with ease.",
  },
  hyderabad: {
    city: "Hyderabad",
    title: "Own The Right Home, Right Now",
    subtitle:
      "Discover projects, compare localities, and move ahead with confidence.",
  },
  chennai: {
    city: "Chennai",
    title: "Your Next Home Starts Here",
    subtitle:
      "Explore verified listings and connect with trusted experts instantly.",
  },
  pune: {
    city: "Pune",
    title: "Find Better Homes, Faster",
    subtitle:
      "From shortlist to site visit, we simplify every step of your journey.",
  },
};

export default function Hero({ enableSlider = true, city }) {
  const [activeTab, setActiveTab] = useState("Buy");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [canScrollTabsLeft, setCanScrollTabsLeft] = useState(false);
  const [canScrollTabsRight, setCanScrollTabsRight] = useState(true);
  const [canMobileScrollTabsLeft, setCanMobileScrollTabsLeft] = useState(false);
  const [canMobileScrollTabsRight, setCanMobileScrollTabsRight] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const tabsScrollRef = useRef(null);
  const mobileTabsScrollRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const tabs = [
    { label: "Buy", icon: "⌂" },
    { label: "Rental", icon: "◈" },
    { label: "Projects", icon: "▦" },
    { label: "PG / Hostels", icon: "▤" },
    { label: "Plot & Land", icon: "▱" },
    { label: "Commercial", icon: "▧" },
    { label: "Agents", icon: "◎" },
  ];
  const cityOptions = [
    { label: "Bangalore", slug: "bangalore" },
    { label: "Mumbai", slug: "mumbai" },
    { label: "Delhi", slug: "delhi" },
    { label: "Hyderabad", slug: "hyderabad" },
    { label: "Chennai", slug: "chennai" },
    { label: "Pune", slug: "pune" },
  ];

  const currentCitySlug = useMemo(() => {
    if (city) return String(city).toLowerCase();
    const firstSegment = pathname.split("/").filter(Boolean)[0] || "";
    return firstSegment.toLowerCase();
  }, [city, pathname]);

  const activeContent = cityContent[currentCitySlug] || cityContent.bangalore;

  const handleCityChange = (event) => {
    const selectedCity = cityOptions.find(
      (item) => item.label === event.target.value
    );
    if (!selectedCity) return;
    router.push(`/${selectedCity.slug}`);
  };

  const updateTabsScrollState = () => {
    const node = tabsScrollRef.current;
    if (!node) return;
    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setCanScrollTabsLeft(node.scrollLeft > 4);
    setCanScrollTabsRight(node.scrollLeft < maxScrollLeft - 4);
  };

  const scrollTabsBy = (direction) => {
    const node = tabsScrollRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * 180, behavior: "smooth" });
    window.setTimeout(updateTabsScrollState, 220);
  };

  const updateMobileTabsScrollState = () => {
    const node = mobileTabsScrollRef.current;
    if (!node) return;
    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setCanMobileScrollTabsLeft(node.scrollLeft > 4);
    setCanMobileScrollTabsRight(node.scrollLeft < maxScrollLeft - 4);
  };

  const scrollMobileTabsBy = (direction) => {
    const node = mobileTabsScrollRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * 180, behavior: "smooth" });
    window.setTimeout(updateMobileTabsScrollState, 220);
  };

  useEffect(() => {
    updateTabsScrollState();
    updateMobileTabsScrollState();
    const handleResize = () => {
      updateTabsScrollState();
      updateMobileTabsScrollState();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="hero-v2">
      <div className="hero-v2-layer">
        {enableSlider ? (
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            loop={true}
            speed={900}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="hero-v2-swiper"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="hero-v2-bg">
                  <img src={slide.image} alt={activeContent.title} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="hero-v2-static">
            <div className="hero-v2-bg">
              <img src={heroSlides[0].image} alt={activeContent.title} />
            </div>
          </div>
        )}

        <div className="hero-v2-overlay" />
        <div className="hero-v2-content-wrap container">
          <div className="hero-v2-content">
            <p className="hero-v2-city">{activeContent.city}</p>
            <h1>{activeContent.title}</h1>
            <p className="hero-v2-sub">{activeContent.subtitle}</p>

            <div className="hero-v2-panel">
              <div className="hero-v2-tabs-wrap">
                <button
                  type="button"
                  className={`hero-v2-tab-nav prev ${
                    !canScrollTabsLeft ? "is-disabled" : ""
                  }`}
                  onClick={() => scrollTabsBy(-1)}
                  aria-label="Scroll tabs left"
                >
                  <i className="icon-arrow-left-1" />
                </button>
                <div
                  className="hero-v2-tabs"
                  ref={tabsScrollRef}
                  onScroll={updateTabsScrollState}
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.label}
                      type="button"
                      className={activeTab === tab.label ? "active" : ""}
                      onClick={() => setActiveTab(tab.label)}
                    >
                      <span className="tab-icon" aria-hidden="true">
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className={`hero-v2-tab-nav next ${
                    !canScrollTabsRight ? "is-disabled" : ""
                  }`}
                  onClick={() => scrollTabsBy(1)}
                  aria-label="Scroll tabs right"
                >
                  <i className="icon-arrow-right-1" />
                </button>
              </div>

              <div className="hero-v2-search-row">
                <button
                  type="button"
                  className="hero-v2-mobile-trigger"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#hero-mobile-search"
                  aria-controls="hero-mobile-search"
                  aria-label="Open mobile search panel"
                />
                <div className="hero-v2-city-select">
                  <select value={activeContent.city} onChange={handleCityChange}>
                    {cityOptions.map((item) => (
                      <option key={item.slug}>{item.label}</option>
                    ))}
                  </select>
                </div>

                <div className="hero-v2-input">
                  <i className="icon-search" />
                  <input
                    type="text"
                    placeholder={`Search properties in ${activeContent.city}`}
                  />
                </div>

                <div className="hero-v2-actions">
                  <button type="button" className="icon-btn" aria-label="Use GPS">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M12 2V5M12 19V22M2 12H5M19 12H22"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18.5 12A6.5 6.5 0 1 0 5.5 12A6.5 6.5 0 1 0 18.5 12Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </button>
                  <button type="button" className="icon-btn" aria-label="Use microphone">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="9"
                        y="3"
                        width="6"
                        height="11"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M6.5 11.5V12C6.5 15.0376 8.96243 17.5 12 17.5C15.0376 17.5 17.5 15.0376 17.5 12V11.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 17.5V21M9.5 21H14.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <button
                        type="button"
                        className="btn-filter show-form icon-btn"
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                        aria-label="Toggle advanced filters"
                      >
                        <div className="icons">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 4H14"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 4H3"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 12H12"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H3"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 20H16"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 20H3"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 2V6"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 10V14"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 18V22"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                  <button type="button" className="hero-v2-search-btn">
                    Search
                  </button>
                </div>
                
              </div>
               <SearchForm
                 parentClass={`wd-search-form hero-filter-form ${
                   isFilterOpen ? "show" : ""
                 }`}
               />
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start hero-mobile-offcanvas"
        tabIndex={-1}
        id="hero-mobile-search"
        aria-labelledby="hero-mobile-search-label"
      >
        <div className="offcanvas-header">
          <h5 id="hero-mobile-search-label">Search Properties</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="hero-mobile-tabs-wrap">
            <button
              type="button"
              className={`hero-mobile-tab-nav prev ${
                !canMobileScrollTabsLeft ? "is-disabled" : ""
              }`}
              onClick={() => scrollMobileTabsBy(-1)}
              aria-label="Scroll tabs left"
            >
              <i className="icon-arrow-left-1" />
            </button>
            <div
              className="hero-mobile-tabs"
              ref={mobileTabsScrollRef}
              onScroll={updateMobileTabsScrollState}
            >
              {tabs.map((tab) => (
                <button
                  key={`mobile-${tab.label}`}
                  type="button"
                  className={activeTab === tab.label ? "active" : ""}
                  onClick={() => setActiveTab(tab.label)}
                >
                  <span className="tab-icon" aria-hidden="true">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`hero-mobile-tab-nav next ${
                !canMobileScrollTabsRight ? "is-disabled" : ""
              }`}
              onClick={() => scrollMobileTabsBy(1)}
              aria-label="Scroll tabs right"
            >
              <i className="icon-arrow-right-1" />
            </button>
          </div>
          <div className="hero-mobile-fields">
            <select value={activeContent.city} onChange={handleCityChange}>
              {cityOptions.map((item) => (
                <option key={`mobile-city-${item.slug}`}>{item.label}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder={`Search properties in ${activeContent.city}`}
            />
            <div className="hero-mobile-actions">
              <button type="button" className="icon-btn" aria-label="Use GPS">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 2V5M12 19V22M2 12H5M19 12H22"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button type="button" className="icon-btn" aria-label="Use microphone">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="9"
                    y="3"
                    width="6"
                    height="11"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M6.5 11.5V12C6.5 15.0376 8.96243 17.5 12 17.5C15.0376 17.5 17.5 15.0376 17.5 12V11.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label="Advanced filter"
                onClick={() => setIsMobileFilterOpen((prev) => !prev)}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 4H14M10 4H3M21 12H12M8 12H3M21 20H16M12 20H3M14 2V6M8 10V14M16 18V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button type="button" className="hero-v2-search-btn w-100">
                Search
              </button>
            </div>
            <SearchForm
              parentClass={`wd-search-form hero-mobile-filter-form ${
                isMobileFilterOpen ? "show" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
