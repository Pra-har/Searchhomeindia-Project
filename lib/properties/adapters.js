import { normalizeCitySlug } from "@/utlis/citySearch";

const DEFAULT_IMAGE = "/images/section/box-house.jpg";

const toText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  if (typeof value === "string") {
    const parsed = value.trim();
    return parsed || fallback;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return fallback;
};

const firstFilled = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    return value;
  }
  return undefined;
};

const toNumber = (value, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const toSlug = (value, fallback = "property") => {
  const source = toText(value, fallback).toLowerCase();
  return source
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || fallback;
};

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
};

const parseImage = (entry) => {
  if (!entry) return "";
  if (typeof entry === "string") return entry.trim();
  if (typeof entry === "object") {
    return toText(firstFilled(entry.src, entry.url, entry.image, entry.imageSrc), "");
  }
  return "";
};

const normalizeImages = (raw) => {
  const normalized = toArray(raw)
    .map((entry) => parseImage(entry))
    .filter(Boolean);
  const unique = Array.from(new Set(normalized));
  return unique;
};

const inferIntent = (raw = {}) => {
  const source = toText(
    firstFilled(
      raw.intent,
      raw.listingType,
      raw.listing_type,
      raw.category,
      raw.typeOfListing,
      raw.transactionType,
      raw.transaction_type
    ),
    ""
  ).toLowerCase();

  if (raw.forRent || source.includes("rent") || source.includes("lease")) return "rental";
  if (raw.isPg || source.includes("pg") || source.includes("hostel")) return "pg";
  if (source.includes("commercial")) return "commercial";
  if (source.includes("villa")) return "villa";
  if (source.includes("plot") || source.includes("land")) return "plot-land";
  if (source.includes("house")) return "individual-house";
  return "buy";
};

const inferFavoriteCategory = (intent) => {
  if (intent === "rental") return "Rental";
  if (intent === "pg") return "Pg";
  if (intent === "buy") return "Buy";
  return "Others";
};

const extractCityFromLocation = (location, fallback = "all-india") => {
  const text = toText(location, "");
  if (!text) return fallback;
  const parts = text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const cityText = parts[parts.length - 1] || "";
  return normalizeCitySlug(cityText || fallback);
};

const normalizeBeds = (raw) => {
  const parsed = toNumber(raw, 0);
  return parsed > 0 ? parsed : 0;
};

const normalizeBaths = (raw, beds = 0) => {
  const parsed = toNumber(raw, 0);
  if (parsed > 0) return parsed;
  return beds > 0 ? Math.max(1, Math.min(5, beds)) : 0;
};

const normalizeArea = (raw) => {
  const parsed = toNumber(raw, 0);
  return parsed > 0 ? parsed : "";
};

const normalizePrice = (raw) => {
  const parsed = toNumber(raw, 0);
  return parsed > 0 ? parsed : "";
};

const normalizePropertyType = (raw = {}) =>
  toText(
    firstFilled(
      raw.propertyType,
      raw.property_type,
      raw.type,
      raw.subType,
      raw.sub_type,
      raw.unitType,
      raw.unit_type
    ),
    ""
  );

const normalizeStatus = (raw = {}) =>
  toText(firstFilled(raw.statusType, raw.status_type, raw.status), "");

const normalizeFacing = (raw = {}) =>
  toText(firstFilled(raw.facing, raw.facingType, raw.facing_type), "");

const normalizeTotalFloors = (raw = {}) =>
  toText(firstFilled(raw.totalFloors, raw.total_floors, raw.floors), "");

export const normalizePropertyRecord = (raw = {}, index = 0) => {
  const idSource = firstFilled(raw.id, raw.propertyId, raw.property_id, raw.uuid, raw.slug);
  const title = toText(firstFilled(raw.title, raw.name, raw.projectName, raw.project_name), `Property ${index + 1}`);
  const slug = toSlug(firstFilled(raw.slug, raw.propertySlug, raw.property_slug, title), `property-${index + 1}`);
  const id = toText(idSource, slug);

  const location = toText(
    firstFilled(raw.location, raw.address, raw.locality, raw.addressLine1, raw.address_line_1),
    "Bangalore"
  );

  const intent = inferIntent(raw);
  const beds = normalizeBeds(firstFilled(raw.beds, raw.bedrooms, raw.bhk, raw.bhkCount));
  const baths = normalizeBaths(firstFilled(raw.baths, raw.bathrooms), beds);
  const sqft = normalizeArea(
    firstFilled(raw.sqft, raw.area, raw.builtUpArea, raw.built_up_area, raw.superBuiltupArea)
  );
  const price = normalizePrice(firstFilled(raw.price, raw.minPrice, raw.min_price, raw.startingPrice));

  const images = normalizeImages(
    firstFilled(raw.images, raw.gallery, raw.media, raw.photoGallery, raw.photo_gallery)
  );
  const imageSrc = parseImage(
    firstFilled(
      raw.imageSrc,
      raw.image,
      raw.coverImage,
      raw.cover_image,
      raw.thumbnail,
      raw.mainImage?.src,
      images[0],
      DEFAULT_IMAGE
    )
  ) || DEFAULT_IMAGE;

  const citySlug = normalizeCitySlug(
    firstFilled(raw.citySlug, raw.city_slug, raw.city, extractCityFromLocation(location, "all-india"))
  );

  const propertyType = normalizePropertyType(raw);
  const status = normalizeStatus(raw);
  const facing = normalizeFacing(raw);
  const totalFloors = normalizeTotalFloors(raw);

  return {
    ...raw,
    id,
    slug,
    title,
    location,
    citySlug,
    intent,
    category: toText(firstFilled(raw.category, raw.favoriteCategory), inferFavoriteCategory(intent)),
    forSale: raw.forSale ?? intent === "buy",
    forRent: raw.forRent ?? intent === "rental",
    beds,
    baths,
    sqft,
    price,
    propertyType,
    status,
    facing,
    totalFloors,
    imageSrc,
    images: images.length ? images : [imageSrc],
    url: toText(firstFilled(raw.url, raw.path, raw.detailUrl, raw.detail_url), `/property-detail/${id}`),
    projectDetails: raw.projectDetails || raw.project_details || {},
    aboutProject: raw.aboutProject || raw.about_project || {},
    projectHighlights: raw.projectHighlights || raw.project_highlights || [],
    projectConnectivity: raw.projectConnectivity || raw.project_connectivity || [],
    amenities: raw.amenities || [],
    aboutBuilder: raw.aboutBuilder || raw.about_builder || {},
    projectLocationMap: raw.projectLocationMap || raw.project_location_map || {},
    bhkPricingPlans:
      raw.bhkPricingPlans ||
      raw.bhk_pricing_plans ||
      raw.priceFloorPlans ||
      raw.price_floor_plans ||
      [],
    mediaGallery: raw.mediaGallery || raw.media_gallery || [],
  };
};

export const normalizePropertyCollection = (items = []) =>
  toArray(items).map((item, index) => normalizePropertyRecord(item, index));

export const findPropertyByIdentifier = (items = [], identifier = "") => {
  const normalizedItems = normalizePropertyCollection(items);
  const target = toText(identifier, "").toLowerCase();
  if (!target) return null;

  return (
    normalizedItems.find((item) => String(item.id).toLowerCase() === target) ||
    normalizedItems.find((item) => String(item.slug).toLowerCase() === target) ||
    null
  );
};

