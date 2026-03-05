import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import PropertyMainSlider from "@/components/properties/propertyDetail/PropertyMainSlider";
import PropertyQuickNav from "@/components/properties/propertyDetail/PropertyQuickNav";
import PlotHome from "@/components/properties/propertyDetail/plot/PlotHome";

const mockPlot = {
  id: "plot-devanahalli-30x40",
  type: "plot",
  title: "30x40 Residential NA Plot",
  location: "Devanahalli, Bengaluru",
  description:
    "Ready-to-register NA residential plot in Devanahalli growth corridor with approval-backed inventory options.",
  address: "Devanahalli Township, Near BIAL, Bengaluru - 562110",
  imageSrc: "/images/section/property-detail-6.jpg",
  mediaGallery: [
    { src: "/images/section/property-detail-6.jpg", type: "Main View" },
    { src: "/images/section/property-detail-5.jpg", type: "Layout View" },
    { src: "/images/section/property-detail-4.jpg", type: "Road Access" },
    { src: "/images/section/property-detail-3.jpg", type: "Surroundings" },
  ],
  highlights: [
    "Located near airport growth corridor",
    "BMRDA approved plotted development",
    "Suitable for end-use and investment",
  ],
  pricingPlans: [
    {
      id: "30x40",
      plotSize: "30x40",
      dimension: "30 ft x 40 ft",
      area: "1,200 sq.ft",
      price: "₹ 45 Lakh",
      note: "East Facing, BMRDA Approved",
      image: "/images/section/floor.jpg",
      highlights: ["East facing", "30 ft road", "NA residential plot"],
    },
    {
      id: "40x60",
      plotSize: "40x60",
      dimension: "40 ft x 60 ft",
      area: "2,400 sq.ft",
      price: "₹ 85 Lakh",
      note: "Corner Plot, BMRDA Approved",
      image: "/images/section/property-details-thumbs-5.jpg",
      highlights: ["Corner plot", "Wide frontage", "Approved layout"],
    },
    {
      id: "50x80",
      plotSize: "50x80",
      dimension: "50 ft x 80 ft",
      area: "4,000 sq.ft",
      price: "₹ 1.35 Cr",
      note: "Premium Location",
      image: "/images/section/property-details-thumbs-6.jpg",
      highlights: ["Large parcel", "Premium location", "High future potential"],
    },
  ],
  meta: {
    plotArea: "1,200 sq.ft",
    plotDimension: "30 ft x 40 ft",
    plotType: "Residential NA Plot",
    reraId: "Not Applicable",
    facing: "East Facing",
    roadWidth: "30 ft",
    isCornerPlot: "No",
    transactionType: "Sale",
    price: "₹ 45 Lakh",
    pricePerSqft: "₹ 3,750/sq.ft",
    approvals: "BMRDA Approved",
  },
  projectConnectivity: [
    { id: "airport", place: "Kempegowda International Airport", distance: "15 km", time: "25 min", type: "Airport" },
    { id: "road", place: "Bellary Road Access", distance: "8 km", time: "12 min", type: "Road Link" },
    { id: "town", place: "Devanahalli Town", distance: "5 km", time: "10 min", type: "Town Hub" },
  ],
  aboutProject: {
    projectName: "30x40 Residential NA Plot",
    builderName: "Search Homes India Plots",
    location: "Devanahalli, Bengaluru",
    overview:
      "A plotted development option with legally clear documentation and growth-oriented location fundamentals.",
    whyCityHeading: "Why choose Devanahalli, Bengaluru for plot investment?",
    whyCityReasons: [
      "Airport-led infrastructure growth is driving demand.",
      "Strong potential for long-term land value appreciation.",
      "Plotted inventory provides flexibility for custom home development.",
    ],
  },
};

export default function Page() {
  return (
    <div id="wrapper">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Plot Listing", href: "/property-listing?intent=plot-land" },
          { label: "Plot Detail" },
          { label: mockPlot.title },
        ]}
      />
      <div className="main-content">
        <PropertyMainSlider property={mockPlot} />
        <PropertyQuickNav />
        <PlotHome property={mockPlot} />
      </div>
      <Footer />
    </div>
  );
}

