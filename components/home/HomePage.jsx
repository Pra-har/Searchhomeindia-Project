import Categories from "@/components/common/Categories";
import TrendingProperty from "@/components/common/TrendingProperty";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import Blogs from "@/components/home/Blogs";
import AdsBanner from "@/components/home/AdsBanner";
import Brands from "@/components/common/Brands";
import Facts from "@/components/home/Facts";
import HelpCenter from "@/components/home/HelpCenter";
import HandpickedProjects from "@/components/home/HandpickedProjects";
import HighdemandProjects from "@/components/home/HighdemandProjects";
import Hero from "@/components/home/Hero";
// import Locations from "@/components/home/Locations";
import Cities from "@/components/home/Cities";
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
          <HandpickedProjects />
          <Facts city={normalizedCity} />
          <Categories city={normalizedCity} />
          <Properties city={normalizedCity} />
          <AdsBanner />
          <HighdemandProjects city={normalizedCity} />
          <HelpCenter />
          <Cities/>
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

