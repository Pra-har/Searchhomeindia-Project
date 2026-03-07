import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";

const plans = [
  {
    id: "free",
    name: "Free",
    subtitle: "Best to get started with basic visibility.",
    price: "Rs. 0",
    period: "/ month",
    note: "Ideal for first-time owners and individual listers.",
    benefits: [
      "1 active property listing",
      "Basic listing visibility",
      "Standard support via email",
      "Manual listing refresh",
      "Dashboard access",
    ],
    cta: "Current Plan",
    href: "/my-package",
    buttonClass: "tf-btn style-border pd-20",
  },
  {
    id: "pro",
    name: "Pro",
    recommended: true,
    subtitle: "For regular sellers, brokers, and consultants.",
    price: "Rs. 2,499",
    period: "/ month",
    note: "Per month, per account.",
    benefits: [
      "10 active property listings",
      "Priority visibility in search",
      "Lead alerts on call and WhatsApp",
      "Auto listing refresh",
      "Priority customer support",
      "Basic lead analytics",
    ],
    cta: "Upgrade to Pro",
    href: "/contact",
    buttonClass: "tf-btn bg-color-primary pd-20",
  },
  {
    id: "max",
    name: "Max",
    subtitle: "For high-volume teams and enterprise brokers.",
    price: "Rs. 5,999",
    period: "/ month",
    note: "Per month, for advanced business usage.",
    benefits: [
      "Unlimited active property listings",
      "Top placement for targeted searches",
      "Dedicated account manager",
      "Instant lead routing",
      "Advanced performance insights",
      "Premium support 24/7",
    ],
    cta: "Upgrade to Max",
    href: "/contact",
    buttonClass: "tf-btn bg-color-primary pd-20",
  },
];

export default function Package() {
  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="dashboard-breadcrumb-wrap">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "My Package" },
            ]}
          />
        </div>

        <div className="mypackage tf-container">
          <h3 className="title">My Package</h3>
          <p className="text-1 mb-20">
            Choose the right plan based on your listing goals. You can upgrade anytime.
          </p>

          <div className="row">
            {plans.map((plan) => (
              <div key={plan.id} className="col-xl-4 col-md-6 mb-20 d-flex">
                <div className="flat-pricing w-100">
                  <div className="box box-style h-100">
                    <div className="d-flex align-items-center justify-content-between gap-8 mb-8">
                      <h3 className="sub-title fw-7 mb-0">{plan.name}</h3>
                      {plan.recommended ? (
                        <span className="badge rounded-pill bg-main text_white fw-6">
                          Recommended
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sub fw-6">{plan.subtitle}</p>

                    <div className="title-price flex">
                      <h2>{plan.price}</h2>
                      <div className="month fw-7">{plan.period}</div>
                    </div>

                    <p className="texts">{plan.note}</p>

                    <ul className="check">
                      {plan.benefits.map((benefit) => (
                        <li key={`${plan.id}-${benefit}`} className="flex-three">
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <div className="button-pricing">
                      <Link className={plan.buttonClass} href={plan.href}>
                        <span>{plan.cta}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
