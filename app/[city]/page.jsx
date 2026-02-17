import { notFound, redirect } from "next/navigation";
import HomePage from "@/components/home/HomePage";
import { CITY_OPTIONS } from "@/utlis/citySearch";

const VALID_CITY_SLUGS = new Set(
  CITY_OPTIONS.filter((city) => city.slug !== "all-india").map((city) => city.slug)
);

const normalizeIncomingSlug = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, "-");

export default async function CityHomePage({ params }) {
  const { city } = await params;
  const normalizedCity = normalizeIncomingSlug(city);

  if (!normalizedCity || normalizedCity === "all-india") {
    redirect("/");
  }

  if (city !== normalizedCity) {
    redirect(`/${normalizedCity}`);
  }

  if (!VALID_CITY_SLUGS.has(normalizedCity)) {
    notFound();
  }

  return <HomePage city={normalizedCity} />;
}

