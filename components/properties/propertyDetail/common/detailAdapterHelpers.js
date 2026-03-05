const toNumber = (value, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(String(value).replace(/[^0-9.]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const normalizeText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;

  if (Array.isArray(value)) {
    const cleaned = value
      .map((item) => normalizeText(item, ""))
      .map((item) => item.trim())
      .filter(Boolean);
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

const toArray = (value, fallback = []) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    const lines = value
      .split(/\r?\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (lines.length) return lines;
  }
  return Array.isArray(fallback) ? fallback : [];
};

const normalizeStringArray = (value, fallback = []) => {
  const source = toArray(value, fallback);
  return source
    .map((item) => normalizeText(item, ""))
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizePricingPlans = (value, fallback = []) => {
  const source = toArray(value, fallback);
  return source
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      return {
        id: normalizeText(item.id, `plan-${index + 1}`),
        ...item,
      };
    })
    .filter(Boolean);
};

export {
  toNumber,
  normalizeText,
  pickFirst,
  toArray,
  normalizeStringArray,
  normalizePricingPlans,
};
