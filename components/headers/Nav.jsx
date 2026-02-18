"use client";
import { megaHeaderMenus } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav() {
  const pathname = usePathname();
  const currentSegment = pathname.split("/")[1];
  const isHomeActive = currentSegment === "" || ["mumbai", "delhi", "bangalore", "hyderabad", "chennai", "pune"].includes(currentSegment);
  const isListingRoute = ["property-listing", "property-detail"].includes(currentSegment);
  const isBlogActive = currentSegment === "blog-listing" || currentSegment === "blog-details";
  const isContactActive = currentSegment === "contact";

  const renderMegaNav = (label, key, href) => (
    <li className={`has-child style-2 simple-mega-menu ${isListingRoute ? "current-menu" : ""}`}>
      <button type="button" className="nav-menu-trigger">
        {label}
      </button>
      <ul className="submenu">
        {megaHeaderMenus[key].map((column) => (
          <li key={`${key}-${column.title}`} className={column.iconList ? "is-icon-col" : ""}>
            <p className="submenu-title">{column.title}</p>
            <ul className="submenu2">
              {column.submenu.map((item) => (
                <li key={`${key}-${column.title}-${item.label}`}>
                  <Link href={item.href}>
                    {column.iconList ? <span className="menu-dot-icon" aria-hidden="true" /> : null}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {column.footerLink ? (
              <Link href={column.footerLink.href} className="submenu-footer-link">
                {column.footerLink.label}
              </Link>
            ) : null}
          </li>
        ))}
        <li className="mega-view-all-mobile">
          <Link href={href}>View all {label.toLowerCase()} properties</Link>
        </li>
      </ul>
    </li>
  );

  return (
    <>
      <li className={isHomeActive ? "current-menu" : ""}>
        <Link href="/">Home</Link>
      </li>
      {renderMegaNav("Buy", "buy", "/property-listing?intent=buy")}
      {renderMegaNav("Rent", "rent", "/property-listing?intent=rent")}
      {renderMegaNav("New Launch", "launch", "/property-listing?segment=new-launch")}
      <li>
        <Link href="/property-listing?segment=luxury">Luxury Homes</Link>
      </li>
      <li className={isBlogActive ? "current-menu" : ""}>
        <Link href="/blog-listing">Blogs</Link>
      </li>
      <li className={isContactActive ? "current-menu" : ""}>
        <Link href={`/contact`}>Contact</Link>
      </li>
    </>
  );
}
