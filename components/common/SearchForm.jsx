"use client";

import { useState } from "react";
import DropdownSelect from "./DropdownSelect";
import Slider from "rc-slider";

export default function SearchForm({ parentClass = "wd-search-form" }) {
  const [priceRange, setPriceRange] = useState([100, 700]);
  const [sizeRange, setSizeRange] = useState([200, 820]);
  const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

  return (
    <div className={parentClass}>
      <div className="group-price">
        <div className="widget-price">
          <div className="box-title-price">
            <span className="title-price">Price range</span>
            <div className="caption-price">
              <span>from</span>{" "}
              <span className="value fw-6" id="slider-range-value1">
                Rs. {formatNumber(priceRange[0])} L
              </span>{" "}
              <span>to</span>
              <span className="value fw-6" id="slider-range-value2">
                {" "}
                Rs. {formatNumber(priceRange[1])} L
              </span>
            </div>
          </div>
          <Slider
            range
            max={1000}
            min={0}
            value={priceRange}
            onChange={setPriceRange}
          />
        </div>
        <div className="widget-price">
          <div className="box-title-price">
            <span className="title-price">Size range</span>
            <div className="caption-price">
              <span>from</span>{" "}
              <span className="value fw-6" id="slider-range-value01">
                {formatNumber(sizeRange[0])}
              </span>{" "}
              <span>to</span>{" "}
              <span className="value fw-6" id="slider-range-value02">
                {formatNumber(sizeRange[1])}
              </span>
            </div>
          </div>
          <Slider
            range
            max={1000}
            min={0}
            value={sizeRange}
            onChange={setSizeRange}
          />
        </div>
      </div>
      <div className=" group-select">
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
            options={["BHK Type", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"]}
            addtionalParentClass=""
          />
        </div>
        <div className="box-select">
          <DropdownSelect
            options={["Parking", "No Parking", "1 Covered", "2 Covered", "Open Parking"]}
            addtionalParentClass=""
          />
        </div>
      </div>
    </div>
  );
}
