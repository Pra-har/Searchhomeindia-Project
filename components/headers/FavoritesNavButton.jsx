"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FAVORITES_EVENT, getSavedCount } from "@/utlis/favorites";

export default function FavoritesNavButton() {
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const [isBump, setIsBump] = useState(false);

  useEffect(() => {
    let bumpTimer;
    const refreshCount = (event) => {
      const nextCount =
        typeof event?.detail?.count === "number"
          ? event.detail.count
          : getSavedCount();
      setCount(nextCount);

      if (event?.detail?.action === "added") {
        setIsBump(false);
        if (typeof window !== "undefined") {
          window.requestAnimationFrame(() => setIsBump(true));
        } else {
          setIsBump(true);
        }
        clearTimeout(bumpTimer);
        bumpTimer = setTimeout(() => setIsBump(false), 680);
      }
    };

    refreshCount();
    if (typeof window === "undefined") return undefined;

    window.addEventListener(FAVORITES_EVENT, refreshCount);
    window.addEventListener("storage", refreshCount);
    return () => {
      clearTimeout(bumpTimer);
      window.removeEventListener(FAVORITES_EVENT, refreshCount);
      window.removeEventListener("storage", refreshCount);
    };
  }, []);

  const isActive = pathname === "/saved-properties";

  return (
    <Link
      href="/saved-properties"
      className={`favorites-nav-btn${isActive ? " active" : ""}${
        isBump ? " is-bump" : ""
      }`}
      aria-label={`Saved properties${count > 0 ? ` (${count})` : ""}`}
    >
      <i className="icon-heart-1" />
      {count > 0 ? (
        <span className="favorites-count-badge">{count > 99 ? "99+" : count}</span>
      ) : null}
    </Link>
  );
}
