import Categories from "@/components/common/Categories";
import TrendingProperty from "@/components/common/TrendingProperty";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import Blogs from "@/components/home/Blogs";
import Banner from "@/components/home/Banner";
import Brands from "@/components/common/Brands";
import Facts from "@/components/home/Facts";
import HelpCenter from "@/components/home/HelpCenter";
import HandpickedCategories from "@/components/home/HandpickedCategories";
import Hero from "@/components/home/Hero";
import Locations from "@/components/home/Locations";
import Properties from "@/components/home/Properties";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import ThemeController from "@/components/common/ThemeController";

export const metadata = {
  title: " Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
  description: "Search Homes India Best Real Estate Portal | Buy, Rent, or Sell",
};
export default function page() {
  return (
    <>
      <ThemeController themeColor={"theme-color-3"} />
      <div id="wrapper" className="counter-scroll">
        <Topbar />
        <Header />
        <Hero />
        <div className="main-content">
          <TrendingProperty />
          <HandpickedCategories />
          <Facts />
          <Categories />
          <Properties />
          <HelpCenter />
          <Locations />
          <Banner />
          <Testimonials />
          <Brands />
          <Services />
          <Blogs />
        </div>
        <Footer logo="/images/logo/shi_logo_white.png" />
      </div>
    </>
  );
}
