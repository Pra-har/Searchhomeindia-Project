import BlogDetails from "@/components/blogs/BlogDetails";
import Blogs2 from "@/components/blogs/Blogs2";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";

import Breadcumb from "@/components/common/Breadcumb";

import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import { allBlogs } from "@/data/blogs";
import React from "react";

export const metadata = {
  title: "Blog Details || Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
  description: "Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
};
export default async function page({ params }) {
  const { id } = await params;

  const blog = allBlogs.filter((elm) => elm.id == id)[0] || allBlogs[0];

  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Breadcumb pageName="Blog Details" />
          <BlogDetails blog={blog} />
          <RelatedBlogs />
          
        </div>
        <Footer />
      </div>
    </>
  );
}
