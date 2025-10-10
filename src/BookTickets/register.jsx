import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BackgroundImage from "./BookTicketsImages/SHAN5640.jfif";
import Flight from "./BookTicketsImages/SHAN6371.jfif";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import './register.css';

export default function Register() {
    return (
        <main className="main-container">
            <HeroSection
                defaultTitle="Schools now's your chance! Pre-Registration for 2026 Open!!"
                defaultSubtitle="An immersive aviation experience built for the next generation of leaders. Reserve your place today."
                smallScreenTitle="Schools Pre-Registration for 2026"
                smallScreenSubtitle="For students, educators, and institutions - don't miss this aviation event!"
                buttonText="Schools Pre-Registration for 2026"
                buttonLink="https://avcon.ie/BookTickets"
            />

            <section className="event-container">
                <Box className="grid-container">
                    <div className="registration-section">
                            {/* <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    href="https://forms.office.com/r/jC8Laygn90"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    In-Person Registration
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href="https://forms.office.com/r/xwSzALCh3b"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    College Registration
                                </Button>
                            </Grid> */}
                    </div>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <div className="text-container">
                                <h2>Welcome Schools & Colleges</h2>
                                <p>
                                    We're back for <strong>AvCon: The Future of Aviation 2025</strong>!
                                    <br /><br />
                                    Whether you're a student, educator, or school administrator, this event is tailored to ignite your passion for aviation and aerospace. 
                                    <br /><br />
                                    Explore the future of flight, meet industry leaders, and witness innovation first-hand.
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="event-image">
                                <img src={BackgroundImage} alt="AvCon Event" className="event-image" />
                            </div>
                        </Grid>
                    </Grid>
                    <br/><br/>
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
                            aria-label="Schools Pre-Registration for 2026"
                        >
                            <span className="uppercase">Schools Pre-Registration for 2026</span>
                        </Link>
                    <br/><br/>
                    <Grid container spacing={4} alignItems="center" className="stream-section">
                        <Grid item xs={12} sm={6}>
                            <div className="event-image">
                                <img src={Flight} alt="Flight Experience" className="event-image" />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="corporate-section">
                                <h3>Corporate Attendees</h3>
                                <p>
                                    While AvCon is not open to the general public, we offer a limited number of <strong>Afterburner Corporate Access Passes</strong> for business leaders, sponsors, and partners.
                                    <br /><br />
                                    These passes provide exclusive event access, valuable networking, and branding opportunities - all while supporting the <strong>SkyBound Fund</strong> to keep the event free for students.
                                    <br /><br />
                                    <b>To secure your pass, email:</b> <a href="mailto:hello@avcon.ie">hello@avcon.ie</a>
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </section>
        </main>
    );
}
