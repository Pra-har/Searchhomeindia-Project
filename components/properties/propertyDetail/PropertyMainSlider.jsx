"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getPropertyDetailAdapter } from "./propertyDetailAdapter";
import {
  FAVORITES_EVENT,
  createFavoritePayload,
  isPropertySaved,
  removeFavoriteProperty,
  saveFavoriteProperty,
} from "@/utils/favorites";

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

const getDummyRating = (property = {}) => {
  const seed = String(property?.id || property?.slug || property?.title || "shi");
  const hash = seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rating = 4.1 + (hash % 8) * 0.1; // 4.1 to 4.8
  return Math.round(rating * 10) / 10;
};

const toRatingValue = (property = {}) => {
  const maybeRating = [
    property?.rating,
    property?.projectRating,
    property?.projectDetails?.rating,
    property?.projectDetails?.projectRating,
  ].find((item) => item !== undefined && item !== null && item !== "");

  if (maybeRating === undefined) return getDummyRating(property);
  const parsed = Number(String(maybeRating).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed)) return getDummyRating(property);
  const clamped = Math.max(0, Math.min(5, parsed));
  return Math.round(clamped * 10) / 10;
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

export default function PropertyMainSlider({ property }) {
  const detailData = getPropertyDetailAdapter(property);
  const title = detailData.title;
  const location = detailData.location;
  const basePrice = toNumber(property?.price, 8600000);
  const ratingValue = toRatingValue(property);
  const configurationsText = detailData.configurations;

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
  const [isSaved, setIsSaved] = useState(false);
  const shareMenuRef = useRef(null);
  const lightboxSwiperRef = useRef(null);
  const lightboxTabsRef = useRef(null);
  const propertyIdentifier = String(
    property?.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  );

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
    const refreshSavedState = () => {
      setIsSaved(isPropertySaved(propertyIdentifier));
    };

    refreshSavedState();
    if (typeof window === "undefined") return undefined;

    window.addEventListener(FAVORITES_EVENT, refreshSavedState);
    window.addEventListener("storage", refreshSavedState);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, refreshSavedState);
      window.removeEventListener("storage", refreshSavedState);
    };
  }, [propertyIdentifier]);

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
    visibleLightboxMedia.length > 0 && lightboxActive < visibleLightboxMedia.length - 1
      ? lightboxActive + 1
      : -1;
  const nextPreviewItem =
    nextPreviewIndex >= 0 ? visibleLightboxMedia[nextPreviewIndex] : null;
  const isLightboxAtStart = lightboxActive <= 0;
  const isLightboxAtEnd = lightboxActive >= visibleLightboxMedia.length - 1;
  const hasMultipleHeroImages = heroMedia.length > 1;
  const isHeroAtStart = safeIndex <= 0;
  const isHeroAtEnd = safeIndex >= heroMedia.length - 1;

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

  useEffect(() => {
    const openFromQuickNav = (event) => {
      const requestedIndex = toNumber(event?.detail?.index, mainItem.absoluteIndex);
      openLightbox(requestedIndex);
    };

    window.addEventListener("openPropertyHeroLightbox", openFromQuickNav);
    return () => window.removeEventListener("openPropertyHeroLightbox", openFromQuickNav);
  }, [mainItem.absoluteIndex, lightboxMedia.length]);

  const prevBanner = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const nextBanner = () => {
    setActiveIndex((prev) => Math.min(heroMedia.length - 1, prev + 1));
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

  const toggleSavedState = () => {
    const next = !isSaved;
    setIsSaved(next);

    if (next) {
      saveFavoriteProperty(
        createFavoritePayload(property, {
          id: propertyIdentifier,
          title,
          location,
          imageSrc: property?.imageSrc || mainItem?.src,
          beds: detailData.beds,
          baths: detailData.baths,
          sqft: detailData.builtUpArea,
          price: Math.round(pricing.min),
          category: property?.forSale ? "Buy" : property?.forRent ? "Rental" : "Others",
          url: property?.id ? `/property-detail/${property.id}` : "/property-listing",
        })
      );
      return;
    }

    removeFavoriteProperty(propertyIdentifier);
  };

  const handleVideoAction = () => {
    if (detailData.videoUrl && typeof window !== "undefined") {
      window.open(detailData.videoUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const videoSection = document.getElementById("video-review-section");
    if (videoSection?.scrollIntoView) {
      videoSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    openLightbox(mainItem.absoluteIndex);
  };

  const handleBrochureAction = () => {
    if (detailData.brochureUrl && typeof window !== "undefined") {
      window.open(detailData.brochureUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (typeof window === "undefined") return;
    const brochureText = [
      `${title} - Project Brochure`,
      `Location: ${location}`,
      `Configurations: ${detailData.configurations}`,
      `Price: \u20B9 ${compactPrice(pricing.min)} - ${compactPrice(pricing.max)}`,
      `Built-up: ${detailData.builtUpRange}`,
      `RERA: ${detailData.reraId}`,
      "",
      "This is a dummy brochure export. Replace with backend brochure URL later.",
    ].join("\n");

    const brochureBlob = new Blob([brochureText], {
      type: "text/plain;charset=utf-8",
    });
    const downloadUrl = window.URL.createObjectURL(brochureBlob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-brochure.txt`;
    link.click();
    window.URL.revokeObjectURL(downloadUrl);
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
            <div className="hero-rating">
              {ratingValue === null ? (
                <span className="na">Rating: N/A</span>
              ) : (
                <>
                  <div className="stars" aria-label={`Project rating ${ratingValue} out of 5`}>
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <i
                        key={`hero-rating-${starIndex}`}
                        className={`icon-star${
                          starIndex + 1 <= Math.floor(ratingValue) ? " is-filled" : ""
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="value">{ratingValue.toFixed(1)} / 5</span>
                </>
              )}
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

              {hasMultipleHeroImages && !isHeroAtStart ? (
                <button
                  type="button"
                  className="banner-nav prev"
                  onClick={prevBanner}
                  aria-label="Previous banner image"
                >
                  <ArrowIcon direction="left" />
                </button>
              ) : null}
              {hasMultipleHeroImages && !isHeroAtEnd ? (
                <button
                  type="button"
                  className="banner-nav next"
                  onClick={nextBanner}
                  aria-label="Next banner image"
                >
                  <ArrowIcon direction="right" />
                </button>
              ) : null}

              <div className="top-actions">
                <div className="share-menu-wrap" ref={shareMenuRef}>
                  <button
                    type="button"
                    className="hero-chip"
                    onClick={() => setShowShareMenu((prev) => !prev)}
                  >
                    <span className="share-icon-svg" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                            <circle cx="18" cy="5" r="3"/>
                            <circle cx="6" cy="12" r="3"/>
                            <circle cx="18" cy="19" r="3"/>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                          </svg>
                    </span>
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
                <button
                  type="button"
                  className={`hero-chip${isSaved ? " is-active" : ""}`}
                  onClick={toggleSavedState}
                  aria-pressed={isSaved}
                >
                  <i className={`icon-heart-1 ${isSaved ? 'liked' : ''}`} />
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>

              <div className="bottom-actions">
                <button type="button" className="hero-chip light" onClick={() => openLightbox(mainItem.absoluteIndex)}>
                  <i className="icon-img" />
                  {gallery.length} Photos
                </button>
                <button type="button" className="hero-chip light" onClick={handleVideoAction}>
                  <i className="icon-play" />
                  Video
                </button>
                <a href={mapUrl} target="_blank" rel="noreferrer" className="hero-chip light">
                  <i className="icon-location-2" />
                  Map
                </a>
                <button type="button" className="hero-chip light" onClick={handleBrochureAction}>
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
                <input type="text" className="form-control" placeholder="Your Name" required />
              </fieldset>
              <fieldset>
                <input type="text" className="form-control" placeholder="Mobile Number" required />
              </fieldset>
              <fieldset>
                <input type="email" className="form-control" placeholder="Email ID" />
              </fieldset>
              <fieldset>
                <textarea className="form-control" placeholder="Message" rows={3} />
              </fieldset>
              <button type="submit" className="tf-btn bg-color-primary w-full">
                  <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.125 5.625V14.375C18.125 14.8723 17.9275 15.3492 17.5758 15.7008C17.2242 16.0525 16.7473 16.25 16.25 16.25H3.75C3.25272 16.25 2.77581 16.0525 2.42417 15.7008C2.07254 15.3492 1.875 14.8723 1.875 14.375V5.625M18.125 5.625C18.125 5.12772 17.9275 4.65081 17.5758 4.29917C17.2242 3.94754 16.7473 3.75 16.25 3.75H3.75C3.25272 3.75 2.77581 3.94754 2.42417 4.29917C2.07254 4.65081 1.875 5.12772 1.875 5.625M18.125 5.625V5.8275C18.125 6.14762 18.0431 6.46242 17.887 6.74191C17.7309 7.0214 17.5059 7.25628 17.2333 7.42417L10.9833 11.27C10.6877 11.4521 10.3472 11.5485 10 11.5485C9.65275 11.5485 9.31233 11.4521 9.01667 11.27L2.76667 7.425C2.4941 7.25711 2.26906 7.02224 2.11297 6.74275C1.95689 6.46325 1.87496 6.14845 1.875 5.82833V5.625"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
            <h6>{detailData.possessionDate}</h6>
            <p>Possession Starts</p>
          </div>
          <div className="fact-item">
            <h6>
              {"\u20B9"} {formatInr(detailData.avgPricePerSqft)} / sq.ft
            </h6>
            <p>Avg. Price</p>
          </div>
          <div className="fact-item">
            <h6>{detailData.builtUpRange}</h6>
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
                  <span className="share-icon-svg" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </span>
                  Share
                </a>
                <button
                  type="button"
                  className={`tool-btn${isSaved ? " is-active" : ""}`}
                  onClick={toggleSavedState}
                  aria-pressed={isSaved}
                >
                  <i className={`icon-heart-1 ${isSaved ? 'liked' : ''}`} />
                  {isSaved ? "Saved" : "Save"}
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
                {visibleLightboxMedia.length > 1 && !isLightboxAtStart ? (
                  <button
                    type="button"
                    className="lightbox-nav prev"
                    onClick={() => lightboxSwiperRef.current?.slidePrev()}
                    aria-label="Previous image"
                  >
                    <ArrowIcon direction="left" />
                  </button>
                ) : null}
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
                {visibleLightboxMedia.length > 1 && !isLightboxAtEnd ? (
                  <button
                    type="button"
                    className="lightbox-nav next"
                    onClick={() => lightboxSwiperRef.current?.slideNext()}
                    aria-label="Next image"
                  >
                    <ArrowIcon direction="right" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
