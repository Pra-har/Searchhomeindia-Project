"use client";

import React from "react";
import Image from "next/image";

export default function Sidebar({ property }) {
  const projectName = property?.title || "this property";

  return (
    <div className="tf-sidebar sticky-sidebar">
      <form className="form-contact-agent property-inquiry-form" onSubmit={(e) => e.preventDefault()}>
        <div className="sidebar-form-head">
          <h4 className="heading-title">Get Full Details</h4>
          <p>
            Fill your details and our property expert will call you back for{" "}
            <strong>{projectName}</strong>.
          </p>
        </div>

        <fieldset>
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            name="name"
            id="name2"
            required
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            id="email2"
            required
          />
        </fieldset>

        <fieldset className="phone">
          <input
            type="text"
            className="form-control"
            placeholder="Mobile Number"
            name="phone"
            id="phone"
            required
          />
        </fieldset>

        <fieldset>
          <textarea
            name="message"
            cols={30}
            rows={10}
            placeholder="Tell us your requirement"
            id="message3"
            required
            defaultValue={""}
          />
        </fieldset>

        <fieldset className="consent-fieldset">
          <label className="consent-label" htmlFor="consent-sidebar">
            <input type="checkbox" id="consent-sidebar" name="consent" required />
            <span>
              I agree to the Privacy Policy and authorize Search Homes India to contact me via
              phone call, SMS, WhatsApp, and email.
            </span>
          </label>
        </fieldset>

        <div className="wrap-btn">
          <button type="submit" className="tf-btn bg-color-primary fw-6 w-full">
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.125 5.625V14.375C18.125 14.8723 17.9275 15.3492 17.5758 15.7008C17.2242 16.0525 16.7473 16.25 16.25 16.25H3.75C3.25272 16.25 2.77581 16.0525 2.42417 15.7008C2.07254 15.3492 1.875 14.8723 1.875 14.375V5.625M18.125 5.625C18.125 5.12772 17.9275 4.65081 17.5758 4.29917C17.2242 3.94754 16.7473 3.75 16.25 3.75H3.75C3.25272 3.75 2.77581 3.94754 2.42417 4.29917C2.07254 4.65081 1.875 5.12772 1.875 5.625M18.125 5.625V5.8275C18.125 6.14762 18.0431 6.46242 17.887 6.74191C17.7309 7.0214 17.5059 7.25628 17.2333 7.42417L10.9833 11.27C10.6877 11.4521 10.3472 11.5485 10 11.5485C9.65275 11.5485 9.31233 11.4521 9.01667 11.27L2.76667 7.425C2.4941 7.25711 2.26906 7.02224 2.11297 6.74275C1.95689 6.46325 1.87496 6.14845 1.875 5.82833V5.625"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Request Callback
          </button>
        </div>
      </form>

      <div className="sidebar-ads">
        <div className="image-wrap">
          <Image
            className="lazyload"
            data-src="/images/blog/ads.jpg"
            alt=""
            src="/images/blog/ads.jpg"
            width={400}
            height={470}
          />
        </div>
        <div className="logo relative z-5">
          <Image alt="" src="/images/logo/shi_logo_white.png" width={272} height={85} />
        </div>
        <div className="box-ads relative z-5">
          <div className="content">
            <h4 className="title">
              <a href="#">We can help you find a local real estate agent</a>
            </h4>
            <div className="text-addres">
              <p>
                Connect with a trusted agent who knows the market inside out, whether you are buying
                or selling.
              </p>
            </div>
          </div>
          <a href="#" className="tf-btn fw-6 bg-color-primary w-full">
            Connect with an agent
          </a>
        </div>
      </div>
    </div>
  );
}
