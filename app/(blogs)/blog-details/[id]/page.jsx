import BlogDetail from "@/components/blogs/blogdetail/BlogDetail";

import Breadcumb from "@/components/common/Breadcumb";

import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import {
  blogCatalog,
  getBlogByIdOrSlug,
  getBlogCategoryCounts,
  getBlogNeighbors,
  getRecentBlogs,
  getRelatedBlogs,
} from "@/data/blogs";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  return blogCatalog.map((blog) => ({
    id: String(blog.slug || blog.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = getBlogByIdOrSlug(id);

  if (!blog) {
    return {
      title: "Blog Not Found | Search Homes India",
      description: "The requested blog article does not exist.",
    };
  }

  return {
    title: `${blog.title} | Search Homes India`,
    description: blog.excerpt || "Latest real estate insights from Search Homes India.",
    alternates: {
      canonical: `https://searchhomesindia.com/blog-details/${blog.id || blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || "",
      images: blog.image ? [{ url: blog.image }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || "Latest real estate insights from Search Homes India.",
      images: [blog.image || "/images/logo/shi_logo_normal.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function page({ params }) {
  const { id } = await params;

  const blog = getBlogByIdOrSlug(id);
  if (!blog) notFound();

  const relatedPosts = getRelatedBlogs(blog, 3);
  const recentPosts = getRecentBlogs(5);
  const categoryCounts = getBlogCategoryCounts();
  const { previous, next } = getBlogNeighbors(blog);

  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Breadcumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog Listing", href: "/blog-listing" },
              { label: "Blog Detail" },
              { label: blog?.title || "Current Blog" },
            ]}
          />
          <BlogDetail
            blog={blog}
            relatedPosts={relatedPosts}
            recentPosts={recentPosts}
            categoryCounts={categoryCounts}
            previousBlog={previous}
            nextBlog={next}
          />
          
        </div>
        <Footer />
      </div>
    </>
  );
}
