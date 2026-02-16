import Blogs2 from "@/components/blogs/Blogs2";

import Breadcumb from "@/components/common/Breadcumb";

import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Blog Grid || Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
  description: "Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Breadcumb pageName="Blog Grid" />
          <Blogs2 />
          
        </div>
        <Footer />
      </div>
    </>
  );
}
