import {
  normalizePricingPlans,
  normalizeStringArray,
  normalizeText,
  pickFirst,
} from "../common/detailAdapterHelpers";

const DEFAULT_DETAILS = {
  id: "commercial-1",
  type: "commercial",
  title: "Commercial Shop - Indiranagar 100ft Road",
  location: "Indiranagar, Bengaluru",
  description: "High-footfall commercial unit suitable for retail and office operations.",
  address: "100 Feet Road, Indiranagar, Bengaluru - 560038",
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
  amenities: ["Power Backup", "Lift", "Parking", "CCTV", "Fire Safety"],
  highlights: [
    "Prime frontage on 100ft Road",
    "High visibility and steady footfall",
    "Suitable for retail and branded outlet usage",
  ],
  pricingPlans: [
    {
      id: "shop-gf",
      unitType: "Ground Floor Shop",
      area: "800 sq.ft",
      price: "₹ 1.2 Cr",
      note: "Prime frontage",
    },
    {
      id: "office-1f",
      unitType: "1st Floor Office",
      area: "1200 sq.ft",
      price: "₹ 1.6 Cr",
      note: "Open plan layout",
    },
  ],
  aboutProject: {
    projectName: "Commercial Shop - Indiranagar 100ft Road",
    builderName: "Search Homes India Commercial",
    location: "Indiranagar, Bengaluru",
    overview:
      "Commercial unit options in a premium Bengaluru micro-market with strong business demand and visibility.",
    whyCityHeading: "Why choose Indiranagar, Bengaluru for commercial investment?",
    whyCityReasons: [
      "One of Bengaluru's highest-demand retail corridors.",
      "Excellent connectivity and premium customer catchment.",
      "Strong rental and resale potential for commercial assets.",
    ],
  },
};

const normalizeCommercialPlans = (rawPlans) =>
  normalizePricingPlans(rawPlans, DEFAULT_DETAILS.pricingPlans).map((plan, index) => {
    const unitType = normalizeText(
      pickFirst(plan.unitType, plan.type, plan.name),
      `Unit ${index + 1}`
    );
    return {
      ...plan,
      id: normalizeText(plan.id, `commercial-plan-${index + 1}`),
      tab: normalizeText(pickFirst(plan.tab, plan.category, plan.subType), "All Units"),
      type: unitType,
      area: normalizeText(pickFirst(plan.area, plan.dimension), DEFAULT_DETAILS.carpetArea),
      price: normalizeText(plan.price, DEFAULT_DETAILS.price),
      priceNote: normalizeText(plan.note, "Onwards Price"),
      unitType,
      image: normalizeText(
        pickFirst(plan.image, plan.floorPlanImage),
        "/images/section/property-details-thumbs-4.jpg"
      ),
      highlights: normalizeStringArray(plan.highlights, [
        normalizeText(plan.note, "Prime business visibility"),
        "Commercial zoning compliant",
        "Good road frontage",
      ]),
    };
  });

export const getCommercialDetailAdapter = (property = {}) => {
  const meta = property?.meta || {};

  const pricingPlans = normalizeCommercialPlans(
    pickFirst(
      property?.pricingPlans,
      meta?.pricingPlans,
      property?.unitPlans,
      meta?.unitPlans,
      property?.rentalPlans,
      meta?.rentalPlans
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
  const connectivity = normalizeStringArray(
    pickFirst(property?.projectConnectivity, meta?.projectConnectivity, property?.connectivity, meta?.connectivity),
    [
      "Indiranagar Metro Station - 1.2 km",
      "Old Airport Road - 2.1 km",
      "MG Road CBD - 5.8 km",
    ]
  ).map((item, index) => ({
    id: `commercial-conn-${index + 1}`,
    place: item,
    type: "Road Link",
  }));

  const aboutProject = {
    ...DEFAULT_DETAILS.aboutProject,
    ...(property?.aboutProject || {}),
    ...(meta?.aboutProject || {}),
    projectName: normalizeText(
      pickFirst(property?.aboutProject?.projectName, meta?.aboutProject?.projectName, property?.title, meta?.title),
      DEFAULT_DETAILS.aboutProject.projectName
    ),
    builderName: normalizeText(
      pickFirst(property?.aboutProject?.builderName, meta?.aboutProject?.builderName),
      DEFAULT_DETAILS.aboutProject.builderName
    ),
    location: normalizeText(
      pickFirst(property?.aboutProject?.location, meta?.aboutProject?.location, property?.location, meta?.location),
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
    subType: normalizeText(pickFirst(property?.subType, meta?.subType), DEFAULT_DETAILS.subType),
    possessionStatus: normalizeText(
      pickFirst(property?.possessionStatus, meta?.possessionStatus),
      DEFAULT_DETAILS.possessionStatus
    ),
    carpetArea: normalizeText(
      pickFirst(property?.carpetArea, meta?.carpetArea),
      DEFAULT_DETAILS.carpetArea
    ),
    superBuiltUpArea: normalizeText(
      pickFirst(property?.superBuiltUpArea, meta?.superBuiltUpArea),
      DEFAULT_DETAILS.superBuiltUpArea
    ),
    floorNumber: normalizeText(
      pickFirst(property?.floorNumber, meta?.floorNumber),
      DEFAULT_DETAILS.floorNumber
    ),
    totalFloors: normalizeText(
      pickFirst(property?.totalFloors, meta?.totalFloors),
      DEFAULT_DETAILS.totalFloors
    ),
    parking: normalizeText(pickFirst(property?.parking, meta?.parking), DEFAULT_DETAILS.parking),
    transactionType: normalizeText(
      pickFirst(property?.transactionType, meta?.transactionType),
      DEFAULT_DETAILS.transactionType
    ),
    price: normalizeText(pickFirst(property?.price, meta?.price), DEFAULT_DETAILS.price),
    maintenanceCharge: normalizeText(
      pickFirst(property?.maintenanceCharge, meta?.maintenanceCharge),
      DEFAULT_DETAILS.maintenanceCharge
    ),
    reraId: normalizeText(pickFirst(property?.reraId, meta?.reraId), DEFAULT_DETAILS.reraId),
    facing: normalizeText(pickFirst(property?.facing, meta?.facing), DEFAULT_DETAILS.facing),
    amenities,
    highlights,
    pricingPlans,
    projectConnectivity: connectivity,
    aboutProject,
  };

  return {
    ...detailData,
    projectDetails: {
      location: detailData.location,
      amenities: detailData.amenities,
      highlights: detailData.highlights,
      connectivity: detailData.projectConnectivity,
    },
  };
};

