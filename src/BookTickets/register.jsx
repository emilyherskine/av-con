import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import BackgroundImage from "./BookTicketsImages/SHAN5640.jfif";
import Flight from "./BookTicketsImages/SHAN6371.jfif";
import "./register.css";

export default function Register() {
    return (
        <main className="main-container">

            <HeroSection
                defaultTitle="AvCon 2026 School Registration Now Open"
                defaultSubtitle="Ireland's flagship free Student & Industry Convention returns Thursday, 8 October 2026."
                smallScreenTitle="Schools Registration 2026"
                smallScreenSubtitle="Bring your students into the future of aviation, aerospace and emerging industries."
                buttonText="Register Your School"
                buttonLink="https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUNUUyVEVDSUtXWkJHV0RBOVlNSko4MFlTVC4u&route=shorturl"
            />

            <section className="event-container">

                <Box className="grid-container">

                    {/* Introduction */}
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <div className="text-container">
                                <h2>Welcome Schools & Colleges</h2>

                                <p>
                                    AvCon 2026 will once again bring together
                                    thousands of students, educators, industry
                                    leaders and government representatives at
                                    Casement Aerodrome, Baldonnel, Co. Dublin.
                                </p>

                                <p>
                                    Students will explore the future of aviation,
                                    aerospace, engineering, defence, drones,
                                    space, sustainability and future mobility
                                    through interactive experiences, live
                                    demonstrations and conversations with
                                    professionals.
                                </p>

                                <p>
                                    Pre-register your school today to receive
                                    priority updates, teacher information packs
                                    and event announcements.
                                </p>

                                <a
                                    href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUNUUyVEVDSUtXWkJHV0RBOVlNSko4MFlTVC4u&route=shorturl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-link"
                                >
                                    Schools Registration for AvCon 2026
                                </a>
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


                    {/* Why Attend */}
                    <section className="content-section">

                        <Typography
                            variant="h4"
                            className="info-subtitle uppercase"
                        >
                            Why Attend AvCon?
                        </Typography>

                        <p>
                            AvCon gives students the opportunity to experience
                            industry first-hand and discover exciting career
                            pathways.
                        </p>

                        <ul>
                            <li>Meet employers, educators and professionals.</li>
                            <li>
                                Discover apprenticeships, college routes and
                                future careers.
                            </li>
                            <li>
                                Experience interactive exhibits and live
                                demonstrations.
                            </li>
                            <li>
                                Explore emerging technologies shaping future
                                industries.
                            </li>
                            <li>
                                Build confidence by connecting directly with
                                industry experts.
                            </li>
                        </ul>

                    </section>


                    {/* What Makes AvCon Different */}
                    <Grid
                        container
                        spacing={4}
                        alignItems="center"
                        className="content-section"
                    >

                        <Grid item xs={12} md={6}>
                            <img
                                src={Flight}
                                alt="AvCon aviation experience"
                                className="event-image"
                            />
                        </Grid>


                        <Grid item xs={12} md={6}>

                            <h2>
                                What Makes AvCon Different?
                            </h2>

                            <p>
                                AvCon isn't just another careers event.
                                Hosted in partnership with the Irish Air Corps
                                at Casement Aerodrome, students experience an
                                immersive environment where education meets
                                industry.
                            </p>

                            <p>
                                From aircraft and engineering to drones,
                                sustainability, aerospace, defence and space
                                technology, students gain real insight into
                                industries creating tomorrow's opportunities.
                            </p>

                            <p>
                                Thanks to the continued support of our partners
                                and the SkyBound Fund, attendance remains free
                                for schools and students.
                            </p>

                        </Grid>

                    </Grid>



                    {/* Registration */}
                    <section className="content-section">

                        <h2>
                            Register Early
                        </h2>

                        <p>
                            Demand continues to grow every year, with schools
                            travelling from across Ireland to attend AvCon.
                            Registering early ensures your school receives:
                        </p>


                        <ul>
                            <li>Priority event updates</li>
                            <li>Teacher information packs</li>
                            <li>Travel information</li>
                            <li>Programme announcements</li>
                            <li>Registration notifications</li>
                        </ul>


                        <a
                            href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUNUUyVEVDSUtXWkJHV0RBOVlNSko4MFlTVC4u&route=shorturl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-link"
                        >
                            Register Your School
                        </a>

                    </section>



                    {/* Live Stream */}
                    <section className="content-section">

                        <h2>
                            Can't Attend In Person?
                        </h2>

                        <p>
                            AvCon Live brings the experience directly into
                            classrooms across Ireland and around the world.
                            Students can take part in keynote talks, industry
                            discussions, demonstrations and career inspiration
                            wherever they are.
                        </p>


                        <a
                            href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUN003TjMxSkxXUVVKV1JLT1AyTUlTOVQxOS4u&route=shorturl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-link"
                        >
                            AvCon Live Stream Education Registration
                        </a>

                    </section>



                    {/* Corporate */}
                    <section className="corporate-section">

                        <h2>
                            Corporate & Industry Visitors
                        </h2>

                        <p>
                            While AvCon is not open to the general public,
                            limited Corporate Access Passes are available for
                            business leaders, partners and sponsors.
                        </p>


                        <p>
                            These passes provide event access, networking
                            opportunities and support the SkyBound Fund,
                            helping keep AvCon free for schools and students.
                        </p>


                        <strong>
                            For enquiries:
                        </strong>

                        <a href="mailto:hello@avcon.ie">
                            hello@avcon.ie
                        </a>

                    </section>



                    <blockquote>
                        Connecting Industry. Inspiring Talent. Shaping
                        Tomorrow's Workforce.
                        <br />
                        <strong>
                            The Sky is NOT the Limit. It's ONLY the Beginning.
                        </strong>
                    </blockquote>


                </Box>

            </section>

        </main>
    );
}