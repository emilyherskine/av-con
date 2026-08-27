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

const imageList = [FloorPlan, img1, img2, img3, img4, img5, img6];

const opportunityCards = [
  {
    title: "Partner",
    description:
      "Join a growing community committed to developing future talent and strengthening the industries of tomorrow.",
  },
  {
    title: "Showcase",
    description:
      "Demonstrate your organisation, technology, products, services and career opportunities through engaging experiences.",
  },
  {
    title: "Connect",
    description:
      "Build meaningful relationships with students, educators, industry leaders and policymakers.",
  },
  {
    title: "Inspire",
    description:
      "Help young people discover career pathways while supporting the future workforce your industry needs.",
  },
];

const involvementCards = [
  {
    title: "Become an AvCon Partner",
    description:
      "Showcase your organisation through exhibition space, interactive experiences, branding opportunities and meaningful engagement with students, educators and industry.",
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
      "Become part of a growing community connecting businesses, educators and professionals through networking, collaboration and workforce initiatives.",
    link: "https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUMzZKTTE1SDZESFJHQ0tSRlk3RlNHMUk0Wi4u&route=shorturl",
    linkLabel: "Learn More About the Industry Network →",
  },
];

export default function IndustryOpportunities() {
  return (
    <div>
      <HeroSection
        defaultTitle="Partner. Showcase. Connect. Inspire."
        defaultSubtitle="Join AvCon 2026 Partner. Showcase. Connect. Inspire."
        smallScreenTitle="Industry Opportunities"
        smallScreenSubtitle="Join Ireland's flagship Student & Industry Convention"
      />

      <section className="exhibitor-content">
        <h2 className="exhibitor-heading">Join AvCon 2026</h2>

        <p className="exhibitor-paragraph">
          AvCon brings together industry, education and government to inspire
          future talent, foster collaboration and shape tomorrow's workforce.
        </p>

        <p className="exhibitor-paragraph">
          Whether you're showcasing innovation, sharing expertise or building
          valuable industry connections, AvCon provides a platform to engage
          with the next generation while contributing to the future of our
          industries.
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
            AvCon is more than an annual event - it is a growing industry
            ecosystem connecting industry, education and government to inspire
            future talent, foster collaboration and shape tomorrow's workforce.
          </p>

          <p className="exhibitor-paragraph">
            Through the AvCon Student & Industry Convention, The Afterburner
            networking series and the AvCon Industry & Student Network, we
            create opportunities to showcase innovation, share knowledge and
            build meaningful partnerships.
          </p>
        </section>

        {/* Contact */}

        <section className="contact-box">
          <h3>Ready to Get Involved?</h3>

          <p>Partner. Showcase. Connect. Inspire.</p>

          <p>Questions?</p>

          <a href="mailto:hello@avcon.ie">hello@avcon.ie</a>
        </section>

        <blockquote>
          Partner. Showcase. Connect. Inspire.
          <br />
          <strong>
            Join the conversation. Inspire the next generation. Help shape
            tomorrow's workforce.
          </strong>
        </blockquote>
      </section>
    </div>
  );
}
