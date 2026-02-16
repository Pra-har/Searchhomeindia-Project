export const homes = [
  { href: "/", label: "Home", isCurrent: true }
];

export const propertyLinks = [
  {
    title: "Property",
    submenu: [
      { href: "/property-listing", label: "All Listings" },
      { href: "/property-detail/1", label: "Featured Property" },
    ],
  },
  {
    title: "By City",
    submenu: [
      { href: "/mumbai", label: "Properties in Mumbai" },
      { href: "/delhi", label: "Properties in Delhi NCR" },
      { href: "/bangalore", label: "Properties in Bangalore" },
      { href: "/hyderabad", label: "Properties in Hyderabad" },
      { href: "/chennai", label: "Properties in Chennai" },
      { href: "/pune", label: "Properties in Pune" },
    ],
  },
];

export const otherPages = [
  { href: "/home-loan-process", label: "Home Loan Process" },
  { href: "/career", label: "Careers" },
  { href: "/faq", label: "FAQs" },
  { href: "/compare", label: "Compare" },
  { href: "/dashboard", label: "Dashboard" },
];

export const blogMenu = [
  { href: "/blog-grid", label: "All Blogs" },
  { href: "/blog-details/1", label: "Featured Article" },
];
