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
  icons: {
    icon: "/images/logo/favicon.png",
    shortcut: "/images/logo/favicon.png",
    apple: "/images/logo/favicon.png",
  },
  openGraph: {
    type: "website",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="shi-hydration-guard" strategy="beforeInteractive">
          {HYDRATION_GUARD_SCRIPT}
        </Script>
      </head>
      <body className="popup-loader" suppressHydrationWarning>
        {children}
        <LayoutClientEffects />
      </body>
    </html>
  );
}
