import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import VideoEmbed from "../CommonComponents/VideoEmbed/VideoEmbed";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./Home.css";
import AVConBanner from "./HomePageImages/AVConBanner.jpg";
import PiletPhoto from "./HomePageImages/_HAN7008.JPG";
import {
  ECOSYSTEM_DATA,
  HIGHLIGHTS,
  ACTION_LINKS,
  HOME_CONFIG,
  EXTERNAL_LINKS,
} from "../constants";
import AVConSchedule from "../EventSchedule/EventScheduleImages/AVConSchedule2026.jpeg";
import AvConSpeakerSchedule from "../EventSchedule/EventScheduleImages/Speakers Hub Schedule.png";

/**
 * EcosystemCard Component
 * Displays individual ecosystem items
 */
const EcosystemCard = ({ title, text }) => (
  <Box className="info-card">
    <Typography variant="h5" component="h3">{title}</Typography>
    <p>{text}</p>
  </Box>
);

/**
 * HighlightItem Component
 * Displays individual highlight items
 */
const HighlightItem = ({ text }) => <Box className="highlight">{text}</Box>;

/**
 * Home Component
 * Main landing page with hero, ecosystem, and convention sections
 */
export default function Home() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <HeroSection
        defaultTitle={HOME_CONFIG.heroTitle}
        defaultSubtitle={HOME_CONFIG.heroSubtitle}
        smallScreenTitle={HOME_CONFIG.heroMobileTitle}
        smallScreenSubtitle={HOME_CONFIG.heroMobileSubtitle}
        buttonText={HOME_CONFIG.buttonText}
        buttonLink="/bookTickets"
        eyebrow="Aviation · Aerospace · Future talent"
      />

      <nav className="home-pathways" aria-label="Explore AvCon">
        <Link to="/bookTickets" className="home-pathway">
          <span className="home-pathway__label">For schools &amp; students</span>
          <strong>Discover your future <span aria-hidden="true">↗</span></strong>
          <span>Explore careers and pre-register for 2027.</span>
        </Link>
        <Link to="/exhibitorRegistration" className="home-pathway">
          <span className="home-pathway__label">For industry &amp; partners</span>
          <strong>Shape what comes next <span aria-hidden="true">↗</span></strong>
          <span>Connect with the next generation of talent.</span>
        </Link>
      </nav>

      {/* Introduction Section */}
      <section className="intro-section">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img src={PiletPhoto} alt="Air Corps personnel at an AvCon event" className="home-image" />
          </Grid>

          <Grid item xs={12} md={6}>
            <p className="section-eyebrow">The AvCon mission</p>
            <Typography variant="h3" component="h2">More Than an Event</Typography>

            <p>
              Beyond the annual convention, AvCon brings industry, education
              and government together year-round to open up careers, build
              partnerships and support Ireland's future workforce.
            </p>
          </Grid>
        </Grid>
      </section>

      {/* Ecosystem Section */}
      <section className="section">
        <p className="section-eyebrow home-section-eyebrow">Connecting people &amp; possibilities</p>
        <Typography variant="h3" component="h2" align="center">
          The AvCon Ecosystem
        </Typography>

        <Grid container spacing={3}>
          {ECOSYSTEM_DATA.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <EcosystemCard title={item.title} text={item.text} />
            </Grid>
          ))}
        </Grid>

        <div className="button-row">
          <Link to="/exhibitorRegistration" className="btn-link">
            Explore Industry Opportunities
          </Link>
        </div>
      </section>

      {/* Convention Section */}
      <section className="convention-section">
        <div className="banner-wrapper">
          <img
            src={AVConBanner}
            alt="AvCon 2026 Banner"
            className="banner-image"
          />

          <div className="banner-content">
            <Typography variant="h3" component="h2">
              AvCon Student & Industry Convention
            </Typography>

            <Typography>Inspiring the Next Generation</Typography>
          </div>
        </div>

        <Grid container spacing={2} className="highlight-grid">
          {HIGHLIGHTS.map((item, index) => (
            <Grid item xs={6} md={4} key={index}>
              <HighlightItem text={item} />
            </Grid>
          ))}
        </Grid>

        <div className="button-row">
          <a href={EXTERNAL_LINKS.avcon2027PreRegistrationForm} className="btn-link">
            Schools Pre-Register - AvCon 2027
          </a>

          <a
            href={EXTERNAL_LINKS.exhibitorRegistrationForm}
            className="btn-link"
          >
            Become a Partner
          </a>

        </div>
      </section>

      {/* Industry & CTA Section */}
      <section className="final-section">
        <hr />

        <Typography variant="h3" component="h2">Why Organisations Get Involved</Typography>

        <p>
          Connect with future talent, build relationships with education and
          contribute to tomorrow's aviation workforce.
        </p>

        <div className="button-row">
          {ACTION_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className="btn-link">
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/contact" className="home-contact-link">Questions? Contact the team <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="live-stream-section" aria-labelledby="live-stream-title">
        <div className="live-stream-heading">
          <p className="section-eyebrow">Previous event</p>
          <Typography variant="h2" component="h2" id="live-stream-title">
            Explore AvCon 2026
          </Typography>
          <p>Explore the 2026 stream and event schedules.</p>
        </div>

        <details className="home-archive">
          <summary>View AvCon 2026 stream and schedules</summary>
          <article className="stream-card stream-card--featured">
            <div className="stream-card__content">
              <p className="stream-card__description">
                AvCon 2026 was streamed on YouTube. Schools could register to
                submit questions during the broadcast.
              </p>
            </div>
            <VideoEmbed
              src="https://www.youtube.com/embed/R9WwaqI-8Lw"
              title="AvCon 2026 live stream"
            />
            <div className="stream-links">
              <a href="https://streamyard.com/watch/fXQZNAES3G5A" target="_blank" rel="noopener noreferrer" className="stream-link">
                2026 school questions link
              </a>
              <a href="https://tyhub.ie/ty-podcast/" target="_blank" rel="noopener noreferrer" className="stream-link">
                Also available on TY Hub
              </a>
            </div>
            <div className="video-grid">
              <a href={AVConSchedule} aria-label="Open the full-size AvCon 2026 event schedule">
                <img src={AVConSchedule} alt="AvCon 2026 event schedule" className="schedule-image" />
              </a>
              <a href={AvConSpeakerSchedule} aria-label="Open the full-size AvCon 2026 speakers hub schedule">
                <img src={AvConSpeakerSchedule} alt="AvCon 2026 speakers hub schedule" className="schedule-image" />
              </a>
            </div>
          </article>
        </details>
      </section>
    </main>
  );
}
