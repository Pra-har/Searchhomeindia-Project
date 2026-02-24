
import Breadcumb from "@/components/common/Breadcumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
// import FilterTop from "@/components/properties/FilterTop";

import Properties from "@/components/properties/propertyListing/ListingHome";
import React from "react";
import { getPropertyListing } from "@/lib/repository";
import { getCityBySlug } from "@/utils/citySearch";

export async function generateMetadata({ searchParams }) {
  const params = (await searchParams) || {};
  const citySlug = params.city || "all-india";
  const intent = params.intent || "all";
  const cityInfo = getCityBySlug(citySlug);
  const cityLabel = cityInfo?.label || "India";

  const intentLabel =
    intent === "buy"
      ? "Buy"
      : intent === "rental"
      ? "Rent"
      : intent === "pg"
      ? "PG"
      : intent === "commercial"
      ? "Commercial"
      : "Buy & Rent";

  const title =
    citySlug === "all-india"
      ? `Properties to ${intentLabel} Across India | Search Homes India`
      : `Properties to ${intentLabel} in ${cityLabel} | Search Homes India`;

  const description =
    citySlug === "all-india"
      ? `Browse thousands of verified properties across India. Find flats, villas, plots and commercial spaces to ${intentLabel.toLowerCase()} on Search Homes India.`
      : `Find verified flats, villas, plots and commercial properties to ${intentLabel.toLowerCase()} in ${cityLabel}. Explore the best listings on Search Homes India.`;

  return {
    title,
    description,
    alternates: {
      canonical:
        citySlug === "all-india"
          ? "https://searchhomesindia.com/property-listing"
          : `https://searchhomesindia.com/property-listing?city=${citySlug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

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
