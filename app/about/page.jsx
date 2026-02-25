import React from "react";
import Header from "@/components/headers/Header";
import Brands from "@/components/common/Brands";
import Contact from "@/components/about/Contact";
import AboutGlimpse from "@/components/about/AboutGlimpse";
import Hero from "@/components/about/Hero";
import Footer from "@/components/footer/Footer";
import About from "@/components/about/About";
import WelcomeSection from "@/components/about/WelcomeSection";

export const metadata = {
  title: "About Us | Search Homes India",
  description:
    "Learn more about Search Homes India, our mission, services, and how we help buyers, sellers, and renters across major Indian cities.",
  alternates: { canonical: "https://searchhomesindia.com/about" },
  robots: { index: true, follow: true },
};

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <Hero />
        <div className="main-content bg-color-white">
          <About />
          <WelcomeSection />
          <AboutGlimpse />
          <Contact />
          <Brands parentClass="section-work-together style-2 tf-spacing-7 pb-0" />
        </div>
        <Footer />
      </div>
    </>
  );
}
