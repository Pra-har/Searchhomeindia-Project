"use client";
import React from "react";
import DropdownSelect from "../common/DropdownSelect";

export default function Contact() {
  const contactData = {
    companyName: "Search Homes India Pvt Ltd",
    address:
      "No 280 3rd Floor, 5th Main Rd, 6th Sector, HSR Layout, Bengaluru, Karnataka 560102",
    phone: "+91 8147267372",
    email: "info@searchhomesindia.com",
    mapQuery:
      "Search Homes India Pvt Ltd, No 280 3rd Floor, 5th Main Rd, 6th Sector, HSR Layout, Bengaluru, Karnataka 560102",
    socialLinks: [
      { name: "Facebook", href: "#", iconClass: "icon-fb" },
      { name: "X", href: "#", iconClass: "icon-X" },
      { name: "LinkedIn", href: "#", iconClass: "icon-linked" },
      { name: "Instagram", href: "#", iconClass: "icon-ins" },
    ],
  };

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    contactData.mapQuery
  )}&output=embed`;

  return (
    <section className="section-contact-v2 tf-spacing-1">
      <div className="tf-container">
        <div className="row g-4">
          <div className="col-xl-7 col-lg-7">
            <div className="contact-v2-card contact-v2-info-card">
              <div className="heading-section mb-20">
                <h1 className="title">Contact Search Homes India</h1>
                <p className="text-1">
                  Reach out for buying, selling, renting, or project advisory.
                  Our team will contact you quickly.
                </p>
              </div>
              <ul className="contact-v2-list">
                <li>
                  <span className="icon">
                    <i className="icon-location" />
                  </span>
                  <div className="content">
                    <div className="sub">Head Office</div>
                    <p>
                      {contactData.companyName}, {contactData.address}
                    </p>
                  </div>
                </li>
                <li>
                  <span className="icon">
                    <i className="icon-phone-2" />
                  </span>
                  <div className="content">
                    <div className="sub">Call</div>
                    <a href="tel:+918147267372">{contactData.phone}</a>
                  </div>
                </li>
                <li>
                  <span className="icon">
                    <i className="icon-letter-2" />
                  </span>
                  <div className="content">
                    <div className="sub">Email</div>
                    <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                  </div>
                </li>
              </ul>
              <div className="contact-v2-social-wrap">
                <h6 className="mb-12">Follow Us</h6>
                <ul className="tf-social style-4 contact-v2-socials">
                  {contactData.socialLinks.map((item) => (
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

          <div className="col-xl-5 col-lg-5">
            <div className="contact-v2-card contact-v2-form-card">
              <form
                id="contactform"
                onSubmit={(e) => e.preventDefault()}
                className="form-contact"
              >
                <div className="heading-section">
                  <h2 className="title">We Would Love to Hear From You</h2>
                  <p className="text-1">
                    Share your requirement and our team will contact you.
                  </p>
                </div>
                <div className="cols">
                  <fieldset>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      name="name"
                      id="name"
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      id="email-contact"
                      required
                    />
                  </fieldset>
                </div>
                <div className="cols">
                  <fieldset className="phone">
                    <label htmlFor="phone">Phone number:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your phone number"
                      name="phone"
                      id="phone"
                      required
                    />
                  </fieldset>
                  <div className="select">
                    <label className="text-1 fw-6 mb-12">
                      What are you interested in?
                    </label>

                    <DropdownSelect
                      options={["Select", "Location", "Rent", "Sale"]}
                      addtionalParentClass=""
                    />
                  </div>
                </div>
                <fieldset>
                  <label htmlFor="message">Your Message:</label>
                  <textarea
                    name="message"
                    cols={30}
                    rows={6}
                    placeholder="Message"
                    id="message"
                    required
                    defaultValue={""}
                  />
                </fieldset>
                <div className="send-wrap">
                  <button
                    className="tf-btn bg-color-primary fw-7 pd-8"
                    type="submit"
                  >
                    Contact our experts
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
        <div className="row m-3">
           <div className="contact-v2-card contact-v2-map-card mt-20">
              <iframe 
                title="Search Homes India Office Map"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
        </div>
      </div>
    </section>
  );
}
