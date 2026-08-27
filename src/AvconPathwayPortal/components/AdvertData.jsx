import React from "react";
import ImageInfoCard from "./ImageInfoCard";

import IAA from "../AdvertImages/IAA.png";
import UCD from "../AdvertImages/UCD.png";

import "../AvconPathwayPortal.css";

export default function AdvertData() {
  const opportunities = [
    {
      image: IAA,
      title: "Irish Aviation Authority – Careers",
      description:
        "Explore career opportunities within Ireland’s aviation regulator.",
      url: "https://www.iaa.ie/careers",
      button: "View Careers",
    },

    {
      image: IAA,
      title: "Irish Aviation Authority – Training",
      description:
        "Professional aviation training delivered through industry experts.",
      url: "https://www.iaa.ie/training",
      button: "Explore Training",
    },

    {
      image: UCD,
      title: "SAR & InSAR Remote Sensing Micro-credential",
      description:
        "5 ECTS | 12 Weeks | Online. Learn advanced radar techniques in remote sensing.",
      url: "https://www.ucd.ie/microcredentials/explorecourses/physics/sar-insar-remote-sensing/",
      button: "Apply Now",
    },

    {
      image: UCD,
      title: "Engaging with ESA Micro-credential",
      description:
        "Level 9 | 5 ECTS | 6 Weeks. Explore ESA technologies and missions.",
      url: "https://www.ucd.ie/microcredentials/explorecourses/physics/engaging-with-esa/",
      button: "Apply Now",
    },
  ];

  return (
    <section className="advert-container" id="opportunities">
      <h2>Current Opportunities</h2>

      <p>
        Explore current aviation, aerospace and space opportunities. New
        pathways will continue to be added throughout the year.
      </p>

      <div className="card-grid">
        {opportunities.map((item, index) => (
          <ImageInfoCard
            key={index}
            imageUrl={item.image}
            title={item.title}
            description={item.description}
            webURL={item.url}
            linkLabel={item.button}
          />
        ))}
      </div>
    </section>
  );
}
