import { notFound, redirect } from "next/navigation";
import HomePage from "@/components/home/HomePage";
import { CITY_OPTIONS, normalizeCitySlug } from "@/utils/citySearch";

export async function generateStaticParams() {
  return CITY_OPTIONS.filter((city) => city.slug !== "all-india").map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const rawCity = String(city || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  const normalizedSlug = normalizeCitySlug(rawCity);
  const cityInfo = CITY_OPTIONS.find((c) => c.slug === normalizedSlug);
  const isValidCity = Boolean(cityInfo && cityInfo.slug !== "all-india");

  if (!isValidCity) {
    return {
      title: "City Not Found | Search Homes India",
      description:
        "The requested city page is not available. Browse verified properties across India on Search Homes India.",
      alternates: {
        canonical: "https://searchhomesindia.com",
      },
      robots: { index: false, follow: false },
    };
  }

  const cityLabel = cityInfo.label;

  const title = `Properties in ${cityLabel} | Buy & Rent Flats, Villas, Plots | Search Homes India`;
  const description = `Looking for property in ${cityLabel}? Browse verified flats, villas, plots and commercial properties to buy or rent in ${cityLabel}. Explore top builders and new launches on Search Homes India.`;
  const pageUrl = `https://searchhomesindia.com/${normalizedSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

const VALID_CITY_SLUGS = new Set(
  CITY_OPTIONS.filter((city) => city.slug !== "all-india").map((city) => city.slug)
);

export default async function CityHomePage({ params }) {
  const { city } = await params;
  const normalizedCity = String(city || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

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
