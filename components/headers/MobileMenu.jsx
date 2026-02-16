"use client";
import { blogMenu, homes, otherPages, propertyLinks } from "@/data/menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MobileMenu() {
  const pathname = usePathname();
  const isParentActive = (menus) =>
    menus.some((menu) =>
      menu.submenu
        ? menu.submenu.some((item) =>
            item.submenu
              ? item.submenu.some(
                  (item) => item.href.split("/")[1] === pathname.split("/")[1]
                )
              : item.href.split("/")[1] === pathname.split("/")[1]
          )
        : menu.href.split("/")[1] === pathname.split("/")[1]
    );
  return (
    <div
      className="offcanvas offcanvas-start mobile-nav-wrap"
      tabIndex={-1}
      id="menu-mobile"
      aria-labelledby="menu-mobile"
    >
      <div className="offcanvas-header top-nav-mobile">
        <div className="offcanvas-title">
          <Link href={`/`}>
            <Image
              alt=""
              src="/images/logo/shi_logo_normal.png"
              width={272}
              height={84}
            />
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas" aria-label="Close">
          <i className="icon-close" />
        </div>
      </div>
      <div className="offcanvas-body inner-mobile-nav">
        <div className="mb-body">
          <ul id="menu-mobile-menu">
            <li
              className={`menu-item menu-item-has-children-mobile  ${
                homes.some((elm) => elm.href == pathname)
                  ? "current-menu-item"
                  : ""
              } `}
            >
              <button
                type="button"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-one"
                data-bs-target="#dropdown-menu-one"
              >
                Home
              </button>
              <div
                id="dropdown-menu-one"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {homes.map((link, i) => (
                    <li
                      key={i}
                      className={
                        pathname == link.href
                          ? "menu-item current-item"
                          : "menu-item "
                      }
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li
              className={`menu-item menu-item-has-children-mobile  ${
                isParentActive(propertyLinks) ? "current-menu-item" : ""
              } `}
            >
              <button
                type="button"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-two"
                data-bs-target="#dropdown-menu-two"
              >
                Listing
              </button>
              <div
                id="dropdown-menu-two"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {propertyLinks.map((links, i) => {
                    const propertySubId = `sub-layout-${i}`;
                    return (
                      <li
                        key={i}
                        className={`menu-item menu-item-has-children-mobile-2 ${
                          isParentActive(links.submenu)
                            ? "current-menu-item"
                            : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="item-menu-mobile collapsed"
                          data-bs-toggle="collapse"
                          aria-expanded="true"
                          aria-controls={propertySubId}
                          data-bs-target={`#${propertySubId}`}
                        >
                          {links.title}
                        </button>
                        <div
                          id={propertySubId}
                          className="collapse"
                          data-bs-parent="#dropdown-menu-two"
                        >
                          <ul className="sub-mobile">
                            {links.submenu.map((link, i2) => (
                              <li
                                key={i2}
                                className={
                                  pathname.split("/")[1] ==
                                  link.href.split("/")[1]
                                    ? "menu-item current-item"
                                    : "menu-item "
                                }
                              >
                                <Link
                                  href={link.href}
                                  className="item-menu-mobile"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li
              className={`menu-item menu-item-has-children-mobile   ${
                isParentActive(otherPages) ? "current-menu-item" : ""
              } `}
            >
              <button
                type="button"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-four"
                data-bs-target="#dropdown-menu-four"
              >
                Pages
              </button>
              <div
                id="dropdown-menu-four"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {otherPages.map((links, i) => {
                    const pagesSubId = `sub-agents-${i}`;
                    return (
                      <React.Fragment key={i}>
                        {links.submenu ? (
                          <li
                            className={`menu-item menu-item-has-children-mobile-2   ${
                              isParentActive(links.submenu || [])
                                ? "current-menu-item"
                                : ""
                            }   `}
                          >
                            <button
                              type="button"
                              className="item-menu-mobile collapsed"
                              data-bs-toggle="collapse"
                              aria-expanded="true"
                              aria-controls={pagesSubId}
                              data-bs-target={`#${pagesSubId}`}
                            >
                              {links.title}
                            </button>
                            <div
                              id={pagesSubId}
                              className="collapse"
                              data-bs-parent="#dropdown-menu-four"
                            >
                              <ul className="sub-mobile">
                                {links.submenu.map((link, i2) => (
                                  <li
                                    className={`menu-item ${
                                      link.href?.split("/")[1] ==
                                      pathname.split("/")[1]
                                        ? "current-item"
                                        : ""
                                    }`}
                                    key={i2}
                                  >
                                    <Link
                                      href={link.href}
                                      className="item-menu-mobile"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        ) : (
                          <li
                            className={`menu-item ${
                              links.href?.split("/")[1] ==
                              pathname.split("/")[1]
                                ? "current-item"
                                : ""
                            }`}
                          >
                            <Link href={links.href}>{links.label}</Link>
                          </li>
                        )}
                      </React.Fragment>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li
              className={`menu-item menu-item-has-children-mobile ${
                isParentActive(blogMenu) ? "current-menu-item" : ""
              } `}
            >
              <button
                type="button"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-five"
                data-bs-target="#dropdown-menu-five"
              >
                Blogs
              </button>
              <div
                id="dropdown-menu-five"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {blogMenu.map((link, i) => (
                    <li
                      key={i}
                      className={
                        link.href.split("/")[1] == pathname.split("/")[1]
                          ? "menu-item current-item"
                          : "menu-item"
                      }
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li
              className={`menu-item ${
                "/contact" == pathname ? "current-item" : ""
              }`}
            >
              <Link href={`/contact`} className="tem-menu-mobile">
                {" "}
                Contact
              </Link>
            </li>
          </ul>
          <div className="support">
            <a href="#" className="text-need">
              {" "}
              Need help?
            </a>
            <ul className="mb-info">
              <li>
                Call Us Now: <span className="number">1-555-678-8888</span>
              </li>
              <li>
                Support 24/7: <a href="#">contact@searchhomesindia.com</a>
              </li>
              <li>
                <div className="wrap-social">
                  <p>Follow us:</p>
                  <ul className="tf-social style-2">
                    <li>
                      <a href="#">
                        <i className="icon-fb" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-X" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-linked" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-ins" />
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
