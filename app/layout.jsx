import "../public/main.scss";
import "odometer/themes/odometer-theme-default.css"; // Import theme
import "photoswipe/style.css";
import "rc-slider/assets/index.css";
import LayoutClientEffects from "@/components/common/LayoutClientEffects";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="popup-loader" suppressHydrationWarning>
        {children}
        <LayoutClientEffects />
      </body>
    </html>
  );
}