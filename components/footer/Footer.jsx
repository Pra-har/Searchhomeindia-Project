"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { footerData } from "@/data/footerLinks";
import Cta from "@/components/common/Cta";


export default function Footer({ logo = "/images/logo/shi_logo_normal.png" }) {
  useEffect(() => {
    const headings = document.querySelectorAll(".title-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []);

  return (
    <>
    <Cta />
    <footer id="footer">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="footer-top">
              <div className="footer-logo">
                <Link href={`/`}>
                  <Image
                    id="logo_footer"
                    alt="logo-footer"
                    src={logo}
                    width={272}
                    height={85}
                  />
                </Link>
              </div>
              <div className="wrap-contact-item style-1">
                <div className="contact-item">
                  <div className="icons">
                    <i className="icon-clock" />
                  </div>
                  <div className="content">
                    <div className="title text-1">Office Timing</div>
                    <h6> <a href="#">Tue - Sun, 10AM - 7PM </a></h6>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="icons">
                    <i className="icon-phone-2" />
                  </div>
                  <div className="content">
                    <div className="title text-1">Call us</div>
                    <h6>
                      <a href="tel:+918147267372">+91 8147267372</a>
                    </h6>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="icons">
                    <i className="icon-letter-2" />
                  </div>
                  <div className="content">
                    <div className="title text-1">Mail Us</div>
                    <h6 className="fw-4">
                      <a href="mailto:info@searchhomesindia.com">
                        info@searchhomesindia.com
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-main">
            <div className="row">
              {footerData.map((column, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div
                    className={`footer-menu-list footer-col-block ${
                      column.className || ""
                    }`}
                  >
                    <h5 className="title lh-30 title-desktop">
                      {column.title}
                    </h5>
                    <h5 className="title lh-30 title-mobile">{column.title}</h5>
                    <ul className="tf-collapse-content">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          {link.href.startsWith("/") ? (
                            <Link href={link.href}>{link.text}</Link>
                          ) : (
                            <a href={link.href}>{link.text}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <div className="col-12">
                <div className="footer-about-block footer-info-grid">
                  <div className="about-col">
                    <h5 className="title lh-30 mb-10">ABOUT US</h5>
                    <p className="text-1 mb-18">
                      Search Homes India is one of India&apos;s leading integrated
                      real estate platforms, with category leadership across
                      multiple touchpoints of the consumer home ownership
                      journey. With growing demand in Mumbai, Delhi, Bangalore,
                      Hyderabad, and Chennai, Search Homes India is building
                      tech-enabled experiences for buying, renting, and
                      investing.
                    </p>
                  </div>
                  <div className="connect-col">
                    <h5 className="title lh-30 mb-10">CONNECT WITH US</h5>
                    <div className="footer-connect mb-18">
                      <div className="item">
                        <span className="label">Write to us at:-</span>
                        <a href="mailto:connect@searchhomesindia.com">
                          connect@searchhomesindia.com
                        </a>
                      </div>
                      <div className="item">
                        <span className="label">Existing Clients:-</span>
                        <a href="mailto:customercare@searchhomesindia.com">
                          customercare@searchhomesindia.com
                        </a>
                      </div>
                      <div className="item">
                        <span className="label">Job/Career Related:-</span>
                        <a href="mailto:careers@searchhomesindia.com">
                          careers@searchhomesindia.com
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="app-col">
                    <h5 className="title lh-30 mb-10">
                      SHI APP ON MOBILE
                    </h5>
                    <div className="footer-app-links">
                      <a href="#">
                        <Image
                          src="/images/logo/google-play.png"
                          alt="Search Homes India Android App"
                          width={172}
                          height={52}
                        />
                      </a>
                      <a href="#">
                        <Image
                          src="/images/logo/app-store.png"
                          alt="Search Homes India iOS App"
                          width={172}
                          height={52}
                        />
                      </a>
                    </div>
                    <h5 className="title lh-30 mb-10 mt-5">KEEP IN TOUCH</h5>
                    <ul className="tf-social style-4">
                      <li>
                        <a href="#">
                          <i className="icon-fb" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-linked" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-X" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-ins" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="footer-bottom">
            <p>
              Copyright (c) {new Date().getFullYear()} www.searchhomesindia.com.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
