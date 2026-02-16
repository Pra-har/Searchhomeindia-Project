
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Benefits from "@/components/otherPages/career/Benefits";
import Jobs from "@/components/otherPages/career/Jobs";
import PageTitle from "@/components/otherPages/career/PageTitle";
import Reviews from "@/components/otherPages/career/Reviews";

import React from "react";

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <PageTitle />
        <div className="main-content">
          <Jobs />
          <Benefits />
          <Reviews />
          
        </div>
        <Footer />
      </div>
    </>
  );
}
