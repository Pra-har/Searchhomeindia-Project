const DEFAULT_DETAILS = {
  title: "Godrej Parkshire",
  location: "Hoskote, Whitefield, Bangalore",
  beds: 3,
  baths: 3,
  builtUpAreaSqft: 4043,
  carpetAreaSqft: 3120,
  developmentArea: "16 Acres",
  configurations: "3, 4 BHK Apartments",
  possessionDate: "Jul 2028",
  avgPricePerSqft: 7167,
  builtUpRange: "3643 - 4343 sq.ft",
  totalUnits: "250 Units",
  parking: "Yes",
  facing: "East Facing",
  totalFloors: "G+2 & G+3 Villas Floors",
  statusType: "Ongoing",
  propertyType: "Farm house",
  reraId: "PRM/KA/RERA/1250/304/PR/090126/008393",
  marketTemperature: "warm",
};

const MARKET_ICON_MAP = {
  hot: "icon-star",
  warm: "icon-clock",
  cold: "icon-shield",
};

const toNumber = (value, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const formatInr = (value) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

const formatSqft = (value) => `${formatInr(value)} sq.ft`;

const normalizeText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  if (Array.isArray(value)) {
    const cleaned = Array.from(
      new Set(
        value
          .map((item) => normalizeText(item, ""))
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );
    return cleaned.length ? cleaned.join(", ") : fallback;
  }
  if (typeof value === "object") {
    if (typeof value.label === "string" && value.label.trim()) return value.label.trim();
    if (typeof value.name === "string" && value.name.trim()) return value.name.trim();
    if (typeof value.value === "string" && value.value.trim()) return value.value.trim();
    return fallback;
  }
  const parsed = String(value).trim();
  return parsed || fallback;
};

const pickFirst = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    return value;
  }
  return undefined;
};

const normalizeTemperature = (value) => {
  const parsed = normalizeText(value, DEFAULT_DETAILS.marketTemperature).toLowerCase();
  if (parsed.includes("hot")) return "hot";
  if (parsed.includes("cold")) return "cold";
  return "warm";
};

const isReraUnavailable = (value) => {
  const parsed = normalizeText(value, "").toLowerCase();
  if (!parsed) return true;
  return (
    parsed.includes("pending") ||
    parsed.includes("not received") ||
    parsed.includes("unregistered") ||
    parsed === "no" ||
    parsed === "false"
  );
};

export const getPropertyDetailAdapter = (property) => {
  const details = property?.projectDetails || {};

  const title = normalizeText(property?.title, DEFAULT_DETAILS.title);
  const location = normalizeText(property?.location ?? details?.location, DEFAULT_DETAILS.location);
  const beds = toNumber(property?.beds ?? details?.beds, DEFAULT_DETAILS.beds);
  const baths = toNumber(property?.baths ?? details?.baths, DEFAULT_DETAILS.baths);

  const builtUpAreaSqft = toNumber(
    pickFirst(
      property?.builtUpArea,
      property?.builtupArea,
      details?.builtUpArea,
      details?.builtupArea,
      property?.sqft,
      details?.sqft
    ),
    DEFAULT_DETAILS.builtUpAreaSqft
  );

  const carpetAreaSqft = toNumber(
    pickFirst(property?.carpetArea, details?.carpetArea),
    Math.max(500, Math.round(builtUpAreaSqft * 0.77))
  );

  const configurations = normalizeText(
    pickFirst(
      property?.configurations,
      property?.configuration,
      property?.bhkType,
      details?.configurations,
      details?.configuration
    ),
    DEFAULT_DETAILS.configurations
  );

  const possessionDate = normalizeText(
    pickFirst(property?.possessionDate, details?.possessionDate),
    DEFAULT_DETAILS.possessionDate
  );

  const avgPricePerSqft = toNumber(
    pickFirst(property?.avgPricePerSqft, details?.avgPricePerSqft),
    DEFAULT_DETAILS.avgPricePerSqft
  );

  const builtUpRange = normalizeText(
    pickFirst(property?.builtUpRange, details?.builtUpRange, property?.sizeRangeBuiltUp),
    `${formatInr(Math.max(800, builtUpAreaSqft - 400))} - ${formatInr(
      builtUpAreaSqft + 300
    )} sq.ft`
  );

  const developmentArea = normalizeText(
    pickFirst(property?.developmentArea, details?.developmentArea),
    DEFAULT_DETAILS.developmentArea
  );

  const totalUnits = normalizeText(
    pickFirst(property?.totalUnits, details?.totalUnits),
    DEFAULT_DETAILS.totalUnits
  );

  const parking = normalizeText(
    pickFirst(property?.parking, details?.parking),
    DEFAULT_DETAILS.parking
  );

  const facing = normalizeText(
    pickFirst(property?.facing, details?.facing),
    DEFAULT_DETAILS.facing
  );

  const totalFloors = normalizeText(
    pickFirst(property?.totalFloors, property?.floors, details?.totalFloors),
    DEFAULT_DETAILS.totalFloors
  );

  const statusType = normalizeText(
    pickFirst(property?.statusType, property?.status, details?.statusType),
    DEFAULT_DETAILS.statusType
  );

  const propertyType = normalizeText(
    pickFirst(
      property?.propertyType,
      property?.type,
      details?.propertyType,
      Array.isArray(property?.categories) ? property.categories[0] : undefined
    ),
    DEFAULT_DETAILS.propertyType
  );

  const reraId = normalizeText(
    pickFirst(property?.projectReraId, property?.reraId, details?.projectReraId, details?.reraId),
    DEFAULT_DETAILS.reraId
  );

  const explicitReraStatus = pickFirst(
    property?.reraStatus,
    details?.reraStatus,
    property?.isReraVerified,
    property?.reraVerified
  );
  const explicitReraText = normalizeText(explicitReraStatus, "").toLowerCase();
  const explicitReraTrue =
    explicitReraStatus === true ||
    explicitReraText === "true" ||
    explicitReraText.includes("verified") ||
    explicitReraText.includes("received") ||
    explicitReraText.includes("registered") ||
    explicitReraText === "yes";
  const explicitReraFalse = explicitReraText && isReraUnavailable(explicitReraText);
  const hasRera = explicitReraTrue || (!explicitReraFalse && !isReraUnavailable(reraId));

  const marketTemperature = normalizeTemperature(
    pickFirst(property?.marketTemperature, property?.marketHeat, details?.marketTemperature)
  );

  const trustBadge = hasRera
    ? {
        type: "verified",
        label: "RERA Received",
        iconClass: "icon-check-cycle",
      }
    : {
        type: marketTemperature,
        label: `${marketTemperature[0].toUpperCase()}${marketTemperature.slice(1)} Property`,
        iconClass: MARKET_ICON_MAP[marketTemperature] || MARKET_ICON_MAP.warm,
      };

  const brochureUrl = normalizeText(
    pickFirst(property?.brochureUrl, property?.brochure, details?.brochureUrl, details?.brochure),
    ""
  );

  const videoUrl = normalizeText(
    pickFirst(property?.videoUrl, property?.video, details?.videoUrl, details?.video),
    ""
  );

  return {
    title,
    location,
    beds,
    baths,
    configurations,
    possessionDate,
    avgPricePerSqft,
    builtUpRange,
    carpetArea: formatSqft(carpetAreaSqft),
    builtUpArea: formatSqft(builtUpAreaSqft),
    developmentArea,
    totalUnits,
    parking,
    facing,
    totalFloors,
    statusType,
    propertyType,
    reraId,
    trustBadge,
    brochureUrl,
    videoUrl,
  };
};
