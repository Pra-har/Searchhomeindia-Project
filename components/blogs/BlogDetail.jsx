"use client";

import React, { useId, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const BLOG_FALLBACK_IMAGES = [
  "/images/blog/blog-grid-1.jpg",
  "/images/blog/blog-grid-2.jpg",
  "/images/blog/blog-grid-3.jpg",
];

const stripHtmlTags = (html = "") =>
  String(html)
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeContent = (blog) => {
  if (Array.isArray(blog?.content)) return blog.content;
  if (typeof blog?.content === "string" && blog.content.trim()) {
    return blog.content
      .split("\n")
      .map((text) => text.trim())
      .filter(Boolean)
      .map((text) => ({ type: "paragraph", text }));
  }
  if (blog?.excerpt) {
    return [{ type: "paragraph", text: blog.excerpt }];
  }
  return [];
};

const getPageImages = (blog, contentBlocks) => {
  const contentImages = contentBlocks
    .filter((block) => block?.type === "image" && block?.src)
    .map((block) => block.src);

  const configuredGallery = Array.isArray(blog?.galleryImages) ? blog.galleryImages : [];

  const unique = [];
  const seen = new Set();
  [blog?.image, ...configuredGallery, ...contentImages, ...BLOG_FALLBACK_IMAGES].forEach((img) => {
    if (img && !seen.has(img)) {
      seen.add(img);
      unique.push(img);
    }
  });

  return unique.slice(0, 3);
};

const renderContentBlock = (block, index) => {
  if (block?.type === "heading") {
    const HeadingTag = block.level === 3 ? "h3" : "h2";
    return (
      <HeadingTag key={`heading-${index}`} className="blog-content-heading">
        {block.text}
      </HeadingTag>
    );
  }

  if (block?.type === "image") {
    return (
      <div key={`image-${index}`} className="blog-content-image">
        <Image src={block.src} alt={block.alt || "Blog image"} width={1200} height={700} />
      </div>
    );
  }

  if (block?.type === "html" && typeof block?.html === "string") {
    const safeText = stripHtmlTags(block.html);
    if (!safeText) return null;
    return (
      <p key={`html-${index}`} className="blog-content-paragraph">
        {safeText}
      </p>
    );
  }

  if (block?.type === "list" && Array.isArray(block?.items)) {
    const ListTag = block.ordered ? "ol" : "ul";
    return (
      <ListTag key={`list-${index}`} className="blog-content-list">
        {block.items.map((item, itemIndex) => (
          <li key={`${itemIndex}-${item}`}>{item}</li>
        ))}
      </ListTag>
    );
  }

  return (
    <p key={`paragraph-${index}`} className="blog-content-paragraph">
      {block?.text}
    </p>
  );
};

export default function BlogDetail({
  blog,
  relatedPosts = [],
  recentPosts = [],
  previousBlog = null,
  nextBlog = null,
  categoryCounts = {},
  shareBaseUrl = "https://searchhomesindia.com",
}) {
  if (!blog) return null;
  const swiperNavId = useId().replace(/:/g, "");
  const prevClass = `blog-related-prev-${swiperNavId}`;
  const nextClass = `blog-related-next-${swiperNavId}`;
  const contentBlocks = useMemo(() => normalizeContent(blog), [blog]);
  const pageImages = useMemo(() => getPageImages(blog, contentBlocks), [blog, contentBlocks]);
  const featuredImage = pageImages[0] || BLOG_FALLBACK_IMAGES[0];
  const inlineImages = pageImages.slice(1, 3);
  const textContentBlocks = useMemo(
    () => contentBlocks.filter((block) => block?.type !== "image"),
    [contentBlocks]
  );

  const blogUrl = `${shareBaseUrl}/blog-details/${blog.slug || blog.id}`;
  const encodedBlogUrl = encodeURIComponent(blogUrl);
  const encodedTitle = encodeURIComponent(blog.title);

  const categoryEntries = Object.entries(categoryCounts);

  return (
    <section className="section-blog-details blog-detail-v2">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <article className="blog-detail-main-card">
              <div className="image-wrap featured-wrap">
                <Image src={featuredImage} alt={blog.title} width={1200} height={680} priority />
              </div>

              <header className="blog-detail-head">
                <span className="blog-category-badge">{blog.category}</span>
                <h1 className="title-heading">{blog.title}</h1>
                <div className="blog-meta-row">
                  <span>
                    <i className="icon-user" /> {blog.author}
                  </span>
                  <span>
                    <i className="icon-clock" /> {blog.publishDate}
                  </span>
                </div>
              </header>

              <div className={`blog-inline-gallery ${inlineImages.length === 1 ? "one-item" : ""}`}>
                {inlineImages.map((imageSrc, index) => (
                  <div key={`${imageSrc}-${index}`} className="gallery-item">
                    <Image
                      src={imageSrc}
                      alt={`${blog.title} image ${index + 1}`}
                      width={900}
                      height={560}
                    />
                  </div>
                ))}
              </div>

              <div className="blog-share-row">
                <p>Share this post</p>
                <ul className="tf-social style-1">
                  <li>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedBlogUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <i className="icon-fb" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodedBlogUrl}&text=${encodedTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <i className="icon-X" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedBlogUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <i className="icon-linked" />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="blog-content-body">
                {textContentBlocks.map(renderContentBlock)}
              </div>

              <div className="blog-prev-next">
                <div className="nav-item">
                  {previousBlog ? (
                    <Link href={`/blog-details/${previousBlog.slug || previousBlog.id}`}>
                      <span className="label">Previous</span>
                      <p>{previousBlog.title}</p>
                    </Link>
                  ) : (
                    <div className="is-empty">
                      <span className="label">Previous</span>
                      <p>No previous post</p>
                    </div>
                  )}
                </div>
                <div className="nav-item text-end">
                  {nextBlog ? (
                    <Link href={`/blog-details/${nextBlog.slug || nextBlog.id}`}>
                      <span className="label">Next</span>
                      <p>{nextBlog.title}</p>
                    </Link>
                  ) : (
                    <div className="is-empty">
                      <span className="label">Next</span>
                      <p>No next post</p>
                    </div>
                  )}
                </div>
              </div>
            </article>

            <div className="blog-related-wrap">
              <div className="blog-related-header">
                <h4 className="sidebar-title">Related Posts</h4>
                <div className="blog-related-nav">
                  <button type="button" className={`related-nav-btn ${prevClass}`}>
                    <i className="icon-arrow-left" />
                  </button>
                  <button type="button" className={`related-nav-btn ${nextClass}`}>
                    <i className="icon-arrow-right" />
                  </button>
                </div>
              </div>

              <Swiper
                modules={[Navigation]}
                spaceBetween={18}
                navigation={{
                  prevEl: `.${prevClass}`,
                  nextEl: `.${nextClass}`,
                }}
                breakpoints={{
                  0: { slidesPerView: 1.1 },
                  768: { slidesPerView: 2, spaceBetween: 16 },
                  1200: { slidesPerView: 3, spaceBetween: 18 },
                }}
                className="blog-related-swiper"
              >
                {relatedPosts.slice(0, 6).map((post, index) => (
                  <SwiperSlide key={`${post.id}-${index}`}>
                    <article className="blog-article-item style-2 blog-related-card">
                      <Link href={`/blog-details/${post.slug || post.id}`} className="image-wrap">
                        <Image src={post.image} alt={post.title} width={600} height={396} />
                      </Link>
                      <div className="article-content">
                        <span className="mini-badge">{post.category}</span>
                        <h5 className="title line-clamp-2">
                          <Link href={`/blog-details/${post.slug || post.id}`}>{post.title}</Link>
                        </h5>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <aside className="tf-sidebar blog-sidebar-v2">
              <div className="sidebar-search sidebar-item">
                <h4 className="sidebar-title">Search Blog</h4>
                <form className="form-search">
                  <fieldset>
                    <input type="text" placeholder="Search by keyword" />
                  </fieldset>
                  <div className="button-submit">
                    <button type="button">
                      <i className="icon-MagnifyingGlass" />
                    </button>
                  </div>
                </form>
              </div>

              <div className="sidebar-item sidebar-categories">
                <h4 className="sidebar-title">Categories</h4>
                <ul className="list-categories">
                  {categoryEntries.map(([name, count]) => (
                    <li key={name} className="flex items-center justify-between">
                      <Link href="/blog-listing" className="text-1 lh-20 fw-5">
                        {name}
                      </Link>
                      <div className="number">({count})</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-item sidebar-featured pb-20">
                <h4 className="sidebar-title">Recent Posts</h4>
                <ul>
                  {recentPosts.slice(0, 5).map((post) => (
                    <li key={post.id} className="box-listings hover-img">
                      <div className="image-wrap">
                        <Image src={post.image} alt={post.title} width={224} height={148} />
                      </div>
                      <div className="content">
                        <div className="text-1 title fw-5">
                          <Link href={`/blog-details/${post.slug || post.id}`}>{post.title}</Link>
                        </div>
                        <p>
                          <i className="icon-clock" /> {post.publishDate}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-newslatter sidebar-item">
                <h4 className="sidebar-title">Join Our Newsletter</h4>
                <p>
                  Get weekly updates on Indian real estate trends, launches, and investment
                  opportunities.
                </p>
                <form className="form-search">
                  <fieldset>
                    <input type="email" placeholder="Enter your email" />
                  </fieldset>
                  <div className="button-submit">
                    <button type="button">
                      <i className="icon-send-message" />
                    </button>
                  </div>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
