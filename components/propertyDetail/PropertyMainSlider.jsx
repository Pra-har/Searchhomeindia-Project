"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const galleryPool = [
  "/images/section/property-detail-3.jpg",
  "/images/section/property-detail-4.jpg",
  "/images/section/property-detail-5.jpg",
  "/images/section/property-detail-6.jpg",
  "/images/section/box-house.jpg",
  "/images/section/box-house-2.jpg",
  "/images/section/box-house-3.jpg",
  "/images/section/box-house-4.jpg",
  "/images/section/property-detail-5.jpg",
  "/images/section/property-detail-6.jpg",
  "/images/section/box-house.jpg",
  "/images/section/box-house-2.jpg",
  "/images/section/box-house-3.jpg",
];

const mediaTypeCycle = [
  "Exterior",
  "Interior",
  "Master Plan",
  "Floor Plan",
  "Exterior",
  "Interior",
  "Master Plan",
  "Floor Plan",
];

const ArrowIcon = ({ direction = "left" }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={direction === "right" ? { transform: "rotate(180deg)" } : undefined}
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

const toNumber = (value, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const formatInr = (value) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

const toInrRange = (value) => {
  const inrValue = value < 100000 ? value * 1000 : value;
  const maxValue = Math.round(inrValue * 1.35);
  const perSqft = Math.max(1200, Math.round(inrValue / 1200));
  return {
    min: inrValue,
    max: maxValue,
    perSqft,
  };
};

const compactPrice = (value) => {
  if (value >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(2)} L`;
  return formatInr(value);
};

const getGalleryImages = (property) => {
  const mainImage = property?.imageSrc || galleryPool[0];
  const uniquePool = [mainImage, ...galleryPool.filter((img) => img !== mainImage)];
  return uniquePool.slice(0, 8);
};

const getMediaItems = (property) => {
  const rawMedia = Array.isArray(property?.mediaGallery) ? property.mediaGallery : [];
  if (rawMedia.length > 0) {
    return rawMedia
      .map((item, index) => {
        const src = item?.src || item?.imageSrc || item?.image || "";
        if (!src) return null;
        const type = item?.type || item?.category || item?.label || "Gallery";
        return {
          src,
          type,
          absoluteIndex: index,
        };
      })
      .filter(Boolean);
  }

  const galleryImages = getGalleryImages(property);
  return galleryImages.map((src, index) => ({
    src,
    type: mediaTypeCycle[index % mediaTypeCycle.length],
    absoluteIndex: index,
  }));
};

const sortMediaItemsByType = (items) => {
  if (!Array.isArray(items) || items.length === 0) return [];
  const grouped = items.reduce((acc, item) => {
    const key = item?.type || "Gallery";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
  return Object.keys(grouped).flatMap((type) => grouped[type]);
};

const toDisplayText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  if (Array.isArray(value)) {
    const parsed = value
      .map((entry) => toDisplayText(entry, ""))
      .filter(Boolean);
    return parsed.length ? parsed.join(", ") : fallback;
  }
  if (typeof value === "object") {
    if (value?.label) return String(value.label);
    if (value?.name) return String(value.name);
    return fallback;
  }
  const parsed = String(value).trim();
  return parsed || fallback;
};

const getConfigurationsText = (property, beds) =>
  toDisplayText(
    property?.configurations ??
      property?.configuration ??
      property?.bhkType ??
      property?.projectDetails?.configurations ??
      property?.projectDetails?.configuration,
    `${beds}, ${beds + 1} BHK Apartments`
  );

export default function PropertyMainSlider({ property }) {
  const title = property?.title || "Godrej Parkshire";
  const location = property?.location || "Hoskote, Whitefield, Bangalore";
  const beds = toNumber(property?.beds, 3);
  const sqft = toNumber(property?.sqft, 4043);
  const basePrice = toNumber(property?.price, 8600000);
  const city = location.split(",").pop()?.trim() || "Bangalore";
  const configurationsText = getConfigurationsText(property, beds);

  const pricing = toInrRange(basePrice);
  const mediaItems = sortMediaItemsByType(getMediaItems(property)).map((item, index) => ({
    ...item,
    absoluteIndex: index,
  }));
  const gallery = mediaItems.map((item) => item.src);
  const mediaTypeOptions = [
    "All",
    ...Array.from(new Set(mediaItems.map((item) => item.type).filter(Boolean))),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaFilter, setMediaFilter] = useState("All");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("/property-detail");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);
  const [lightboxActive, setLightboxActive] = useState(0);
  const [canScrollTabsLeft, setCanScrollTabsLeft] = useState(false);
  const [canScrollTabsRight, setCanScrollTabsRight] = useState(false);
  const shareMenuRef = useRef(null);
  const lightboxSwiperRef = useRef(null);
  const lightboxTabsRef = useRef(null);

  const heroMedia = mediaItems;
  const lightboxMedia = mediaItems;
  const filteredLightboxMedia =
    mediaFilter === "All"
      ? lightboxMedia
      : lightboxMedia.filter((item) => item.type === mediaFilter);
  const visibleLightboxMedia =
    filteredLightboxMedia.length > 0 ? filteredLightboxMedia : lightboxMedia;
  const mediaTypeCounts = mediaItems.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
  const mediaTypeRunningCounts = {};
  const mediaTypeOrderByAbsolute = {};
  mediaItems.forEach((item) => {
    const nextCount = (mediaTypeRunningCounts[item.type] || 0) + 1;
    mediaTypeRunningCounts[item.type] = nextCount;
    mediaTypeOrderByAbsolute[item.absoluteIndex] = nextCount;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target)
      ) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const updateLightboxTabsScrollState = () => {
    const node = lightboxTabsRef.current;
    if (!node) return;
    setCanScrollTabsLeft(node.scrollLeft > 2);
    setCanScrollTabsRight(
      node.scrollLeft + node.clientWidth < node.scrollWidth - 2
    );
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const timer = setTimeout(updateLightboxTabsScrollState, 50);
    window.addEventListener("resize", updateLightboxTabsScrollState);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLightboxTabsScrollState);
    };
  }, [lightboxOpen, mediaFilter, mediaTypeOptions.length]);

  useEffect(() => {
    if (activeIndex >= heroMedia.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, heroMedia.length]);

  const safeIndex = Math.max(0, Math.min(activeIndex, heroMedia.length - 1));
  const mainItem = heroMedia[safeIndex];
  const videoIndex = (safeIndex + 1) % heroMedia.length;
  const sideIndex = (safeIndex + 2) % heroMedia.length;
  const videoItem = heroMedia[videoIndex];
  const sideItem = heroMedia[sideIndex];
  const moreCount = Math.max(0, heroMedia.length - 3);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location
  )}`;

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
    `${title} - ${currentUrl}`
  )}`;
  const gmailLink = `mailto:?subject=${encodeURIComponent(
    title
  )}&body=${encodeURIComponent(`${title}\n${currentUrl}`)}`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;
  const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    currentUrl
  )}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(currentUrl)}`;
  const progressPercent =
    visibleLightboxMedia.length > 0
      ? Math.round(
          ((lightboxActive + 1) / Math.max(1, visibleLightboxMedia.length)) * 100
        )
      : 0;
  const nextPreviewIndex =
    visibleLightboxMedia.length > 0
      ? (lightboxActive + 1) % visibleLightboxMedia.length
      : 0;
  const nextPreviewItem = visibleLightboxMedia[nextPreviewIndex];
  const isLightboxAtStart = lightboxActive <= 0;
  const isLightboxAtEnd = lightboxActive >= visibleLightboxMedia.length - 1;

  const focusTypeChip = (type) => {
    const node = lightboxTabsRef.current;
    if (!node || !type) return;
    const chip = node.querySelector(`[data-type="${type}"]`);
    if (chip?.scrollIntoView) {
      chip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const openLightbox = (index) => {
    const safeLightboxIndex = Math.max(0, Math.min(index, lightboxMedia.length - 1));
    setMediaFilter("All");
    setLightboxStart(safeLightboxIndex);
    setLightboxActive(safeLightboxIndex);
    setLightboxOpen(true);
    setTimeout(updateLightboxTabsScrollState, 50);
  };

  const prevBanner = () => {
    setActiveIndex((prev) => (prev === 0 ? heroMedia.length - 1 : prev - 1));
  };

  const nextBanner = () => {
    setActiveIndex((prev) => (prev + 1) % heroMedia.length);
  };

  const scrollLightboxTabs = (direction) => {
    const node = lightboxTabsRef.current;
    if (!node) return;
    const step = Math.max(120, Math.round(node.clientWidth * 0.6));
    node.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
    setTimeout(updateLightboxTabsScrollState, 220);
  };

  return (
    <section id="gallery-swiper-started" className="section-property-image property-hero">
      <div className="tf-container">
        <div className="property-hero-head">
          <div className="left">
            <h1 className="title">{title}</h1>
            <p className="builder">
              By <a href="#">SEARCH HOMES INDIA VERIFIED PARTNER</a>
            </p>
            <div className="location-wrap">
              <p className="location flex items-center gap-8">
                <i className="icon-location" />
                {location}
              </p>
              <a href={mapUrl} target="_blank" rel="noreferrer" className="see-map-btn">
                <i className="icon-location-2" />
                See map
              </a>
            </div>
          </div>

          <div className="right">
            <div className="hero-price">
              {"\u20B9"} {compactPrice(pricing.min)} - {compactPrice(pricing.max)}
              <span>
                {" "}
                {"\u20B9"} {formatInr(pricing.perSqft)} / sq.ft
              </span>
            </div>
            <p className="hero-emi">
              EMI starts at {"\u20B9"} {formatInr(Math.round(pricing.min / 240))}
            </p>
            <div className="hero-head-actions">
              <a href="tel:+918147267372" className="tf-btn bg-color-primary contact-dev-btn">
                <i className="icon-phone-1" />
                Contact Developer
              </a>
              <a href="tel:+918147267372" className="tf-btn style-border head-mini-btn">
                <i className="icon-view" />
                View Number
              </a>
            </div>
          </div>
        </div>

        <div className="property-hero-grid">
          <div className="property-hero-gallery">
            <div className="main-image">
              <button
                type="button"
                className="image-wrap d-block banner-click"
                onClick={() => openLightbox(mainItem.absoluteIndex)}
                aria-label="Open image gallery"
              >
                <Image src={mainItem.src} alt={title} width={1200} height={800} />
              </button>
              <span className="main-type">{mainItem.type}</span>

              <button
                type="button"
                className="banner-nav prev"
                onClick={prevBanner}
                aria-label="Previous banner image"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                className="banner-nav next"
                onClick={nextBanner}
                aria-label="Next banner image"
              >
                <ArrowIcon direction="right" />
              </button>

              <div className="top-actions">
                <div className="share-menu-wrap" ref={shareMenuRef}>
                  <button
                    type="button"
                    className="hero-chip"
                    onClick={() => setShowShareMenu((prev) => !prev)}
                  >
                    <i className="icon-send-message" />
                    Share
                  </button>
                  {showShareMenu && (
                    <div className="hero-share-menu">
                      <a href={facebookLink} target="_blank" rel="noreferrer">
                        Facebook
                      </a>
                      <a href={linkedinLink} target="_blank" rel="noreferrer">
                        Linkedin
                      </a>
                      <a href={twitterLink} target="_blank" rel="noreferrer">
                        Twitter
                      </a>
                      <a href={whatsappLink} target="_blank" rel="noreferrer">
                        Whatsapp
                      </a>
                      <a href={gmailLink} target="_blank" rel="noreferrer">
                        Gmail
                      </a>
                    </div>
                  )}
                </div>
                <button type="button" className="hero-chip">
                  <i className="icon-heart-1" />
                  Save
                </button>
              </div>

              <div className="bottom-actions">
                <button type="button" className="hero-chip light" onClick={() => openLightbox(mainItem.absoluteIndex)}>
                  <i className="icon-img" />
                  {gallery.length} Photos
                </button>
                <button type="button" className="hero-chip light">
                  <i className="icon-play" />
                  Video
                </button>
                <a href={mapUrl} target="_blank" rel="noreferrer" className="hero-chip light">
                  <i className="icon-location-2" />
                  Map
                </a>
                <button type="button" className="hero-chip light">
                  <i className="icon-DownloadSimple" />
                  Brochure
                </button>
              </div>
            </div>

            <div className="side-media">
              <button
                type="button"
                className="image-wrap d-block"
                onClick={() => openLightbox(videoItem.absoluteIndex)}
                aria-label="Open project video thumbnail"
              >
                <Image src={videoItem.src} alt={`${title} view`} width={800} height={540} />
                <span className="label">{videoItem.type}</span>
              </button>

              <button
                type="button"
                className="image-wrap d-block"
                onClick={() => openLightbox(sideItem.absoluteIndex)}
                aria-label="Open additional images"
              >
                <Image src={sideItem.src} alt={`${title} more`} width={800} height={540} />
                <span className="more">+{moreCount} more</span>
              </button>
            </div>

          </div>

          <aside className="property-hero-side">
            <div className="side-project-head">
              <h6>{title}</h6>
              <a href="tel:+918147267372" className="mini-contact-btn">
                Contact
              </a>
            </div>
            <h5>Are you interested in this property?</h5>
            <p>Request a callback</p>

            <form id="request-call-form" onSubmit={(e) => e.preventDefault()}>
              <fieldset>
                <input type="text" className="form-control" placeholder="Name" required />
              </fieldset>
              <fieldset>
                <input type="text" className="form-control" placeholder="Mobile Number" required />
              </fieldset>
              <fieldset>
                <input type="email" className="form-control" placeholder="Email ID (Optional)" />
              </fieldset>
              <fieldset>
                <textarea className="form-control" placeholder="Message" rows={3} />
              </fieldset>
              <button type="submit" className="tf-btn bg-color-primary w-full">
                Request Call
              </button>
            </form>
          </aside>
        </div>

        <div className="property-hero-facts">
          <div className="fact-item">
            <h6>{configurationsText}</h6>
            <p>Configurations</p>
          </div>
          <div className="fact-item">
            <h6>Jul 2028</h6>
            <p>Possession Starts</p>
          </div>
          <div className="fact-item">
            <h6>
              {"\u20B9"} {formatInr(pricing.perSqft)} / sq.ft
            </h6>
            <p>Avg. Price</p>
          </div>
          <div className="fact-item">
            <h6>
              {Math.max(800, sqft - 400)} - {sqft + 300} sq.ft
            </h6>
            <p>Sizes (Built-up)</p>
          </div>
        </div>

        <div className="property-hero-mobile-actions">
          <a href="tel:+918147267372" className="tf-btn bg-color-primary">
            <i className="icon-phone-1" />
            Contact Developer
          </a>
          <a href="tel:+918147267372" className="tf-btn style-border">
            <i className="icon-view" />
            View Number
          </a>
        </div>
      </div>

      {lightboxOpen && (
        <div className="property-hero-lightbox" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-shell" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-toolbar">
              <div className="toolbar-left">
                <div className="project">
                  <h6>{title}</h6>
                  <p>
                    {"\u20B9"} {compactPrice(pricing.min)} - {compactPrice(pricing.max)}
                  </p>
                </div>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="tool-btn">
                  <i className="icon-send-message" />
                  Share
                </a>
                <button type="button" className="tool-btn">
                  <i className="icon-heart-1" />
                  Save
                </button>
              </div>

              <div className="toolbar-center">
                <div className="lightbox-count">
                  {lightboxActive + 1}/{visibleLightboxMedia.length}
                </div>
                <div className="lightbox-progress">
                  <span style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="toolbar-right">
                <a href="#request-call-form" className="tf-btn bg-color-primary contact-btn">
                  Contact Sellers
                </a>
                <button
                  type="button"
                  className="lightbox-close"
                  aria-label="Close gallery"
                  onClick={() => setLightboxOpen(false)}
                >
                  <i className="icon-X" />
                </button>
              </div>
            </div>

            <div className="lightbox-type-tabs-wrap">
              <button
                type="button"
                className={`tabs-scroll-btn prev${canScrollTabsLeft ? "" : " is-disabled"}`}
                aria-label="Scroll categories left"
                onClick={() => scrollLightboxTabs("left")}
                disabled={!canScrollTabsLeft}
              >
                <ArrowIcon direction="left" />
              </button>

              <div
                className="lightbox-type-tabs"
                ref={lightboxTabsRef}
                onScroll={updateLightboxTabsScrollState}
              >
                {mediaTypeOptions.map((type) => {
                  const typeCount =
                    type === "All"
                      ? lightboxMedia.length
                      : mediaTypeCounts[type] || 0;
                  return (
                    <button
                      type="button"
                      key={`lightbox-type-${type}`}
                      data-type={type}
                      className={`type-chip${mediaFilter === type ? " active" : ""}`}
                      onClick={() => {
                        setMediaFilter(type);
                        const targetMedia =
                          type === "All"
                            ? lightboxMedia
                            : lightboxMedia.filter((item) => item.type === type);
                        const normalizedMedia =
                          targetMedia.length > 0 ? targetMedia : lightboxMedia;
                        const nextIndex = 0;
                        setLightboxStart(nextIndex);
                        setLightboxActive(nextIndex);
                        lightboxSwiperRef.current?.slideTo(nextIndex);
                        focusTypeChip(type);
                        setTimeout(updateLightboxTabsScrollState, 20);
                      }}
                    >
                      {type} ({typeCount})
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className={`tabs-scroll-btn next${canScrollTabsRight ? "" : " is-disabled"}`}
                aria-label="Scroll categories right"
                onClick={() => scrollLightboxTabs("right")}
                disabled={!canScrollTabsRight}
              >
                <ArrowIcon direction="right" />
              </button>
            </div>

            <div className="lightbox-stage">
              <div className="lightbox-gutter">
                <button
                  type="button"
                  className={`lightbox-nav prev${isLightboxAtStart ? " is-disabled" : ""}`}
                  onClick={() => lightboxSwiperRef.current?.slidePrev()}
                  aria-label="Previous image"
                  disabled={isLightboxAtStart}
                >
                  <ArrowIcon direction="left" />
                </button>
              </div>

              <div className="lightbox-main">
                <Swiper
                  initialSlide={lightboxStart}
                  onSwiper={(swiper) => {
                    lightboxSwiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    const nextIndex = swiper.activeIndex;
                    setLightboxActive(nextIndex);
                    updateLightboxTabsScrollState();
                  }}
                  className="property-hero-lightbox-swiper"
                  key={`hero-lightbox-${mediaFilter}-${lightboxStart}`}
                >
                  {visibleLightboxMedia.map((item, index) => (
                    <SwiperSlide key={`${item.src}-${index}`}>
                      <div className="slide-img-wrap">
                        <div className="slide-type-badge">
                          {item.type} (
                          {mediaTypeOrderByAbsolute[item.absoluteIndex] || 1}/
                          {mediaTypeCounts[item.type] || 1})
                        </div>
                        <Image
                          src={item.src}
                          alt={`${title} ${index + 1}`}
                          width={1400}
                          height={900}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {visibleLightboxMedia.length > 1 && nextPreviewItem && (
                <div className="lightbox-next-preview">
                  <button
                    type="button"
                    className="preview-card"
                    onClick={() => lightboxSwiperRef.current?.slideNext()}
                    aria-label="Go to next preview image"
                  >
                    <div className="preview-image">
                      <Image
                        src={nextPreviewItem.src}
                        alt={`${title} next preview`}
                        width={520}
                        height={320}
                      />
                    </div>
                    <span className="preview-type">{nextPreviewItem.type}</span>
                  </button>
                </div>
              )}

              <div className="lightbox-gutter">
                <button
                  type="button"
                  className={`lightbox-nav next${isLightboxAtEnd ? " is-disabled" : ""}`}
                  onClick={() => lightboxSwiperRef.current?.slideNext()}
                  aria-label="Next image"
                  disabled={isLightboxAtEnd}
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
