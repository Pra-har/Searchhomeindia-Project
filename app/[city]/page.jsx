import { notFound } from "next/navigation";

import Categories from "@/components/common/Categories";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
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
import { CITY_OPTIONS } from "@/utlis/citySearch";

const validCities = CITY_OPTIONS.filter((city) => city.slug !== "all-india").map(
  (city) => city.slug
);

export default function CityPage({ params }) {
  const { city } = params;

  if (!validCities.includes(city.toLowerCase())) {
    notFound();
  }

  return (
    <>
      <ThemeController themeColor={"theme-color-3"} />
      <div id="wrapper" className="counter-scroll">
        <Topbar />
        <Header />

        {/* Pass city to hero */}
        <Hero city={city} />

        <div className="main-content">
          <HandpickedCategories />
          <Facts city={city} />
          <Categories city={city} />
          <Properties city={city} />
          <HelpCenter />
          <Locations city={city} />
          <Banner />
          <Testimonials />
          <Brands />
          <Services />
        </div>

        <Footer logo="/images/logo/shi_logo_white.png" />
      </div>
    </>
  );
}
