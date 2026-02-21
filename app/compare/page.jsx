import Breadcumb from "@/components/common/Breadcumb";

import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Compare from "@/components/compareproperty/Compare";
import { getPropertyListing, getPropertiesByIds } from "@/lib/properties/repository";

import React from "react";

const parseIds = (idsValue) => {
  if (!idsValue) return [];
  const raw = Array.isArray(idsValue) ? idsValue[0] : idsValue;
  return String(raw)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 4);
};

export default async function page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const preselectedIds = parseIds(resolvedSearchParams?.ids);

  const [listingResponse, preselectedProperties] = await Promise.all([
    getPropertyListing({ page: 1, pageSize: 20 }),
    preselectedIds.length ? getPropertiesByIds(preselectedIds, 4) : Promise.resolve([]),
  ]);

  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <Breadcumb pageName="Compare" />
        <div className="main-content">
          <Compare
            suggestions={listingResponse?.items || []}
            initialSelected={preselectedProperties}
          />
          
        </div>
        <Footer />
      </div>
    </>
  );
}
