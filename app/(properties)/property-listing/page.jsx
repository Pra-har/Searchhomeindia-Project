
import Breadcumb from "@/components/common/Breadcumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
// import FilterTop from "@/components/properties/FilterTop";

import Properties from "@/components/properties/propertyListing/Properties";
import React from "react";
import { getPropertyListing } from "@/lib/properties/repository";
import { getCityBySlug } from "@/utlis/citySearch";

export const metadata = {
  title:
    "Property List || Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
  description: "Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
};
export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const listingResponse = await getPropertyListing(resolvedSearchParams || {});
  const cityInfo = getCityBySlug(listingResponse?.query?.citySlug || "all-india");
  const pageTitle =
    listingResponse?.query?.citySlug === "all-india"
      ? "Properties in All India"
      : `Properties in ${cityInfo?.label || "City"}`;

  return (
    <>
      <div id="wrapper">
        <Header />
        {/* <FilterTop /> */}
        <Breadcumb
          items={[
            { label: "Home", href: "/" },
            { label: "Property Listing" },
            { label: pageTitle },
          ]}
        />
        <div className="main-content">
          <Properties
            items={listingResponse.items}
            pagination={listingResponse.pagination}
            title={pageTitle}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
