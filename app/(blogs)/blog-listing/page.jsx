import BlogsListing from "@/components/blogs/BlogsListing";
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
      "Search Homes India blog listing with real estate news, market trends, investment insights, and buyer guides.",
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
