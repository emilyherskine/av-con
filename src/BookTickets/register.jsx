import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BackgroundImage from "./BookTicketsImages/SHAN5640.jfif";
import Flight from "./BookTicketsImages/SHAN6371.jfif";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import './register.css';

export default function Register() {
    return (
        <main className="main-container">
            <HeroSection
                defaultTitle="Schools & Colleges – Register Now for AvCon 2025!"
                defaultSubtitle="An immersive aviation experience built for the next generation of leaders. Reserve your place today."
                smallScreenTitle="AvCon 2025 Live Stream"
                smallScreenSubtitle="For students, educators, and institutions – don’t miss this aviation event!"
                buttonText="Watch The AvCon 2025 Live Stream"
                buttonLink="https://avcon.ie/BookTickets"
            />

            <section className="event-container">
                <Box className="grid-container">
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
                            <div className="text-center">
                                <img src={BackgroundImage} alt="AvCon Event" className="event-image" />
                            </div>
                        </Grid>
                    </Grid>

                    <div className="registration-section">
                        <h3 className="text-center">Watch The Live Stream</h3>
                            <div className="event-image">
                                <iframe
                                    src="https://www.youtube.com/embed/CedeUKKaW9U?si=vJjNGDnsc925lOpU"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
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
                        <br /><br />
                        <b>Important Notice: School and college registration for AvCon is now closed. Only Live Stream registration remains open. Please note this event is not open to the public. Entry will only be granted to those who have registered in advance and received official passes. For enquiries, please contact </b><a href="mailto:hello@avcon.ie">hello@avcon.ie</a>
                    </div>

                    <div className="corporate-section">
                        <h3 className="text-center">Corporate Attendees</h3>
                        <p className="text-container">
                            While AvCon is not open to the general public, we offer a limited number of <strong>Afterburner Corporate Access Passes</strong> for business leaders, sponsors, and partners.
                            <br /><br />
                            These passes provide exclusive event access, valuable networking, and branding opportunities - all while supporting the <strong>SkyBound Fund</strong> to keep the event free for students.
                            <br /><br />
                            <b>To secure your pass, email:</b> <a href="mailto:hello@avcon.ie">hello@avcon.ie</a>
                        </p>
                    </div>

                    <Grid container spacing={4} alignItems="center" className="stream-section">
                        <Grid item xs={12} sm={6}>
                            <div className="text-center">
                                <img src={Flight} alt="Flight Experience" className="event-image" />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="text-container">
                                <h3>Watch the Live Stream</h3>
                                <div className="event-image">
                                    <div className="video-container">
                                        <iframe
                                            src="https://www.youtube.com/embed/CedeUKKaW9U?si=vJjNGDnsc925lOpU"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </section>
        </main>
    );
}
