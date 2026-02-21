import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Facts from "@/components/homeloan/Facts";
import LoanCalculator from "@/components/homeloan/LoanCalculator";
import PageTitle from "@/components/homeloan/PageTitle";
import Process from "@/components/homeloan/Process";
import React from "react";

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
