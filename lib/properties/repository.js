import { allProperties } from "@/data/properties";
import { PROPERTY_SEED_DATA } from "@/data/properties.seed";
import {
  findPropertyByIdentifier,
  normalizePropertyCollection,
  normalizePropertyRecord,
} from "./adapters";
import {
  parsePropertyListingSearchParams,
  toPropertyListingQueryString,
} from "./query";
import { normalizeCitySlug } from "@/utlis/citySearch";

const BACKEND_BASE_URL =
  process.env.DJANGO_API_BASE_URL ||
  process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL ||
  "";
const BACKEND_LIST_PATH = process.env.DJANGO_PROPERTIES_LIST_PATH || "/api/properties/";
const BACKEND_DETAIL_PATH = process.env.DJANGO_PROPERTIES_DETAIL_PATH || "/api/properties";

const LOCAL_DATASET = normalizePropertyCollection(
  (Array.isArray(PROPERTY_SEED_DATA) && PROPERTY_SEED_DATA.length
    ? PROPERTY_SEED_DATA
    : allProperties) || []
);

const toText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  if (typeof value === "string") {
    const parsed = value.trim();
    return parsed || fallback;
  }
  return String(value);
};

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const extractListItems = (payload) => {
  if (!payload || typeof payload !== "object") return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.properties)) return payload.properties;
  return [];
};

const extractPagination = (payload, query, fallbackCount) => {
  const pagination = payload?.pagination || payload?.meta?.pagination || {};
  const totalCount = toNumber(
    payload?.count ?? payload?.total ?? pagination?.totalCount ?? pagination?.total ?? fallbackCount,
    fallbackCount
  );
  const currentPage = toNumber(
    payload?.page ?? payload?.currentPage ?? pagination?.currentPage ?? query.page,
    query.page
  );
  const pageSize = toNumber(
    payload?.page_size ?? payload?.pageSize ?? pagination?.pageSize ?? query.pageSize,
    query.pageSize
  );
  return {
    totalCount: Math.max(0, totalCount),
    currentPage: Math.max(1, currentPage),
    pageSize: Math.max(1, pageSize),
  };
};

const normalizeDetailPayload = (payload) => {
  if (!payload) return null;
  if (Array.isArray(payload)) return payload[0] ? normalizePropertyRecord(payload[0], 0) : null;
  if (payload?.data && typeof payload.data === "object") return normalizePropertyRecord(payload.data, 0);
  return normalizePropertyRecord(payload, 0);
};

const buildBackendUrl = (path, queryString = "") => {
  if (!BACKEND_BASE_URL) return "";
  const base = BACKEND_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = `/${String(path || "").replace(/^\/+/, "")}`;
  const suffix = queryString ? `?${queryString}` : "";
  return `${base}${normalizedPath}${suffix}`;
};

const matchesCity = (property, citySlug) => {
  if (!citySlug || citySlug === "all-india") return true;
  if (normalizeCitySlug(property.citySlug) === citySlug) return true;

  const cityList = Array.isArray(property.cities) ? property.cities : [];
  return cityList.some((city) => normalizeCitySlug(city) === citySlug);
};

const matchesIntent = (property, intent) => {
  if (!intent || intent === "all") return true;
  if (property.intent === intent) return true;
  if (intent === "buy" && property.forSale) return true;
  if (intent === "rental" && property.forRent) return true;

  const propertyType = toText(property.propertyType, "").toLowerCase();
  if (intent === "commercial") return propertyType.includes("commercial");
  if (intent === "plot-land") return propertyType.includes("plot") || propertyType.includes("land");
  if (intent === "villa") return propertyType.includes("villa");
  if (intent === "individual-house")
    return propertyType.includes("house") || propertyType.includes("independent");

  return false;
};

const matchesType = (property, type) => {
  const normalizedType = toText(type, "").toLowerCase();
  if (!normalizedType) return true;

  const haystack = [
    toText(property.propertyType, ""),
    toText(property.category, ""),
    ...(Array.isArray(property.categories) ? property.categories : []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedType.replace(/-/g, " "));
};

const matchesBhk = (property, bhk) => {
  const normalizedBhk = toText(bhk, "").toLowerCase();
  if (!normalizedBhk) return true;
  const parsed = Number(normalizedBhk.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed) || parsed <= 0) return true;
  return Number(property.beds || 0) === parsed;
};

const matchesStatus = (property, status) => {
  const normalizedStatus = toText(status, "").toLowerCase();
  if (!normalizedStatus) return true;
  return toText(property.status, "").toLowerCase().includes(normalizedStatus);
};

const matchesTag = (property, tag) => {
  const normalizedTag = toText(tag, "").toLowerCase();
  if (!normalizedTag) return true;
  const allTags = [
    ...(Array.isArray(property.tags) ? property.tags : []),
    ...(Array.isArray(property.categories) ? property.categories : []),
    property.propertyType,
    property.status,
  ]
    .map((item) => toText(item, "").toLowerCase())
    .join(" ");
  return allTags.includes(normalizedTag);
};

const matchesKeyword = (property, query) => {
  const keyword = toText(query, "").toLowerCase();
  if (!keyword) return true;
  const haystack = [
    property.title,
    property.location,
    property.propertyType,
    property.status,
    property.category,
  ]
    .map((item) => toText(item, "").toLowerCase())
    .join(" ");
  return haystack.includes(keyword);
};

const matchesPrice = (property, min, max) => {
  const price = toNumber(property.price, 0);
  if (!price) return true;
  if (min > 0 && price < min) return false;
  if (max > 0 && price > max) return false;
  return true;
};

const matchesArea = (property, min, max) => {
  const area = toNumber(String(property.sqft).replace(/[^0-9.]/g, ""), 0);
  if (!area) return true;
  if (min > 0 && area < min) return false;
  if (max > 0 && area > max) return false;
  return true;
};

const sortProperties = (items, sort) => {
  const list = [...items];
  if (sort === "price-asc") {
    return list.sort((a, b) => toNumber(a.price, Number.MAX_SAFE_INTEGER) - toNumber(b.price, Number.MAX_SAFE_INTEGER));
  }
  if (sort === "price-desc") {
    return list.sort((a, b) => toNumber(b.price, 0) - toNumber(a.price, 0));
  }
  if (sort === "oldest") {
    return list.sort((a, b) => toNumber(a.id, 0) - toNumber(b.id, 0));
  }
  return list.sort((a, b) => toNumber(b.id, 0) - toNumber(a.id, 0));
};

const getLocalListingResult = (query) => {
  const filtered = LOCAL_DATASET.filter((property) => {
    if (!matchesCity(property, query.citySlug)) return false;
    if (!matchesIntent(property, query.intent)) return false;
    if (!matchesType(property, query.type)) return false;
    if (!matchesBhk(property, query.bhk)) return false;
    if (!matchesStatus(property, query.status)) return false;
    if (!matchesTag(property, query.tag)) return false;
    if (!matchesKeyword(property, query.query)) return false;
    if (!matchesPrice(property, query.priceMin, query.priceMax)) return false;
    if (!matchesArea(property, query.areaMin, query.areaMax)) return false;
    return true;
  });

  const sorted = sortProperties(filtered, query.sort);
  const totalCount = sorted.length;
  const start = (query.page - 1) * query.pageSize;
  const paginated = sorted.slice(start, start + query.pageSize);

  return {
    items: paginated,
    pagination: {
      totalCount,
      currentPage: query.page,
      pageSize: query.pageSize,
    },
    source: "local",
  };
};

const fetchBackendListing = async (query) => {
  if (!BACKEND_BASE_URL) return null;
  const queryString = toPropertyListingQueryString(query);
  const endpoint = buildBackendUrl(BACKEND_LIST_PATH, queryString);
  if (!endpoint) return null;

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;

    const payload = await response.json();
    const rawItems = extractListItems(payload);
    const items = normalizePropertyCollection(rawItems);
    const pagination = extractPagination(payload, query, items.length);

    return {
      items,
      pagination,
      source: "backend",
    };
  } catch {
    return null;
  }
};

const fetchBackendDetail = async (identifier) => {
  if (!BACKEND_BASE_URL) return null;
  const target = encodeURIComponent(toText(identifier, ""));
  if (!target) return null;

  const basePath = String(BACKEND_DETAIL_PATH || "/api/properties").replace(/\/+$/, "");
  const endpoint = buildBackendUrl(`${basePath}/${target}/`);
  if (!endpoint) return null;

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const payload = await response.json();
    return normalizeDetailPayload(payload);
  } catch {
    return null;
  }
};

export const getPropertyListing = async (searchParams = {}, options = {}) => {
  const query = parsePropertyListingSearchParams(searchParams, options);
  const backendResult = await fetchBackendListing(query);
  const result = backendResult || getLocalListingResult(query);
  return {
    ...result,
    query,
  };
};

export const getPropertyDetail = async (identifier) => {
  const normalizedIdentifier = toText(identifier, "");
  if (!normalizedIdentifier) return null;

  const backendProperty = await fetchBackendDetail(normalizedIdentifier);
  if (backendProperty) return backendProperty;

  return findPropertyByIdentifier(LOCAL_DATASET, normalizedIdentifier);
};

export const getRelatedProperties = (referenceProperty, limit = 6) => {
  const safeLimit = Math.max(1, toNumber(limit, 6));
  const referenceId = toText(referenceProperty?.id, "");
  const referenceCity = normalizeCitySlug(referenceProperty?.citySlug || "all-india");
  const referenceIntent = toText(referenceProperty?.intent, "buy");

  const baseList = LOCAL_DATASET.filter((item) => toText(item.id, "") !== referenceId);
  const sameCity = baseList.filter((item) => normalizeCitySlug(item.citySlug) === referenceCity);
  const sameIntent = sameCity.filter((item) => toText(item.intent, "") === referenceIntent);

  const merged = [...sameIntent, ...sameCity, ...baseList];
  const unique = [];
  const seen = new Set();
  for (const item of merged) {
    const id = toText(item.id, "");
    if (!id || seen.has(id)) continue;
    seen.add(id);
    unique.push(item);
    if (unique.length >= safeLimit) break;
  }
  return unique;
};
