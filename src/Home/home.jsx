import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./Home.css";

import AVConBanner from "./HomePageImages/AVConBanner.jpg";
import PiletPhoto from "./HomePageImages/_HAN7008.JPG";


export default function Home() {

    const ecosystem = [
        {
            title:"Student & Industry Convention",
            text:"Ireland's flagship aviation and aerospace careers event connecting thousands of students with employers, educators and industry leaders."
        },
        {
            title:"Afterburner Networking",
            text:"Networking events bringing professionals, educators and government together to discuss the future of aviation and aerospace."
        },
        {
            title:"Industry Network",
            text:"A collaborative community supporting workforce development through partnerships, workshops and shared initiatives."
        }
    ];


    const highlights = [
        "8,000+ Students In Person",
        "10,000+ Live Stream Viewers",
        "Aviation & Aerospace Careers",
        "Industry Speakers",
        "Interactive Experiences",
        "Future Technologies"
    ];


    return (

        <main className="home-page">


            <HeroSection
                defaultTitle="Connecting Industry. Inspiring Talent. Shaping Tomorrow's Workforce."
                defaultSubtitle="Ireland's aviation and aerospace ecosystem bringing together industry, education and government to create opportunities, inspire careers and build the workforce of the future."
                smallScreenTitle="AvCon 2026"
                smallScreenSubtitle="Connecting students, industry and the future of aviation."
                buttonText="Schools Pre-Register 2026"
                buttonLink="https://avcon.ie/BookTickets"
            />



            {/* INTRO */}

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
                        <br/>

                        <Typography variant="h5">
                            Building the Future of Aviation & Aerospace Together
                        </Typography>
                        <br/>


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




            {/* ECOSYSTEM */}

            <section className="section">

                <Typography variant="h3" align="center">
                    The AvCon Ecosystem
                </Typography>
                <br/><br/>


                <Grid container spacing={3}>

                    {ecosystem.map((item,index)=>(

                        <Grid item xs={12} md={4} key={index}>

                            <Box className="info-card">

                                <Typography variant="h5">
                                    {item.title}
                                </Typography>

                                <p>
                                    {item.text}
                                </p>

                            </Box>

                        </Grid>

                    ))}

                </Grid>


                <div className="button-row">

                    <Link 
                        to="/ExhibitorRegistration"
                        className="btn-link"
                    >
                        Explore Industry Opportunities
                    </Link>

                </div>

            </section>




            {/* CONVENTION */}

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

                    {highlights.map((item,index)=>(

                        <Grid item xs={6} md={4} key={index}>

                            <Box className="highlight">

                                {item}

                            </Box>

                        </Grid>

                    ))}

                </Grid>



                <div className="button-row">

                    <Link 
                        to="https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUNUUyVEVDSUtXWkJHV0RBOVlNSko4MFlTVC4u&route=shorturl"
                        className="btn-link"
                    >
                        Schools Register - AvCon 2026
                    </Link>


                    <Link 
                        to="https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUNkRXQ0FVRDlZQ0pVWEhLUUM2RFZPMTYxNC4u&route=shorturl"
                        className="btn-link"
                    >
                        Become a Partner
                    </Link>

                </div>


            </section>



            {/* INDUSTRY + CTA COMBINED */}

            <section className="final-section">

                <hr/>
                <br/><br/>


                <Typography variant="h3">
                    Why Organisations Get Involved
                </Typography>


                <p>
                    The future of aviation depends on the people entering the industry today.
                    AvCon gives organisations the opportunity to connect with future talent,
                    build relationships with education and contribute to tomorrow's workforce.
                </p>



                <div className="button-row">

                    <Link 
                        to="/ExhibitorRegistration"
                        className="btn-link"
                    >
                        Become a Speaker
                    </Link>


                    <Link 
                        to="/ExhibitorRegistration"
                        className="btn-link"
                    >
                        Explore Partnerships
                    </Link>


                    <Link 
                        to="/AvConNetwork"
                        className="btn-link"
                    >
                        Join Industry Network
                    </Link>


                </div>

                <br/>
                <hr/>
                <br/><br/>


                <Typography variant="h3">
                    Be Part of the Future
                </Typography>


                <Typography>
                    Connecting Industry. Inspiring Talent. Shaping Tomorrow's Workforce.
                </Typography>


                <div className="button-row">

                    <Link to="/BookTickets" className="btn-link">
                        Schools Register
                    </Link>


                    <Link to="/ExhibitorRegistration" className="btn-link">
                        Industry Opportunities
                    </Link>


                    <Link to="/ContactUs" className="btn-link">
                        Contact Us
                    </Link>


                </div>


            </section>


        </main>

    );
}