const IMAGE_POOL = [
  "/images/section/box-house.jpg",
  "/images/section/box-house-2.jpg",
  "/images/section/box-house-3.jpg",
  "/images/section/box-house-4.jpg",
  "/images/section/box-house-5.jpg",
  "/images/section/box-house-6.jpg",
  "/images/section/box-house-7.jpg",
  "/images/section/box-house-8.jpg",
  "/images/section/box-house-9.jpg",
  "/images/section/box-house-10.jpg",
  "/images/section/box-house-11.jpg",
  "/images/section/box-house-12.jpg",
  "/images/section/box-house-13.jpg",
  "/images/section/box-house-14.jpg",
  "/images/section/box-house-15.jpg",
  "/images/section/box-house-16.jpg",
];

const CITY_POOL = [
  { slug: "bangalore", city: "Bangalore", state: "Karnataka", localities: ["Whitefield", "Sarjapur Road", "Hoskote", "Hebbal"] },
  { slug: "mumbai", city: "Mumbai", state: "Maharashtra", localities: ["Thane", "Powai", "Andheri East", "Navi Mumbai"] },
  { slug: "delhi", city: "Delhi", state: "Delhi NCR", localities: ["Dwarka", "Rohini", "Saket", "Mayur Vihar"] },
  { slug: "hyderabad", city: "Hyderabad", state: "Telangana", localities: ["Gachibowli", "Kondapur", "Madhapur", "Kompally"] },
  { slug: "chennai", city: "Chennai", state: "Tamil Nadu", localities: ["OMR", "Perungudi", "Porur", "Velachery"] },
  { slug: "pune", city: "Pune", state: "Maharashtra", localities: ["Hinjewadi", "Wakad", "Kharadi", "Baner"] },
  { slug: "navi-mumbai", city: "Navi Mumbai", state: "Maharashtra", localities: ["Kharghar", "Panvel", "Ulwe", "Airoli"] },
  { slug: "noida", city: "Noida", state: "Uttar Pradesh", localities: ["Sector 150", "Sector 78", "Noida Extension", "Sector 137"] },
];

const PROJECT_POOL = [
  { title: "Godrej Parkshire", builder: "Godrej Properties" },
  { title: "Prestige Green Meadows", builder: "Prestige Group" },
  { title: "Lodha Evergreen", builder: "Lodha Group" },
  { title: "Sobha Urban Vista", builder: "Sobha Limited" },
  { title: "Brigade Sky Enclave", builder: "Brigade Group" },
  { title: "Puravankara Grand Bay", builder: "Puravankara" },
  { title: "Mahindra Lakefront", builder: "Mahindra Lifespaces" },
  { title: "DLF Horizon Estate", builder: "DLF Homes" },
];

const INTENT_POOL = [
  "buy",
  "buy",
  "buy",
  "rental",
  "buy",
  "villa",
  "commercial",
  "plot-land",
  "buy",
  "individual-house",
  "pg",
  "buy",
];

const STATUS_POOL = ["Under Construction", "Ready to Move", "New Launch", "Ongoing"];
const FACING_POOL = ["East Facing", "North Facing", "West Facing", "South Facing"];

const PROPERTY_TYPE_BY_INTENT = {
  buy: "Apartment",
  rental: "Apartment",
  villa: "Villa",
  commercial: "Commercial Space",
  "plot-land": "Plot / Land",
  "individual-house": "Independent House",
  pg: "PG / Hostels",
};

const MEDIA_TYPES = ["Exterior", "Interior", "Master Plan", "Floor Plan"];

const nextImageSet = (seed) => {
  const first = seed % IMAGE_POOL.length;
  return Array.from({ length: 4 }, (_, index) => IMAGE_POOL[(first + index) % IMAGE_POOL.length]);
};

const buildHighlights = (cityName, localityName) => [
  `Prime location in ${localityName}, ${cityName} with strong long-term demand.`,
  "Well-planned residential towers with modern architecture.",
  "High-end security system with 24x7 surveillance.",
  "Excellent connectivity to highways, metro and airport.",
  "Close to reputed schools, hospitals and retail hubs.",
  "Premium clubhouse, gymnasium, pool and recreation deck.",
  "Large landscaped open spaces for healthier living.",
  "Efficient internal planning for smooth daily commute.",
];

const buildConnectivity = (cityName, localityName) => [
  { place: `${localityName} Metro Station`, distance: "3.5 km", time: "10 min", type: "Metro" },
  { place: `${cityName} Tech Park`, distance: "6.8 km", time: "18 min", type: "IT Hub" },
  { place: `${cityName} International Airport`, distance: "32 km", time: "48 min", type: "Airport" },
  { place: `${cityName} Multi-Speciality Hospital`, distance: "5.1 km", time: "14 min", type: "Hospital" },
  { place: `${cityName} Central Mall`, distance: "4.2 km", time: "12 min", type: "Mall" },
  { place: "Outer Ring Road Link", distance: "2.9 km", time: "8 min", type: "Road Link" },
];

const buildBhkPlans = (beds, sqft, basePrice) => {
  const baseType = `${beds} BHK`;
  return [
    {
      id: `${beds}-bhk-standard`,
      bhk: baseType,
      type: `${baseType} Standard`,
      area: `${sqft} Sq.Ft`,
      price: `₹ ${(basePrice / 10000000).toFixed(2)} Cr*`,
      priceNote: "Onwards Price",
      floorPlanImage: "/images/section/floor.jpg",
      highlights: ["Living + Dining", "Wide Balcony", "Optimized Kitchen"],
    },
    {
      id: `${beds}-bhk-premium`,
      bhk: baseType,
      type: `${baseType} Premium`,
      area: `${sqft + 120} Sq.Ft`,
      price: `₹ ${((basePrice + 1200000) / 10000000).toFixed(2)} Cr*`,
      priceNote: "Onwards Price",
      floorPlanImage: "/images/section/property-details-thumbs-3.jpg",
      highlights: ["Larger Master Bedroom", "Extended Utility", "Premium Fittings"],
    },
    {
      id: `${beds}-bhk-luxe`,
      bhk: baseType,
      type: `${baseType} Luxe`,
      area: `${sqft + 220} Sq.Ft`,
      price: `₹ ${((basePrice + 2200000) / 10000000).toFixed(2)} Cr*`,
      priceNote: "Onwards Price",
      floorPlanImage: "/images/section/property-details-thumbs-4.jpg",
      highlights: ["Foyer Entry", "Deck Balcony", "Upgraded Layout"],
    },
  ];
};

const toOrdinal = (num) => {
  if (num % 10 === 1 && num % 100 !== 11) return `${num}st`;
  if (num % 10 === 2 && num % 100 !== 12) return `${num}nd`;
  if (num % 10 === 3 && num % 100 !== 13) return `${num}rd`;
  return `${num}th`;
};

const buildRecord = (index) => {
  const city = CITY_POOL[index % CITY_POOL.length];
  const project = PROJECT_POOL[index % PROJECT_POOL.length];
  const intent = INTENT_POOL[index % INTENT_POOL.length];
  const propertyType = PROPERTY_TYPE_BY_INTENT[intent] || "Apartment";
  const locality = city.localities[index % city.localities.length];

  const beds = intent === "pg" ? 1 : intent === "plot-land" ? 0 : 2 + (index % 3);
  const baths = beds > 0 ? Math.min(4, beds) : 0;
  const sqft = intent === "plot-land" ? 2200 + index * 10 : 980 + index * 55 + beds * 110;
  const basePrice = intent === "rental" ? 45000 + index * 1500 : 10500000 + index * 320000;
  const images = nextImageSet(index);

  const id = 1001 + index;
  const slug = `${project.title}-${city.slug}-${id}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const totalFloors = `${toOrdinal(1 + (index % 9))} of ${15 + (index % 16)} Floors`;
  const builtUpLow = Math.max(700, sqft - 120);
  const builtUpHigh = sqft + 180;
  const avgPricePerSqft = 6800 + (index % 9) * 250;

  return {
    id,
    slug,
    title: project.title,
    location: `${locality}, ${city.city}, ${city.state}`,
    citySlug: city.slug,
    intent,
    propertyType,
    status: STATUS_POOL[index % STATUS_POOL.length],
    facing: FACING_POOL[index % FACING_POOL.length],
    totalFloors,
    beds,
    baths,
    sqft,
    price: basePrice,
    imageSrc: images[0],
    images,
    mediaGallery: images.map((src, mediaIndex) => ({
      src,
      type: MEDIA_TYPES[mediaIndex % MEDIA_TYPES.length],
    })),
    configurations: beds > 0 ? `${beds}, ${beds + 1} BHK Apartments` : "Residential Plot",
    possessionDate: ["Jul 2028", "Dec 2027", "Mar 2029", "Sep 2028"][index % 4],
    avgPricePerSqft,
    builtUpRange: `${builtUpLow} - ${builtUpHigh} sq.ft`,
    carpetArea: `${Math.round(sqft * 0.78)} sq.ft`,
    builtUpArea: `${sqft} sq.ft`,
    developmentArea: `${10 + (index % 8)} Acres`,
    totalUnits: `${220 + index * 6} Units`,
    parking: beds > 0 ? "Yes" : "On Request",
    statusType: STATUS_POOL[index % STATUS_POOL.length],
    projectReraId: `PRM/KA/RERA/1250/304/PR/090126/00${8393 + index}`,
    projectDetails: {
      location: `${locality}, ${city.city}, ${city.state}`,
      builder: project.builder,
      possessionDate: ["Jul 2028", "Dec 2027", "Mar 2029", "Sep 2028"][index % 4],
      avgPricePerSqft,
      builtUpRange: `${builtUpLow} - ${builtUpHigh} sq.ft`,
      projectReraId: `PRM/KA/RERA/1250/304/PR/090126/00${8393 + index}`,
    },
    aboutProject: {
      projectName: project.title,
      builderName: project.builder,
      logo: "/images/logo/favicon.png",
      overview: [
        `${project.title} by ${project.builder} is located in ${locality}, ${city.city}.`,
        `The project is designed with practical layouts, premium lifestyle amenities, and high growth potential in ${city.city}.`,
        "This development balances end-use comfort and long-term real estate value.",
      ],
      whyCityHeading: `Why settle in ${city.city}?`,
      whyCityReasons: [
        `${city.city} offers strong employment growth and infrastructure upgrades.`,
        "The city has broad social infrastructure including schools, hospitals and business hubs.",
        "Residential demand remains stable across major micro-markets for long-term value.",
      ],
    },
    amenities: [
      "Garden",
      "Power Backup",
      "Elevator",
      "Indoor Games",
      "Club House",
      "Gymnasium",
      "Jogging Track",
      "Swimming Pool",
      "24x7 Security",
      "Car Parking",
      "Children Play Area",
      "Rainwater Harvesting",
    ],
    projectHighlights: buildHighlights(city.city, locality),
    projectConnectivity: buildConnectivity(city.city, locality),
    aboutBuilder: {
      name: project.builder,
      logo: "/images/logo/favicon.png",
      tagline: "Trusted developer with strong delivery track record.",
      description: `${project.builder} has delivered multiple premium projects across major Indian cities with a focus on quality and timely possession.`,
      establishedYear: "1995",
      deliveredProjects: "120",
      ongoingProjects: "45",
      citiesCount: "12",
      cities: ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Chennai", "Pune"],
      keyProjects: [
        `${project.title} - ${city.city}`,
        `${project.builder} Signature One - ${city.city}`,
        `${project.builder} Prime Heights - ${city.city}`,
      ],
    },
    projectLocationMap: {
      address: `${locality}, ${city.city}, ${city.state}`,
      city: city.city,
      state: city.state,
      pincode: `56${String(100 + index).slice(-3)}`,
      landmark: `${locality} Metro Station`,
    },
    bhkPricingPlans: buildBhkPlans(Math.max(1, beds || 2), Math.max(850, sqft), Math.max(9800000, basePrice)),
  };
};

export const PROPERTY_SEED_DATA = Array.from({ length: 24 }, (_, index) =>
  buildRecord(index)
);

