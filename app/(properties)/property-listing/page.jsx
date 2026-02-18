
import Breadcumb from "@/components/common/Breadcumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
// import FilterTop from "@/components/properties/FilterTop";

import Properties from "@/components/properties/propertyListing/Properties";
import React from "react";

export const metadata = {
  title:
    "Property List || Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
  description: "Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header />
        {/* <FilterTop /> */}
        <Breadcumb pageName="Properties in bangalore" />
        <div className="main-content">
          <Properties />
        </div>
        <Footer />
      </div>
    </>
  );
}
