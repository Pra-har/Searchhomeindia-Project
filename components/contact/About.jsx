import React from "react";

const PRESENCE_CITIES = ["Bengaluru", "Chennai", "Pune", "Hyderabad", "Mumbai"];

export default function About() {
  return (
    <section className="section-contact-presence tf-spacing-2 pt-0">
      <div className="tf-container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contact-presence-card">
              <div className="heading-section text-center mb-24">
                <h2 className="title split-text effect-right">
                  Search Homes India Presence
                </h2>
                <p className="text-1">
                  We are actively serving clients across major Indian markets.
                </p>
              </div>

              <div className="presence-city-grid">
                {PRESENCE_CITIES.map((city) => (
                  <div className="presence-city-item" key={city}>
                    <span className="dot" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
