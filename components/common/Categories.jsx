"use client";
import { categories } from "@/data/categories";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SplitTextAnimation from "./SplitTextAnimation";
import { Navigation, Pagination } from "swiper/modules";

const CATEGORY_LISTING_META = {
  apartment: { count: "12,480+ Listings", query: { type: "apartment", intent: "buy" } },
  villa: { count: "3,840+ Listings", query: { type: "villa", intent: "buy" } },
  studio: { count: "2,120+ Listings", query: { type: "studio", intent: "buy" } },
  office: { count: "6,930+ Listings", query: { type: "office", intent: "commercial" } },
  townhouse: { count: "1,980+ Listings", query: { type: "townhouse", intent: "buy" } },
  commercial: { count: "8,110+ Listings", query: { type: "commercial", intent: "commercial" } },
};

const getListingHref = (name = "") => {
  const key = String(name).trim().toLowerCase();
  const config = CATEGORY_LISTING_META[key] || {
    count: "2,000+ Listings",
    query: { type: key.replace(/\s+/g, "-"), intent: "buy" },
  };

  return config.query;
};

const getCategoryCount = (name = "") => {
  const key = String(name).trim().toLowerCase();
  return CATEGORY_LISTING_META[key]?.count || "2,000+ Listings";
};

export default function Categories({
  parentClass = "tf-spacing-1 section-categories pb-0",
  city = "all-india",
}) {
  const normalizedCity = String(city || "all-india").toLowerCase();

  const buildListingHref = (name = "") => {
    const baseQuery = getListingHref(name);
    const nextQuery =
      normalizedCity && normalizedCity !== "all-india"
        ? { ...baseQuery, city: normalizedCity }
        : baseQuery;

    return {
      pathname: "/property-listing",
      query: nextQuery,
    };
  };

  return (
    <section className={`${parentClass} section-categories-v2`}>
      <div className="tf-container">
        <div className="heading-section text-center mb-32">
          <h2 className="title split-text effect-right">
            <SplitTextAnimation text="Try Searching For" />
          </h2>
          <p className="text-1 split-text split-lines-transform">
            Tap a property type to directly explore matching listings across India.
          </p>
        </div>
        <div className="wrap-categories-sw">
          <button
            type="button"
            className="categories-nav-btn prev categories-sw-prev"
            aria-label="Previous categories"
          >
            <i className="icon-arrow-left" />
          </button>
          <button
            type="button"
            className="categories-nav-btn next categories-sw-next"
            aria-label="Next categories"
          >
            <i className="icon-arrow-right" />
          </button>
          <Swiper
            dir="ltr"
            className="swiper sw-layout style-pagination categories-sw-v2"
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 12 },
              575: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 18,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 18,
              },
            }}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".categories-sw-prev",
              nextEl: ".categories-sw-next",
            }}
            pagination={{
              el: ".spd2",
              clickable: true,
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <Link
                  href={buildListingHref(category.name)}
                  className={`categories-item ${
                    category.isActive ? "active" : ""
                  } listing-quick`}
                >
                  <div className="icon-box">
                    <i className={`icon ${category.icon}`}></i>
                  </div>
                  <div className="content">
                    <h5>{category.name}</h5>
                    <p className="mt-4 text-1">{getCategoryCount(category.name)}</p>
                  </div>
                  <div className="category-cta">
                    <span>Explore</span>
                    <i className="icon-arrow-right" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}

            <div className="sw-pagination sw-pagination-layout text-center d-lg-none d-block mt-20 spd2" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
