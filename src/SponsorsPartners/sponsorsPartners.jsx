import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sponsor from "./sponsor";
import "./SponsorsPartners.css";

// Images
import SponsoredBy from "./SponsorImages/1.png";
import AirCorpLogo from "./SponsorImages/AirCorpsLogo.jpeg";
import TYHubLogo from "./SponsorImages/TYHubLogo.jpg";
import All2025Sponsors from "./Sponsers.jpeg";


const SponsorImage = ({ src, alt }) => (
    <Box className="sponsor-image-wrapper">
        <img 
            src={src}
            alt={alt}
            className="sponsor-image"
        />
    </Box>
);


export default function SponsorsPartners() {

    return (

        <main className="sponsors-page">

            {/* Header */}
            <section className="sponsors-intro">

                <Typography 
                    variant="h3"
                    component="h1"
                    className="page-title"
                >
                    Our Sponsors & Partners
                </Typography>

                <Typography paragraph>

                    AvCon - The Future of Aviation is made possible through the
                    incredible support of our sponsors, exhibitors and partners.

                    Together, we bring industry, education and government together
                    to inspire the next generation of aviation, aerospace and STEM
                    professionals.

                </Typography>


                <Typography paragraph>

                    Through collaboration with organisations such as the Irish Air
                    Corps and TYHub.ie, AvCon creates meaningful opportunities for
                    students to discover career pathways, experience innovation and
                    connect with the people shaping the future of aviation.

                </Typography>

            </section>



            {/* Why Partners Matter */}

            <section className="partner-section">

                <Typography variant="h4">
                    Building The Future Together
                </Typography>
                <br />



                <Grid container spacing={3}>

                    <Grid item xs={12} md={4}>
                        <Box className="partner-card">

                            <h3>
                                Inspire Future Talent
                            </h3>

                            <p>
                                Help students discover exciting careers across
                                aviation, aerospace, engineering and emerging
                                technologies.
                            </p>

                        </Box>
                    </Grid>



                    <Grid item xs={12} md={4}>

                        <Box className="partner-card">

                            <h3>
                                Connect With Students
                            </h3>

                            <p>
                                Showcase your organisation and connect directly
                                with the next generation of industry talent.
                            </p>

                        </Box>

                    </Grid>



                    <Grid item xs={12} md={4}>

                        <Box className="partner-card">

                            <h3>
                                Shape Tomorrow
                            </h3>

                            <p>
                                Support workforce development and help build
                                Ireland's future aviation ecosystem.
                            </p>

                        </Box>

                    </Grid>


                </Grid>

            </section>




            {/* Sponsor Logos */}

            <section className="sponsors-section">


                <Typography variant="h4">
                    Proudly Supported By
                </Typography>


                <Grid container justifyContent="center">

                    <SponsorImage
                        src={SponsoredBy}
                        alt="AvCon Sponsored By"
                    />

                </Grid>



                <Grid container justifyContent="center">

                    <SponsorImage
                        src={All2025Sponsors}
                        alt="AvCon 2025 Sponsors"
                    />

                </Grid>


            </section>




            {/* Collaboration */}


            <section className="collaboration-section">


                <Typography variant="h4">
                    AvCon In Collaboration With
                </Typography>



                <Grid 
                    container 
                    spacing={4}
                    justifyContent="center"
                >

                    <Grid item xs={12} md={6}>

                        <Sponsor
                            logoUrl={AirCorpLogo}
                            sponsorName="Irish Air Corps"
                        />

                    </Grid>



                    <Grid item xs={12} md={6}>

                        <Sponsor
                            logoUrl={TYHubLogo}
                            sponsorName="TY Hub"
                        />

                    </Grid>


                </Grid>


            </section>




            {/* CTA */}

            <section className="sponsor-cta">

                <Typography variant="h4">
                    Become Part Of The Future
                </Typography>


                <Typography>
                    Join AvCon in inspiring future generations and supporting
                    Ireland's growing aviation and aerospace ecosystem.
                </Typography>


                <a 
                    href="/ExhibitorRegistration"
                    className="sponsor-button"
                >
                    Become A Partner
                </a>


            </section>


        </main>

    );

}
