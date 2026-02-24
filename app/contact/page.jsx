import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Contact Us | Search Homes India",
  description:
    "Get in touch with Search Homes India for property queries, listing support, or partnership opportunities. We are here to help you find your dream home.",
  alternates: { canonical: "https://searchhomesindia.com/contact" },
  robots: { index: true, follow: true },
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
