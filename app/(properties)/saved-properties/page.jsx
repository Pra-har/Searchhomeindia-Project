import Breadcumb from "@/components/common/Breadcumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import SavedPropertiesClient from "@/components/favorites/SavedPropertiesClient";
import React from "react";

export const metadata = {
  title:
    "Saved Properties || Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
  description: "View your saved, shortlisted, and favorite properties by category.",
};

export default function page({ searchParams }) {
  const fromParam = Array.isArray(searchParams?.from)
    ? searchParams.from[0]
    : searchParams?.from;
  const isFromDashboard = fromParam === "dashboard";

  const breadcrumbItems = isFromDashboard
    ? [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Saved Properties" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Saved Properties" },
      ];

  return (
    <div id="wrapper">
      <Header />
      <Breadcumb pageName="Saved Properties" items={breadcrumbItems} />
      <div className="main-content">
        <SavedPropertiesClient />
      </div>
      <Footer />
    </div>
  );
}
