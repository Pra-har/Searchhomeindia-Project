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

export default function HomePage({ city = "all-india" }) {
  const normalizedCity = String(city || "all-india").toLowerCase();

  return (
    <>
      <ThemeController themeColor={"theme-color-3"} />
      <div id="wrapper" className="counter-scroll">
        <Topbar />
        <Header />
        <Hero city={normalizedCity} />
        <div className="main-content">
          <TrendingProperty />
          <HandpickedCategories />
          <Facts city={normalizedCity} />
          <Categories city={normalizedCity} />
          <Properties city={normalizedCity} />
          <HelpCenter />
          <Locations city={normalizedCity} />
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

