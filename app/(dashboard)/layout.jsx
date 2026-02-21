import Header from "@/components/headers/Header";
import Footer from "@/components/footer/Footer";
import React from "react";

export const metadata = {
  title: "Dashboard || Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
  description: "Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
};
export default function page({ children }) {
  return (
    <>
      <div className="bg-dashboard">
        <div id="wrapper" className="bg-4">
          <Header />
          <div className="page-layout dashboard-layout-no-sidebar">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
}
