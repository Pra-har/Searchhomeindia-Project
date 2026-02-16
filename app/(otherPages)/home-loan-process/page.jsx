import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Cta from "@/components/otherPages/LoanProcess/Cta";
import Facts from "@/components/otherPages/LoanProcess/Facts";
import LoanCalculator from "@/components/otherPages/LoanProcess/LoanCalculator";
import PageTitle from "@/components/otherPages/LoanProcess/PageTitle";
import Process from "@/components/otherPages/LoanProcess/Process";
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
