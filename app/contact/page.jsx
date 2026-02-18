import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Contact || Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
  description: "Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Contact />
        </div>
        <Footer />
      </div>
    </>
  );
}
