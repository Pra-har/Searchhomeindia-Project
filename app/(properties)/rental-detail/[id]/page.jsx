import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import PropertyMainSlider from "@/components/properties/propertyDetail/PropertyMainSlider";
import PropertyQuickNav from "@/components/properties/propertyDetail/PropertyQuickNav";
import RentalHome from "@/components/properties/propertyDetail/rental/RentalHome";

const mockRental = {
  id: "rental-bellandur-luxe",
  type: "rental",
  title: "Bellandur Premium Rental Apartments",
  location: "Bellandur, Bengaluru",
  description:
    "Premium rental inventory with 3BHK/4BHK/5BHK options near ORR and Sarjapur corridor.",
  address:
    "Meda Heights near AET circle, behind Adarsh Palm Retreat, Bellandur, Bengaluru, Karnataka 560103",
  imageSrc: "/images/section/property-detail-4.jpg",
  mediaGallery: [
    { src: "/images/section/property-detail-4.jpg", type: "Exterior" },
    { src: "/images/section/property-detail-5.jpg", type: "Living Room" },
    { src: "/images/section/property-detail-6.jpg", type: "Bedroom" },
    { src: "/images/section/property-detail-3.jpg", type: "Kitchen" },
  ],
  amenities: [
    "Lift",
    "Power Backup",
    "CCTV",
    "Gymnasium",
    "Swimming Pool",
    "24x7 Security",
    "Children Play Area",
    "Club House",
    "Jogging Track",
    "Car Parking",
  ],
  highlights: [
    "Prime Bellandur location with office corridor access",
    "Suitable for families and bachelors",
    "Semi-furnished apartments with lift and power backup",
  ],
  pricingPlans: [
    {
      id: "3bhk-semi",
      bhk: "3 BHK",
      area: "1450 sq.ft",
      rent: "\u20B9 52,000/month",
      deposit: "\u20B9 3 Lakh",
      note: "Semi-furnished",
      image: "/images/section/floor.jpg",
      highlights: ["3BHK", "Semi-furnished", "Family/Bachelors"],
    },
    {
      id: "4bhk-semi",
      bhk: "4 BHK",
      area: "1980 sq.ft",
      rent: "\u20B9 72,000/month",
      deposit: "\u20B9 4 Lakh",
      note: "Semi-furnished",
      image: "/images/section/property-details-thumbs-3.jpg",
      highlights: ["4BHK", "Lift", "Power backup"],
    },
    {
      id: "5bhk-semi",
      bhk: "5 BHK",
      area: "2450 sq.ft",
      rent: "\u20B9 95,000/month",
      deposit: "\u20B9 5 Lakh",
      note: "Semi-furnished",
      image: "/images/section/property-details-thumbs-4.jpg",
      highlights: ["5BHK", "Spacious layout", "Premium tower"],
    },
  ],
  meta: {
    apartmentType: "3BHK / 4BHK / 5BHK",
    bhkType: "3 BHK",
    availableFrom: "Immediate",
    securityDeposit: "\u20B9 3 Lakh",
    availableFor: "Family/Bachelors",
    furnishingStatus: "Semi-furnished",
    lifts: "Yes",
    floorNumber: "12",
    noticePeriod: "1",
    facing: "North",
    maxPricing: "\u20B9 0",
    maintenanceCharge: "\u20B9 6 Thousand",
    ageOfConstruction: "1 Year's",
    acRooms: "No",
    powerBackup: "Yes",
    amenitiesLabel: "All amenities",
    monthlyRent: "\u20B9 52,000/month",
    carpetArea: "1200 - 2200 sq.ft",
    builtUpArea: "1450 - 2600 sq.ft",
  },
  aboutProject: {
    projectName: "Bellandur Premium Rental Apartments",
    builderName: "Search Homes India Listings",
    location: "Bellandur, Bengaluru",
    overview:
      "Well-maintained rental inventory for families and professionals with balanced pricing and city connectivity.",
    whyCityHeading: "Why choose Bellandur, Bengaluru?",
    whyCityReasons: [
      "Bellandur is among Bengaluru's most active lifestyle and work corridors.",
      "Excellent social infrastructure and transport connectivity.",
      "Consistent demand for quality rental homes.",
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
          { label: "Rental Listing", href: "/property-listing?intent=rental" },
          { label: "Rental Detail" },
          { label: mockRental.title },
        ]}
      />
      <div className="main-content">
        <PropertyMainSlider property={mockRental} />
        <PropertyQuickNav />
        <RentalHome property={mockRental} />
      </div>
      <Footer />
    </div>
  );
}
