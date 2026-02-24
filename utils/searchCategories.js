export const SEARCH_CATEGORY_OPTIONS = [
  { label: "All", value: "all", icon: "icon-office" },
  { label: "Buy", value: "buy", icon: "icon-home" },
  { label: "Rental", value: "rental", icon: "icon-townhouse" },
  { label: "PG / Hostels", value: "pg-hostels", icon: "icon-bed" },
  { label: "Plot & Land", value: "plot-land", icon: "icon-location-2" },
  { label: "Commercial", value: "commercial", icon: "icon-office" },
  { label: "Villa", value: "villa", icon: "icon-home" },
  { label: "Individual House", value: "individual-house", icon: "icon-townhouse" },
];

export const SEARCH_CATEGORY_FALLBACK = SEARCH_CATEGORY_OPTIONS[0]?.value || "all";
