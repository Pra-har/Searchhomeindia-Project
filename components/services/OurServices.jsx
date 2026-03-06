import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/common/Breadcrumb";

const SERVICES_DATA = [
  {
    icon: "icon-home",
    title: "Property Buying Assistance",
    image: "/images/section/box-house-2.jpg",
    meta: "Buy",
    description:
      "End-to-end support to shortlist, evaluate, negotiate, and close the right property with confidence.",
    href: "/property-listing",
    cta: "Explore Listings",
    points: ["Verified inventory", "Site visit assistance"],
  },
  {
    icon: "icon-save",
    title: "Property Selling Assistance",
    image: "/images/section/box-house-3.jpg",
    meta: "Sell",
    description:
      "From pricing strategy to lead handling and closure, we help you sell faster at better value.",
    href: "/post-property",
    cta: "Post Property",
    points: ["Pricing strategy", "Lead qualification"],
  },
  {
    icon: "icon-money",
    title: "Property Investment Consulting",
    image: "/images/section/box-house-4.jpg",
    meta: "Investment",
    description:
      "City-wise market insights and ROI-driven guidance to build a stronger long-term property portfolio.",
    href: "/property-listing?intent=buy",
    cta: "Get Investment Help",
    points: ["ROI-led advisory", "Micro-market insights"],
  },
  {
    icon: "icon-pig",
    title: "Home Loan Assistance",
    image: "/images/section/property-detail-3.jpg",
    meta: "Loan",
    description:
      "Loan eligibility, lender matching, documentation and smooth disbursal support in one place.",
    href: "/homeloan",
    cta: "Check Home Loan",
    points: ["Eligibility support", "Bank coordination"],
  },
  {
    icon: "icon-file",
    title: "Legal & Documentation Support",
    image: "/images/section/property-detail-4.jpg",
    meta: "Legal",
    description:
      "Expert support for title checks, agreement drafting, registration, and compliant paperwork.",
    href: "/contact",
    cta: "Talk to Expert",
    points: ["Title verification", "Registration support"],
  },
  {
    icon: "icon-office",
    title: "Home Interior & Design Services",
    image: "/images/section/property-detail-5.jpg",
    meta: "Interior",
    description:
      "Design consultation and execution support to turn your new home into a functional premium space.",
    href: "https://redwingsdesign.com/",
    cta: "Explore Interiors",
    external: true,
    points: ["Design consultation", "Execution support"],
  },
  {
    icon: "icon-location",
    title: "Packers and Movers Assistance",
    image: "/images/section/property-detail-6.jpg",
    meta: "Relocation",
    description:
      "Trusted relocation partners for safe packaging, transport, and seamless move-in coordination.",
    href: "/contact",
    cta: "Plan Relocation",
    points: ["Safe handling", "Move-in coordination"],
  },
  {
    icon: "icon-settings",
    title: "Property Management Services",
    image: "/images/section/box-house.jpg",
    meta: "Management",
    description:
      "Complete tenant, rent, maintenance and periodic inspection support for stress-free ownership.",
    href: "/contact",
    cta: "Manage Property",
    points: ["Tenant support", "Maintenance tracking"],
  },
  {
    icon: "icon-MagnifyingGlass",
    title: "Property Valuation",
    image: "/images/section/box-house-5.jpg",
    meta: "Valuation",
    description:
      "Data-backed valuation support using market trends, locality benchmarks and comparable inventory.",
    href: "/contact",
    cta: "Get Valuation",
    points: ["Market benchmark", "Comparable analysis"],
  },
  {
    icon: "icon-bag",
    title: "Rental Services",
    image: "/images/section/box-house-6.jpg",
    meta: "Rental",
    description:
      "Verified rental homes, tenant screening and agreement workflow to reduce vacancy and friction.",
    href: "/property-listing?intent=rental",
    cta: "Browse Rentals",
    points: ["Tenant screening", "Agreement workflow"],
  },
];

const WHY_CHOOSE_US = [
  {
    icon: "icon-check-cycle",
    title: "Trusted Real Estate Experts",
    text: "Experienced advisors across residential and commercial segments.",
  },
  {
    icon: "icon-shield",
    title: "Verified Properties",
    text: "Quality checks and reliable listing data for better decision-making.",
  },
  {
    icon: "icon-settings",
    title: "End-to-End Assistance",
    text: "From search to possession, every stage is coordinated by our team.",
  },
  {
    icon: "icon-file",
    title: "Transparent Process",
    text: "Clear pricing, process visibility, and no hidden surprises.",
  },
  {
    icon: "icon-clock",
    title: "Fast Documentation",
    text: "Structured workflows to reduce delays in legal and loan paperwork.",
  },
  {
    icon: "icon-phone-2",
    title: "Customer Support",
    text: "Dedicated support through calls, WhatsApp and assisted consultation.",
  },
];

const PROCESS_STEPS = [
  {
    icon: "icon-phone-1",
    title: "Consultation",
    text: "Understand your budget, location priorities, and property goals.",
  },
  {
    icon: "icon-search",
    title: "Property Selection",
    text: "Curated options, site visits, and shortlisting with expert guidance.",
  },
  {
    icon: "icon-file",
    title: "Documentation & Loan Assistance",
    text: "Legal checks, paperwork support, and loan process facilitation.",
  },
  {
    icon: "icon-check-cycle",
    title: "Final Purchase / Move-In",
    text: "Negotiation support, closing assistance, and post-purchase handover.",
  },
];

const HERO_STATS = [
  { value: "10+", label: "Service Verticals" },
  { value: "100+", label: "Cities Covered" },
  { value: "25k+", label: "Families Assisted" },
];

export default function OurServices() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Our Services" },
        ]}
      />

      <section className="section-our-services-hero mt-5">
        <div className="tf-container">
          <div className="services-hero-inner">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <div className="hero-content">
                  <h1 className="title">Our Services</h1>
                  <p className="text-1">
                    Search Homes India delivers complete real estate solutions for buying, renting,
                    selling, investment, loans, legal support, and post-purchase management.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="hero-stats-grid">
                  {HERO_STATS.map((stat) => (
                    <article key={stat.label} className="hero-stat-card">
                      <h3>{stat.value}</h3>
                      <p>{stat.label}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-our-services-grid tf-spacing-2 pb-0">
        <div className="tf-container">
          <div className="heading-section text-center mb-28">
            <h2 className="title">Comprehensive Real Estate Services</h2>
            <p className="text-1">
              Practical, transparent, and result-driven support for every stage of your property
              journey.
            </p>
          </div>

          <div className="row g-4">
            {SERVICES_DATA.map((service) => (
              <div className="col-xl-4 col-md-6" key={service.title}>
                <article className="service-card-v1">
                  <div className="media-wrap">
                    <Image src={service.image} alt={service.title} width={640} height={420} />
                    <span className="service-meta">{service.meta}</span>
                  </div>
                  <div className="service-body">
                    <div className="service-head">
                      <div className="icon-wrap">
                        <i className={service.icon} />
                      </div>
                      <h3>{service.title}</h3>
                    </div>
                    <p>{service.description}</p>
                    <ul className="service-points">
                      {service.points.map((point) => (
                        <li key={point}>
                          <i className="icon-check" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {service.external ? (
                      <a
                        href={service.href}
                        target="_blank"
                        rel="noreferrer"
                        className="tf-btn style-border service-cta"
                      >
                        {service.cta}
                      </a>
                    ) : (
                      <Link href={service.href} className="tf-btn style-border service-cta">
                        {service.cta}
                      </Link>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-our-services-why tf-spacing-2 pb-0">
        <div className="tf-container">
          <div className="heading-section text-center mb-28">
            <h2 className="title">Why Choose Our Services</h2>
            <p className="text-1">A service model built for trust, speed, and better outcomes.</p>
          </div>

          <div className="row g-3">
            {WHY_CHOOSE_US.map((item) => (
              <div className="col-xl-4 col-md-6" key={item.title}>
                <article className="service-feature-v1">
                  <div className="icon-wrap">
                    <i className={item.icon} />
                  </div>
                  <div className="content">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-our-services-process tf-spacing-2 pb-0">
        <div className="tf-container">
          <div className="heading-section text-center mb-28">
            <h2 className="title">How We Work</h2>
            <p className="text-1">Simple, guided, and efficient process for faster closure.</p>
          </div>

          <div className="row g-4">
            {PROCESS_STEPS.map((step, index) => (
              <div className="col-xl-3 col-md-6" key={step.title}>
                <article className="service-process-step">
                  <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="icon-wrap">
                    <i className={step.icon} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-our-services-cta tf-spacing-2">
        <div className="tf-container">
          <div className="services-cta-wrap">
            <div className="content">
              <h2>Looking for your dream home? Let our experts help you.</h2>
              <p>
                Connect with Search Homes India for guided property discovery, legal support, and
                faster decision-making.
              </p>
            </div>
            <Link href="/contact" className="tf-btn bg-color-primary pd-18 fw-7">
              Enquire Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
