"use client";

import React, { useEffect, useMemo, useState } from "react";
import { properties } from "@/data/properties";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addCompareProperty } from "@/utils/compare";
import {
  getSavedProperties,
  removeFavoriteProperty,
  saveFavoriteProperty,
} from "@/utils/favorites";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { Navigation } from "swiper/modules";

const formatPrice = (value) => {
  const price = Number(value);
  if (!Number.isFinite(price)) return "Price on Request";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function Properties() {
  const router = useRouter();
  const [savedIds, setSavedIds] = useState(new Set());

  const featuredHomes = useMemo(() => properties.slice(0, 8), []);

  useEffect(() => {
    const syncSaved = () => {
      const ids = new Set(
        getSavedProperties().map((item) => String(item?.id || "").trim()).filter(Boolean)
      );
      setSavedIds(ids);
    };

    syncSaved();
    window.addEventListener("shi:favorites-changed", syncSaved);
    return () => window.removeEventListener("shi:favorites-changed", syncSaved);
  }, []);

  const getPropertyId = (property) => String(property?.id ?? "").trim();

  const isSaved = (property) => savedIds.has(getPropertyId(property));

  const handleSaveToggle = (property) => {
    const propertyId = getPropertyId(property);
    if (!propertyId) return;

    if (isSaved(property)) {
      removeFavoriteProperty(propertyId);
      return;
    }

    saveFavoriteProperty({
      ...property,
      id: propertyId,
      url: `/property-detail/${propertyId}`,
    });
  };

  const handleCompareAction = (property) => {
    addCompareProperty(
      {
        ...property,
        url: `/property-detail/${property.id}`,
      },
      { max: 4 }
    );
    router.push("/compare");
  };

  const getPropertyTypeLabel = (property) => {
    const configRaw = String(property?.configurations || "").trim();
    if (configRaw) {
      return configRaw
        .replace(/apartments?/gi, "")
        .replace(/\s{2,}/g, " ")
        .trim();
    }

    const bedsRaw = String(property?.beds ?? "").trim();
    if (!bedsRaw) return "N/A";

    const numericBeds = Number(bedsRaw);
    if (Number.isFinite(numericBeds) && bedsRaw === String(numericBeds)) {
      return `${bedsRaw} BHK`;
    }

    return bedsRaw;
  };

  const getAreaLabel = (property) => {
    const areaRange =
      property?.builtUpRange ||
      property?.areaRange ||
      property?.sizeRange ||
      property?.sqftRange ||
      "";
    if (areaRange) return String(areaRange).trim();
    return property?.sqft ? `${property.sqft} Sq.Ft.` : "N/A";
  };

  return (
    <section className="section-current-properties section-featured-properties-v2 tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-32">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Featured Properties" />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                Thousands of luxury home enthusiasts just like you visit our
                website.
              </p>
            </div>
            <Swiper
              dir="ltr"
              className="swiper sw-layout style-pagination featured-property-swiper"
              spaceBetween={20}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 12,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 18,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
              }}
              modules={[Navigation]}
              navigation={{
                prevEl: ".snbp6",
                nextEl: ".snbn6",
              }}
            >
              {featuredHomes.map((property, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <article className="box-house hover-img property-feature-card">
                    <div className="image-wrap">
                      <Link href={`/property-detail/${property.id}`}>
                        <Image
                          className="lazyload"
                          alt={property.title}
                          width={600}
                          height={401}
                          src={property.imageSrc}
                        />
                      </Link>
                      <div className="img-overlay" />
                      <div className="project-logo-badge" aria-hidden="true">
                        <Image
                          src={property?.logo || "/images/logo/favicon.png"}
                          alt="Project logo"
                          width={40}
                          height={40}
                        />
                      </div>

                      <div className="feature-actions flex gap-8">
                        <button
                          type="button"
                          className={`btn-icon save hover-tooltip ${isSaved(property) ? "is-active" : ""}`}
                          aria-label={isSaved(property) ? "Remove Favorite" : "Add Favorite"}
                          onClick={() => handleSaveToggle(property)}
                        >
                          <i className="icon-heart-1" />
                          <span className="tooltip">
                            {isSaved(property) ? "Remove Favorite" : "Add Favorite"}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="btn-icon find hover-tooltip"
                          aria-label="View Property"
                          onClick={() => router.push(`/property-detail/${property.id}`)}
                        >
                          <i className="icon-view" />
                          <span className="tooltip">View Property</span>
                        </button>
                        <button
                          type="button"
                          className="btn-icon compare hover-tooltip"
                          aria-label="Compare Property"
                          onClick={() => handleCompareAction(property)}
                        >
                          <i className="icon-compare" />
                          <span className="tooltip">Compare</span>
                        </button>
                      </div>
                    </div>

                    <div className="content">
                      <h5 className="title">
                        <Link href={`/property-detail/${property.id}`}>
                          {property.title}
                        </Link>
                      </h5>
                      <p className="location text-1 flex items-center tf-gap-5">
                        <i className="icon-location" /> {property.location}
                      </p>
                      <ul className="meta-list simple-meta flex">
                        <li className="text-1 flex">
                          <span className="meta-label">Type:</span>
                          <span className="meta-value">{getPropertyTypeLabel(property)}</span>
                        </li>
                        <li className="text-1 flex">
                          <span className="meta-label">Area:</span>
                          <span className="meta-value">{getAreaLabel(property)}</span>
                        </li>
                      </ul>

                      <div className="bot flex justify-between items-center">
                        <h5 className="price">{formatPrice(property.price)}</h5>
                        <span className="quick-note verified-chip">
                          <span className="double-tick" aria-hidden="true">
                            ✓✓
                          </span>
                          Verified
                        </span>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}

              <div className="sw-wrap-btn">
                <div className="swiper-button-prev sw-button nav-prev-layout snbp6">
                  <i className="icon-arrow-left-3" />
                </div>
                <div className="swiper-button-next sw-button nav-next-layout snbn6">
                  <i className="icon-arrow-right-3" />
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
