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
                                    We're back for <strong>AvCon - The Future of Aviation & Aerospace 2026</strong>!
                                    <br /><br />
                                    Following two phenomenal years that inspired thousands of students across Ireland and beyond, AvCon 2025 once again proved why it’s Ireland’s leading free aviation and aerospace careers event - connecting students, teachers, and schools with the people and technologies shaping the future of flight.
                                    From aircraft displays and innovation zones to inspiring talks from engineers, pilots, recruiters, and space entrepreneurs, AvCon 2025 gave students a first-hand look at what’s possible - and the feedback from teachers, parents, and students has been incredible.
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
                        <div>
                            <br /><br />
                            <p>
                                Now, the journey continues. AvCon 2026 will be even bigger - expanding into a two-part experience that includes the AvCon Industry Convention and the student showcase day, hosted once again with the Irish Air Corps. And joining the mission is our sister event, DFCon - The Future of Careers, connecting pathways from Sea to Sky, Cyber to Construction, and showing how Defence Forces - inspired skills translate into real-world industries.
                                Thanks to the amazing support of our partners, the SkyBound Fund has already helped schools across the country with transport costs, ensuring that inspiration remains free and accessible. We’re now building the SkyBound Fund 2026, aiming to help even more schools attend AvCon and DFCon - opening doors for students who might otherwise never have the chance to experience these opportunities.
                                At AvCon, we believe that if students see it, they can dream it - and together, we’re helping them take the first step toward their future.
                            </p>
                        </div>
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
