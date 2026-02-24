"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import BackToTop from "@/components/common/BackToTop";
import MobileMenu from "@/components/headers/MobileMenu";
import Login from "@/components/modals/Login";
import Register from "@/components/modals/Register";

export default function LayoutClientEffects() {
  const pathname = usePathname();

  const forceUnlockPageScroll = () => {
    if (typeof document === "undefined") return;

    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    if (!bodyEl) return;

    bodyEl.classList.remove("modal-open");
    bodyEl.style.removeProperty("overflow");
    bodyEl.style.removeProperty("padding-right");
    bodyEl.style.removeProperty("touch-action");

    htmlEl.style.removeProperty("overflow");
    htmlEl.style.removeProperty("padding-right");
    htmlEl.style.removeProperty("touch-action");

    const backdrops = document.querySelectorAll(
      ".modal-backdrop, .offcanvas-backdrop"
    );
    backdrops.forEach((node) => node.remove());
  };

  useEffect(() => {
    let mounted = true;

    const syncBootstrapUI = async () => {
      const bootstrap = await import("bootstrap/dist/js/bootstrap.esm");
      if (!mounted) return;

      const modalElements = document.querySelectorAll(".modal.show");
      modalElements.forEach((modal) => {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
        modalInstance.hide();
      });

      const offcanvasElements = document.querySelectorAll(".offcanvas.show");
      offcanvasElements.forEach((offcanvas) => {
        const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
        offcanvasInstance.hide();
      });

      // Fallback unlock for rare mobile cases where Bootstrap leaves the body locked.
      forceUnlockPageScroll();
      window.setTimeout(forceUnlockPageScroll, 80);
    };

    syncBootstrapUI();

    return () => {
      mounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    let mounted = true;

    const initWow = async () => {
      const WOW = await import("@/utils/wow");
      if (!mounted) return;

      const wow = new WOW.default({
        animateClass: "animated",
        offset: 100,
        mobile: true,
        live: false,
      });
      wow.init();
    };

    initWow();

    return () => {
      mounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    const handleSticky = () => {
      const hasDualHeaderSystem = Boolean(document.querySelector(".header-system"));
      if (hasDualHeaderSystem) {
        const homeHeader = document.querySelector(".header-home-primary");
        if (homeHeader) {
          homeHeader.classList.remove("fixed", "header-sticky", "is-sticky");
        }
        return;
      }

      const navbar = document.querySelector(".header");
      if (!navbar) return;

      if (window.scrollY > 120) {
        navbar.classList.add("fixed", "header-sticky");
      } else {
        navbar.classList.remove("fixed", "header-sticky");
      }

      if (window.scrollY > 300) {
        navbar.classList.add("is-sticky");
      } else {
        navbar.classList.remove("is-sticky");
      }
    };

    window.addEventListener("scroll", handleSticky);
    handleSticky();
    return () => window.removeEventListener("scroll", handleSticky);
  }, []);

  useEffect(() => {
    // Safety net on first mount as well.
    forceUnlockPageScroll();
  }, []);

  return (
    <>
      <MobileMenu />
      <BackToTop />
      <Login />
      <Register />
    </>
  );
}
