export const FAVORITES_STORAGE_KEY = "shi-favorites-v1";
export const FAVORITES_EVENT = "shi:favorites-changed";

const canUseWindow = () => typeof window !== "undefined";

const normalizeText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  const parsed = String(value).trim();
  return parsed || fallback;
};

const parseStored = () => {
  if (!canUseWindow()) return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistStored = (items) => {
  if (!canUseWindow()) return;
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
};

const emitFavoritesChanged = (items, meta = {}) => {
  if (!canUseWindow()) return;
  window.dispatchEvent(
    new CustomEvent(FAVORITES_EVENT, {
      detail: {
        count: items.length,
        ...meta,
      },
    })
  );
};

const uniqueById = (items) => {
  const map = new Map();
  items.forEach((item) => {
    const id = normalizeText(item?.id, "");
    if (!id) return;
    map.set(id, item);
  });
  return Array.from(map.values());
};

export const normalizeFavoriteCategory = (value) => {
  const parsed = normalizeText(value, "others").toLowerCase();
  if (parsed.includes("buy") || parsed.includes("sale")) return "Buy";
  if (parsed.includes("pg") || parsed.includes("hostel")) return "Pg";
  if (parsed.includes("rent") || parsed.includes("lease")) return "Rental";
  return "Others";
};

const inferCategory = (property = {}, explicitCategory = "") => {
  const byFlag = property?.forSale
    ? "Buy"
    : property?.forRent
      ? "Rental"
      : property?.isPg
        ? "Pg"
        : "Buy";

  return normalizeFavoriteCategory(
    explicitCategory ||
      property?.listingCategory ||
      property?.listingType ||
      property?.intent ||
      property?.typeOfListing ||
      byFlag
  );
};

const inferUrl = (property = {}, explicitUrl = "") => {
  const direct = normalizeText(explicitUrl, "");
  if (direct) return direct;
  if (property?.id !== undefined && property?.id !== null) {
    return `/property-detail/${property.id}`;
  }
  return "/property-listing";
};

export const createFavoritePayload = (property = {}, options = {}) => {
  const fallbackId = normalizeText(property?.title, "property")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const id = normalizeText(options.id ?? property?.id, fallbackId);

  return {
    id,
    title: normalizeText(options.title ?? property?.title, "Property"),
    location: normalizeText(options.location ?? property?.location, "Bangalore"),
    imageSrc: normalizeText(
      options.imageSrc ??
        property?.imageSrc ??
        property?.mainImage?.src ??
        property?.propertyImage?.src,
      "/images/section/box-house.jpg"
    ),
    price: options.price ?? property?.price ?? "",
    beds: options.beds ?? property?.beds ?? "",
    baths: options.baths ?? property?.baths ?? "",
    sqft: options.sqft ?? property?.sqft ?? "",
    category: inferCategory(property, options.category),
    url: inferUrl(property, options.url),
    savedAt: Date.now(),
  };
};

export const getSavedProperties = () => {
  const items = parseStored();
  const uniqueItems = uniqueById(items);
  return uniqueItems.sort((a, b) => (b?.savedAt || 0) - (a?.savedAt || 0));
};

export const getSavedCount = () => getSavedProperties().length;

export const isPropertySaved = (id) => {
  const normalizedId = normalizeText(id, "");
  if (!normalizedId) return false;
  return getSavedProperties().some((item) => normalizeText(item?.id, "") === normalizedId);
};

export const saveFavoriteProperty = (payload) => {
  const normalized = createFavoritePayload(payload, payload);
  const current = getSavedProperties();
  const filtered = current.filter(
    (item) => normalizeText(item?.id, "") !== normalizeText(normalized?.id, "")
  );
  const next = [{ ...normalized, savedAt: Date.now() }, ...filtered];
  persistStored(next);
  emitFavoritesChanged(next, {
    action: "added",
    propertyId: normalizeText(normalized?.id, ""),
  });
  return next;
};

export const removeFavoriteProperty = (id) => {
  const normalizedId = normalizeText(id, "");
  if (!normalizedId) return getSavedProperties();
  const next = getSavedProperties().filter(
    (item) => normalizeText(item?.id, "") !== normalizedId
  );
  persistStored(next);
  emitFavoritesChanged(next, {
    action: "removed",
    propertyId: normalizedId,
  });
  return next;
};

export const clearFavoriteProperties = () => {
  persistStored([]);
  emitFavoritesChanged([], {
    action: "cleared",
  });
};
