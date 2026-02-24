import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Facts from "@/components/homeloan/Facts";
import LoanCalculator from "@/components/homeloan/LoanCalculator";
import PageTitle from "@/components/homeloan/PageTitle";
import Process from "@/components/homeloan/Process";
import React from "react";

export const metadata = {
  title: "Home Loan Guide & EMI Calculator | Search Homes India",
  description:
    "Calculate your home loan EMI, check eligibility and understand the loan process. Search Homes India helps you find the best home loan options in India.",
  alternates: { canonical: "https://searchhomesindia.com/homeloan" },
  robots: { index: true, follow: true },
};

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <PageTitle />
        <div className="main-content">
          <Facts />
          <Process />
          <LoanCalculator />
        </div>
        <Footer />
      </div>
    </>
  );
}
