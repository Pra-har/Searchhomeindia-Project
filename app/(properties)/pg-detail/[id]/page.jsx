import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import PropertyMainSlider from "@/components/properties/propertyDetail/PropertyMainSlider";
import PropertyQuickNav from "@/components/properties/propertyDetail/PropertyQuickNav";
import PGHome from "@/components/properties/propertyDetail/pg/PGHome";

const mockPG = {
  id: "pg-shine-star-btm",
  type: "pg",
  title: "Shine Star PG For Gents",
  location: "BTM Layout, Bengaluru",
  description:
    "Price: 1. Single sharing small room common washroom for 3 members : 6000 + 1000 advance 2. Double sharing: 5500+1000 advance 3 times food included. 3. Triple Sharing 4500 + 1000 advance with 3 times food.",
  address:
    "Location:# 52 sri nidhi nilaya, 2nd cross road,cashier layout,1st stage, near. Gangotri bar and restaurant, BTM layout, Bangalore-560068.",
  imageSrc: "/images/section/property-detail-3.jpg",
  mediaGallery: [
    { src: "/images/section/property-detail-3.jpg", type: "Exterior" },
    { src: "/images/section/property-detail-4.jpg", type: "Interior" },
    { src: "/images/section/property-detail-5.jpg", type: "Dining" },
    { src: "/images/section/property-detail-6.jpg", type: "Room" },
  ],
  amenities: ["None"],
  highlights: [
    "Prime location in BTM Layout with easy access to tech parks",
    "Food options available (veg/non-veg)",
    "Regular housekeeping and utility support",
  ],
  pricingPlans: [
    {
      id: "single",
      sharingType: "Single Sharing",
      price: "\u20B9 6,000/month",
      deposit: "\u20B9 1,000",
      note: "Common washroom for 3 members",
      image: "/images/section/floor.jpg",
      highlights: ["Single occupancy", "Common washroom", "Daily housekeeping"],
    },
    {
      id: "double",
      sharingType: "Double Sharing",
      price: "\u20B9 5,500/month",
      deposit: "\u20B9 1,000",
      note: "3 meals included",
      image: "/images/section/property-details-thumbs-3.jpg",
      highlights: ["Shared room", "3 meals", "Laundry access"],
    },
    {
      id: "triple",
      sharingType: "Triple Sharing",
      price: "\u20B9 4,500/month",
      deposit: "\u20B9 1,000",
      note: "3 meals included",
      image: "/images/section/property-details-thumbs-4.jpg",
      highlights: ["Budget friendly", "Meals included", "Power backup"],
    },
  ],
  meta: {
    sharingType: "2",
    foodAvailability: "Veg/Non-Veg",
    securityDeposit: "\u20B9 1 Thousand",
    availableFor: "Boys",
    availableFrom: "Immediate",
    floorNumber: "1",
    minPrice: "\u20B9 5.5 Thousand",
    maxPrice: "\u20B9 7.5 Thousand",
    maintenance: "\u20B9 0",
    acRooms: "No",
    lifts: "No",
    amenitiesLabel: "None",
  },
  aboutProject: {
    projectName: "Shine Star PG For Gents",
    builderName: "Shine Star Properties",
    location: "BTM Layout, Bengaluru",
    overview:
      "Shine Star PG is a well-maintained paying guest accommodation located in the heart of BTM Layout, Bengaluru. It offers comfortable single, double, and triple sharing rooms with all meals included.",
    whyCityHeading: "Why choose BTM Layout, Bengaluru?",
    whyCityReasons: [
      "BTM Layout is one of Bengaluru's most well-connected residential and commercial hubs.",
      "Home to numerous IT parks, startups, and co-working spaces within 2-5 km radius.",
      "Excellent public transport connectivity and metro access nearby.",
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
          { label: "PG Listing", href: "/property-listing?intent=pg" },
          { label: "PG Detail" },
          { label: mockPG.title },
        ]}
      />
      <div className="main-content">
        <PropertyMainSlider property={mockPG} />
        <PropertyQuickNav />
        <PGHome property={mockPG} />
      </div>
      <Footer />
    </div>
  );
}

