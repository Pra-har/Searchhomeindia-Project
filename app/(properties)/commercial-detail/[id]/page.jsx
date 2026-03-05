import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import PropertyMainSlider from "@/components/properties/propertyDetail/PropertyMainSlider";
import PropertyQuickNav from "@/components/properties/propertyDetail/PropertyQuickNav";
import CommercialHome from "@/components/properties/propertyDetail/commercial/CommercialHome";

const mockCommercial = {
  id: "commercial-indiranagar-shop",
  type: "commercial",
  title: "Commercial Shop - Indiranagar 100ft Road",
  location: "Indiranagar, Bengaluru",
  description:
    "Ground floor commercial shop in a high-demand micro-market with premium frontage and consistent walk-in visibility.",
  address: "100 Feet Road, Indiranagar, Bengaluru - 560038",
  imageSrc: "/images/section/property-detail-5.jpg",
  mediaGallery: [
    { src: "/images/section/property-detail-5.jpg", type: "Exterior" },
    { src: "/images/section/property-detail-6.jpg", type: "Frontage" },
    { src: "/images/section/property-detail-3.jpg", type: "Interior" },
    { src: "/images/section/property-detail-4.jpg", type: "Entry" },
  ],
  amenities: ["Power Backup", "Lift", "Parking", "CCTV", "Fire Safety"],
  highlights: [
    "Prime frontage on Indiranagar 100ft Road",
    "High visibility and strong business catchment",
    "Suitable for branded retail and office operations",
  ],
  pricingPlans: [
    {
      id: "shop-gf",
      tab: "Shop",
      unitType: "Ground Floor Shop",
      area: "800 sq.ft",
      price: "₹ 1.2 Cr",
      note: "Prime frontage",
      image: "/images/section/floor.jpg",
      highlights: ["Ground floor", "Retail ready", "Road-facing"],
    },
    {
      id: "office-1f",
      tab: "Office",
      unitType: "1st Floor Office",
      area: "1200 sq.ft",
      price: "₹ 1.6 Cr",
      note: "Open plan layout",
      image: "/images/section/property-details-thumbs-4.jpg",
      highlights: ["Open office layout", "Lift access", "Parking"],
    },
  ],
  meta: {
    subType: "Shop / Showroom",
    possessionStatus: "Ready to Move",
    carpetArea: "800 sq.ft",
    superBuiltUpArea: "960 sq.ft",
    floorNumber: "Ground Floor",
    totalFloors: "G+4",
    parking: "Yes",
    transactionType: "Sale",
    price: "₹ 1.2 Cr",
    maintenanceCharge: "₹ 5,000/month",
    reraId: "Not Applicable",
    facing: "Main Road Facing",
  },
  projectConnectivity: [
    { id: "metro", place: "Indiranagar Metro Station", distance: "1.2 km", time: "5 min", type: "Metro" },
    { id: "road", place: "Old Airport Road", distance: "2.1 km", time: "8 min", type: "Road Link" },
    { id: "cbd", place: "MG Road CBD", distance: "5.8 km", time: "18 min", type: "Business Hub" },
  ],
  aboutProject: {
    projectName: "Commercial Shop - Indiranagar 100ft Road",
    builderName: "Search Homes India Commercial",
    location: "Indiranagar, Bengaluru",
    overview:
      "Commercial unit inventory in one of Bengaluru's top-performing retail corridors with strong rental potential.",
    whyCityHeading: "Why choose Indiranagar, Bengaluru for commercial investment?",
    whyCityReasons: [
      "One of Bengaluru's most premium and high-footfall commercial zones.",
      "Strong mix of retail, office and F&B demand.",
      "Consistent long-term asset appreciation potential.",
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
          { label: "Commercial Listing", href: "/property-listing?intent=commercial" },
          { label: "Commercial Detail" },
          { label: mockCommercial.title },
        ]}
      />
      <div className="main-content">
        <PropertyMainSlider property={mockCommercial} />
        <PropertyQuickNav />
        <CommercialHome property={mockCommercial} />
      </div>
      <Footer />
    </div>
  );
}

