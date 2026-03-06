import React from "react";
import Header from "@/components/headers/Header";
import Footer from "@/components/footer/Footer";
import OurServices from "@/components/services/OurServices";

export const metadata = {
  title: "Our Services | Search Homes India",
  description:
    "Explore Search Homes India real estate services including buying, selling, rentals, home loans, legal support, interiors, valuation, and property management.",
  alternates: { canonical: "https://searchhomesindia.com/our-services" },
  robots: { index: true, follow: true },
};

export default function page() {
  return (
    <div id="wrapper" className="counter-scroll">
      <Header />
      <div className="main-content">
        <OurServices />
      </div>
      <Footer />
    </div>
  );
}

