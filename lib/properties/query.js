import { normalizeCitySlug } from "@/utlis/citySearch";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 30;
const MAX_PAGE_SIZE = 100;

const toText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  if (Array.isArray(value)) return toText(value[0], fallback);
  const parsed = String(value).trim();
  return parsed || fallback;
};

const toNumber = (value, fallback) => {
  const parsed = Number(toText(value, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toBoundedInt = (value, fallback, min, max) => {
  const number = Math.round(toNumber(value, fallback));
  return Math.min(max, Math.max(min, number));
};

const normalizeIntent = (value) => {
  const parsed = toText(value, "").toLowerCase();
  if (!parsed || parsed === "all") return "all";
  if (parsed.includes("buy") || parsed.includes("sale")) return "buy";
  if (parsed.includes("rent") || parsed.includes("lease")) return "rental";
  if (parsed.includes("pg") || parsed.includes("hostel")) return "pg";
  if (parsed.includes("commercial")) return "commercial";
  if (parsed.includes("plot") || parsed.includes("land")) return "plot-land";
  if (parsed.includes("villa")) return "villa";
  if (parsed.includes("house") || parsed.includes("independent")) return "individual-house";
  return "all";
};

const normalizeSort = (value) => {
  const parsed = toText(value, "").toLowerCase();
  if (!parsed) return "default";
  if (["price-low-high", "price_asc", "price-asc"].includes(parsed)) return "price-asc";
  if (["price-high-low", "price_desc", "price-desc"].includes(parsed)) return "price-desc";
  if (["new", "newest", "latest"].includes(parsed)) return "newest";
  if (["old", "oldest"].includes(parsed)) return "oldest";
  return "default";
};

const normalizePriceBounds = (params) => {
  const priceMin = toNumber(params?.price_min ?? params?.priceMin, 0);
  const priceMax = toNumber(params?.price_max ?? params?.priceMax, 0);
  return {
    priceMin: priceMin > 0 ? priceMin : 0,
    priceMax: priceMax > 0 ? priceMax : 0,
  };
};

const normalizeAreaBounds = (params) => {
  const areaMin = toNumber(params?.area_min ?? params?.areaMin, 0);
  const areaMax = toNumber(params?.area_max ?? params?.areaMax, 0);
  return {
    areaMin: areaMin > 0 ? areaMin : 0,
    areaMax: areaMax > 0 ? areaMax : 0,
  };
};

export const parsePropertyListingSearchParams = (searchParams = {}, options = {}) => {
  const page = toBoundedInt(searchParams?.page, DEFAULT_PAGE, 1, 999999);
  const pageSize = toBoundedInt(
    searchParams?.pageSize ?? searchParams?.limit ?? searchParams?.page_size,
    DEFAULT_PAGE_SIZE,
    1,
    MAX_PAGE_SIZE
  );
  const citySlug = normalizeCitySlug(
    options?.citySlug ?? searchParams?.city ?? searchParams?.citySlug ?? "all-india"
  );

  const intent = normalizeIntent(searchParams?.intent ?? searchParams?.category ?? searchParams?.purpose);
  const segment = toText(searchParams?.segment, "");
  const type = toText(searchParams?.type, "");
  const status = toText(searchParams?.status, "");
  const bhk = toText(searchParams?.bhk, "");
  const tag = toText(searchParams?.tag, "");
  const query = toText(searchParams?.q ?? searchParams?.search ?? searchParams?.keyword, "");
  const sort = normalizeSort(searchParams?.sort ?? searchParams?.orderBy ?? searchParams?.ordering);

  const { priceMin, priceMax } = normalizePriceBounds(searchParams);
  const { areaMin, areaMax } = normalizeAreaBounds(searchParams);

  return {
    page,
    pageSize,
    citySlug,
    intent,
    segment,
    type,
    status,
    bhk,
    tag,
    query,
    sort,
    priceMin,
    priceMax,
    areaMin,
    areaMax,
  };
};

export const toPropertyListingQueryString = (query = {}) => {
  const params = new URLSearchParams();

  params.set("page", String(query.page || DEFAULT_PAGE));
  params.set("page_size", String(query.pageSize || DEFAULT_PAGE_SIZE));
  if (query.citySlug && query.citySlug !== "all-india") params.set("city", query.citySlug);
  if (query.intent && query.intent !== "all") params.set("intent", query.intent);
  if (query.segment) params.set("segment", query.segment);
  if (query.type) params.set("type", query.type);
  if (query.status) params.set("status", query.status);
  if (query.bhk) params.set("bhk", query.bhk);
  if (query.tag) params.set("tag", query.tag);
  if (query.query) params.set("q", query.query);
  if (query.sort && query.sort !== "default") params.set("sort", query.sort);
  if (query.priceMin > 0) params.set("price_min", String(query.priceMin));
  if (query.priceMax > 0) params.set("price_max", String(query.priceMax));
  if (query.areaMin > 0) params.set("area_min", String(query.areaMin));
  if (query.areaMax > 0) params.set("area_max", String(query.areaMax));

  return params.toString();
};

