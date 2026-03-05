import {
  normalizePricingPlans,
  normalizeStringArray,
  normalizeText,
  pickFirst,
  toNumber,
} from "../common/detailAdapterHelpers";

const DEFAULT_DETAILS = {
  id: "plot-1",
  type: "plot",
  title: "30x40 Residential NA Plot",
  location: "Devanahalli, Bengaluru",
  description: "Approved residential land parcel in a fast-growing growth corridor.",
  address: "Devanahalli Township, Near BIAL, Bengaluru - 562110",
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
  amenities: [],
  highlights: [
    "Located near airport growth corridor",
    "BMRDA approved plotted layout",
    "Ready for registration and immediate sale",
  ],
  pricingPlans: [
    {
      id: "30x40",
      plotSize: "30x40",
      dimension: "30 ft x 40 ft",
      area: "1,200 sq.ft",
      price: "₹ 45 Lakh",
      note: "East Facing, BMRDA Approved",
    },
    {
      id: "40x60",
      plotSize: "40x60",
      dimension: "40 ft x 60 ft",
      area: "2,400 sq.ft",
      price: "₹ 85 Lakh",
      note: "Corner Plot, BMRDA Approved",
    },
    {
      id: "50x80",
      plotSize: "50x80",
      dimension: "50 ft x 80 ft",
      area: "4,000 sq.ft",
      price: "₹ 1.35 Cr",
      note: "Premium Location",
    },
  ],
  aboutProject: {
    projectName: "30x40 Residential NA Plot",
    builderName: "Search Homes India Plots",
    location: "Devanahalli, Bengaluru",
    overview:
      "NA residential plot inventory in a strategic north Bengaluru expansion zone with strong long-term appreciation potential.",
    whyCityHeading: "Why choose Devanahalli, Bengaluru for plot investment?",
    whyCityReasons: [
      "Major infrastructure momentum around airport and connectivity corridors.",
      "Strong end-user and investor interest for plotted developments.",
      "Better entry ticket compared to core city land markets.",
    ],
  },
};

const getAreaNumber = (value) => {
  const parsed = toNumber(value, 0);
  return parsed > 0 ? parsed : 0;
};

const getPlotSizeCategory = (areaText) => {
  const area = getAreaNumber(areaText);
  if (area <= 0) return "Other Plots";
  if (area < 1500) return "Small Plots";
  if (area < 3000) return "Medium Plots";
  return "Large Plots";
};

const normalizePlotPlans = (rawPlans) =>
  normalizePricingPlans(rawPlans, DEFAULT_DETAILS.pricingPlans).map((plan, index) => {
    const area = normalizeText(plan.area, DEFAULT_DETAILS.plotArea);
    const dimension = normalizeText(plan.dimension, DEFAULT_DETAILS.plotDimension);
    const plotSize = normalizeText(
      pickFirst(plan.plotSize, plan.type, plan.name),
      `Plot ${index + 1}`
    );
    return {
      ...plan,
      id: normalizeText(plan.id, `plot-plan-${index + 1}`),
      tab: normalizeText(plan.tab, getPlotSizeCategory(area)),
      type: plotSize,
      area: `${dimension} | ${area}`,
      price: normalizeText(plan.price, DEFAULT_DETAILS.price),
      priceNote: normalizeText(plan.note, "Onwards Price"),
      plotSize,
      dimension,
      image: normalizeText(
        pickFirst(plan.image, plan.floorPlanImage),
        "/images/section/property-details-thumbs-5.jpg"
      ),
      highlights: normalizeStringArray(plan.highlights, [
        normalizeText(plan.note, DEFAULT_DETAILS.approvals),
        `Facing: ${DEFAULT_DETAILS.facing}`,
        `Road Width: ${DEFAULT_DETAILS.roadWidth}`,
      ]),
    };
  });

export const getPlotDetailAdapter = (property = {}) => {
  const meta = property?.meta || {};

  const pricingPlans = normalizePlotPlans(
    pickFirst(
      property?.pricingPlans,
      meta?.pricingPlans,
      property?.plotVariants,
      meta?.plotVariants,
      property?.unitPlans,
      meta?.unitPlans
    )
  );

  const highlights = normalizeStringArray(
    pickFirst(property?.highlights, meta?.highlights),
    DEFAULT_DETAILS.highlights
  );
  const amenities = normalizeStringArray(
    pickFirst(property?.amenities, meta?.amenities),
    DEFAULT_DETAILS.amenities
  );
  const connectivity = normalizeStringArray(
    pickFirst(property?.projectConnectivity, meta?.projectConnectivity, property?.connectivity, meta?.connectivity),
    [
      "Kempegowda International Airport - 15 km",
      "Bellary Road Access - 8 km",
      "Devanahalli Town - 5 km",
    ]
  ).map((item, index) => ({
    id: `plot-conn-${index + 1}`,
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
    plotArea: normalizeText(pickFirst(property?.plotArea, meta?.plotArea), DEFAULT_DETAILS.plotArea),
    plotDimension: normalizeText(
      pickFirst(property?.plotDimension, meta?.plotDimension),
      DEFAULT_DETAILS.plotDimension
    ),
    plotType: normalizeText(pickFirst(property?.plotType, meta?.plotType), DEFAULT_DETAILS.plotType),
    reraId: normalizeText(pickFirst(property?.reraId, meta?.reraId), DEFAULT_DETAILS.reraId),
    facing: normalizeText(pickFirst(property?.facing, meta?.facing), DEFAULT_DETAILS.facing),
    roadWidth: normalizeText(pickFirst(property?.roadWidth, meta?.roadWidth), DEFAULT_DETAILS.roadWidth),
    isCornerPlot: normalizeText(
      pickFirst(property?.isCornerPlot, meta?.isCornerPlot),
      DEFAULT_DETAILS.isCornerPlot
    ),
    transactionType: normalizeText(
      pickFirst(property?.transactionType, meta?.transactionType),
      DEFAULT_DETAILS.transactionType
    ),
    price: normalizeText(pickFirst(property?.price, meta?.price), DEFAULT_DETAILS.price),
    pricePerSqft: normalizeText(
      pickFirst(property?.pricePerSqft, meta?.pricePerSqft),
      DEFAULT_DETAILS.pricePerSqft
    ),
    approvals: normalizeText(pickFirst(property?.approvals, meta?.approvals), DEFAULT_DETAILS.approvals),
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
      highlights: detailData.highlights,
      connectivity: detailData.projectConnectivity,
    },
  };
};
