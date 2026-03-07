"use client";

import React, { useState } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function Profile() {
  const [editableSection, setEditableSection] = useState({
    personal: false,
    address: false,
    password: false,
  });

  const handleSectionToggle = (section) => {
    setEditableSection((prev) => {
      if (prev[section]) {
        return { ...prev, [section]: false };
      }

      return {
        personal: false,
        address: false,
        password: false,
        [section]: true,
      };
    });
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner wrap-dashboard-content-2 style-2">
        <div className="dashboard-breadcrumb-wrap">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "My Profile" },
            ]}
          />
        </div>

        <div className="widget-box-2 my-profile-v2 tf-container">
          <div className="profile-v2-head">
            <div>
              <h3 className="title">My Profile</h3>
              <p className="sub">
                Manage your account details, company profile, and security settings.
              </p>
            </div>
            <span className="profile-status-chip">Profile Active</span>
          </div>

          <div className="profile-v2-layout">
            <aside className="profile-v2-aside">
              <div className="profile-v2-avatar-card">
                <div className="avatar">
                  <Image
                    alt="User avatar"
                    loading="lazy"
                    width={128}
                    height={128}
                    src="/images/avatar/account.jpg"
                  />
                </div>
                <h6 className="name">Pratham Harode</h6>
                <p className="role">Account Owner</p>

                <label className="upload-btn" htmlFor="profile-avatar-upload">
                  <i className="icon-file" />
                  Change Photo
                </label>
                <input id="profile-avatar-upload" type="file" className="d-none" />
                <p className="upload-note">JPG/PNG, max 2MB</p>
              </div>

              <div className="profile-v2-contact-card">
                <h6>Account Contact</h6>
                <ul>
                  <li>
                    <i className="icon-mail" />
                    <span>pratham@searchhomesindia.com </span>
                  </li>
                  <li>
                    <i className="icon-phone-2" />
                    <span>+91 8147267372</span>
                  </li>
                  <li>
                    <i className="icon-location-2" />
                    <span>Bengaluru, Karnataka</span>
                  </li>
                </ul>
              </div>
            </aside>

            <div className="profile-v2-main">
              <form className="profile-v2-form" onSubmit={(e) => e.preventDefault()}>
                <section className="profile-v2-section">
                  <div className="section-head">
                    <h5>Personal Information</h5>
                    <button
                      type="button"
                      className={`section-action-btn${editableSection.personal ? " is-save" : ""}`}
                      onClick={() => handleSectionToggle("personal")}
                    >
                      {editableSection.personal ? "Save" : "Edit"}
                    </button>
                  </div>
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-full-name">
                          Full Name <span>*</span>
                        </label>
                        <input
                          id="profile-full-name"
                          type="text"
                          className="form-control"
                          defaultValue="Pratham Harode"
                          disabled={!editableSection.personal}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-email">
                          Email ID <span>*</span>
                        </label>
                        <input
                          id="profile-email"
                          type="email"
                          className="form-control"
                          defaultValue="pratham@searchhomesindia.com"
                          disabled={!editableSection.personal}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-mobile">
                          Mobile Number <span>*</span>
                        </label>
                        <input
                          id="profile-mobile"
                          type="tel"
                          className="form-control"
                          defaultValue="+91 8147267372"
                          disabled={!editableSection.personal}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-company">Company Name</label>
                        <input
                          id="profile-company"
                          type="text"
                          className="form-control"
                          defaultValue="Search Homes India Pvt Ltd"
                          disabled={!editableSection.personal}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-gstin">GSTIN Number</label>
                        <input
                          id="profile-gstin"
                          type="text"
                          className="form-control"
                          defaultValue="29AAWCS6824M1Z9"
                          disabled={!editableSection.personal}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-aadhaar">Aadhaar Number</label>
                        <input
                          id="profile-aadhaar"
                          type="text"
                          className="form-control"
                          defaultValue="XXXX-XXXX-5634"
                          disabled={!editableSection.personal}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="profile-v2-section">
                  <div className="section-head">
                    <h5>Address Information</h5>
                    <button
                      type="button"
                      className={`section-action-btn${editableSection.address ? " is-save" : ""}`}
                      onClick={() => handleSectionToggle("address")}
                    >
                      {editableSection.address ? "Save" : "Edit"}
                    </button>
                  </div>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-address">Address</label>
                        <input
                          id="profile-address"
                          type="text"
                          className="form-control"
                          defaultValue="No 280, 3rd Floor, 5th Main Rd, 6th Sector, HSR Layout"
                          disabled={!editableSection.address}
                        />
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-location">Location / City</label>
                        <input
                          id="profile-location"
                          type="text"
                          className="form-control"
                          defaultValue="Bengaluru"
                          disabled={!editableSection.address}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-state">State</label>
                        <input
                          id="profile-state"
                          type="text"
                          className="form-control"
                          defaultValue="Karnataka"
                          disabled={!editableSection.address}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-pincode">Pincode</label>
                        <input
                          id="profile-pincode"
                          type="text"
                          className="form-control"
                          defaultValue="560102"
                          disabled={!editableSection.address}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="profile-v2-section">
                  <div className="section-head">
                    <h5>Password & Security</h5>
                    <button
                      type="button"
                      className={`section-action-btn${editableSection.password ? " is-save" : ""}`}
                      onClick={() => handleSectionToggle("password")}
                    >
                      {editableSection.password ? "Save" : "Update"}
                    </button>
                  </div>
                  <div className="row g-3">
                    <div className="col-lg-4">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-current-password">Current Password</label>
                        <input
                          id="profile-current-password"
                          type="password"
                          className="form-control"
                          defaultValue="********"
                          disabled={!editableSection.password}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-new-password">New Password</label>
                        <input
                          id="profile-new-password"
                          type="password"
                          className="form-control"
                          placeholder="Enter new password"
                          disabled={!editableSection.password}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="profile-v2-field">
                        <label htmlFor="profile-confirm-password">Confirm Password</label>
                        <input
                          id="profile-confirm-password"
                          type="password"
                          className="form-control"
                          placeholder="Confirm password"
                          disabled={!editableSection.password}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
