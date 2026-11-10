import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import ContentCard from "../CommonComponents/ContentCard/ContentCard";
import Carousel from "./CarouselComponent/Carousel";
import "./ExhibitorRegistration.css";

import img1 from "./CarouselImages/_Pavilion 1 3D Back Angle.png";
import img2 from "./CarouselImages/_Pavilion 1 3D Front Angle.png";
import img3 from "./CarouselImages/_Pavilion 1 3D Plan.png";
import img4 from "./CarouselImages/3x2_Shell Run Angle.png";
import img5 from "./CarouselImages/3x2_Shell Run.png";
import img6 from "./CarouselImages/3x3 Stand Side View.png";
import FloorPlan from "./CarouselImages/FloorPlan2025.png";
import industryPhoto from "../Home/HomePageImages/_HAN6110.JPG";

const imageList = [FloorPlan, img1, img2, img3, img4, img5, img6];

const opportunityCards = [
  {
    title: "Partner",
    description:
      "Help develop future talent and strengthen tomorrow's industries.",
  },
  {
    title: "Showcase",
    description:
      "Bring your organisation, technology, products, services and career opportunities to life.",
  },
  {
    title: "Connect",
    description:
      "Meet students, educators, industry leaders and policymakers.",
  },
  {
    title: "Inspire",
    description:
      "Help young people discover careers and build your future workforce.",
  },
];

const involvementCards = [
  {
    title: "Become an AvCon Partner",
    description:
      "Engage students, educators and industry through exhibition space, interactive experiences and branding opportunities.",
    link: "https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUM1JSUUsyNVZWUEcxQTBXOUFSQlpRTlJJQi4u&route=shorturl",
    linkLabel: "Partner Expression of Interest →",
  },
  {
    title: "Become an AvCon Speaker",
    description:
      "Share your expertise, career journey or industry insights through talks, workshops and panel discussions.",
    link: "https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUN0o3V0dTUzFJVkRDT0VNSzUxTDBJR1lEQy4u&route=shorturl",
    linkLabel: "Speaker Expression of Interest →",
  },
  {
    title: "Join the AvCon Industry Network",
    description:
      "Connect with businesses, educators and professionals through networking and workforce initiatives.",
    link: "https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUMzZKTTE1SDZESFJHQ0tSRlk3RlNHMUk0Wi4u&route=shorturl",
    linkLabel: "Learn More About the Industry Network →",
  },
];

export default function IndustryOpportunities() {
  return (
    <div>
      <HeroSection
        defaultTitle="Partner. Showcase. Connect. Inspire."
        defaultSubtitle="Connect with students, educators and industry at AvCon."
        smallScreenTitle="Industry Opportunities"
        smallScreenSubtitle="Join Ireland's flagship Student & Industry Convention"
        eyebrow="Industry & partners"
        backgroundImage={industryPhoto}
      />

      <section className="exhibitor-content">
        <h2 className="exhibitor-heading">Get Involved with AvCon</h2>

        <p className="exhibitor-paragraph">
          Showcase innovation, share expertise and build partnerships with
          students, educators, industry and government.
        </p>

        {/* Opportunity Cards */}

        <div className="opportunity-grid">
          {opportunityCards.map((card) => (
            <ContentCard
              key={card.title}
              {...card}
              className="opportunity-card"
            />
          ))}
        </div>

        {/* Carousel */}

        <section className="content-section">
          <h3>Showcase Your Organisation</h3>

          <Carousel images={imageList} />
        </section>

        {/* Ways to get involved */}

        <section className="content-section">
          <h2>Choose How You'd Like to Get Involved</h2>

          <div className="involvement-grid">
            {involvementCards.map((card) => (
              <ContentCard
                key={card.title}
                title={card.title}
                description={card.description}
                className="involvement-card"
              >
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="industry-button"
                >
                  {card.linkLabel}
                </a>
              </ContentCard>
            ))}
          </div>
        </section>

        {/* Ecosystem */}

        <section className="content-section">
          <h2>More Than an Event</h2>

          <p className="exhibitor-paragraph">
            Beyond the annual Student &amp; Industry Convention, the
            Afterburner networking series and AvCon Industry &amp; Student
            Network bring industry, education and government together to share
            knowledge and build partnerships.
          </p>
        </section>

        {/* Contact */}

        <section className="contact-box">
          <h3>Ready to Get Involved?</h3>

          <p>Questions about partnering, speaking or joining the network?</p>

          <a href="mailto:hello@avcon.ie">hello@avcon.ie</a>
        </section>

      </section>
    </div>
  );
}
