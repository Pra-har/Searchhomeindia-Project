import Image from "next/image";
import React from "react";

const getCityFromLocation = (location) => {
  if (typeof location !== "string" || !location.trim()) return "Bangalore";
  const parts = location
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return parts[parts.length - 1] || "Bangalore";
};

const firstFilled = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    return value;
  }
  return undefined;
};

const resolveImageSrc = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "object") {
    if (typeof value.url === "string") return value.url.trim();
    if (typeof value.src === "string") return value.src.trim();
  }
  return "";
};

const toParagraphs = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export default function AboutProject({ property }) {
  const aboutSource = property?.aboutProject || {};

  const projectName = firstFilled(
    aboutSource?.projectName,
    aboutSource?.title,
    property?.projectName,
    property?.title,
    "Godrej Park Retreat"
  );

  const builder = firstFilled(
    aboutSource?.builderName,
    property?.builder,
    property?.developer?.name,
    property?.projectDetails?.builder,
    "Godrej Properties"
  );

  const location = firstFilled(
    aboutSource?.location,
    property?.location,
    property?.projectDetails?.location,
    "Sarjapur Road, Bangalore"
  );

  const city = getCityFromLocation(location);

  const projectLogo =
    resolveImageSrc(
      firstFilled(
        aboutSource?.logo,
        aboutSource?.projectLogo,
        property?.projectLogo,
        property?.logo,
        property?.builderLogo,
        property?.developer?.logo,
        property?.projectDetails?.logo
      )
    ) || "https://www.prominentrealty.in/assets/img/logo/godrej-logo.png";

  const overviewData = toParagraphs(
    firstFilled(
      aboutSource?.overview,
      aboutSource?.description,
      property?.description,
      property?.projectDetails?.overview
    )
  );
  const overviewParagraphs =
    overviewData.length > 0
      ? overviewData
      : [
          `${projectName} is built by ${builder} and is located at ${location}. It is designed as a premium residential address that offers a calm lifestyle in the heart of ${city}.`,
          `This residential project spans a large land parcel and offers elegant homes across multiple configurations to match different family needs and budgets.`,
          `${builder} is a well-known real estate brand with delivered projects and ongoing developments across key micro-markets. ${projectName} is planned with focus on quality construction, practical layouts, and long-term value for homebuyers.`,
        ];

  const cityReasonsData = toParagraphs(
    firstFilled(
      aboutSource?.whyCityReasons,
      aboutSource?.cityReasons,
      property?.projectDetails?.whyCityReasons
    )
  );
  const cityReasons =
    cityReasonsData.length > 0
      ? cityReasonsData
      : [
          `${city} has grown into a major cosmopolitan market with strong employment demand across technology and allied sectors.`,
          "The city offers good higher-education and research institutions, making it a preferred destination for students and professionals.",
          "With developing infrastructure, healthcare access, and broad connectivity, it remains a practical choice for long-term end-use and investment.",
        ];

  const whyCityHeading = firstFilled(
    aboutSource?.whyCityHeading,
    property?.projectDetails?.whyCityHeading,
    `Why choose ${city} to settle down?`
  );

  return (
    <section className="project-about" aria-labelledby="project-about-heading">
      <div className="about-head">
        <div className="about-title-media">
          <span className="about-thumb">
            <Image src={projectLogo} alt={`${builder} logo`} width={64} height={64} />
          </span>
          <h2 id="project-about-heading" className="wg-title text-11 fw-6 text-color-heading">
            About {projectName}
          </h2>
        </div>
      </div>

      <div className="about-block about-copy">
        {overviewParagraphs.map((paragraph, index) => (
          <p key={`overview-${index}`}>{paragraph}</p>
        ))}
      </div>

      <div className="about-block about-city">
        <h3>{whyCityHeading}</h3>
        {cityReasons.map((paragraph, index) => (
          <p key={`city-reason-${index}`}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
