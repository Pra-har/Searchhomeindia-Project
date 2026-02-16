"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";

const handpickedItems = [
  {
    id: 1,
    title: "Inspira Infinity",
    subtitle: "2 BHK Apartment, Sarjapur Road",
    price: "Rs 1.27 - 1.37 Cr",
    image: "/images/section/box-house-15.jpg",
    badge: "Featured",
    logoText: "II",
  },
  {
    id: 2,
    title: "Trendcon Aurelius Phase 1",
    subtitle: "4,5 BHK Independent House/Villa, Varthur",
    price: "Rs 2.88 - 3.68 Cr",
    image: "/images/section/box-house-16.jpg",
    badge: "Featured",
    logoText: "TA",
  },
  {
    id: 3,
    title: "Assetz Melodies of Life Apartments",
    subtitle: "3 BHK Apartment, Sarjapur Road",
    price: "Rs 2.38 - 2.42 Cr",
    image: "/images/section/box-house-14.jpg",
    badge: "Featured",
    logoText: "AM",
  },
  {
    id: 4,
    title: "SSVR Niyaara",
    subtitle: "2,3 BHK Apartment, Varthur",
    price: "Rs 1.12 - 1.54 Cr",
    image: "/images/section/box-house-4.jpg",
    badge: "Featured",
    logoText: "SN",
  },
  {
    id: 5,
    title: "Provident Botanico",
    subtitle: "2,3 BHK Apartment, Whitefield",
    price: "Rs 1.05 - 1.68 Cr",
    image: "/images/section/box-house-3.jpg",
    badge: "Featured",
    logoText: "PB",
  },
];

export default function HandpickedCategories() {
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
                    <span className="hp-badge">{item.badge}</span>
                    <button type="button" className="hp-fav" aria-label="Add to favorites">
                      <i className="icon-save" />
                    </button>
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
