import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import ExternalLink from "../CommonComponents/ExternalLink/ExternalLink";

import BackgroundImage from "./BookTicketsImages/SHAN5640.jfif";
import Flight from "./BookTicketsImages/SHAN6371.jfif";

import "./register.css";

const introParagraphs = [
  "AvCon 2026 will once again bring together thousands of students, educators, industry leaders and government representatives at Casement Aerodrome, Baldonnel, Co. Dublin.",
  "Students will explore the future of aviation, aerospace, engineering, defence, drones, space, sustainability and future mobility through interactive experiences, live demonstrations and conversations with professionals.",
  "Register your school today to receive priority updates, teacher information packs and event announcements.",
];

const whyAttendItems = [
  "Meet employers, educators and professionals.",
  "Discover apprenticeships, college routes and future careers.",
  "Experience interactive exhibits and live demonstrations.",
  "Explore emerging technologies shaping future industries.",
  "Build confidence by connecting directly with industry experts.",
];

const whatMakesAvConParagraphs = [
  "AvCon isn't just another careers event. Hosted in partnership with the Irish Air Corps at Casement Aerodrome, students experience an immersive environment where education meets industry.",
  "From aircraft and engineering to drones, sustainability, aerospace, defence and space technology, students gain real insight into industries creating tomorrow's opportunities.",
  "Thanks to the continued support of our partners and the SkyBound Fund, attendance remains free for schools and students.",
];

const registrationPoints = [
  "Priority event updates",
  "Teacher information packs",
  "Travel information",
  "Programme announcements",
  "Registration notifications",
];

const corporateParagraphs = [
  "While AvCon is not open to the general public, limited Corporate Access Passes are available for business leaders, partners and sponsors.",
  "These passes provide event access, networking opportunities and support the SkyBound Fund, helping keep AvCon free for schools and students.",
];

const schoolRegistrationUrl =
  "https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUNUUyVEVDSUtXWkJHV0RBOVlNSko4MFlTVC4u&route=shorturl";

const collegeRegistrationUrl = "https://forms.cloud.microsoft/r/bKq0qMmnFY";

const liveStreamUrl = "https://streamyard.com/watch/fXQZNAES3G5A";

export default function Register() {
  return (
    <main className="main-container">
      {/* =========================================
          HERO
          ========================================= */}

      <HeroSection
        defaultTitle="AvCon 2026 School Registration Now Open"
        defaultSubtitle="Ireland's flagship free Student & Industry Convention returns Thursday, 8 October 2026."
        smallScreenTitle="Schools Registration 2026"
        smallScreenSubtitle="Bring your students into the future of aviation, aerospace and emerging industries."
        buttonText="Register Your School"
        buttonLink={schoolRegistrationUrl}
      />

      <section className="event-container" aria-labelledby="welcome-heading">
        <Box className="grid-container">
          {/* =========================================
              INTRODUCTION
              ========================================= */}

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <div className="text-container">
                <h2 id="welcome-heading">Welcome Schools &amp; Colleges</h2>

                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                <div className="registration-buttons">
                  <ExternalLink
                    href={schoolRegistrationUrl}
                    className="btn-link"
                  >
                    Register Your School
                  </ExternalLink>

                  <ExternalLink
                    href={collegeRegistrationUrl}
                    className="btn-link"
                  >
                    Register Your College
                  </ExternalLink>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <img
                src={BackgroundImage}
                alt="Students attending AvCon"
                className="event-image"
              />
            </Grid>
          </Grid>

          {/* =========================================
              WHY ATTEND
              ========================================= */}

          <section
            className="content-section"
            aria-labelledby="why-attend-heading"
          >
            <Typography
              component="h2"
              variant="h4"
              id="why-attend-heading"
              className="info-subtitle uppercase"
            >
              Why Attend AvCon?
            </Typography>

            <p>
              AvCon gives students the opportunity to experience industry
              first-hand and discover exciting career pathways.
            </p>

            <ul>
              {whyAttendItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* =========================================
              WHAT MAKES AVCON DIFFERENT
              ========================================= */}

          <section
            className="content-section"
            aria-labelledby="what-makes-avcon-heading"
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <img
                  src={Flight}
                  alt="Aircraft at AvCon demonstrating the aviation experience available to students"
                  className="event-image"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <h2 id="what-makes-avcon-heading">
                  What Makes AvCon Different?
                </h2>

                {whatMakesAvConParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Grid>
            </Grid>
          </section>

          {/* =========================================
              EARLY REGISTRATION
              ========================================= */}

          <section
            className="content-section"
            aria-labelledby="register-early-heading"
          >
            <h2 id="register-early-heading">Register Early</h2>

            <p>
              Demand continues to grow every year, with schools travelling from
              across Ireland to attend AvCon. Registering early ensures your
              school receives:
            </p>

            <ul>
              {registrationPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div
              className="registration-buttons"
              aria-label="AvCon registration options"
            >
              <ExternalLink href={schoolRegistrationUrl} className="btn-link">
                Register Your School
              </ExternalLink>

              <ExternalLink href={collegeRegistrationUrl} className="btn-link">
                Register Your College
              </ExternalLink>
            </div>
          </section>

          {/* =========================================
              LIVE STREAM
              ========================================= */}

          <section
            className="content-section"
            aria-labelledby="live-stream-heading"
          >
            <h2 id="live-stream-heading">Can&apos;t Attend In Person?</h2>

            <p>
              AvCon Live brings the experience directly into classrooms across
              Ireland and around the world. Students can take part in keynote
              talks, industry discussions, demonstrations and career inspiration
              wherever they are.
            </p>

            <ExternalLink href={liveStreamUrl} className="btn-link">
              AvCon Live Stream Education Registration
            </ExternalLink>
          </section>

          {/* =========================================
              CORPORATE & INDUSTRY
              ========================================= */}

          <section
            className="corporate-section"
            aria-labelledby="corporate-heading"
          >
            <h2 id="corporate-heading">Corporate &amp; Industry Visitors</h2>

            {corporateParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <p>
              <strong>For enquiries:</strong>{" "}
              <a
                href="mailto:hello@avcon.ie"
                aria-label="Email AvCon at hello@avcon.ie"
              >
                hello@avcon.ie
              </a>
            </p>
          </section>

          {/* =========================================
              CLOSING STATEMENT
              ========================================= */}

          <blockquote>
            <p>
              Connecting Industry. Inspiring Talent. Shaping Tomorrow&apos;s
              Workforce.
            </p>

            <strong>
              The Sky is NOT the Limit. It&apos;s ONLY the Beginning.
            </strong>
          </blockquote>
        </Box>
      </section>
    </main>
  );
}
