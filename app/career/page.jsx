
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Benefits from "@/components/career/Benefits";
import Jobs from "@/components/career/Jobs";
import PageTitle from "@/components/career/PageTitle";
import Reviews from "@/components/career/Reviews";

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
