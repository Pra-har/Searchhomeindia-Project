export const CITY_CHANGE_EVENT = "shi:city-changed";
export const CITY_STORAGE_KEY = "shi:selected-city";
export const CITY_SOURCE_KEY = "shi:selected-city-source";

export const CITY_OPTIONS = [
  { label: "All India", slug: "all-india", lat: null, lon: null },
  { label: "Mumbai", slug: "mumbai", lat: 19.076, lon: 72.8777 },
  { label: "Delhi", slug: "delhi", lat: 28.6139, lon: 77.209 },
  { label: "Bangalore", slug: "bangalore", lat: 12.9716, lon: 77.5946 },
  { label: "Hyderabad", slug: "hyderabad", lat: 17.385, lon: 78.4867 },
  { label: "Chennai", slug: "chennai", lat: 13.0827, lon: 80.2707 },
  { label: "Pune", slug: "pune", lat: 18.5204, lon: 73.8567 },
  { label: "Kolkata", slug: "kolkata", lat: 22.5726, lon: 88.3639 },
  { label: "Ahmedabad", slug: "ahmedabad", lat: 23.0225, lon: 72.5714 },
  { label: "Surat", slug: "surat", lat: 21.1702, lon: 72.8311 },
  { label: "Jaipur", slug: "jaipur", lat: 26.9124, lon: 75.7873 },
  { label: "Lucknow", slug: "lucknow", lat: 26.8467, lon: 80.9462 },
  { label: "Kanpur", slug: "kanpur", lat: 26.4499, lon: 80.3319 },
  { label: "Nagpur", slug: "nagpur", lat: 21.1458, lon: 79.0882 },
  { label: "Indore", slug: "indore", lat: 22.7196, lon: 75.8577 },
  { label: "Thane", slug: "thane", lat: 19.2183, lon: 72.9781 },
  { label: "Bhopal", slug: "bhopal", lat: 23.2599, lon: 77.4126 },
  { label: "Visakhapatnam", slug: "visakhapatnam", lat: 17.6868, lon: 83.2185 },
  { label: "Patna", slug: "patna", lat: 25.5941, lon: 85.1376 },
  { label: "Vadodara", slug: "vadodara", lat: 22.3072, lon: 73.1812 },
  { label: "Ludhiana", slug: "ludhiana", lat: 30.901, lon: 75.8573 },
  { label: "Agra", slug: "agra", lat: 27.1767, lon: 78.0081 },
  { label: "Nashik", slug: "nashik", lat: 19.9975, lon: 73.7898 },
  { label: "Faridabad", slug: "faridabad", lat: 28.4089, lon: 77.3178 },
  { label: "Meerut", slug: "meerut", lat: 28.9845, lon: 77.7064 },
  { label: "Rajkot", slug: "rajkot", lat: 22.3039, lon: 70.8022 },
  { label: "Varanasi", slug: "varanasi", lat: 25.3176, lon: 82.9739 },
  { label: "Srinagar", slug: "srinagar", lat: 34.0837, lon: 74.7973 },
  { label: "Aurangabad", slug: "aurangabad", lat: 19.8762, lon: 75.3433 },
  { label: "Dhanbad", slug: "dhanbad", lat: 23.7957, lon: 86.4304 },
  { label: "Amritsar", slug: "amritsar", lat: 31.634, lon: 74.8723 },
  { label: "Navi Mumbai", slug: "navi-mumbai", lat: 19.033, lon: 73.0297 },
  { label: "Allahabad", slug: "allahabad", lat: 25.4358, lon: 81.8463 },
  { label: "Ranchi", slug: "ranchi", lat: 23.3441, lon: 85.3096 },
  { label: "Howrah", slug: "howrah", lat: 22.5958, lon: 88.2636 },
  { label: "Coimbatore", slug: "coimbatore", lat: 11.0168, lon: 76.9558 },
  { label: "Jabalpur", slug: "jabalpur", lat: 23.1815, lon: 79.9864 },
  { label: "Gwalior", slug: "gwalior", lat: 26.2183, lon: 78.1828 },
  { label: "Vijayawada", slug: "vijayawada", lat: 16.5062, lon: 80.648 },
  { label: "Jodhpur", slug: "jodhpur", lat: 26.2389, lon: 73.0243 },
  { label: "Madurai", slug: "madurai", lat: 9.9252, lon: 78.1198 },
  { label: "Raipur", slug: "raipur", lat: 21.2514, lon: 81.6296 },
  { label: "Kota", slug: "kota", lat: 25.2138, lon: 75.8648 },
  { label: "Guwahati", slug: "guwahati", lat: 26.1445, lon: 91.7362 },
  { label: "Chandigarh", slug: "chandigarh", lat: 30.7333, lon: 76.7794 },
  { label: "Solapur", slug: "solapur", lat: 17.6599, lon: 75.9064 },
  { label: "Hubli", slug: "hubli", lat: 15.3647, lon: 75.124 },
  { label: "Tiruchirappalli", slug: "tiruchirappalli", lat: 10.7905, lon: 78.7047 },
  { label: "Bareilly", slug: "bareilly", lat: 28.367, lon: 79.4304 },
  { label: "Mysore", slug: "mysore", lat: 12.2958, lon: 76.6394 },
  { label: "Tiruppur", slug: "tiruppur", lat: 11.1085, lon: 77.3411 },
  { label: "Gurgaon", slug: "gurgaon", lat: 28.4595, lon: 77.0266 },
  { label: "Aligarh", slug: "aligarh", lat: 27.8974, lon: 78.088 },
  { label: "Jalandhar", slug: "jalandhar", lat: 31.326, lon: 75.5762 },
  { label: "Bhubaneswar", slug: "bhubaneswar", lat: 20.2961, lon: 85.8245 },
  { label: "Salem", slug: "salem", lat: 11.6643, lon: 78.146 },
  { label: "Warangal", slug: "warangal", lat: 17.9689, lon: 79.5941 },
  { label: "Mira Bhayandar", slug: "mira-bhayandar", lat: 19.2952, lon: 72.8544 },
  { label: "Thiruvananthapuram", slug: "thiruvananthapuram", lat: 8.5241, lon: 76.9366 },
  { label: "Bhiwandi", slug: "bhiwandi", lat: 19.2813, lon: 73.0483 },
  { label: "Saharanpur", slug: "saharanpur", lat: 29.968, lon: 77.5552 },
  { label: "Guntur", slug: "guntur", lat: 16.3067, lon: 80.4365 },
  { label: "Amravati", slug: "amravati", lat: 20.9374, lon: 77.7796 },
  { label: "Bikaner", slug: "bikaner", lat: 28.0229, lon: 73.3119 },
  { label: "Noida", slug: "noida", lat: 28.5355, lon: 77.391 },
  { label: "Jamshedpur", slug: "jamshedpur", lat: 22.8046, lon: 86.2029 },
  { label: "Bhilai", slug: "bhilai", lat: 21.2093, lon: 81.4285 },
  { label: "Cuttack", slug: "cuttack", lat: 20.4625, lon: 85.883 },
  { label: "Firozabad", slug: "firozabad", lat: 27.1592, lon: 78.3957 },
  { label: "Kochi", slug: "kochi", lat: 9.9312, lon: 76.2673 },
  { label: "Bhavnagar", slug: "bhavnagar", lat: 21.7645, lon: 72.1519 },
  { label: "Dehradun", slug: "dehradun", lat: 30.3165, lon: 78.0322 },
  { label: "Durgapur", slug: "durgapur", lat: 23.5204, lon: 87.3119 },
  { label: "Asansol", slug: "asansol", lat: 23.6739, lon: 86.9524 },
  { label: "Nanded", slug: "nanded", lat: 19.1383, lon: 77.321 },
  { label: "Kolhapur", slug: "kolhapur", lat: 16.705, lon: 74.2433 },
  { label: "Ajmer", slug: "ajmer", lat: 26.4499, lon: 74.6399 },
  { label: "Akola", slug: "akola", lat: 20.7002, lon: 77.0082 },
  { label: "Gulbarga", slug: "gulbarga", lat: 17.3297, lon: 76.8343 },
  { label: "Jamnagar", slug: "jamnagar", lat: 22.4707, lon: 70.0577 },
  { label: "Ujjain", slug: "ujjain", lat: 23.1765, lon: 75.7885 },
  { label: "Loni", slug: "loni", lat: 28.7333, lon: 77.2833 },
  { label: "Siliguri", slug: "siliguri", lat: 26.7271, lon: 88.3953 },
  { label: "Jhansi", slug: "jhansi", lat: 25.4484, lon: 78.5685 },
  { label: "Ulhasnagar", slug: "ulhasnagar", lat: 19.2215, lon: 73.1645 },
  { label: "Nellore", slug: "nellore", lat: 14.4426, lon: 79.9865 },
  { label: "Jammu", slug: "jammu", lat: 32.7266, lon: 74.857 },
  { label: "Sangli", slug: "sangli", lat: 16.8524, lon: 74.5815 },
  { label: "Mangalore", slug: "mangalore", lat: 12.9141, lon: 74.856 },
  { label: "Erode", slug: "erode", lat: 11.341, lon: 77.7172 },
  { label: "Belgaum", slug: "belgaum", lat: 15.8497, lon: 74.4977 },
  { label: "Ambattur", slug: "ambattur", lat: 13.1143, lon: 80.1548 },
  { label: "Tirunelveli", slug: "tirunelveli", lat: 8.7139, lon: 77.7567 },
  { label: "Malegaon", slug: "malegaon", lat: 20.5579, lon: 74.5089 },
  { label: "Gaya", slug: "gaya", lat: 24.7914, lon: 85.0002 },
  { label: "Jalgaon", slug: "jalgaon", lat: 21.0077, lon: 75.5626 },
  { label: "Udaipur", slug: "udaipur", lat: 24.5854, lon: 73.7125 },
  { label: "Maheshtala", slug: "maheshtala", lat: 22.5058, lon: 88.2532 },
];

const CITY_MAP = new Map(CITY_OPTIONS.map((city) => [city.slug, city]));

export const RESERVED_TOP_LEVEL_ROUTES = new Set([
  "404",
  "add-property",
  "blog-details",
  "blog-grid",
  "career",
  "compare",
  "contact",
  "dashboard",
  "faq",
  "home-loan-process",
  "my-favorites",
  "my-package",
  "my-profile",
  "my-property",
  "my-saved-searches",
  "property-detail",
  "property-listing",
  "review",
  "saved-properties",
]);

const degToRad = (deg) => (deg * Math.PI) / 180;

const haversineDistanceKm = (lat1, lon1, lat2, lon2) => {
  const earthRadiusKm = 6371;
  const deltaLat = degToRad(lat2 - lat1);
  const deltaLon = degToRad(lon2 - lon1);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

export const normalizeCitySlug = (value = "") => {
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return "all-india";
  if (normalized === "india" || normalized === "all india") return "all-india";
  return CITY_MAP.has(normalized) ? normalized : "all-india";
};

export const getCityRoute = (slug = "all-india") => {
  const normalized = normalizeCitySlug(slug);
  return normalized === "all-india" ? "/" : `/${normalized}`;
};

export const getCityBySlug = (slug = "all-india") =>
  CITY_MAP.get(normalizeCitySlug(slug)) || CITY_MAP.get("all-india");

export const getCitySlugFromPath = (pathname = "/") => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  if (normalizedPath === "/") return "all-india";
  const firstSegment = normalizedPath.split("/").filter(Boolean)[0]?.toLowerCase() || "";
  if (!firstSegment || RESERVED_TOP_LEVEL_ROUTES.has(firstSegment)) return null;
  return normalizeCitySlug(firstSegment);
};

export const isCityHomePath = (pathname = "/") => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  if (normalizedPath === "/") return true;
  const firstSegment = normalizedPath.split("/").filter(Boolean)[0]?.toLowerCase() || "";
  if (!firstSegment || RESERVED_TOP_LEVEL_ROUTES.has(firstSegment)) return false;
  return normalizeCitySlug(firstSegment) !== "all-india";
};

export const readStoredCitySlug = () => {
  if (typeof window === "undefined") return "all-india";
  const stored = window.localStorage.getItem(CITY_STORAGE_KEY);
  return normalizeCitySlug(stored || "all-india");
};

export const readStoredCitySource = () => {
  if (typeof window === "undefined") return "default";
  return String(window.localStorage.getItem(CITY_SOURCE_KEY) || "default");
};

export const writeStoredCity = (slug, source = "manual") => {
  if (typeof window === "undefined") return;
  const normalized = normalizeCitySlug(slug);
  window.localStorage.setItem(CITY_STORAGE_KEY, normalized);
  window.localStorage.setItem(CITY_SOURCE_KEY, source);
  window.dispatchEvent(
    new CustomEvent(CITY_CHANGE_EVENT, {
      detail: {
        slug: normalized,
        source,
      },
    })
  );
};

export const findNearestCitySlug = (lat, lon) => {
  const candidates = CITY_OPTIONS.filter(
    (city) => city.slug !== "all-india" && typeof city.lat === "number" && typeof city.lon === "number"
  );
  if (!candidates.length) return "all-india";

  let nearest = candidates[0];
  let minDistance = Number.POSITIVE_INFINITY;

  candidates.forEach((city) => {
    const distance = haversineDistanceKm(lat, lon, city.lat, city.lon);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = city;
    }
  });

  return nearest?.slug || "all-india";
};

export const resolveCityFromBrowserLocation = () =>
  new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !navigator?.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position?.coords?.latitude;
        const lon = position?.coords?.longitude;
        if (typeof lat !== "number" || typeof lon !== "number") {
          reject(new Error("Invalid location coordinates"));
          return;
        }
        const slug = findNearestCitySlug(lat, lon);
        writeStoredCity(slug, "geo");
        resolve(slug);
      },
      (error) => reject(error),
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  });
