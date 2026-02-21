"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function BlogsListing({
  blogs = [],
  categories = [],
  activeCategory = "All",
  activePage = 1,
  totalPages = 1,
  totalItems = 0,
  searchQuery = "",
  categoryCounts = {},
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState(searchQuery || "");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [tabsNode, setTabsNode] = useState(null);

  const categoryOptions = useMemo(() => ["All", ...categories.filter(Boolean)], [categories]);
  const paginationItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set([1, totalPages, activePage - 1, activePage, activePage + 1]);
    const validPages = Array.from(pages)
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);

    const result = [];
    for (let index = 0; index < validPages.length; index += 1) {
      const current = validPages[index];
      const previous = validPages[index - 1];
      if (index > 0 && current - previous > 1) {
        result.push("...");
      }
      result.push(current);
    }
    return result;
  }, [activePage, totalPages]);

  useEffect(() => {
    setSearchInput(searchQuery || "");
  }, [searchQuery]);

  useEffect(() => {
    if (!tabsNode) return;

    const syncScrollState = () => {
      const { scrollLeft, clientWidth, scrollWidth } = tabsNode;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    syncScrollState();
    tabsNode.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);

    return () => {
      tabsNode.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [tabsNode, categoryOptions.length]);

  const buildListUrl = (nextCategory = activeCategory, nextPage = 1, nextQuery = searchInput) => {
    const queryParams = new URLSearchParams();
    const safeCategory = String(nextCategory || "All");
    const safeQuery = String(nextQuery || "").trim();

    if (safeCategory && safeCategory !== "All") queryParams.set("category", safeCategory);
    if (safeQuery) queryParams.set("q", safeQuery);
    if (Number(nextPage) > 1) queryParams.set("page", String(nextPage));

    return queryParams.toString() ? `${pathname}?${queryParams.toString()}` : pathname;
  };

  const handleCategoryChange = (category) => {
    router.push(buildListUrl(category, 1, searchInput));
  };

  const handlePageChange = (pageNumber) => {
    router.push(buildListUrl(activeCategory, pageNumber, searchInput));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.push(buildListUrl(activeCategory, 1, searchInput));
  };

  const scrollTabs = (direction) => {
    if (!tabsNode) return;
    tabsNode.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-blog-grid blog-listing-v2">
      <div className="tf-container">
        <div className="blog-listing-v2-head">
          <div>
            <h1 className="title">Real Estate Insights</h1>
            <p className="subtitle">
              News, market intelligence, and practical home buying guides.
            </p>
          </div>
          <span className="results-count">{totalItems} Articles</span>
        </div>

        <form className="blog-listing-search" onSubmit={handleSearchSubmit}>
          <div className="search-field">
            <i className="icon-MagnifyingGlass" />
            <input
              type="text"
              placeholder="Search blogs by title, category, keyword..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
          <button type="submit" className="tf-btn bg-color-primary">
            Search
          </button>
        </form>

        <div className="blog-category-tabs-wrap">
          <button
            type="button"
            className={`tab-scroll-btn left ${!canScrollLeft ? "is-disabled" : ""}`}
            onClick={() => scrollTabs("left")}
            aria-label="Scroll categories left"
            disabled={!canScrollLeft}
          >
            <i className="icon-arrow-left" />
          </button>

          <div
            ref={setTabsNode}
            className="blog-category-tabs"
            role="tablist"
            aria-label="Blog categories"
          >
            {categoryOptions.map((category) => {
              const isActive = activeCategory === category;
              const count = category === "All" ? totalItems : categoryCounts?.[category] || 0;
              return (
                <button
                  key={category}
                  type="button"
                  className={`category-tab ${isActive ? "is-active" : ""}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category} <span>({count})</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={`tab-scroll-btn right ${!canScrollRight ? "is-disabled" : ""}`}
            onClick={() => scrollTabs("right")}
            aria-label="Scroll categories right"
            disabled={!canScrollRight}
          >
            <i className="icon-arrow-right" />
          </button>
        </div>

        {blogs.length ? (
          <div className="row">
            {blogs.map((blog, index) => (
              <div key={blog.slug || `${blog.id}-${index}`} className="col-lg-4 col-md-6 col-12 mb-30">
                <article className="blog-article-item style-2 blog-card-v2 hover-img">
                  <Link href={`/blog-details/${blog.slug || blog.id}`} className="image-wrap">
                    <Image alt={blog.title} width={600} height={396} src={blog.image} />
                    <span className="box-tag">
                      <span className="tag-item text-4 text_white fw-6">{blog.category}</span>
                    </span>
                  </Link>

                  <div className="article-content">
                    <h2 className="title line-clamp-2">
                      <Link href={`/blog-details/${blog.slug || blog.id}`}>{blog.title}</Link>
                    </h2>
                    <p className="description line-clamp-3">{blog.excerpt}</p>

                    <div className="meta-row">
                      <span className="meta-chip">
                        <i className="icon-user" />
                        {blog.author}
                      </span>
                      <span className="meta-chip">
                        <i className="icon-clock" />
                        {blog.publishDate}
                      </span>
                    </div>

                    <Link href={`/blog-details/${blog.slug || blog.id}`} className="tf-btn-link">
                      <span>Read More</span>
                      <i className="icon-circle-arrow" />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <div className="blog-listing-empty">
            <h3>No blogs found</h3>
            <p>Try changing category or search keyword.</p>
          </div>
        )}

        <div className="blog-pagination-wrap">
          <ul className="wg-pagination justify-center">
            <li className={`arrow ${activePage <= 1 ? "disabled" : ""}`}>
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, activePage - 1))}
                disabled={activePage <= 1}
                aria-label="Previous page"
              >
                <i className="icon-arrow-left" />
              </button>
            </li>

            {paginationItems.map((item, index) => {
              if (item === "...") {
                return (
                  <li key={`ellipsis-${index}`} className="ellipsis">
                    <span>...</span>
                  </li>
                );
              }

              return (
                <li key={`page-${item}`} className={activePage === item ? "active" : ""}>
                  <button type="button" onClick={() => handlePageChange(item)}>
                    {item}
                  </button>
                </li>
              );
            })}

            <li className={`arrow ${activePage >= totalPages ? "disabled" : ""}`}>
              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, activePage + 1))}
                disabled={activePage >= totalPages}
                aria-label="Next page"
              >
                <i className="icon-arrow-right" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
