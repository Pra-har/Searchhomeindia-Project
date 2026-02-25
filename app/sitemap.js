import { CITY_OPTIONS } from "@/utils/citySearch";
import { allProperties } from "@/data/properties";
import { blogCatalog as blogs } from "@/data/blogs";

const BASE_URL = "https://searchhomesindia.com";

export default function sitemap() {
  const staticPages = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/property-listing`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blog-listing`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/career`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/homeloan`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/post-property`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const cityPages = CITY_OPTIONS.filter((city) => city.slug !== "all-india").map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const propertyPages = (Array.isArray(allProperties) ? allProperties : []).map((property) => ({
    url: `${BASE_URL}/property-detail/${property.slug || property.id}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogPages = (Array.isArray(blogs) ? blogs : []).map((blog) => ({
    url: `${BASE_URL}/blog-details/${blog.slug || blog.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...cityPages, ...propertyPages, ...blogPages];
}
