import "../public/main.scss";
import "odometer/themes/odometer-theme-default.css"; // Import theme
import "photoswipe/style.css";
import "rc-slider/assets/index.css";
import LayoutClientEffects from "@/components/common/LayoutClientEffects";
import Script from "next/script";

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
