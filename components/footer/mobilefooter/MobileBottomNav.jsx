"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { isCityHomePath } from "@/utils/citySearch";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const isHomeRoute = useMemo(() => isCityHomePath(pathname || "/"), [pathname]);

  useEffect(() => {
    if (!isHomeRoute) return undefined;
    document.body.classList.add("has-mobile-home-bottom-nav");
    return () => document.body.classList.remove("has-mobile-home-bottom-nav");
  }, [isHomeRoute]);

  if (!isHomeRoute) return null;

  const homeHref = pathname && pathname !== "/" ? pathname : "/";

  return (
    <nav className="mobile-home-bottom-nav" aria-label="Mobile bottom navigation">
      <Link href={homeHref} className="nav-item is-home">
        <i className="icon-home" aria-hidden="true" />
        <span>Home</span>
      </Link>

      <button
        type="button"
        className="nav-item"
        data-bs-toggle="offcanvas"
        data-bs-target="#header-mobile-search"
        aria-controls="header-mobile-search"
      >
        <i className="icon-search" aria-hidden="true" />
        <span>Search</span>
      </button>

      <Link href="/post-property" className="nav-item nav-item-plus" aria-label="Post property">
        <span className="plus-circle">
          <i className="icon-plus" aria-hidden="true" />
        </span>
      </Link>

      <Link href="/saved-properties" className="nav-item">
        <i className="icon-heart-1" aria-hidden="true" />
        <span>Favourite</span>
      </Link>

      <Link href="/dashboard" className="nav-item">
        <i className="icon-user-2" aria-hidden="true" />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
