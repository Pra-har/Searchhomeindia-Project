"use client";
import React from "react";
import { blogCatalog } from "@/data/blogs";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";

const DEFAULT_HOME_BLOGS = blogCatalog.slice(0, 8);

const normalizeBlogCard = (blog = {}, index = 0) => ({
  idOrSlug: blog.slug || blog.id || `home-blog-${index + 1}`,
  title: blog.title || "Real estate market update",
  image: blog.image || blog.imageSrc || blog.imgSrc || "/images/blog/blog-grid-1.jpg",
  category: blog.category || blog.tag || "Real Estate",
  excerpt:
    blog.excerpt ||
    blog.description ||
    "Explore verified market updates, pricing trends, and practical home buying insights.",
  author: blog.author || "Search Homes India",
  publishDate: blog.publishDate || blog.date || "Recently updated",
});

export default function Blogs({
  parentClass = "section-opinion tf-spacing-1 pb-0",
  blogs = DEFAULT_HOME_BLOGS,
  title = "Insight & Opinion",
  subtitle = "News, market intelligence, and practical home buying guides.",
}) {
  const safeBlogs = Array.isArray(blogs) && blogs.length ? blogs : DEFAULT_HOME_BLOGS;

  return (
    <section className={`${parentClass} blog-home-v2`}>
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-32">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text={title} />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                {subtitle}
              </p>
            </div>

            <div className="blog-home-swiper-wrap">
              <button
                type="button"
                className="blog-home-nav prev home-blogs-prev"
                aria-label="Previous blog"
              >
                <i className="icon-arrow-left" />
              </button>
              <button
                type="button"
                className="blog-home-nav next home-blogs-next"
                aria-label="Next blog"
              >
                <i className="icon-arrow-right" />
              </button>

              <Swiper
                dir="ltr"
                className="swiper sw-layout style-pagination blog-home-swiper blog-listing-v2"
                spaceBetween={18}
                breakpoints={{
                  0: { slidesPerView: 1.06, spaceBetween: 14 },
                  576: { slidesPerView: 1.4, spaceBetween: 14 },
                  768: { slidesPerView: 2, spaceBetween: 16 },
                  992: { slidesPerView: 3, spaceBetween: 18 },
                }}
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: ".home-blogs-prev",
                  nextEl: ".home-blogs-next",
                }}
                pagination={{
                  el: ".home-blogs-pagination",
                  clickable: true,
                }}
              >
                {safeBlogs.map((item, index) => {
                  const article = normalizeBlogCard(item, index);

                  return (
                    <SwiperSlide className="swiper-slide" key={`home-blog-${article.idOrSlug}-${index}`}>
                      <article className="blog-article-item style-2 blog-card-v2 hover-img">
                        <Link href={`/blog-details/${article.idOrSlug}`} className="image-wrap">
                          <Image
                            className="lazyload"
                            alt={article.title}
                            width={600}
                            height={396}
                            src={article.image}
                          />
                          <span className="box-tag">
                            <span className="tag-item text-4 text_white fw-6">
                              {article.category}
                            </span>
                          </span>
                        </Link>

                        <div className="article-content">
                          <h3 className="title line-clamp-2">
                            <Link href={`/blog-details/${article.idOrSlug}`}>
                              {article.title}
                            </Link>
                          </h3>
                          <p className="description line-clamp-3">{article.excerpt}</p>

                          <div className="meta-row">
                            <span className="meta-chip">
                              <i className="icon-user" />
                              {article.author}
                            </span>
                            <span className="meta-chip">
                              <i className="icon-clock" />
                              {article.publishDate}
                            </span>
                          </div>

                          <Link href={`/blog-details/${article.idOrSlug}`} className="tf-btn-link">
                            <span>Read More</span>
                            <i className="icon-circle-arrow" />
                          </Link>
                        </div>
                      </article>
                    </SwiperSlide>
                  );
                })}

                <div className="sw-pagination sw-pagination-layout text-center d-lg-none d-block mt-20 home-blogs-pagination" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
