import Breadcumb from "@/components/common/Breadcumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Faqs from "@/components/faq/Faqs";

import React from "react";

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <Breadcumb pageName="FAQS" />
        <div className="main-content tf-spacing-6 header-fixed">
          <Faqs />
        </div>
        <Footer />
      </div>
    </>
  );
}
