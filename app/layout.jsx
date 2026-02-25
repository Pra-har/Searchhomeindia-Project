import "../public/main.scss";
import "odometer/themes/odometer-theme-default.css"; // Import theme
import "photoswipe/style.css";
import "rc-slider/assets/index.css";
import LayoutClientEffects from "@/components/common/LayoutClientEffects";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://searchhomesindia.com"),
  title: {
    default: "Search Homes India | Buy, Rent & Sell Properties Across India",
    template: "%s | Search Homes India",
  },
  description:
    "Search Homes India - India's trusted real estate portal. Find flats, villas, plots and commercial properties to buy or rent across Mumbai, Delhi, Bangalore, Pune and 100+ cities.",
  keywords: [
    "real estate india",
    "property for sale india",
    "flats for rent",
    "buy property india",
    "search homes india",
    "property listing",
    "real estate portal india",
  ],
  alternates: {
    canonical: "https://searchhomesindia.com",
  },
  icons: {
    icon: "/images/logo/favicon.png",
    shortcut: "/images/logo/favicon.png",
    apple: "/images/logo/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Search Homes India",
    title: "Search Homes India | Buy, Rent & Sell Properties Across India",
    description:
      "Find verified flats, villas, plots and commercial properties across 100+ Indian cities. Search Homes India - your trusted real estate portal.",
    url: "https://searchhomesindia.com",
    images: [
      {
        url: "/images/logo/shi_logo_normal.png",
        width: 1200,
        height: 630,
        alt: "Search Homes India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@searchhomesindia",
    title: "Search Homes India | Buy, Rent & Sell Properties Across India",
    description:
      "Find verified flats, villas, plots and commercial properties across 100+ Indian cities.",
    images: ["/images/logo/shi_logo_normal.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const HYDRATION_GUARD_SCRIPT = `
  (function () {
    try {
      var ATTRS = ["__gchrome_uniqueid", "cz-shortcut-listen"];

      var stripAttrs = function (root) {
        if (!root || root.nodeType !== 1) return;
        for (var a = 0; a < ATTRS.length; a++) {
          if (root.hasAttribute && root.hasAttribute(ATTRS[a])) {
            root.removeAttribute(ATTRS[a]);
          }
        }

        if (!root.querySelectorAll) return;
        var nodes = root.querySelectorAll("*");
        for (var i = 0; i < nodes.length; i++) {
          for (var j = 0; j < ATTRS.length; j++) {
            if (nodes[i].hasAttribute(ATTRS[j])) {
              nodes[i].removeAttribute(ATTRS[j]);
            }
          }
        }
      };

      stripAttrs(document.documentElement);

      var observer = new MutationObserver(function (mutations) {
        for (var m = 0; m < mutations.length; m++) {
          var mutation = mutations[m];

          if (
            mutation.type === "attributes" &&
            ATTRS.indexOf(mutation.attributeName) !== -1 &&
            mutation.target &&
            mutation.target.nodeType === 1
          ) {
            mutation.target.removeAttribute(mutation.attributeName);
          }

          if (mutation.addedNodes && mutation.addedNodes.length) {
            for (var n = 0; n < mutation.addedNodes.length; n++) {
              stripAttrs(mutation.addedNodes[n]);
            }
          }
        }
      });

      observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ATTRS,
      });
    } catch (error) {
      // noop: hydration guard should never break app render
    }
  })();
`;

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Search Homes India",
  url: "https://searchhomesindia.com",
  logo: "https://searchhomesindia.com/images/logo/shi_logo_normal.png",
  image: "https://searchhomesindia.com/images/logo/shi_logo_normal.png",
  telephone: "+91-8147267372",
  email: "contact@searchhomesindia.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No 280, 3rd Floor, 5th Main Rd, 6th Sector, HSR Layout",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560102",
    addressCountry: "IN",
  },
  areaServed: ["India"],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Search Homes India",
  url: "https://searchhomesindia.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://searchhomesindia.com/property-listing?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="shi-hydration-guard" strategy="beforeInteractive">
          {HYDRATION_GUARD_SCRIPT}
        </Script>
      </head>
      <body className="popup-loader" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        {children}
        <LayoutClientEffects />
      </body>
    </html>
  );
}
