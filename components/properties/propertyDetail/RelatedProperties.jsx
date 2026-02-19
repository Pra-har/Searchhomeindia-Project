"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { properties10 } from "@/data/properties";

const formatInr = (value) => {
  if (typeof value === "string") return value;
  if (typeof value !== "number" || !Number.isFinite(value)) return "Price on Request";
  if (value >= 10000000) return `₹ ${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹ ${(value / 100000).toFixed(2)} L`;
  return `₹ ${new Intl.NumberFormat("en-IN").format(value)}`;
};

export default function RelatedProperties({ items = properties10 }) {
  const safeItems = Array.isArray(items) ? items : [];
  if (!safeItems.length) return null;

  return (
    <section className="section-similar-properties tf-spacing-3">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section mb-32">
              <h2 className="title">Similar Properties</h2>
            </div>

            <Swiper
              className="swiper style-pagination tf-sw-mobile-1 sw-swiper-992"
              spaceBetween={15}
              slidesPerView={1}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".related-properties-pagination",
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
            >
              {safeItems.map((property) => (
                <SwiperSlide key={`related-${property.id}-${property.slug || "item"}`}>
                  <div className="box-house hover-img">
                    <div className="image-wrap">
                      <Link href={`/property-detail/${property?.slug || property?.id}`}>
                        <Image
                          className="lazyload"
                          alt={property.title || "Property"}
                          src={property.imageSrc || "/images/section/box-house.jpg"}
                          width={property.imageWidth || 600}
                          height={property.imageHeight || 401}
                        />
                      </Link>
                    </div>

                    <div className="content">
                      <h5 className="title">
                        <Link href={`/property-detail/${property?.slug || property?.id}`}>
                          {property.title}
                        </Link>
                      </h5>
                      <p className="location text-1 flex items-center gap-8">
                        <i className="icon-location" /> {property.location}
                      </p>
                      <ul className="meta-list flex">
                        <li className="text-1 flex">
                          <span>{property.beds || "-"}</span>Beds
                        </li>
                        <li className="text-1 flex">
                          <span>{property.baths || "-"}</span>Baths
                        </li>
                        <li className="text-1 flex">
                          <span>{property.sqft || "-"}</span>Sqft
                        </li>
                      </ul>
                      <div className="bot flex justify-between items-center">
                        <h5 className="price">{formatInr(property.price)}</h5>
                        <div className="wrap-btn flex">
                          <Link
                            href={`/property-detail/${property?.slug || property?.id}`}
                            className="tf-btn style-border pd-4"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="sw-pagination sw-pagination-mb-1 text-center mt-20 related-properties-pagination" />
          </div>
        </div>
      </div>
    </section>
  );
}

