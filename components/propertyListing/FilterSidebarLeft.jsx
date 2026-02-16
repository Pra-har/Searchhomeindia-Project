"use client";

import React, { useState } from "react";
import DropdownSelect from "../common/DropdownSelect";
import Slider from "rc-slider";

const propertyTypes = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot / Land",
  "Penthouse",
  "Commercial",
];

const amenities = [
  "Lift",
  "Power Backup",
  "Swimming Pool",
  "Gym",
  "Club House",
  "Security",
  "Children Play Area",
  "Visitor Parking",
];

export default function FilterSidebarLeft() {
  const [budgetRange, setBudgetRange] = useState([30, 150]);
  const [sizeRange, setSizeRange] = useState([600, 2400]);

  const formatINR = (valueInLakh) =>
    new Intl.NumberFormat("en-IN").format(valueInLakh);

  const resetForm = (event) => {
    event.preventDefault();
    setBudgetRange([30, 150]);
    setSizeRange([600, 2400]);
  };

  return (
    <div
      className="offcanvas offcanvas-start offcanvas-filter"
      tabIndex={-1}
      id="filter-sidbar-left"
      aria-labelledby="offcanvasLabel"
    >
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvasLabel">
          Filter Properties
        </h4>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body">
        <form
          className="wd-search-form style-4 filter-sidebar-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="filter-sidebar-scroll">
          <fieldset className="box-search mb-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search by project, locality, builder"
              name="search"
              id="search-keyword"
            />
            <div className="icon">
              <i className="icon-search" />
            </div>
          </fieldset>

          <div className="group-select mb-30">
            <div className="box-select">
              <DropdownSelect
                options={[
                  "Location",
                  "Bangalore",
                  "Mumbai",
                  "Delhi",
                  "Hyderabad",
                  "Chennai",
                  "Pune",
                ]}
                addtionalParentClass=""
              />
            </div>
            <div className="box-select">
              <DropdownSelect
                options={[
                  "Locality",
                  "Whitefield",
                  "Electronic City",
                  "HSR Layout",
                  "Sarjapur Road",
                  "Hebbal",
                ]}
                addtionalParentClass=""
              />
            </div>
          </div>

          <div className="group-price mb-30">
            <div className="widget-price">
              <div className="box-title-price">
                <span className="title-price">Budget (in Lakhs)</span>
                <div className="caption-price">
                  <span className="value fw-6">
                    Rs. {formatINR(budgetRange[0])}L
                  </span>
                  <span> to </span>
                  <span className="value fw-6">
                    Rs. {formatINR(budgetRange[1])}L
                  </span>
                </div>
              </div>
              <Slider
                range
                max={500}
                min={5}
                value={budgetRange}
                onChange={setBudgetRange}
              />
            </div>

            <div className="widget-price">
              <div className="box-title-price">
                <span className="title-price">Size Range (Sq.Ft.)</span>
                <div className="caption-price">
                  <span className="value fw-6">{formatINR(sizeRange[0])}</span>
                  <span> to </span>
                  <span className="value fw-6">{formatINR(sizeRange[1])}</span>
                </div>
              </div>
              <Slider
                range
                max={8000}
                min={200}
                value={sizeRange}
                onChange={setSizeRange}
              />
            </div>
          </div>

          <div className="group-select mb-30">
            <div className="box-select">
              <DropdownSelect
                options={[
                  "Property Type",
                  "Apartment",
                  "Villa",
                  "Independent House",
                  "Plot / Land",
                  "Commercial",
                ]}
                addtionalParentClass=""
              />
            </div>
            <div className="box-select">
              <DropdownSelect
                options={[
                  "Status",
                  "Ready to Move",
                  "Under Construction",
                  "New Launch",
                  "Resale",
                ]}
                addtionalParentClass=""
              />
            </div>
            <div className="box-select">
              <DropdownSelect
                options={[
                  "Facing",
                  "East",
                  "West",
                  "North",
                  "South",
                  "North-East",
                ]}
                addtionalParentClass=""
              />
            </div>
            <div className="box-select">
              <DropdownSelect
                options={[
                  "Parking",
                  "No Parking",
                  "1 Covered",
                  "2 Covered",
                  "1 Open",
                ]}
                addtionalParentClass=""
              />
            </div>
          </div>

          <div className="group-amenities mb-30">
            <div className="title text-4 fw-6 mb-12">Property Type</div>
            {propertyTypes.map((type) => (
              <fieldset className="checkbox-item style-1 mt-12" key={type}>
                <label>
                  <span className="text-4">{type}</span>
                  <input type="checkbox" />
                  <span className="btn-checkbox" />
                </label>
              </fieldset>
            ))}
          </div>

          <div className="group-amenities mb-30">
            <div className="title text-4 fw-6 mb-12">Amenities</div>
            {amenities.map((amenity) => (
              <fieldset className="checkbox-item style-1 mt-12" key={amenity}>
                <label>
                  <span className="text-4">{amenity}</span>
                  <input type="checkbox" />
                  <span className="btn-checkbox" />
                </label>
              </fieldset>
            ))}
          </div>
          </div>

          <div className="d-flex gap-12 filter-sidebar-actions">
            <button
              type="button"
              className="tf-btn style-border w-100 fw-6"
              onClick={resetForm}
            >
              Reset
            </button>
            <button type="submit" className="tf-btn bg-color-primary w-100 fw-6">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
