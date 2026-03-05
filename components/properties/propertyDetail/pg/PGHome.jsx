import React from "react";
import AboutProject from "../AboutProject";
import ProjectHighlights from "../ProjectHighlights";
import PropertyAmenities from "../PropertyAmenities";
import PropertyLocation from "../PropertyLocation";
import VideoReview from "../VideoReview";
import Sidebar from "../PropertyHomeSidebar";
import PGGlance from "./PGGlance";
import PGPricingPlans from "./PGPricingPlans";
import { getPGDetailAdapter } from "./pgDetailAdapter";

export default function PGHome({ property }) {
  const detailData = getPGDetailAdapter(property);

  return (
    <section className="section-property-detail">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div id="property-overview-section" className="wg-property box-property-detail">
              <PGGlance property={detailData} />
            </div>
            <div id="about-project-section" className="wg-property box-project-overview">
              <AboutProject property={detailData} />
            </div>
            <div id="floor-plan-section" className="wg-property single-property-floor">
              <PGPricingPlans property={detailData} />
            </div>
            <div id="project-highlights-section" className="wg-property box-project-highlights">
              <ProjectHighlights property={detailData} />
            </div>
            <div id="project-amenities-section" className="wg-property box-amenities">
              <PropertyAmenities property={detailData} />
            </div>
            <div id="project-location-section" className="wg-property box-project-location">
              <PropertyLocation property={detailData} />
            </div>
            <div id="video-review-section" className="wg-property box-video-review">
              <VideoReview property={detailData} />
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <Sidebar property={detailData} />
          </div>
        </div>
      </div>
    </section>
  );
}