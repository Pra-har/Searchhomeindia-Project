"use client";

import { properties11 } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function PropertyListItems({ showItems = properties11.length }) {
  const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

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
    return Array.from({ length: 4 }, (_, offset) => {
      if (offset === 0) return property.imageSrc;
      return galleryPool[(index + offset) % poolLength];
    });
  };

  const getShareUrl = (propertyId) => {
    const relativePath = `/property-detail/${propertyId}`;
    if (typeof window === "undefined") return relativePath;
    return `${window.location.origin}${relativePath}`;
  };

  const handleShareAction = async (property) => {
    const shareUrl = getShareUrl(property.id);
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

  return (
    <>
      {properties11.slice(0, showItems).map((property, i) => {
        const galleryImages = getGalleryImages(property, i);
        const sliderPrevClass = `listing-prev-${property.id}`;
        const sliderNextClass = `listing-next-${property.id}`;
        const statusLabel = property.status || "Ongoing";
        const facingLabel = property.facing || "East Facing";
        const floorLabel = property.totalFloors || "1st of 14 Floors";

        return (
          <div key={i} className="box-house style-list hover-img">
            <div className="image-wrap">
              <Link
                href={`/property-detail/${property.id}`}
                className="listing-link-wrap"
              >
                <Swiper
                  className="listing-media-swiper"
                  spaceBetween={0}
                  slidesPerView={1}
                  modules={[Navigation]}
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
              <button type="button" className={`listing-swiper-nav prev ${sliderPrevClass}`}>
                <i className="icon-arrow-left-1" />
              </button>
              <button type="button" className={`listing-swiper-nav next ${sliderNextClass}`}>
                <i className="icon-arrow-right-1" />
              </button>
            </div>

            <div className="content">
              <div className="listing-top-actions">
                <button type="button" className="listing-favorite-btn" aria-label="Add to favorites">
                  <i className="icon-heart-1" />
                </button>
              </div>
              <h5 className="title">
                <Link href={`/property-detail/${property.id}`}>{property.title}</Link>
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
                  <span>{formatNumber(property.sqft)}</span> Sq.Ft.
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
                <h5 className="price">
                  {"\u20B9"} {formatNumber(property.price)}
                </h5>
                <div className="wrap-btn flex listing-action-buttons">
                  <button
                    type="button"
                    className="tf-btn style-border pd-1"
                    aria-label="Share property"
                    onClick={() => handleShareAction(property)}
                  >
                    <span className="action-icon" aria-hidden="true">
                      <i className="icon-send-message" />
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
                    <span className="action-label">Contact Owner</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
