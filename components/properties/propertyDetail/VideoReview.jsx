"use client";
import Image from "next/image";
import ModalVideo from "../../common/ModalVideo";
import { useMemo, useState } from "react";

const firstFilled = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    return value;
  }
  return undefined;
};

const toText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string") {
    const parsed = value.trim();
    return parsed || fallback;
  }
  return fallback;
};

const toTags = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => toText(item, ""))
      .filter(Boolean)
      .slice(0, 4);
  }
  if (typeof value === "string") {
    return value
      .split(/[|,]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 4);
  }
  return [];
};

const parseYouTubeId = (url) => {
  if (typeof url !== "string") return "";
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  return match?.[1] || "";
};

export default function VideoReview({ property }) {
  const [isOpen, setIsOpen] = useState(false);

  const source = firstFilled(
    property?.videoReview,
    property?.projectVideo,
    property?.video,
    {}
  );

  const title = firstFilled(
    toText(firstFilled(source?.title, source?.heading), ""),
    `${toText(property?.title, "Project")} Video Walkthrough`
  );
  const subtitle = firstFilled(
    toText(firstFilled(source?.subtitle, source?.summary), ""),
    "Click to watch site visuals, amenities, and micro-market highlights."
  );
  const duration = firstFilled(toText(source?.duration, ""), "05:24");
  const ctaLabel = firstFilled(toText(firstFilled(source?.ctaLabel, source?.cta), ""), "Watch Full Video");
  const thumbnail = firstFilled(
    toText(firstFilled(source?.thumbnail, source?.poster, source?.image), ""),
    toText(property?.imageSrc, ""),
    "/images/section/property-detail.jpg"
  );
  const tags = useMemo(() => {
    const parsed = toTags(firstFilled(source?.tags, source?.highlights, source?.topics));
    if (parsed.length) return parsed;
    return ["Site Tour", "Amenities", "Location"];
  }, [source]);

  const videoId = firstFilled(
    toText(source?.videoId, ""),
    parseYouTubeId(toText(firstFilled(source?.url, source?.link), "")),
    "XHOmBV4js_E"
  );

  return (
    <>
      <section className="video-review" aria-labelledby="video-review-heading">
        <div className="project-section-head video-review-head">
          <h2 id="video-review-heading" className="wg-title text-11 fw-6 text-color-heading">
            Video Review
          </h2>
          <p>{subtitle}</p>
        </div>

        <button
          type="button"
          className="video-review-card"
          onClick={() => setIsOpen(true)}
          aria-label={`Open ${title} video`}
        >
          <div className="video-review-thumb">
            <Image
              className="lazyload"
              data-src={thumbnail}
              alt={title}
              src={thumbnail}
              width={1200}
              height={675}
            />
            <span className="video-duration">{duration}</span>
            <span className="video-play-btn" aria-hidden="true">
              <i className="icon-play" />
            </span>
            <div className="video-review-overlay">
              <h3>{title}</h3>
            </div>
          </div>

          <div className="video-review-meta">
            <div className="video-review-tags">
              {tags.map((item, index) => (
                <span className="video-tag" key={`video-tag-${index}-${item}`}>
                  {item}
                </span>
              ))}
            </div>
            <span className="video-review-cta">
              {ctaLabel}
              <i className="icon-arrow-right-3" />
            </span>
          </div>
        </button>
      </section>

      <ModalVideo
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        videoId={videoId}
      />
    </>
  );
}
