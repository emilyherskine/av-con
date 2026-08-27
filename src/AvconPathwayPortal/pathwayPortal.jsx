import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import FirstImageAndText from "./components/firstBlockOfText";
import AdvertData from "./components/AdvertData";
import PathwayCard from "./components/PathwayCard";
import { Link } from "react-router-dom";
import "./AvconPathwayPortal.css";

export default function AvconPathwayPortal() {
  return (
    <div className="app-page">
      <HeroSection
        defaultTitle="AVIATION PATHWAY PORTAL (A.P.P.)"
        defaultSubtitle="Connecting students, graduates and professionals with opportunities across aviation, aerospace and space."
        smallScreenTitle="Aviation Pathway Portal"
        smallScreenSubtitle="Discover your pathway into the aviation industry."
        buttonText="Explore Opportunities"
        buttonLink="#opportunities"
      />

      <FirstImageAndText />

      <section className="pathway-section">
        <h2>Explore Aviation Pathways</h2>

        <p>
          Whether you're discovering aviation for the first time, preparing for
          your career, or looking to develop new skills, A.P.P connects you with
          opportunities across the aviation, aerospace and space industries.
        </p>

        <div className="pathway-grid">
          {[
            {
              title: "Work Experience",
              text: "Discover opportunities to gain real-world industry experience and explore aviation careers.",
            },
            {
              title: "Internships",
              text: "Find placements designed to develop practical skills and industry knowledge.",
            },
            {
              title: "Graduate Programmes",
              text: "Explore pathways helping graduates begin their professional journey.",
            },
            {
              title: "Courses & Training",
              text: "Access education, qualifications and professional development opportunities.",
            },
            {
              title: "Career Development",
              text: "Build your skills through workshops, resources and industry connections.",
            },
          ].map((item) => (
            <PathwayCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <AdvertData />

      <section className="industry-callout">
        <h2>Are You an Organisation Offering Opportunities?</h2>

        <p>
          Help shape the next generation of aviation professionals. Share your
          work experience placements, courses, internships, graduate programmes
          or training opportunities with the AvCon community.
        </p>

        <Link to="/ContactUs" className="app-button">
          Submit an Opportunity
        </Link>
      </section>
    </div>
  );
}
