"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SplitTextAnimation from "./SplitTextAnimation";
import { Autoplay, Navigation } from "swiper/modules";

const trendingProjects = [
  {
    id: 1,
    name: "Saheel Itrend Vesta",
    builder: "Saheel Properties",
    location: "Tathawade, Pimpri Chinchwad",
    price: "INR 74.0 L - 1.02 Cr",
    bhk: "2, 2.5, 3 BHK Apartments",
    img: "https://housing-images.n7net.in/4f2250e8/49d8a74edc60fb864d62a15c0b6fdd31/v0/fs/jbmr_tathastu-sat_bari-delhi-jbmr_group.jpeg",
    logo: "/images/logo/favicon.png",
  },
  {
    id: 2,
    name: "Raj Legacy Satyam",
    builder: "Raj Realty Group",
    location: "Mira Road East",
    price: "Price on Request",
    bhk: "1, 2, 3 BHK Apartments",
    img: "https://housing-images.n7net.in/4f2250e8/2c38653be60a2c592f1af5621a7bc46b/v0/fs/raj_legacy_satyam_a_and_b-mira_road_east-mumbai-raj_realty_group.jpeg",
    logo: "/images/logo/favicon.png",
  },
  {
    id: 3,
    name: "JBMR Tathastu",
    builder: "JBMR Group",
    location: "Sat Bari, Delhi",
    price: "Price on Request",
    bhk: "1, 2, 3 BHK Apartments",
    img: "https://housing-images.n7net.in/4f2250e8/49d8a74edc60fb864d62a15c0b6fdd31/v0/fs/jbmr_tathastu-sat_bari-delhi-jbmr_group.jpeg",
    logo: "/images/logo/favicon.png",
  },
  {
    id: 4,
    name: "Radhaya Urbanity",
    builder: "Ramji Corp",
    location: "Aya Nagar, Delhi",
    price: "Price on Request",
    bhk: "1, 2, 3 BHK Apartments",
    img: "https://housing-images.n7net.in/4f2250e8/9ee1f21cc4cedd2daf47611c9ea41a4d/v0/fs/radhaya_urbanity-aya_nagar-delhi-ramji_corp.jpeg",
    logo: "/images/logo/favicon.png",
  },
];

export default function TrendingProperty({
  parentClass = "trending-slider-wrapper tf-spacing-2 pb-0",
}) {
  return (
    <section className={parentClass}>
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section text-center mb-28">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Our Top Picks For You" />
              </h2>
              <p
                className="text-1 wow animate__fadeInUp animate__animated"
                data-wow-duration="1.5s"
                data-wow-delay="0s"
              >
                Best properties for you by Search Homes India
              </p>
            </div>
            <Swiper
              spaceBetween={30}
              speed={900}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={true}
              loop={true}
              modules={[Navigation, Autoplay]}
              className="tp-swiperClass"
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 1.3 },
              }}
            >
              {trendingProjects.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="ts-slide">
                    <div className="ts-info">
                      <img
                        src={item.logo}
                        alt={`${item.builder} logo`}
                        className="ts-logo"
                      />
                      <h3 className="ts-builder">{item.builder}</h3>
                      <h2 className="ts-name">{item.name}</h2>
                      <p className="ts-location">{item.location}</p>
                      <p className="ts-price">{item.price}</p>
                      <p className="ts-bhk">{item.bhk}</p>

                      <button className="ts-btn">Contact</button>
                    </div>

                    <div className="ts-image">
                      <img src={item.img} alt={item.name} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
