import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
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

/**
 * EcosystemCard Component
 * Displays individual ecosystem items
 */
const EcosystemCard = ({ title, text }) => (
    <Box className="info-card">
        <Typography variant="h5">{title}</Typography>
        <p>{text}</p>
    </Box>
);

/**
 * HighlightItem Component
 * Displays individual highlight items
 */
const HighlightItem = ({ text }) => (
    <Box className="highlight">{text}</Box>
);

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
            />

            {/* Introduction Section */}
            <section className="intro-section">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <img
                            src={PiletPhoto}
                            alt="AvCon Aviation"
                            className="home-image"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h3">
                            More Than an Event
                        </Typography>
                        <br />

                        <Typography variant="h5">
                            Building the Future of Aviation & Aerospace Together
                        </Typography>
                        <br />

                        <p>
                            AvCon is more than an annual event — it is a growing ecosystem
                            connecting industry, education and government throughout the year.
                        </p>

                        <p>
                            By creating opportunities for collaboration, career exploration
                            and workforce development, AvCon helps inspire future talent while
                            supporting the needs of the industry today.
                        </p>
                    </Grid>
                </Grid>
            </section>

            {/* Ecosystem Section */}
            <section className="section">
                <Typography variant="h3" align="center">
                    The AvCon Ecosystem
                </Typography>
                <br />
                <br />

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
                        <Typography variant="h3">
                            AvCon 2026 Student & Industry Convention
                        </Typography>

                        <Typography>
                            Inspiring the Next Generation
                        </Typography>
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
                    <a href={EXTERNAL_LINKS.studentConventionForm} className="btn-link">
                        Schools Register - AvCon 2026
                    </a>

                    <a href={EXTERNAL_LINKS.exhibitorRegistrationForm} className="btn-link">
                        Become a Partner
                    </a>
                </div>
            </section>

            {/* Industry & CTA Section */}
            <section className="final-section">
                <hr />
                <br />
                <br />

                <Typography variant="h3">
                    Why Organisations Get Involved
                </Typography>

                <p>
                    The future of aviation depends on the people entering the industry today.
                    AvCon gives organisations the opportunity to connect with future talent,
                    build relationships with education and contribute to tomorrow's workforce.
                </p>

                <div className="button-row">
                    {ACTION_LINKS.map((link) => (
                        <Link key={link.label} to={link.to} className="btn-link">
                            {link.label}
                        </Link>
                    ))}
                </div>

                <br />
                <hr />
                <br />
                <br />

                <Typography variant="h3">
                    Be Part of the Future
                </Typography>

                <Typography>
                    Connecting Industry. Inspiring Talent. Shaping Tomorrow's Workforce.
                </Typography>

                <div className="button-row">
                    <Link to="/bookTickets" className="btn-link">
                        Schools Register
                    </Link>

                    <Link to="/exhibitorRegistration" className="btn-link">
                        Industry Opportunities
                    </Link>

                    <Link to="/contact" className="btn-link">
                        Contact Us
                    </Link>
                </div>
            </section>
        </main>
    );
}