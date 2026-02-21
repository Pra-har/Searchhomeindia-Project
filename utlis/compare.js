export const COMPARE_STORAGE_KEY = "shi-compare-v1";
export const COMPARE_EVENT = "shi:compare-changed";
const COMPARE_NOTICE_KEY = "shi-compare-notice";
const DEFAULT_MAX_COMPARE = 4;

const canUseWindow = () => typeof window !== "undefined";

const normalizeText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  const parsed = String(value).trim();
  return parsed || fallback;
};

const parseStored = () => {
  if (!canUseWindow()) return [];
  try {
    const raw = window.localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistStored = (items) => {
  if (!canUseWindow()) return;
  window.localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(items));
};

const emitCompareChanged = (items, meta = {}) => {
  if (!canUseWindow()) return;
  window.dispatchEvent(
    new CustomEvent(COMPARE_EVENT, {
      detail: {
        count: items.length,
        ...meta,
      },
    })
  );
};

const uniqueById = (items = []) => {
  const map = new Map();
  items.forEach((item) => {
    const id = normalizeText(item?.id, "");
    if (!id) return;
    map.set(id, item);
  });
  return Array.from(map.values());
};

const setCompareNotice = (message = "") => {
  if (!canUseWindow()) return;
  const normalized = normalizeText(message, "");
  if (!normalized) {
    window.sessionStorage.removeItem(COMPARE_NOTICE_KEY);
    return;
  }
  window.sessionStorage.setItem(COMPARE_NOTICE_KEY, normalized);
};

export const popCompareNotice = () => {
  if (!canUseWindow()) return "";
  const value = normalizeText(window.sessionStorage.getItem(COMPARE_NOTICE_KEY), "");
  if (value) window.sessionStorage.removeItem(COMPARE_NOTICE_KEY);
  return value;
};

export const createComparePayload = (property = {}, options = {}) => {
  const fallbackId = normalizeText(property?.title, "property")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const id = normalizeText(options?.id ?? property?.id, fallbackId);
  const slug = normalizeText(options?.slug ?? property?.slug, "");
  const detailUrl = normalizeText(
    options?.url ??
      property?.url ??
      (slug ? `/property-detail/${slug}` : `/property-detail/${id}`),
    `/property-detail/${id}`
  );

  return {
    id,
    slug,
    url: detailUrl,
    title: normalizeText(options?.title ?? property?.title, "Property"),
    location: normalizeText(options?.location ?? property?.location, "Bangalore"),
    imageSrc: normalizeText(
      options?.imageSrc ??
        property?.imageSrc ??
        property?.mainImage?.src ??
        property?.propertyImage?.src,
      "/images/section/box-house.jpg"
    ),
    price: options?.price ?? property?.price ?? "",
    beds: options?.beds ?? property?.beds ?? "",
    baths: options?.baths ?? property?.baths ?? "",
    sqft: options?.sqft ?? property?.sqft ?? "",
    rating: options?.rating ?? property?.rating ?? "",
    projectRating: options?.projectRating ?? property?.projectRating ?? "",
    priceMin: options?.priceMin ?? property?.priceMin,
    priceMax: options?.priceMax ?? property?.priceMax,
    minPrice: options?.minPrice ?? property?.minPrice,
    maxPrice: options?.maxPrice ?? property?.maxPrice,
    startingPrice: options?.startingPrice ?? property?.startingPrice,
    endingPrice: options?.endingPrice ?? property?.endingPrice,
    configurations: options?.configurations ?? property?.configurations,
    possessionDate: options?.possessionDate ?? property?.possessionDate,
    avgPricePerSqft: options?.avgPricePerSqft ?? property?.avgPricePerSqft,
    builtUpRange: options?.builtUpRange ?? property?.builtUpRange,
    carpetArea: options?.carpetArea ?? property?.carpetArea,
    builtUpArea: options?.builtUpArea ?? property?.builtUpArea,
    developmentArea: options?.developmentArea ?? property?.developmentArea,
    totalUnits: options?.totalUnits ?? property?.totalUnits,
    parking: options?.parking ?? property?.parking,
    facing: options?.facing ?? property?.facing,
    totalFloors: options?.totalFloors ?? property?.totalFloors,
    statusType: options?.statusType ?? property?.statusType ?? property?.status,
    propertyType: options?.propertyType ?? property?.propertyType,
    projectReraId: options?.projectReraId ?? property?.projectReraId,
    reraId: options?.reraId ?? property?.reraId,
    projectDetails: options?.projectDetails ?? property?.projectDetails ?? {},
    addedAt: Date.now(),
  };
};

export const getComparedProperties = () => {
  const items = uniqueById(parseStored());
  return items.sort((a, b) => (a?.addedAt || 0) - (b?.addedAt || 0));
};

export const replaceComparedProperties = (items = [], max = DEFAULT_MAX_COMPARE) => {
  const normalized = uniqueById(items.map((item) => createComparePayload(item, item))).slice(
    0,
    Math.max(1, max)
  );
  persistStored(normalized);
  emitCompareChanged(normalized, { action: "replaced" });
  return normalized;
};

export const addCompareProperty = (property = {}, options = {}) => {
  const max = Math.max(1, Number(options?.max) || DEFAULT_MAX_COMPARE);
  const current = getComparedProperties();
  const payload = createComparePayload(property, options);
  const propertyId = normalizeText(payload?.id, "");
  if (!propertyId) {
    return { status: "invalid", items: current };
  }

  if (current.some((item) => normalizeText(item?.id, "") === propertyId)) {
    emitCompareChanged(current, { action: "exists", propertyId });
    return { status: "exists", items: current };
  }

  if (current.length >= max) {
    const notice = `Maximum ${max} properties can be compared at a time.`;
    setCompareNotice(notice);
    emitCompareChanged(current, { action: "limit", propertyId, message: notice });
    return { status: "limit", items: current };
  }

  const next = [...current, { ...payload, addedAt: Date.now() }];
  persistStored(next);
  emitCompareChanged(next, { action: "added", propertyId });
  return { status: "added", items: next };
};

export const removeCompareProperty = (id) => {
  const targetId = normalizeText(id, "");
  const current = getComparedProperties();
  if (!targetId) return current;
  const next = current.filter((item) => normalizeText(item?.id, "") !== targetId);
  persistStored(next);
  emitCompareChanged(next, { action: "removed", propertyId: targetId });
  return next;
};

export const clearCompareProperties = () => {
  persistStored([]);
  setCompareNotice("");
  emitCompareChanged([], { action: "cleared" });
};
