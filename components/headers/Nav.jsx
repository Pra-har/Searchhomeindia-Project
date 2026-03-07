"use client";
import { megaHeaderMenus } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [activeMenuKey, setActiveMenuKey] = useState(null);
  const closeTimerRef = useRef(null);
  const currentSegment = pathname.split("/")[1];
  const isListingRoute = ["property-listing", "property-detail"].includes(currentSegment);
  const isBlogActive = currentSegment === "blog-listing" || currentSegment === "blog-details";
  const isServicesActive = [
    "our-services",
    "contact",
    "about",
    "career",
    "faq",
    "home-loan-process",
    "homeloan",
    "become-a-partner",
  ].includes(currentSegment);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = (key) => {
    clearCloseTimer();
    setActiveMenuKey(key);
  };

  const scheduleCloseMenu = (delay = 160) => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveMenuKey(null);
    }, delay);
  };

  const closeMenuNow = () => {
    clearCloseTimer();
    setActiveMenuKey(null);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    closeMenuNow();
  }, [pathname]);

  const renderMegaNav = (label, key, href, isActive = false) => (
    <li
      className={`has-child style-2 simple-mega-menu ${isActive ? "current-menu" : ""} ${activeMenuKey === key ? "is-open" : ""}`}
      onMouseEnter={() => openMenu(key)}
      onMouseLeave={() => scheduleCloseMenu()}
      onFocusCapture={() => openMenu(key)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          scheduleCloseMenu(90);
        }
      }}
    >
      <button
        type="button"
        className="nav-menu-trigger"
        aria-expanded={activeMenuKey === key}
      >
        {label}
      </button>
      <ul
        className="submenu"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={() => scheduleCloseMenu()}
      >
        {megaHeaderMenus[key].map((column) => (
          <li key={`${key}-${column.title}`} className={column.iconList ? "is-icon-col" : ""}>
            <p className="submenu-title">{column.title}</p>
            <ul className="submenu2">
              {column.submenu.map((item) => (
                <li key={`${key}-${column.title}-${item.label}`}>
                  <Link href={item.href} onClick={closeMenuNow}>
                    {column.iconList ? <span className="menu-dot-icon" aria-hidden="true" /> : null}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li className="mega-view-all-mobile">
          <Link href={href} onClick={closeMenuNow}>View all {label.toLowerCase()} properties</Link>
        </li>
      </ul>
    </li>
  );

  return (
    <>
      {renderMegaNav("Buy", "buy", "/property-listing?intent=buy", isListingRoute)}
      {renderMegaNav("Rent", "rent", "/property-listing?intent=rent", isListingRoute)}
      {renderMegaNav("New Launch", "launch", "/property-listing?segment=new-launch", isListingRoute)}
      {renderMegaNav("Our Services", "services", "/our-services", isServicesActive)}
      <li className={isBlogActive ? "current-menu" : ""}>
        <Link href="/blog-listing">Blogs</Link>
      </li>
    </>
  );
}
