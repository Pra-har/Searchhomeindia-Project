"use client";

import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";

const HEAD_OFFICE = {
  companyName: "Search Homes India Pvt Ltd",
  address:
    "No 280, 3rd Floor, 5th Main Rd, 6th Sector, HSR Layout, Bengaluru, Karnataka 560102",
  phone: "+91 8147267372",
  email: "info@searchhomesindia.com",
  socialLinks: [
    { name: "Facebook", href: "#", iconClass: "icon-fb" },
    { name: "Instagram", href: "#", iconClass: "icon-ins" },
    { name: "LinkedIn", href: "#", iconClass: "icon-linked" },
    { name: "YouTube", href: "#", iconClass: "icon-X" },
  ],
};

const CITY_OFFICES = [
  {
    city: "Bengaluru",
    phone: "+91 8147267372",
    email: "bengaluru@searchhomesindia.com",
    address: "HSR Layout, 5th Main Road, Bengaluru, Karnataka 560102",
  },
  {
    city: "Chennai",
    phone: "+91 8147267373",
    email: "chennai@searchhomesindia.com",
    address: "OMR, Thoraipakkam, Chennai, Tamil Nadu 600097",
  },
  {
    city: "Pune",
    phone: "+91 8147267374",
    email: "pune@searchhomesindia.com",
    address: "Baner Road, Pune, Maharashtra 411045",
  },
  {
    city: "Hyderabad",
    phone: "+91 8147267375",
    email: "hyderabad@searchhomesindia.com",
    address: "HITEC City, Madhapur, Hyderabad, Telangana 500081",
  },
  {
    city: "Mumbai",
    phone: "+91 8147267376",
    email: "mumbai@searchhomesindia.com",
    address: "Andheri East, Mumbai, Maharashtra 400069",
  },
  {
    city: "Navi Mumbai",
    phone: "+91 8147267377",
    email: "navimumbai@searchhomesindia.com",
    address: "Vashi, Navi Mumbai, Maharashtra 400703",
  },
];

export default function Contact() {
  return (
    <>
      <Breadcrumb pageName="Contact" />

      <section className="section-contact-v3  py-5">
        <div className="tf-container">
          <div className="row g-4 align-items-stretch">
            <div className="col-xl-6 col-lg-6 d-flex">
              <div className="contact-v3-card contact-v3-info-card w-100">
                <div className="heading-section mb-20">
                  <h1 className="title">Contact Search Homes India</h1>
                  <p className="text-1">
                    Reach us for property buying, renting, selling, and project advisory.
                    Our team will get back to you quickly.
                  </p>
                </div>

                <ul className="contact-v3-info-list">
                  <li>
                    <span className="icon">
                      <i className="icon-location" />
                    </span>
                    <div className="content">
                      <p className="sub">Headquarters</p>
                      <p>
                        {HEAD_OFFICE.companyName}
                        <br />
                        {HEAD_OFFICE.address}
                      </p>
                    </div>
                  </li>

                  <li>
                    <span className="icon">
                      <i className="icon-phone-2" />
                    </span>
                    <div className="content">
                      <p className="sub">Phone Number</p>
                      <a href="tel:+918147267372">{HEAD_OFFICE.phone}</a>
                    </div>
                  </li>

                  <li>
                    <span className="icon">
                      <i className="icon-letter-2" />
                    </span>
                    <div className="content">
                      <p className="sub">Email Address</p>
                      <a href={`mailto:${HEAD_OFFICE.email}`}>{HEAD_OFFICE.email}</a>
                    </div>
                  </li>
                </ul>

                <div className="contact-v3-social-wrap">
                  <h6 className="mb-12">Connect With Us</h6>
                  <ul className="tf-social style-4 contact-v3-socials">
                    {HEAD_OFFICE.socialLinks.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} aria-label={item.name}>
                          <i className={item.iconClass} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 d-flex">
              <div className="contact-v3-card contact-v3-form-card w-100">
                <form className="form-contact-v3" onSubmit={(e) => e.preventDefault()}>
                  <div className="heading-section mb-16">
                    <h2 className="title">Send Us Your Requirement</h2>
                    <p className="text-1">
                      Fill in your details and our team will contact you shortly.
                    </p>
                  </div>

                  <div className="form-grid">
                    <fieldset>
                      <label htmlFor="contact-full-name">Full Name</label>
                      <input
                        id="contact-full-name"
                        name="fullName"
                        type="text"
                        className="form-control"
                        placeholder="Enter your full name"
                        required
                      />
                    </fieldset>

                    <fieldset>
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                      />
                    </fieldset>

                    <fieldset>
                      <label htmlFor="contact-phone">Phone</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        className="form-control"
                        placeholder="Enter phone number"
                        required
                      />
                    </fieldset>

                    <fieldset>
                      <label htmlFor="contact-subject">Subject</label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        className="form-control"
                        placeholder="Enter subject"
                        required
                      />
                    </fieldset>

                    <fieldset className="full">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        className="form-control"
                        placeholder="Write your message"
                        required
                      />
                    </fieldset>
                  </div>

                  <div className="send-wrap">
                    <button className="tf-btn bg-color-primary fw-7 pd-8" type="submit">
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-contact-map tf-spacing-2">
        <div className="tf-container">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3519.26350737535!2d77.62997917454574!3d12.913327916154259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae148713f06c91%3A0xdb6f27f1569c80ba!2sSearch%20Homes%20India%20Private%20Limited%20-%20Real-estate%20Organization!5e1!3m2!1sen!2sin!4v1771425741996!5m2!1sen!2sin"  style={{ border: 0, width:"100%", height:"450px", borderRadius: "20px" }} ></iframe>
        </div>
      </section>

      <section className="section-contact-presence-v3 tf-spacing-2">
        <div className="tf-container">
          <div className="heading-section text-center mb-28">
            <h2 className="title">Presence of Search Home India</h2>
            <p className="text-1">
              We serve clients across key real estate markets in India through our local
              teams.
            </p>
          </div>

          <div className="presence-v3-grid">
            {CITY_OFFICES.map((office) => (
              <article key={office.city} className="presence-v3-card">
                <h3>{office.city}</h3>
                <ul>
                  <li>
                    <i className="icon-phone-2" />
                    <a href={`tel:${office.phone.replace(/\s+/g, "")}`}>{office.phone}</a>
                  </li>
                  <li>
                    <i className="icon-letter-2" />
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </li>
                  <li>
                    <i className="icon-location" />
                    <p>{office.address}</p>
                  </li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
