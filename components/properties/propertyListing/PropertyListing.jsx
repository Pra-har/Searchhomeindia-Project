"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { addCompareProperty } from "@/utils/compare";
import {
  FAVORITES_EVENT,
  createFavoritePayload,
  getSavedProperties,
  removeFavoriteProperty,
  saveFavoriteProperty,
} from "@/utils/favorites";

export default function PropertyListItems({
  items = [],
  showItems,
  mode = "listing",
}) {
  const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);
  const formatAreaLabel = (value) => {
    if (value === undefined || value === null || value === "") return "-";
    if (typeof value === "number" && Number.isFinite(value)) return formatNumber(value);
    const asText = String(value).trim();
    const normalizedNumber = Number(asText.replace(/,/g, ""));
    if (Number.isFinite(normalizedNumber)) return formatNumber(normalizedNumber);
    return asText;
  };
  const isSavedView = mode === "saved";
  const [savedIds, setSavedIds] = useState(new Set());
  const [sliderEdgeState, setSliderEdgeState] = useState({});
  const router = useRouter();

  const galleryPool = [
    "/images/section/box-house.jpg",
    "/images/section/box-house-2.jpg",
    "/images/section/box-house-3.jpg",
    "/images/section/box-house-4.jpg",
    "/images/section/box-house-5.jpg",
    "/images/section/box-house-6.jpg",
    "/images/section/box-house-7.jpg",
    "/images/section/box-house-8.jpg",
    "/images/section/box-house-9.jpg",
    "/images/section/box-house-14.jpg",
    "/images/section/box-house-15.jpg",
    "/images/section/box-house-16.jpg",
  ];

  const getGalleryImages = (property, index) => {
    if (Array.isArray(property.images) && property.images.length > 0) {
      return property.images;
    }
    const poolLength = galleryPool.length;
    const primaryImage =
      property?.imageSrc ||
      property?.mainImage?.src ||
      galleryPool[index % poolLength];
    return Array.from({ length: 4 }, (_, offset) => {
      if (offset === 0) return primaryImage;
      return galleryPool[(index + offset) % poolLength];
    });
  };

  const getPropertyDetailUrl = (property) =>
    property?.url || `/property-detail/${property?.slug || property?.id}`;

  const formatPriceLabel = (value) => {
    if (value === undefined || value === null || value === "") {
      return "Price on Request";
    }
    if (typeof value === "string") return value;
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return String(value);
    }
    if (value >= 10000000) return `\u20B9 ${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `\u20B9 ${(value / 100000).toFixed(2)} L`;
    return `\u20B9 ${formatNumber(value)}`;
  };

  const getCategoryBadgeClass = (value) => {
    const normalized = String(value || "others").toLowerCase();
    if (normalized.includes("buy")) return "is-buy";
    if (normalized.includes("pg")) return "is-pg";
    if (normalized.includes("rent")) return "is-rental";
    return "is-others";
  };

  const getShareUrl = (propertyId) => {
    const relativePath = `/property-detail/${propertyId}`;
    if (typeof window === "undefined") return relativePath;
    return `${window.location.origin}${relativePath}`;
  };

  const handleShareAction = async (property) => {
    const shareUrl = getShareUrl(property?.slug || property?.id);
    const shareText = `${property.title} - ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.title,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback if user closes share sheet or platform blocks it.
      }
    }

    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    const syncSavedIds = () => {
      const nextIds = new Set(
        getSavedProperties().map((item) => String(item.id))
      );
      setSavedIds(nextIds);
    };

    syncSavedIds();
    if (typeof window === "undefined") return undefined;

    window.addEventListener(FAVORITES_EVENT, syncSavedIds);
    window.addEventListener("storage", syncSavedIds);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, syncSavedIds);
      window.removeEventListener("storage", syncSavedIds);
    };
  }, []);

  const toggleFavorite = (property) => {
    const propertyId = String(property.id);
    if (savedIds.has(propertyId)) {
      removeFavoriteProperty(propertyId);
      return;
    }

    saveFavoriteProperty(
      createFavoritePayload(property, {
        id: propertyId,
        category: property?.forSale ? "Buy" : property?.forRent ? "Rental" : "Others",
        url: `/property-detail/${property?.slug || property?.id}`,
      })
    );
  };

  const handleCompareAction = (property) => {
    addCompareProperty(property, { max: 4 });
    router.push("/compare");
  };

  const updateSliderEdgeState = (sliderKey, swiper) => {
    if (!sliderKey || !swiper) return;

    const nextState = {
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    };

    setSliderEdgeState((prev) => {
      const current = prev[sliderKey];
      if (
        current &&
        current.isBeginning === nextState.isBeginning &&
        current.isEnd === nextState.isEnd
      ) {
        return prev;
      }
      return {
        ...prev,
        [sliderKey]: nextState,
      };
    });
  };

  const visibleItems =
    typeof showItems === "number" ? items.slice(0, showItems) : items;

  return (
    <>
      {visibleItems.map((property, i) => {
        const propertyId = String(property.id);
        const sliderKey = `${propertyId}-${i}`;
        const isSaved = savedIds.has(propertyId);
        const galleryImages = getGalleryImages(property, i);
        const sliderPrevClass = `listing-prev-${property.id}-${i}`;
        const sliderNextClass = `listing-next-${property.id}-${i}`;
        const edgeState = sliderEdgeState[sliderKey] || {
          isBeginning: true,
          isEnd: galleryImages.length <= 1,
        };
        const showSliderButtons = galleryImages.length > 1;
        const prevButtonClass = `listing-swiper-nav prev ${sliderPrevClass}${
          edgeState.isBeginning ? " is-disabled" : ""
        }`;
        const nextButtonClass = `listing-swiper-nav next ${sliderNextClass}${
          edgeState.isEnd ? " is-disabled" : ""
        }`;
        const statusLabel = property.status || "Ongoing";
        const facingLabel = property.facing || "East Facing";
        const floorLabel = property.totalFloors || "1st of 14 Floors";
        const propertyUrl = getPropertyDetailUrl(property);

        return (
          <div
            key={`${propertyId}-${i}`}
            className={`box-house style-list hover-img${
              isSavedView ? " saved-list-item" : ""
            }`}
          >
            <div className="image-wrap">
              {isSavedView ? (
                <span
                  className={`saved-category-inline-badge ${getCategoryBadgeClass(
                    property.category
                  )}`}
                >
                  {property.category || "Others"}
                </span>
              ) : null}
              <Link
                href={propertyUrl}
                className="listing-link-wrap"
              >
                <Swiper
                  className="listing-media-swiper"
                  spaceBetween={0}
                  slidesPerView={1}
                  modules={[Navigation]}
                  onSwiper={(swiper) => updateSliderEdgeState(sliderKey, swiper)}
                  onSlideChange={(swiper) => updateSliderEdgeState(sliderKey, swiper)}
                  navigation={{
                    prevEl: `.${sliderPrevClass}`,
                    nextEl: `.${sliderNextClass}`,
                    disabledClass: "is-disabled",
                  }}
                >
                  {galleryImages.map((imgSrc, imgIndex) => (
                    <SwiperSlide key={`${property.id}-${imgIndex}`}>
                      <Image
                        className="lazyload"
                        alt={property.title}
                        src={imgSrc}
                        width={600}
                        height={401}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="image-count-badge">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M2.5 3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 12 14H4a1.5 1.5 0 0 1-1.5-1.5v-9ZM5 4.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm7 7.25-2.8-3.1a.75.75 0 0 0-1.1 0L6.3 11l-.9-1a.75.75 0 0 0-1.1 0L3.5 11v1h8.5Z"
                    />
                  </svg>
                  <span>{galleryImages.length}</span>
                </div>
              </Link>
              {showSliderButtons ? (
                <button
                  type="button"
                  className={prevButtonClass}
                  aria-label="Previous image"
                >
                  <i className="icon-arrow-left-1" />
                </button>
              ) : null}
              {showSliderButtons ? (
                <button
                  type="button"
                  className={nextButtonClass}
                  aria-label="Next image"
                >
                  <i className="icon-arrow-right-1" />
                </button>
              ) : null}
            </div>

            <div className="content">
              <div className="listing-top-actions">
                <button
                  type="button"
                  className={`listing-favorite-btn${isSaved ? " is-active" : ""}`}
                  aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
                  onClick={() => toggleFavorite(property)}
                >
                  <i className="icon-heart-1" />
                </button>
              </div>
              <h5 className="title">
                <Link href={propertyUrl}>{property.title}</Link>
              </h5>
              <p className="location text-1 flex items-center gap-6">
                <i className="icon-location" /> {property.location}
              </p>

              <ul className="meta-list flex listing-meta-icons listing-meta-primary">
                <li className="text-1 flex">
                  <i className="icon icon-beds-3" />
                  <span>{property.beds}</span> Beds
                </li>
                <li className="text-1 flex">
                  <i className="icon icon-baths" />
                  <span>{property.baths}</span> Baths
                </li>
                <li className="text-1 flex">
                  <span className="meta-svg-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        fill="currentColor"
                        d="M2 2h5v1H3v4H2V2zm7 0h5v5h-1V3H9V2zM2 9h1v4h4v1H2V9zm11 0h1v5H9v-1h4V9z"
                      />
                    </svg>
                  </span>
                  <span>{formatAreaLabel(property.sqft)}</span> Sq.Ft.
                </li>
                <li className="text-1 flex">
                  <span className="meta-svg-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        fill="currentColor"
                        d="M8 1 2 4v8l6 3 6-3V4L8 1zm0 1.4 4.8 2.4L8 7.2 3.2 4.8 8 2.4zM3 5.8l4.5 2.3v5.4L3 11.2V5.8zm10 0v5.4l-4.5 2.3V8.1L13 5.8z"
                      />
                    </svg>
                  </span>
                  <span>{statusLabel}</span>
                </li>
                <li className="text-1 flex">
                  <span className="meta-svg-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        fill="currentColor"
                        d="m8 1 3 6H5l3-6zm0 14a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm0-13a6 6 0 1 0 6 6 6 6 0 0 0-6-6z"
                      />
                    </svg>
                  </span>
                  <span>{facingLabel}</span>
                </li>
                <li className="text-1 flex">
                  <span className="meta-svg-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        fill="currentColor"
                        d="M2 14h12v1H2v-1zm2-1V7h2v6H4zm3 0V5h2v8H7zm3 0V3h2v10h-2z"
                      />
                    </svg>
                  </span>
                  <span>{floorLabel}</span>
                </li>
              </ul>


              <div className="bot flex justify-between items-center">
                <h5 className="price listing-price">{formatPriceLabel(property.price)}</h5>
                {isSavedView ? (
                  <div className="wrap-btn flex listing-action-buttons saved-list-actions">
                    <button
                      type="button"
                      className="tf-btn style-border pd-1"
                      aria-label="Compare property"
                      onClick={() => handleCompareAction(property)}
                    >
                      <span className="action-icon" aria-hidden="true">
                        <i className="icon-compare" />
                      </span>
                      <span className="action-label">Compare</span>
                    </button>
                    <button
                      type="button"
                      className="tf-btn style-border pd-1"
                      aria-label="Remove from saved"
                      onClick={() => removeFavoriteProperty(propertyId)}
                    >
                      <span className="action-icon" aria-hidden="true">
                        <i className="icon-trashcan1" />
                      </span>
                      <span className="action-label">Remove</span>
                    </button>
                    <Link href={propertyUrl} className="tf-btn bg-color-primary pd-1" aria-label="Open property">
                      <span className="action-icon" aria-hidden="true">
                        <i className="icon-view" />
                      </span>
                      <span className="action-label">Open</span>
                    </Link>
                  </div>
                ) : (
                  <div className="wrap-btn flex listing-action-buttons">
                    <button
                      type="button"
                      className="tf-btn style-border pd-1"
                      aria-label="Share property"
                      onClick={() => handleShareAction(property)}
                    >
                      <span className="action-icon share-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="18" cy="5" r="3"/>
                          <circle cx="6" cy="12" r="3"/>
                          <circle cx="18" cy="19" r="3"/>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                        </svg>
                      </span>
                      <span className="action-label">Share</span>
                    </button>
                    <a
                      href="tel:+918147267372"
                      className="tf-btn style-border pd-1"
                      aria-label="Call owner"
                    >
                      <span className="action-icon" aria-hidden="true">
                        <i className="icon-phone-1" />
                      </span>
                      <span className="action-label">View Details</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
