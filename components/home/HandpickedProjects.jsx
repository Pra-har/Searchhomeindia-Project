"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { useRouter } from "next/navigation";
import { addCompareProperty } from "@/utils/compare";
import {
  getSavedProperties,
  removeFavoriteProperty,
  saveFavoriteProperty,
} from "@/utils/favorites";

const handpickedItems = [
  {
    id: 1,
    title: "Inspira Infinity",
    subtitle: "2 BHK Apartment, Sarjapur Road",
    price: "Rs 1.27 - 1.37 Cr",
    image: "/images/section/box-house-15.jpg",
    logoText: "II",
    href: "/property-detail/1",
    location: "Sarjapur Road, Bengaluru",
  },
  {
    id: 2,
    title: "Trendcon Aurelius Phase 1",
    subtitle: "4,5 BHK Independent House/Villa, Varthur",
    price: "Rs 2.88 - 3.68 Cr",
    image: "/images/section/box-house-16.jpg",
    logoText: "TA",
    href: "/property-detail/2",
    location: "Varthur, Bengaluru",
  },
  {
    id: 3,
    title: "Assetz Melodies of Life Apartments",
    subtitle: "3 BHK Apartment, Sarjapur Road",
    price: "Rs 2.38 - 2.42 Cr",
    image: "/images/section/box-house-14.jpg",
    logoText: "AM",
    href: "/property-detail/3",
    location: "Sarjapur Road, Bengaluru",
  },
  {
    id: 4,
    title: "SSVR Niyaara",
    subtitle: "2,3 BHK Apartment, Varthur",
    price: "Rs 1.12 - 1.54 Cr",
    image: "/images/section/box-house-4.jpg",
    logoText: "SN",
    href: "/property-detail/4",
    location: "Varthur, Bengaluru",
  },
  {
    id: 5,
    title: "Provident Botanico",
    subtitle: "2,3 BHK Apartment, Whitefield",
    price: "Rs 1.05 - 1.68 Cr",
    image: "/images/section/box-house-3.jpg",
    logoText: "PB",
    href: "/property-detail/5",
    location: "Whitefield, Bengaluru",
  },
];

export default function HandpickedCategories() {
  const router = useRouter();
  const [savedIds, setSavedIds] = useState(new Set());

  useEffect(() => {
    const syncSaved = () => {
      const ids = new Set(
        getSavedProperties()
          .map((item) => String(item?.id || "").trim())
          .filter(Boolean)
      );
      setSavedIds(ids);
    };

    syncSaved();
    window.addEventListener("shi:favorites-changed", syncSaved);
    return () => window.removeEventListener("shi:favorites-changed", syncSaved);
  }, []);

  const getPropertyId = (item) => String(item?.id ?? "").trim();
  const isSaved = (item) => savedIds.has(getPropertyId(item));

  const handleSaveToggle = (item) => {
    const propertyId = getPropertyId(item);
    if (!propertyId) return;

    if (isSaved(item)) {
      removeFavoriteProperty(propertyId);
      return;
    }

    saveFavoriteProperty({
      id: propertyId,
      title: item.title,
      location: item.location,
      imageSrc: item.image,
      priceLabel: item.price,
      url: item.href,
    });
  };

  const handleCompare = (item) => {
    addCompareProperty(
      {
        id: String(item.id),
        title: item.title,
        location: item.location,
        imageSrc: item.image,
        priceLabel: item.price,
        url: item.href,
      },
      { max: 4 }
    );
    router.push("/compare");
  };

  return (
    <section className="handpicked-categories tf-spacing-2 pb-0">
      <div className="tf-container">
        <div className="heading-section text-center mb-32">
          <h2 className="title split-text effect-right">
            <SplitTextAnimation text="Handpicked Categories" />
          </h2>
          <p className="text-1">Curated premium projects selected for you.</p>
        </div>

        <div className="handpicked-swiper-wrap">
          <Swiper
            modules={[Navigation]}
            className="handpicked-swiper"
            navigation={{
              prevEl: ".hp-prev",
              nextEl: ".hp-next",
            }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1.05, spaceBetween: 14 },
              640: { slidesPerView: 1.4, spaceBetween: 18 },
              992: { slidesPerView: 2.3, spaceBetween: 20 },
              1200: { slidesPerView: 3.2, spaceBetween: 24 },
            }}
          >
            {handpickedItems.map((item) => (
              <SwiperSlide key={item.id}>
                <article className="hp-card">
                  <div className="hp-media">
                    <img src={item.image} alt={item.title} />
                    <div className="hp-actions">
                      <button
                        type="button"
                        className={`hp-action-btn hp-save ${isSaved(item) ? "is-active" : ""}`}
                        aria-label={isSaved(item) ? "Remove from saved properties" : "Save property"}
                        onClick={() => handleSaveToggle(item)}
                      >
                        <i className="icon-heart-1" />
                      </button>
                      <button
                        type="button"
                        className="hp-action-btn hp-compare"
                        aria-label="Compare property"
                        onClick={() => handleCompare(item)}
                      >
                        <i className="icon-compare" />
                      </button>
                    </div>
                  </div>

                  <div className="hp-content">
                    <div className="hp-logo">{item.logoText}</div>
                    <h4 className="hp-title">{item.title}</h4>
                    <p className="hp-subtitle">{item.subtitle}</p>
                    <p className="hp-price">{item.price}</p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <button type="button" className="hp-nav hp-prev" aria-label="Previous">
            <i className="icon-arrow-left-1" />
          </button>
          <button type="button" className="hp-nav hp-next" aria-label="Next">
            <i className="icon-arrow-right-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
