import {
  normalizePricingPlans,
  normalizeStringArray,
  normalizeText,
  pickFirst,
} from "../common/detailAdapterHelpers";

const DEFAULT_DETAILS = {
  id: "pg-1",
  type: "pg",
  title: "Shine Star PG For Gents",
  location: "BTM Layout, Bengaluru",
  description:
    "Price: 1. Single sharing small room common washroom for 3 members : 6000 + 1000 advance 2. Double sharing: 5500+1000 advance 3 times food included. 3. Triple Sharing 4500 + 1000 advance with 3 times food.",
  address:
    "Location:# 52 sri nidhi nilaya, 2nd cross road,cashier layout,1st stage, near. Gangotri bar and restaurant, BTM layout, Bangalore-560068.",
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
    },
    {
      id: "double",
      sharingType: "Double Sharing",
      price: "\u20B9 5,500/month",
      deposit: "\u20B9 1,000",
      note: "3 meals included",
    },
    {
      id: "triple",
      sharingType: "Triple Sharing",
      price: "\u20B9 4,500/month",
      deposit: "\u20B9 1,000",
      note: "3 meals included",
    },
  ],
  aboutProject: {
    projectName: "Shine Star PG For Gents",
    builderName: "Shine Star Properties",
    location: "BTM Layout, Bengaluru",
    overview:
      "Shine Star PG is a well-maintained paying guest accommodation located in the heart of BTM Layout, Bengaluru.",
    whyCityHeading: "Why choose BTM Layout, Bengaluru?",
    whyCityReasons: [
      "BTM Layout is one of Bengaluru's most well-connected residential and commercial hubs.",
      "Close to multiple IT parks, startups, and public transport corridors.",
      "Excellent ecosystem for students and working professionals.",
    ],
  },
};

const normalizePGPlans = (rawPlans) =>
  normalizePricingPlans(rawPlans, DEFAULT_DETAILS.pricingPlans).map((plan, index) => {
    const sharingType = normalizeText(
      pickFirst(plan.sharingType, plan.type, plan.name),
      `Sharing ${index + 1}`
    );
    return {
      ...plan,
      id: normalizeText(plan.id, `pg-plan-${index + 1}`),
      tab: sharingType,
      type: sharingType,
      area: normalizeText(plan.deposit, DEFAULT_DETAILS.securityDeposit),
      price: normalizeText(plan.price, DEFAULT_DETAILS.minPrice),
      priceNote: normalizeText(plan.note, "Deposit included"),
      deposit: normalizeText(plan.deposit, DEFAULT_DETAILS.securityDeposit),
      sharingType,
      image: normalizeText(
        pickFirst(plan.image, plan.floorPlanImage),
        "/images/section/floor.jpg"
      ),
      highlights: normalizeStringArray(plan.highlights, [
        normalizeText(plan.note, "3 meals included"),
        "WiFi Enabled",
        "Housekeeping Support",
      ]),
    };
  });

export const getPGDetailAdapter = (property = {}) => {
  const meta = property?.meta || {};

  const pricingPlans = normalizePGPlans(
    pickFirst(
      property?.pricingPlans,
      meta?.pricingPlans,
      property?.rentalPlans,
      meta?.rentalPlans,
      property?.unitPlans,
      meta?.unitPlans
    )
  );

  const amenities = normalizeStringArray(
    pickFirst(property?.amenities, meta?.amenities),
    DEFAULT_DETAILS.amenities
  );
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
    sharingType: normalizeText(
      pickFirst(property?.sharingType, meta?.sharingType),
      DEFAULT_DETAILS.sharingType
    ),
    foodAvailability: normalizeText(
      pickFirst(property?.foodAvailability, meta?.foodAvailability),
      DEFAULT_DETAILS.foodAvailability
    ),
    securityDeposit: normalizeText(
      pickFirst(property?.securityDeposit, meta?.securityDeposit),
      DEFAULT_DETAILS.securityDeposit
    ),
    availableFor: normalizeText(
      pickFirst(property?.availableFor, meta?.availableFor),
      DEFAULT_DETAILS.availableFor
    ),
    availableFrom: normalizeText(
      pickFirst(property?.availableFrom, meta?.availableFrom),
      DEFAULT_DETAILS.availableFrom
    ),
    floorNumber: normalizeText(
      pickFirst(property?.floorNumber, meta?.floorNumber),
      DEFAULT_DETAILS.floorNumber
    ),
    minPrice: normalizeText(pickFirst(property?.minPrice, meta?.minPrice), DEFAULT_DETAILS.minPrice),
    maxPrice: normalizeText(pickFirst(property?.maxPrice, meta?.maxPrice), DEFAULT_DETAILS.maxPrice),
    maintenance: normalizeText(
      pickFirst(property?.maintenance, meta?.maintenance),
      DEFAULT_DETAILS.maintenance
    ),
    acRooms: normalizeText(pickFirst(property?.acRooms, meta?.acRooms), DEFAULT_DETAILS.acRooms),
    lifts: normalizeText(pickFirst(property?.lifts, meta?.lifts), DEFAULT_DETAILS.lifts),
    amenitiesLabel: normalizeText(pickFirst(property?.amenitiesLabel, meta?.amenitiesLabel), amenities.join(", ")),
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

