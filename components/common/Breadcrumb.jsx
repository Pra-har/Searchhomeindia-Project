import React from "react";
import Link from "next/link";

export default function Breadcrumb({ pageName = "Property Listing", items = null }) {
  const breadcrumbItems =
    Array.isArray(items) && items.length
      ? items
      : [
          { label: "Home", href: "/" },
          { label: pageName },
        ];

  return (
    <section className="flat-title">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-inner">
              <ul className="breadcrumb">
                {breadcrumbItems.map((item, index) => {
                  const isLast = index === breadcrumbItems.length - 1;
                  const label = item?.label || "";
                  const href = item?.href || "";

                  return (
                    <li key={`${label}-${index}`}>
                      {!isLast && href ? (
                        <Link
                          className={index === 0 ? "home fw-6 text-color-3" : undefined}
                          href={href}
                        >
                          {label}
                        </Link>
                      ) : (
                        label
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
