import Breadcrumb from "@/components/common/Breadcrumb";

import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Page Not Found | Search Homes India",
  description:
    "The page you are looking for does not exist. Return to Search Homes India and explore thousands of properties across India.",
  robots: { index: false, follow: false },
};
export default function NotFoundPage() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content ">
          <Breadcrumb pageName="Page Not found" />
          <div className="page-content">
            <div className="tf-container tf-spacing-1 pt-0">
              <div className="error-404 text-center">
                <h1 className="mb-20 title">Oh no... We lost this page</h1>
                <p className="mb-40">
                  We searched everywhere but couldn’t find what you’re looking
                  for. Let’s find <br />a better place for you to go.
                </p>
                <Link
                  href={"/"}
                  className="tf-btn bg-color-primary rounded-4 pd-3 fw-6 mx-auto"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
          
        </div>

        <Footer />
      </div>
    </>
  );
}
