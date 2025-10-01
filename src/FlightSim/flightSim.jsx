import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FlightSimImage from "./FlightSimImage.png";
import InsideAirplaneImage from "./InsideAirplane.jpg";
//import FlightSimImageBanner from "./fightSimImageBanner";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";

export default function FlightSim() {
    return (
        <main className="flex min-h-screen flex-col justify-between p-4 md:p-8">
            {/* we pass 2 titles and 2 subtitles to use on small and large devices */}
            <HeroSection
                defaultTitle="AN UNFORGETTABLE THRILL FOR AVIATION ENTHUSIASTS"
                defaultSubtitle="AvCon 2025 Live Stream"
                smallScreenTitle="AvCon 2025"
                smallScreenSubtitle="The Sky Isn't the Limit — It's Only the Beginning."
                buttonText="Watch The AvCon 2025 Live Stream"
                buttonLink="https://avcon.ie/BookTickets"
            />

            <Box
                className="mb-3 mt-3"
                sx={{ padding: { xs: "0 2%", md: "0 5%" } }}>
                <h4 className="mb-2">AvCon Xtra: The Flight Sim Event</h4>

                <Grid className="flex-container mb-3" container spacing={2}>
                    <Grid className="avconXtra-position" item xs={12} md={5}>
                        {/* container for second set of features text */}
                        <Box sx={{ paddingRight: { xs: "0", md: "5%" } }}>
                            <div className="flex-col-container">
                                <h5>Experience the thrill</h5>
                                <p className="text-thin mb-1">
                                    Get ready to soar to new heights in this
                                    adrenaline-pumping, aviation-inspired event!
                                </p>
                                <h5>Non-Stop Action</h5>
                                <p className="text-thin mb-1">
                                    A 12-hour journey through the virtual skies,
                                    packed with excitement from 8am to 8pm.
                                </p>
                                <h5>Multiple Flight Simulators</h5>
                                <p className="text-thin mb-1">
                                    Test your piloting skills on a range of
                                    cutting-edge flight simulators.
                                </p>
                                <h5>For Enthusiasts & Gamers</h5>
                                <p className="text-thin mb-1">
                                    Open to aviation fans and competitive gamers
                                    alike, bringing together passionate flyers
                                    from all over Ireland.
                                </p>
                            </div>
                        </Box>
                    </Grid>
                    {/* container for second image */}
                    <Grid item xs={12} md={7}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <img
                                className="avcon-xtra-img-1"
                                src={FlightSimImage}
                                alt="man in a flight simulator getting advice from a female instructor"
                                style={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    mixBlendMode: "luminosity",
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* container for second image */}
            <Box sx={{ padding: { xs: "0 2%", md: "0 5%" } }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <img
                                src={InsideAirplaneImage}
                                alt="two pilots insideof an airplane cockpit"
                                style={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    mixBlendMode: "luminosity",
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ paddingLeft: { xs: "0", md: "5%" } }}>
                            {/* container for second set of features */}
                            <div className="flex-col-container">
                                <h5>Support aviation in Ireland</h5>
                                <p className="text-thin mb-1">
                                    AvCon Xtra isn’t just about the thrill—it’s
                                    about giving back. All proceeds support the
                                    Shannon Aviation Museum, preserving
                                    Ireland’s rich aviation heritage.
                                </p>
                                <h5>Epic Team Competition</h5>
                                <p className="text-thin mb-1">
                                    Teams compete head-to-head in flight
                                    simulators, navigating global courses with
                                    strategic stop-offs and thrilling
                                    challenges.
                                </p>
                                <h5>Exciting Challenges</h5>
                                <p className="text-thin mb-1">
                                    Face everything from turbulent weather to
                                    precision landings, testing your skills and
                                    teamwork every step of the way.
                                </p>
                                <h5>Fundraising for a Purpose</h5>
                                <p className="text-thin mb-1">
                                    To participate, teams must meet a
                                    fundraising requirement. Every euro raised
                                    helps ensure the Shannon Aviation Museum’s
                                    invaluable work continues.
                                </p>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* conainer for button and more info text */}
            <Box
                sx={{
                    height: "auto",
                    padding: "5%",
                    fontSize: { xs: "4vw", md: "2vw" },
                    fontWeight: "800",
                    textAlign: "center",
                    color: "white",
                }}>
                <a href="mailto:flightsim@avcon.ie?subject=Register request for the Flight Sim Challenge">
                    <button className="btn-tertiary uppercase text-large mb-3">
                        Register for the event
                    </button>
                </a>

                <h6 className="mt-3">
                    For more information or to register your team, reach out to
                    our Flight Sim Team at{" "}
                    <a
                        style={{ textDecoration: "underline" }}
                        href="mailto:flightsim@avcon.ie?subject=Request for more AvCon Xtra details">
                        flightsim@avcon.ie
                    </a>
                    . Don't miss your chance to be part of AvCon Xtra: The
                    Flight Sim Event - where the sky is the limit!
                </h6>
            </Box>
        </main>
    );
}
