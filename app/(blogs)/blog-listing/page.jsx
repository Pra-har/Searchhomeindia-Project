import BlogsListing from "@/components/blogs/bloglisting/BlogsListing";
import { blogCategories, getBlogCategoryCounts, getBlogListingResult } from "@/data/blogs";

import Breadcumb from "@/components/common/Breadcumb";

import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export async function generateMetadata({ searchParams }) {
  const params = (await searchParams) || {};
  const activeCategory = params.category ? `${params.category} ` : "";

  return {
    title: `${activeCategory}Blog Listing | Search Homes India`,
    description:
      "Search Homes India blog listing with real estate news, market trends, investment insights, and buyer guides for Indian property seekers.",
    alternates: {
      canonical: "https://searchhomesindia.com/blog-listing",
    },
    openGraph: {
      title: `${activeCategory}Real Estate Blog | Search Homes India`,
      description:
        "Read the latest real estate news, market trends, investment tips and property guides on Search Homes India.",
      url: "https://searchhomesindia.com/blog-listing",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}
export default async function page({ searchParams }) {
  const params = (await searchParams) || {};
  const activeCategory = params.category || "All";
  const query = params.q || "";
  const pageNumber = params.page || 1;

  const listingResult = getBlogListingResult({
    category: activeCategory,
    query,
    page: pageNumber,
    limit: 9,
  });

  const categoryCounts = getBlogCategoryCounts();

  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Breadcumb pageName="Blog Listing" />
          <BlogsListing
            blogs={listingResult.items}
            categories={blogCategories}
            activeCategory={listingResult.activeCategory}
            activePage={listingResult.currentPage}
            totalPages={listingResult.totalPages}
            totalItems={listingResult.totalItems}
            searchQuery={query}
            categoryCounts={categoryCounts}
          />
          
        </div>
        <Footer />
      </div>
    </>
  );
}
