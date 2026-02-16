import Breadcumb from "@/components/common/Breadcumb";

import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Compare from "@/components/otherPages/Compare";

import React from "react";

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <Breadcumb pageName="Compare" />
        <div className="main-content">
          <Compare />
          
        </div>
        <Footer />
      </div>
    </>
  );
}
