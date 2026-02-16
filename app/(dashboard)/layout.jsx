import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/headers/Header";
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
          <Header parentClass="header dashboard" />
          <div className="page-layout">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
