import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Faqs from "@/components/faq/Faqs";
import React from "react";

export const metadata = {
  title: "Frequently Asked Questions | Search Homes India",
  description:
    "Got questions about buying, renting or selling property in India? Find answers to the most common real estate questions on Search Homes India.",
  alternates: { canonical: "https://searchhomesindia.com/faq" },
  robots: { index: true, follow: true },
};

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <Breadcrumb pageName="FAQS" />
        <div className="main-content tf-spacing-6 header-fixed">
          <Faqs />
        </div>
        <Footer />
      </div>
    </>
  );
}