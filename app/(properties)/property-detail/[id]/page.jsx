import React from "react";
import { notFound } from "next/navigation";
import Breadcumb from "@/components/common/Breadcumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Details from "@/components/properties/propertyDetail/Details";
import PropertyMainSlider from "@/components/properties/propertyDetail/PropertyMainSlider";
import PropertyQuickNav from "@/components/properties/propertyDetail/PropertyQuickNav";
import RelatedProperties from "@/components/properties/propertyDetail/RelatedProperties";
import {
  getPropertyDetail,
  getRelatedProperties,
} from "@/lib/properties/repository";

const toNumber = (value, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const compactInr = (value) => {
  if (value >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(2)} L`;
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await getPropertyDetail(id);

  if (!property) {
    return {
      title: "Property Not Found | Search Homes India",
      description: "The requested property could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = property?.title || "Property Details";
  const location = property?.location || "Bangalore";
  const identifier = property?.slug || property?.id || id;
  const priceValue = toNumber(property?.price, 0);
  const normalizedPrice = priceValue < 100000 ? priceValue * 1000 : priceValue;
  const priceText =
    normalizedPrice > 0 ? ` Starting at \u20B9${compactInr(normalizedPrice)}.` : "";
  const description = `Explore ${title} in ${location}.${priceText} Get floor plans, amenities, location insights, and connect with Search Homes India for site visit and offers.`;
  const pageUrl = `/property-detail/${identifier}`;
  const imageUrl = property?.imageSrc || "/images/logo/favicon.png";

  return {
    title: `${title} | Property Details | Search Homes India`,
    description,
    keywords: [
      title,
      location,
      "property details",
      "real estate india",
      "search homes india",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      title: `${title} | Search Homes India`,
      description,
      url: pageUrl,
      siteName: "Search Homes India",
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Search Homes India`,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const property = await getPropertyDetail(id);
  if (!property) notFound();

  const relatedProperties = getRelatedProperties(property, 6);
  const identifier = property?.slug || property?.id || id;
  const priceValue = toNumber(property?.price, 0);
  const normalizedPrice = priceValue < 100000 ? priceValue * 1000 : priceValue;

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property?.title || "Property Listing",
    description: `Property details for ${property?.title || "listing"} in ${
      property?.location || "Bangalore"
    }.`,
    url: `/property-detail/${identifier}`,
    image: property?.imageSrc ? [property.imageSrc] : [],
    address: {
      "@type": "PostalAddress",
      streetAddress: property?.location || "Bangalore",
      addressCountry: "IN",
    },
    numberOfRooms: toNumber(property?.beds, 0) || undefined,
    floorSize: toNumber(property?.sqft, 0)
      ? {
          "@type": "QuantitativeValue",
          value: toNumber(property?.sqft, 0),
          unitCode: "SQF",
        }
      : undefined,
    offers:
      normalizedPrice > 0
        ? {
            "@type": "Offer",
            priceCurrency: "INR",
            price: normalizedPrice,
            availability: "https://schema.org/InStock",
          }
        : undefined,
  };

  return (
    <div id="wrapper">
      <Header />
      <Breadcumb
        items={[
          { label: "Home", href: "/" },
          { label: "Property Listing", href: "/property-listing" },
          { label: "Property Detail" },
          { label: property?.title || "Current Property" },
        ]}
      />
      <div className="main-content">
        <PropertyMainSlider property={property} />
        <PropertyQuickNav />
        <Details property={property} />
        <RelatedProperties items={relatedProperties} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      <Footer />
    </div>
  );
}



