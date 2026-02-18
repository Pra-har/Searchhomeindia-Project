"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FAVORITES_EVENT,
  getSavedProperties,
} from "@/utlis/favorites";
import PropertyListItems from "@/components/properties/propertyListing/PropertyListItems";
import PropertyDetailSidebar from "@/components/properties/propertyDetail/Sidebar";

const CATEGORY_TABS = ["Buy", "Pg", "Rental", "Others"];

export default function SavedPropertiesClient() {
  const [savedProperties, setSavedProperties] = useState([]);
  const [activeTab, setActiveTab] = useState("Buy");

  useEffect(() => {
    const syncSavedProperties = () => {
      setSavedProperties(getSavedProperties());
    };

    syncSavedProperties();
    if (typeof window === "undefined") return undefined;

    window.addEventListener(FAVORITES_EVENT, syncSavedProperties);
    window.addEventListener("storage", syncSavedProperties);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, syncSavedProperties);
      window.removeEventListener("storage", syncSavedProperties);
    };
  }, []);

  const tabCounts = useMemo(
    () =>
      CATEGORY_TABS.reduce((acc, tab) => {
        acc[tab] = savedProperties.filter((item) => item.category === tab).length;
        return acc;
      }, {}),
    [savedProperties]
  );

  const visibleProperties = useMemo(
    () => savedProperties.filter((item) => item.category === activeTab),
    [savedProperties, activeTab]
  );

  const sidebarProject = visibleProperties[0] || savedProperties[0] || null;

  return (
    <section className="section-saved-properties">
      <div className="tf-container">
        <div className="saved-properties-head">
          <h1 className="saved-title">Saved / Favourite / Shortlisted Properties</h1>
          <p className="saved-subtitle">
            You have <strong>{savedProperties.length}</strong> saved properties.
          </p>
        </div>

        <div className="saved-category-tabs" role="tablist" aria-label="Saved property categories">
          {CATEGORY_TABS.map((tab) => (
            <button
              type="button"
              key={tab}
              role="tab"
              className={`saved-tab-btn${activeTab === tab ? " active" : ""}`}
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className="count">{tabCounts[tab] || 0}</span>
            </button>
          ))}
        </div>

        {savedProperties.length === 0 ? (
          <div className="saved-empty-box">
            <h3>No saved properties yet</h3>
            <p>Tap the heart icon on any listing to save it for later.</p>
            <Link href="/property-listing" className="tf-btn bg-color-primary">
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="saved-properties-layout">
            <div className="row">
              <div className="col-lg-8">
                {visibleProperties.length === 0 ? (
                  <div className="saved-empty-box">
                    <h3>No properties shortlisted in {activeTab}</h3>
                    <p>No saved properties found for this category yet.</p>
                    <Link href="/property-listing" className="tf-btn bg-color-primary">
                      Explore Properties
                    </Link>
                  </div>
                ) : (
                  <div className="wrap-list saved-list-wrap">
                    <PropertyListItems items={visibleProperties} mode="saved" />
                  </div>
                )}
              </div>
              <div className="col-lg-4">
                <div className="saved-sticky-sidebar">
                  <PropertyDetailSidebar
                    property={{ title: sidebarProject?.title || "your shortlisted property" }}
                    showProjectName={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
