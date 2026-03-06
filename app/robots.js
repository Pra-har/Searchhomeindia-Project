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
          "/my-package/",
          "/add-property/",
          "/review/",
          "/saved-properties/",
        ],
      },
    ],
    sitemap: "https://searchhomesindia.com/sitemap.xml",
  };
}
