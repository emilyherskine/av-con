import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./LastBlockOfText.css";

export default function LastBlockOfText() {
    return (
        <Box component="section">
            <hr aria-hidden="true" />

            <Grid 
                container 
                spacing={4} 
                justifyContent="center" 
                alignItems="stretch" 
                style={{ padding: "2%" }}
            >
                {/* Left Column */}
                <Grid item xs={12} md={6}>
                    <article className="info-block text-light">
                        <Typography variant="h3" component="h3" className="info-title">
                            Don't miss your chance to hear from industry leaders, explore career paths, and discover the future of aviation — all from your screen.
                        </Typography>
                        <br/>
                        <Typography variant="h4" component="h4" className="info-subtitle uppercase">
                            Become an exhibitor
                        </Typography>
                        <Typography paragraph>
                            Put your product in front of 8000+ enthusiasts, industry experts, and the future best and brightest of the aviation industry.
                        </Typography>
                        <Link 
                            to="/ExhibitorRegistration" 
                            className="btn-link" 
                            aria-label="Join AvCon 2026 as a Sponsor or Exhibitor"
                        >
                            <span className="uppercase">Join AvCon 2025 as a Sponsor or Exhibitor</span>
                        </Link>
                    </article>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={6}>
                    <article className="info-block text-light">
                        <Typography variant="h4" component="h4" className="info-subtitle uppercase">
                            AvCon 2026 - Pre-Registration & Exhibitor Bookings Now Open!
                        </Typography>
                        <Typography paragraph>
                            Join the early birds for Ireland's largest aviation and aerospace careers event.
                            Schools can pre-register now for priority access.
                            Exhibitors and sponsors — book your place and connect with the next generation of aviation, aerospace, STEM, and logistics talent.
                        </Typography>
                        <Link 
                            to="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUNUUyVEVDSUtXWkJHV0RBOVlNSko4MFlTVC4u" 
                            className="btn-link" 
                            aria-label="Shcools Pre-Registration for 2026"
                        >
                            <span className="uppercase">Shcools Pre-Registration for 2026</span>
                        </Link>
                    </article>
                </Grid>
            </Grid>

            <hr aria-hidden="true" />
        </Box>
    );
}
