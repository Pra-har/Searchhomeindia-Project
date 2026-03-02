"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";

const MEDIA_SOURCES = [
  { id: "abp-news", name: "ABP News", logo: "/images/media/abp-news.svg" },
  { id: "aaj-tak", name: "Aaj Tak", logo: "/images/media/aaj-tak.svg" },
  { id: "cnn-news18", name: "CNN-News18", logo: "/images/media/cnn-news18.svg" },
  { id: "bloomberg", name: "Bloomberg", logo: "/images/media/bloomberg.svg" },
  { id: "ndtv", name: "NDTV", logo: "/images/media/ndtv.svg" },
  { id: "zee-news", name: "Zee News", logo: "/images/media/zee-news.svg" },
  { id: "india-today", name: "India Today", logo: "/images/media/india-today.svg" },
  { id: "times-now", name: "Times Now", logo: "/images/media/times-now.svg" },
  { id: "republic-tv", name: "Republic TV", logo: "/images/media/republic-tv.svg" },
  { id: "tv9", name: "TV9", logo: "/images/media/tv9.svg" },
  { id: "news-18", name: "News18", logo: "/images/media/news18.svg" },
  { id: "economic-times", name: "The Economic Times", logo: "/images/media/the-economic-times.svg" },
];

export default function MediaPresence() {
  return (
    <section className="about-media-presence tf-spacing-7 pb-0">
      <div className="tf-container">
        <div className="heading-section text-center mb-32">
          <h2 className="title split-text effect-right mb-8">
            <SplitTextAnimation text="Our Media Presence" />
          </h2>
          <p className="text-1">
            Trusted and featured across India&apos;s leading news networks.
          </p>
        </div>

        <div className="media-presence-swiper-wrap">
          <Swiper
            className="media-presence-swiper"
            modules={[Autoplay]}
            loop
            speed={5000}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              576: { slidesPerView: 3, spaceBetween: 12 },
              992: { slidesPerView: 4, spaceBetween: 14 },
              1200: { slidesPerView: 6, spaceBetween: 16 },
            }}
          >
            {MEDIA_SOURCES.map((source) => (
              <SwiperSlide key={source.id}>
                <div className="media-source-pill">
                  <div className="media-source-logo">
                    <Image
                      src={source.logo}
                      alt={`${source.name} logo`}
                      width={220}
                      height={70}
                    />
                  </div>
                  <span className="media-source-name">{source.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
