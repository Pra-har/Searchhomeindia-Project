import React from "react";
import VideoReview from "./VideoReview";
import ExtraInfo from "./PropertyGlance";
import AboutProject from "./AboutProject";
import Features from "./PropertyAmenities";
import ProjectHighlights from "./ProjectHighlights";
import ProjectConnectivity from "./ProjectConnectivity";
import AboutBuilder from "./AboutBuilder";
import Location from "./PropertyLocation";
import FloorPlan from "./PropertyFloorPlan";
// import Attachments from "./Attachments";
// import VirtualTour from "./VirtualTour";
// import LoanCalculator from "./LoanCalculator";
// import Reviews from "./Reviews";
import Sidebar from "./PropertyHomeSidebar";

export default function Details1({ property }) {
  return (
    <section className="section-property-detail">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div id="property-overview-section" className="wg-property box-property-detail">
              <ExtraInfo property={property} />
            </div>
            <div id="about-project-section" className="wg-property box-project-overview">
              <AboutProject property={property} />
            </div>
            <div id="floor-plan-section" className="wg-property single-property-floor">
              <FloorPlan property={property} />
            </div>
           
            <div id="project-highlights-section" className="wg-property box-project-highlights">
              <ProjectHighlights property={property} />
            </div>
             <div id="project-amenities-section" className="wg-property box-amenities">
              <Features property={property} />
            </div>
            <div id="project-connectivity-section" className="wg-property box-project-connectivity">
              <ProjectConnectivity property={property} />
            </div>
            <div id="about-builder-section" className="wg-property box-about-builder">
              <AboutBuilder property={property} />
            </div>
            <div id="project-location-section" className="wg-property box-project-location">
              <Location property={property} />
            </div>
            {/* <div className="wg-property box-attachments">
              <Attachments />
            </div> */}
            {/* <div className="wg-property box-virtual-tour">
              <VirtualTour />
            </div> */}
            {/* <div className="wg-property box-loan">
              <LoanCalculator />
            </div> */}
             <div id="video-review-section" className="wg-property box-video-review">
              <VideoReview property={property} />
            </div>
            {/* <div className="wg-property mb-0 box-comment">
              <Reviews />
            </div> */}
          </div>
          <div className="col-xl-4 col-lg-5">
            <Sidebar property={property} />
          </div>
        </div>
      </div>
    </section>
  );
}
