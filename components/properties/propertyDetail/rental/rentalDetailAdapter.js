import {
  normalizePricingPlans,
  normalizeStringArray,
  normalizeText,
  pickFirst,
} from "../common/detailAdapterHelpers";

const DEFAULT_DETAILS = {
  id: "rental-1",
  type: "rental",
  title: "3BHK / 4BHK / 5BHK Apartment",
  location: "Bellandur, Bengaluru",
  description: "Well ventilated rental apartment near prime social and work hubs.",
  address:
    "Meda Heights near AET circle, behind Adarsh Palm Retreat, Bellandur, Bengaluru, Karnataka 560103",
  apartmentType: "3BHK / 4BHK / 5BHK",
  bhkType: "3 BHK",
  furnishingStatus: "Semi-furnished",
  availableFrom: "Immediate",
  availableFor: "Family/Bachelors",
  tenantPreferred: "Family/Bachelors",
  lifts: "Yes",
  floorNumber: "12",
  noticePeriod: "1 Month",
  parking: "Yes - Covered",
  monthlyRent: "\u20B9 52,000/month",
  maxPricing: "\u20B9 0",
  securityDeposit: "\u20B9 3 Lakh",
  maintenanceCharge: "\u20B9 6 Thousand",
  ageOfConstruction: "1 Year",
  acRooms: "No",
  powerBackup: "Yes",
  amenitiesLabel: "All amenities",
  carpetArea: "1200 - 2200 sq.ft",
  builtUpArea: "1450 - 2600 sq.ft",
  facing: "North",
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
    "Semi-furnished apartment with lift and power backup",
  ],
  pricingPlans: [
    {
      id: "3bhk",
      bhk: "3 BHK",
      area: "1450 sq.ft",
      rent: "\u20B9 52,000/month",
      deposit: "\u20B9 3 Lakh",
      note: "Semi-furnished",
    },
    {
      id: "4bhk",
      bhk: "4 BHK",
      area: "1980 sq.ft",
      rent: "\u20B9 72,000/month",
      deposit: "\u20B9 4 Lakh",
      note: "Semi-furnished",
    },
    {
      id: "5bhk",
      bhk: "5 BHK",
      area: "2450 sq.ft",
      rent: "\u20B9 95,000/month",
      deposit: "\u20B9 5 Lakh",
      note: "Semi-furnished",
    },
  ],
  aboutProject: {
    projectName: "Bellandur Premium Rentals",
    builderName: "Search Homes India Listings",
    location: "Bellandur, Bengaluru",
    overview:
      "A practical rental inventory for families and professionals with quality interiors and daily convenience access.",
    whyCityHeading: "Why choose Bellandur, Bengaluru?",
    whyCityReasons: [
      "Close to ORR, Sarjapur and major office clusters.",
      "Strong social infrastructure including schools, hospitals, and retail.",
      "Excellent connectivity to key zones of Bengaluru.",
    ],
  },
};

const normalizeRentalPlans = (rawPlans) =>
  normalizePricingPlans(rawPlans, DEFAULT_DETAILS.pricingPlans).map((plan, index) => {
    const bhk = normalizeText(
      pickFirst(plan.bhk, plan.bhkType, plan.configuration, plan.type),
      DEFAULT_DETAILS.bhkType
    );
    const area = normalizeText(pickFirst(plan.area, plan.carpetArea), DEFAULT_DETAILS.carpetArea);
    const rent = normalizeText(pickFirst(plan.rent, plan.price), DEFAULT_DETAILS.monthlyRent);
    const deposit = normalizeText(plan.deposit, DEFAULT_DETAILS.securityDeposit);

    return {
      ...plan,
      id: normalizeText(plan.id, `rental-plan-${index + 1}`),
      tab: bhk,
      type: bhk,
      area,
      price: rent,
      priceNote: `Deposit: ${deposit}`,
      rent,
      deposit,
      image: normalizeText(
        pickFirst(plan.image, plan.floorPlanImage),
        "/images/section/property-details-thumbs-3.jpg"
      ),
      highlights: normalizeStringArray(plan.highlights, [
        normalizeText(plan.note, DEFAULT_DETAILS.furnishingStatus),
        `Deposit: ${deposit}`,
        `Area: ${area}`,
      ]),
    };
  });

export const getRentalDetailAdapter = (property = {}) => {
  const meta = property?.meta || {};

  const pricingPlans = normalizeRentalPlans(
    pickFirst(
      property?.pricingPlans,
      meta?.pricingPlans,
      property?.rentalPlans,
      meta?.rentalPlans,
      property?.unitPlans,
      meta?.unitPlans
    )
  );

  let amenities = normalizeStringArray(
    pickFirst(property?.amenities, meta?.amenities),
    DEFAULT_DETAILS.amenities
  );
  const genericAmenityText = normalizeText(amenities[0], "").toLowerCase();
  if (
    amenities.length <= 1 &&
    ["all amenities", "all amenity", "amenities", "none", "n/a", "na"].includes(genericAmenityText)
  ) {
    amenities = [...DEFAULT_DETAILS.amenities];
  }
  const highlights = normalizeStringArray(
    pickFirst(property?.highlights, meta?.highlights),
    DEFAULT_DETAILS.highlights
  );

  const aboutProject = {
    ...DEFAULT_DETAILS.aboutProject,
    ...(property?.aboutProject || {}),
    ...(meta?.aboutProject || {}),
    projectName: normalizeText(
      pickFirst(
        property?.aboutProject?.projectName,
        meta?.aboutProject?.projectName,
        property?.title,
        meta?.title
      ),
      DEFAULT_DETAILS.aboutProject.projectName
    ),
    builderName: normalizeText(
      pickFirst(property?.aboutProject?.builderName, meta?.aboutProject?.builderName),
      DEFAULT_DETAILS.aboutProject.builderName
    ),
    location: normalizeText(
      pickFirst(
        property?.aboutProject?.location,
        meta?.aboutProject?.location,
        property?.location,
        meta?.location
      ),
      DEFAULT_DETAILS.aboutProject.location
    ),
  };

  const detailData = {
    id: normalizeText(pickFirst(property?.id, meta?.id), DEFAULT_DETAILS.id),
    type: normalizeText(pickFirst(property?.type, meta?.type), DEFAULT_DETAILS.type),
    title: normalizeText(pickFirst(property?.title, meta?.title), DEFAULT_DETAILS.title),
    location: normalizeText(pickFirst(property?.location, meta?.location), DEFAULT_DETAILS.location),
    description: normalizeText(
      pickFirst(property?.description, meta?.description),
      DEFAULT_DETAILS.description
    ),
    address: normalizeText(pickFirst(property?.address, meta?.address), DEFAULT_DETAILS.address),
    apartmentType: normalizeText(
      pickFirst(property?.apartmentType, meta?.apartmentType, property?.bhkType, meta?.bhkType),
      DEFAULT_DETAILS.apartmentType
    ),
    bhkType: normalizeText(pickFirst(property?.bhkType, meta?.bhkType), DEFAULT_DETAILS.bhkType),
    furnishingStatus: normalizeText(
      pickFirst(property?.furnishingStatus, meta?.furnishingStatus),
      DEFAULT_DETAILS.furnishingStatus
    ),
    availableFrom: normalizeText(
      pickFirst(property?.availableFrom, meta?.availableFrom),
      DEFAULT_DETAILS.availableFrom
    ),
    availableFor: normalizeText(
      pickFirst(property?.availableFor, meta?.availableFor),
      DEFAULT_DETAILS.availableFor
    ),
    tenantPreferred: normalizeText(
      pickFirst(property?.tenantPreferred, meta?.tenantPreferred),
      DEFAULT_DETAILS.tenantPreferred
    ),
    lifts: normalizeText(pickFirst(property?.lifts, meta?.lifts), DEFAULT_DETAILS.lifts),
    floorNumber: normalizeText(
      pickFirst(property?.floorNumber, meta?.floorNumber),
      DEFAULT_DETAILS.floorNumber
    ),
    noticePeriod: normalizeText(
      pickFirst(property?.noticePeriod, meta?.noticePeriod),
      DEFAULT_DETAILS.noticePeriod
    ),
    parking: normalizeText(pickFirst(property?.parking, meta?.parking), DEFAULT_DETAILS.parking),
    monthlyRent: normalizeText(
      pickFirst(property?.monthlyRent, meta?.monthlyRent),
      DEFAULT_DETAILS.monthlyRent
    ),
    maxPricing: normalizeText(
      pickFirst(property?.maxPricing, meta?.maxPricing),
      DEFAULT_DETAILS.maxPricing
    ),
    securityDeposit: normalizeText(
      pickFirst(property?.securityDeposit, meta?.securityDeposit),
      DEFAULT_DETAILS.securityDeposit
    ),
    maintenanceCharge: normalizeText(
      pickFirst(property?.maintenanceCharge, meta?.maintenanceCharge),
      DEFAULT_DETAILS.maintenanceCharge
    ),
    ageOfConstruction: normalizeText(
      pickFirst(property?.ageOfConstruction, meta?.ageOfConstruction),
      DEFAULT_DETAILS.ageOfConstruction
    ),
    acRooms: normalizeText(pickFirst(property?.acRooms, meta?.acRooms), DEFAULT_DETAILS.acRooms),
    powerBackup: normalizeText(
      pickFirst(property?.powerBackup, meta?.powerBackup),
      DEFAULT_DETAILS.powerBackup
    ),
    amenitiesLabel: normalizeText(
      pickFirst(property?.amenitiesLabel, meta?.amenitiesLabel),
      DEFAULT_DETAILS.amenitiesLabel
    ),
    carpetArea: normalizeText(
      pickFirst(property?.carpetArea, meta?.carpetArea),
      DEFAULT_DETAILS.carpetArea
    ),
    builtUpArea: normalizeText(
      pickFirst(property?.builtUpArea, meta?.builtUpArea),
      DEFAULT_DETAILS.builtUpArea
    ),
    facing: normalizeText(pickFirst(property?.facing, meta?.facing), DEFAULT_DETAILS.facing),
    amenities,
    highlights,
    pricingPlans,
    aboutProject,
  };

  return {
    ...detailData,
    projectDetails: {
      location: detailData.location,
      amenities: detailData.amenities,
      highlights: detailData.highlights,
    },
  };
};
