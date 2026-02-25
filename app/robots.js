export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/my-profile/",
          "/my-property/",
          "/my-favorites/",
          "/my-package/",
          "/my-saved-searches/",
          "/add-property/",
          "/review/",
          "/saved-properties/",
        ],
      },
    ],
    sitemap: "https://searchhomesindia.com/sitemap.xml",
  };
}
