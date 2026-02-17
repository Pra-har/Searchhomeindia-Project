"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { otherPages, propertyLinks } from "@/data/menu";
import FavoritesNavButton from "./FavoritesNavButton";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";
import SearchForm from "@/components/common/SearchForm";
import CityDropdown from "@/components/common/CityDropdown";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import {
  CITY_CHANGE_EVENT,
  CITY_OPTIONS,
  getCityRoute,
  getCitySlugFromPath,
  isCityHomePath,
  readStoredCitySlug,
  readStoredCitySource,
  resolveCityFromBrowserLocation,
  writeStoredCity,
} from "@/utlis/citySearch";
import {
  SEARCH_CATEGORY_FALLBACK,
  SEARCH_CATEGORY_OPTIONS,
} from "@/utlis/searchCategories";

const HEADER_SWAP_SCROLL_Y = 140;

const GpsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 2V5M12 19V22M2 12H5M19 12H22"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M18.5 12A6.5 6.5 0 1 0 5.5 12A6.5 6.5 0 1 0 18.5 12Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect
      x="9"
      y="3"
      width="6"
      height="11"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M6.5 11.5V12C6.5 15.0376 8.96243 17.5 12 17.5C15.0376 17.5 17.5 15.0376 17.5 12V11.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 17.5V21M9.5 21H14.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const FiltersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 4H14M10 4H3M21 12H12M8 12H3M21 20H16M12 20H3M14 2V6M8 10V14M16 18V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AUTH_STORAGE_KEYS = [
  "shi-user",
  "shi_user",
  "auth_user",
  "user",
  "shi-token",
  "shi_token",
  "token",
];

const MOCK_LOGGED_IN_USER = {
  firstName: "Pratham",
};

const toAuthShape = (isLoggedIn, firstName) => {
  const normalizedFirstName = String(firstName || "").split(" ")[0]?.trim() || "";
  const nameInitial = normalizedFirstName
    ? normalizedFirstName.charAt(0).toUpperCase()
    : "";

  return {
    isLoggedIn: Boolean(isLoggedIn),
    firstName: normalizedFirstName,
    nameInitial,
  };
};

const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return toAuthShape(true, MOCK_LOGGED_IN_USER.firstName);
  }

  let firstName = "";
  let hasToken = false;

  AUTH_STORAGE_KEYS.forEach((key) => {
    const raw = window.localStorage.getItem(key);
    if (!raw) return;

    if (key.includes("token")) {
      hasToken = true;
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const candidate =
        parsed?.firstName ||
        parsed?.first_name ||
        parsed?.name ||
        parsed?.fullName ||
        "";
      if (candidate && !firstName) firstName = String(candidate).trim();
      if (parsed?.token) hasToken = true;
    } catch {
      if (!firstName) firstName = String(raw).trim();
    }
  });

  const normalizedFirstName = String(firstName || "").split(" ")[0]?.trim() || "";
  const hasAuth = Boolean(normalizedFirstName || hasToken);
  if (!hasAuth) {
    return toAuthShape(true, MOCK_LOGGED_IN_USER.firstName);
  }
  return toAuthShape(true, normalizedFirstName || MOCK_LOGGED_IN_USER.firstName);
};

const UserOutlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M15.5 7.5A3.5 3.5 0 1 0 8.5 7.5A3.5 3.5 0 1 0 15.5 7.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M4.75 19.2C5.31 16.32 8.02 14.25 12 14.25C15.98 14.25 18.69 16.32 19.25 19.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

function HeaderUserMenu({ authState, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  return (
    <div className={`header-user-inline${open ? " active" : ""}`} ref={menuRef}>
      <button
        type="button"
        className="header-user-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={authState.isLoggedIn ? "Open account menu" : "Open login menu"}
      >
        <span
          className={`account-avatar${authState.isLoggedIn ? " is-logged-in" : ""}`}
          aria-hidden="true"
        >
          {authState.isLoggedIn ? (
            <span className="avatar-letter">{authState.nameInitial || "U"}</span>
          ) : (
            <UserOutlineIcon />
          )}
          {authState.isLoggedIn ? <span className="status-dot" /> : null}
        </span>
      </button>
      <div className="menu-user">
        {authState.isLoggedIn ? (
          <>
            <div className="dropdown-user-meta">{authState.firstName || "User"}</div>
            <Link className="dropdown-item" href="/my-profile">
              Profile
            </Link>
            <Link className="dropdown-item" href="/my-property">
              My Listings
            </Link>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => {
                onLogout?.();
                setOpen(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="auth-dropdown-actions">
            <a className="tf-btn bg-color-primary w-100" href="#modalLogin" data-bs-toggle="modal">
              Login
            </a>
            <a className="tf-btn style-border w-100" href="#modalRegister" data-bs-toggle="modal">
              Signup
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function HeaderRightMenu({ authState, onLogout }) {
  return (
    <div className="header-right">
      <FavoritesNavButton />
      <div className="btn-add">
        <Link className="tf-btn style-border pd-22" href="/add-property">
          Post Property
          <sup className="nowbutton">Free</sup>
        </Link>
      </div>
      <HeaderUserMenu authState={authState} onLogout={onLogout} />
      <button
        type="button"
        className="header-directory-btn"
        data-bs-toggle="offcanvas"
        data-bs-target="#header-side-menu"
        aria-controls="header-side-menu"
        aria-label="Open quick menu"
      >
        <i className="icon-menu" />
      </button>
      <button
        type="button"
        className="mobile-button"
        data-bs-toggle="offcanvas"
        data-bs-target="#menu-mobile"
        aria-controls="menu-mobile"
      >
        <i className="icon-menu" />
      </button>
    </div>
  );
}

function HeaderDirectoryOffcanvas({ authState, onLogout }) {
  const sideLinks = useMemo(() => {
    const dynamic = [];
    propertyLinks.forEach((group) => {
      group.submenu?.forEach((item) => {
        if (!dynamic.some((link) => link.href === item.href)) {
          dynamic.push({ href: item.href, label: item.label });
        }
      });
    });
    otherPages.forEach((item) => {
      if (!dynamic.some((link) => link.href === item.href)) {
        dynamic.push({ href: item.href, label: item.label });
      }
    });

    return [
      { href: "/home-loan-process", label: "About" },
      { href: "/blog-grid", label: "Blog" },
      { href: "/contact", label: "Contact" },
      { href: "/add-property", label: "Post Property" },
      ...dynamic,
    ];
  }, []);

  return (
    <div
      className="offcanvas offcanvas-end header-side-offcanvas"
      tabIndex={-1}
      id="header-side-menu"
      aria-labelledby="header-side-menu-label"
    >
      <div className="offcanvas-header">
        <h5 id="header-side-menu-label">Quick Menu</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <div className="header-side-account">
          {authState.isLoggedIn ? (
            <>
              <div className="signed-user">
                <span className="avatar">{authState.nameInitial || "U"}</span>
                <div className="info">
                  <p className="label">Signed in as</p>
                  <strong>{authState.firstName || "User"}</strong>
                </div>
              </div>
              <div className="auth-actions">
                <Link href="/my-profile">
                  Profile
                </Link>
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-actions guest">
              <a href="#modalLogin" data-bs-toggle="modal" data-bs-dismiss="offcanvas">
                Login
              </a>
              <a href="#modalRegister" data-bs-toggle="modal" data-bs-dismiss="offcanvas">
                Signup
              </a>
            </div>
          )}
        </div>
        <ul className="header-side-links">
          {sideLinks.map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HeaderMobileSearchOffcanvas({
  activeCitySlug,
  cityOptions,
  onCityChange,
  onUseCurrentLocation,
}) {
  const [activeTab, setActiveTab] = useState(SEARCH_CATEGORY_FALLBACK);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const tabsRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateScrollState = () => {
    const node = tabsRef.current;
    if (!node) return;
    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setCanLeft(node.scrollLeft > 4);
    setCanRight(node.scrollLeft < maxScrollLeft - 4);
  };

  const scrollTabs = (direction) => {
    const node = tabsRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * 160, behavior: "smooth" });
    window.setTimeout(updateScrollState, 220);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  return (
    <div
      className="offcanvas offcanvas-start hero-mobile-offcanvas header-mobile-search-offcanvas"
      tabIndex={-1}
      id="header-mobile-search"
      aria-labelledby="header-mobile-search-label"
    >
      <div className="offcanvas-header">
        <h5 id="header-mobile-search-label">Search Properties</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <div className="hero-mobile-tabs-wrap">
          <button
            type="button"
            className={`hero-mobile-tab-nav prev ${!canLeft ? "is-disabled" : ""}`}
            onClick={() => scrollTabs(-1)}
            aria-label="Scroll tabs left"
          >
            <i className="icon-arrow-left-1" />
          </button>
          <div className="hero-mobile-tabs" ref={tabsRef} onScroll={updateScrollState}>
            {SEARCH_CATEGORY_OPTIONS.map((tab) => (
              <button
                key={`header-mobile-tab-${tab.value}`}
                type="button"
                className={activeTab === tab.value ? "active" : ""}
                onClick={() => setActiveTab(tab.value)}
              >
                <i className={tab.icon} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`hero-mobile-tab-nav next ${!canRight ? "is-disabled" : ""}`}
            onClick={() => scrollTabs(1)}
            aria-label="Scroll tabs right"
          >
            <i className="icon-arrow-right-1" />
          </button>
        </div>
        <div className="hero-mobile-fields">
          <CityDropdown
            value={activeCitySlug}
            options={cityOptions}
            onChange={onCityChange}
            className="city-dropdown--mobile"
          />
          <input type="text" placeholder="Search by Project, Locality or Builder" />
          <div className="hero-mobile-actions">
            <button
              type="button"
              className="icon-btn"
              aria-label="Use GPS"
              onClick={onUseCurrentLocation}
            >
              <GpsIcon />
            </button>
            <button type="button" className="icon-btn" aria-label="Use microphone">
              <MicIcon />
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label="Advanced filter"
              onClick={() => setIsMobileFilterOpen((prev) => !prev)}
            >
              <FiltersIcon />
            </button>
            <button type="button" className="hero-v2-search-btn w-100">
              Search
            </button>
          </div>
          <SearchForm
            parentClass={`wd-search-form hero-mobile-filter-form ${
              isMobileFilterOpen ? "show" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default function Header({ parentClass = "" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showStickyGlobal, setShowStickyGlobal] = useState(false);
  const [searchCategory, setSearchCategory] = useState(SEARCH_CATEGORY_FALLBACK);
  const [selectedCitySlug, setSelectedCitySlug] = useState("all-india");
  const [authState, setAuthState] = useState(() => toAuthShape(true, MOCK_LOGGED_IN_USER.firstName));

  const isHomeRoute = useMemo(() => isCityHomePath(pathname || "/"), [pathname]);
  const cityOptions = CITY_OPTIONS;

  useEffect(() => {
    if (!isHomeRoute) {
      setShowStickyGlobal(true);
      return undefined;
    }

    const onScroll = () => setShowStickyGlobal(window.scrollY > HEADER_SWAP_SCROLL_Y);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomeRoute]);

  useEffect(() => {
    const routeCitySlug = getCitySlugFromPath(pathname || "/");
    if (routeCitySlug) {
      setSelectedCitySlug(routeCitySlug);
      writeStoredCity(routeCitySlug, readStoredCitySource() || "default");
      return;
    }
    setSelectedCitySlug(readStoredCitySlug());
  }, [pathname]);

  useEffect(() => {
    const syncCity = (event) => {
      const nextSlug = event?.detail?.slug || readStoredCitySlug();
      setSelectedCitySlug(nextSlug);
    };
    window.addEventListener(CITY_CHANGE_EVENT, syncCity);
    window.addEventListener("storage", syncCity);
    return () => {
      window.removeEventListener(CITY_CHANGE_EVENT, syncCity);
      window.removeEventListener("storage", syncCity);
    };
  }, []);

  useEffect(() => {
    if (readStoredCitySource() === "manual") return;
    if (!navigator?.permissions?.query) return;

    let isMounted = true;

    navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        if (!isMounted || status.state !== "granted") return;
        resolveCityFromBrowserLocation()
          .then((detectedSlug) => {
            if (!isMounted || !detectedSlug) return;
            setSelectedCitySlug(detectedSlug);
            if (pathname === "/" || isHomeRoute) {
              router.push(getCityRoute(detectedSlug));
            }
          })
          .catch(() => undefined);
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [isHomeRoute, pathname, router]);

  useEffect(() => {
    const syncAuth = () => setAuthState(getInitialAuthState());
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const onLogout = () => {
    AUTH_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
    setAuthState(toAuthShape(true, MOCK_LOGGED_IN_USER.firstName));
  };

  const onCityChange = (citySlug) => {
    const nextCitySlug = String(citySlug || "").trim().toLowerCase();
    if (!nextCitySlug) return;
    setSelectedCitySlug(nextCitySlug);
    writeStoredCity(nextCitySlug, "manual");
    router.push(getCityRoute(nextCitySlug));
  };

  const onUseCurrentLocation = () => {
    resolveCityFromBrowserLocation()
      .then((detectedSlug) => {
        setSelectedCitySlug(detectedSlug);
        router.push(getCityRoute(detectedSlug));
      })
      .catch(() => undefined);
  };

  const renderLegacyDashboardHeader = () => (
    <header className={parentClass || "header style-4"}>
      <div className="header-inner">
        <div className="tf-container xl">
          <div className="row">
            <div className="col-12">
              <div className="header-inner-wrap">
                <div className="header-logo">
                  <Link href="/" className="site-logo">
                    <img
                      className="logo_header"
                      alt="search home india"
                      data-light="/images/logo/shi_logo_normal.png"
                      data-dark="/images/logo/shi_logo_white.png"
                      src="/images/logo/shi_logo_normal.png"
                    />
                  </Link>
                </div>
                <nav className="main-menu">
                  <ul className="navigation">
                    <Nav />
                  </ul>
                </nav>
                <div className="header-right">
                  <FavoritesNavButton />
                  <div className="btn-add">
                    <Link className="tf-btn style-border pd-22" href="/add-property">
                      Post Property
                      <sup className="nowbutton">Free</sup>
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="mobile-button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menu-mobile"
                    aria-controls="menu-mobile"
                  >
                    <i className="icon-menu" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu />
    </header>
  );

  if (parentClass.includes("dashboard")) {
    return renderLegacyDashboardHeader();
  }

  return (
    <>
      <div className={`header-system${isHomeRoute ? " is-home-route" : ""}`}>
        {isHomeRoute ? (
          <header className={`header style-4 header-home-primary${showStickyGlobal ? " is-hidden" : " is-visible"}`}>
            <div className="header-inner">
              <div className="tf-container xl">
                <div className="row">
                  <div className="col-12">
                    <div className="header-inner-wrap">
                      <div className="header-home-left">
                        <div className="header-logo">
                          <Link href="/" className="site-logo">
                            <img
                              className="logo_header"
                              alt="search home india"
                              src="/images/logo/shi_logo_normal.png"
                            />
                          </Link>
                        </div>
                        <div className="header-city-switch">
                          <CityDropdown
                            value={selectedCitySlug}
                            options={cityOptions}
                            onChange={onCityChange}
                            className="city-dropdown--header"
                          />
                        </div>
                      </div>

                      <nav className="main-menu">
                        <ul className="navigation">
                          <Nav />
                        </ul>
                      </nav>

                      <HeaderRightMenu authState={authState} onLogout={onLogout} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        ) : null}

        <header
          className={`header style-4 header-global-sticky${
            isHomeRoute ? " home-swap" : " always-visible"
          }${isHomeRoute ? (showStickyGlobal ? " is-visible" : " is-hidden") : " is-visible"}`}
        >
          <div className="header-inner">
            <div className="tf-container xl">
              <div className="row">
                <div className="col-12">
                  <div className="header-inner-wrap header-global-wrap">
                    <div className="header-global-left">
                      <div className="header-logo">
                        <Link href="/" className="site-logo">
                          <img
                            className="logo_header"
                            alt="search home india"
                            src="/images/logo/shi_logo_normal.png"
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="header-global-center">
                      <button
                        type="button"
                        className="header-mobile-search-trigger"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#header-mobile-search"
                        aria-controls="header-mobile-search"
                        aria-label="Open property search"
                      >
                        <i className="icon-search" />
                      </button>

                      <div className="header-global-search-desktop">
                        <div className="header-search-select city">
                          <CityDropdown
                            value={selectedCitySlug}
                            options={cityOptions}
                            onChange={onCityChange}
                            className="city-dropdown--global"
                          />
                        </div>
                        <div className="header-search-select category">
                          <select
                            value={searchCategory}
                            onChange={(event) => setSearchCategory(event.target.value)}
                          >
                            {SEARCH_CATEGORY_OPTIONS.map((item) => (
                              <option key={`search-cat-${item.value}`} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="header-search-input">
                          <input type="text" placeholder="Search by Project, Locality or Builder" />
                        </div>
                        <button
                          type="button"
                          className="search-icon-btn"
                          aria-label="Use location"
                          onClick={onUseCurrentLocation}
                        >
                          <GpsIcon />
                        </button>
                        <button type="button" className="search-icon-btn" aria-label="Voice search">
                          <MicIcon />
                        </button>
                        <button type="button" className="search-submit-btn" aria-label="Search">
                          <i className="icon-search" />
                        </button>
                      </div>
                    </div>

                    <div className="header-global-right">
                      <HeaderRightMenu authState={authState} onLogout={onLogout} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      {!isHomeRoute ? <div className="header-global-spacer" aria-hidden="true" /> : null}
      <MobileBottomNav />

      <HeaderMobileSearchOffcanvas
        activeCitySlug={selectedCitySlug}
        cityOptions={cityOptions}
        onCityChange={onCityChange}
        onUseCurrentLocation={onUseCurrentLocation}
      />
      <HeaderDirectoryOffcanvas authState={authState} onLogout={onLogout} />
      <MobileMenu />
    </>
  );
}
