"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { dismissAllModals } from "@/utils/navigationHelper";

export default function MobileMenu() {
  const pathname = usePathname();
  const currentSegment = pathname.split("/")[1];
  const isHomeActive =
    currentSegment === "" ||
    ["mumbai", "delhi", "bangalore", "hyderabad", "chennai", "pune"].includes(currentSegment);
  const isBlogActive = currentSegment === "blog-listing" || currentSegment === "blog-details";
  const isContactActive = currentSegment === "contact";

  return (
    <div
      className="offcanvas offcanvas-start mobile-nav-wrap"
      tabIndex={-1}
      id="menu-mobile"
      aria-labelledby="menu-mobile"
    >
      <div className="offcanvas-header top-nav-mobile">
        <div className="offcanvas-title">
          <Link href="/" onClick={dismissAllModals} data-bs-dismiss="offcanvas">
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
            <li className={`menu-item ${isHomeActive ? "current-item" : ""}`}>
              <Link href="/" className="item-menu-mobile" onClick={dismissAllModals} data-bs-dismiss="offcanvas">
                Home
              </Link>
            </li>
            <li className="menu-item">
              <Link href="/property-listing?intent=buy" className="item-menu-mobile" onClick={dismissAllModals} data-bs-dismiss="offcanvas">
                Buy
              </Link>
            </li>
            <li className="menu-item">
              <Link href="/property-listing?intent=rent" className="item-menu-mobile" onClick={dismissAllModals} data-bs-dismiss="offcanvas">
                Rent
              </Link>
            </li>
            <li className="menu-item">
              <Link href="/property-listing?segment=new-launch" className="item-menu-mobile" onClick={dismissAllModals} data-bs-dismiss="offcanvas">
                New Launch
              </Link>
            </li>
            <li className="menu-item">
              <Link href="/property-listing?segment=luxury" className="item-menu-mobile" onClick={dismissAllModals} data-bs-dismiss="offcanvas">
                Luxury Homes
              </Link>
            </li>
            <li className={`menu-item ${isBlogActive ? "current-item" : ""}`}>
              <Link href="/blog-listing" className="item-menu-mobile" onClick={dismissAllModals} data-bs-dismiss="offcanvas">
                Blogs
              </Link>
            </li>
            <li className={`menu-item ${isContactActive ? "current-item" : ""}`}>
              <Link href="/contact" className="item-menu-mobile" onClick={dismissAllModals} data-bs-dismiss="offcanvas">
                Contact
              </Link>
            </li>
          </ul>

          <div className="support">
            <a href="#" className="text-need">
              Need help?
            </a>
            <ul className="mb-info">
              <li>
                Call Us Now: <span className="number">+91 8147267372</span>
              </li>
              <li>
                Support 24/7: <a href="mailto:contact@shi.com">contact@shi.com</a>
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
