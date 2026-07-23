import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import Speaker from "./speaker";
import "./speakers.css";

import AlexMerkelCarroll from "./PresenterSpeakerImages2026/AlexMerkelCarroll.png";

export default function SpeakersPresentors() {

    // -------------------------
    // Presenters
    // -------------------------
    const presenters = [
        // Example:
        // {
        //     image: SpeakerImage,
        //     name: "Jane Smith",
        //     bio: "Speaker biography..."
        // }
    ];

    // -------------------------
    // Speakers
    // -------------------------
    const speakers = [

        {
            image: AlexMerkelCarroll,
            name: "Alex Merkel Carroll",
            bio: "Alex Merkel Carroll is a 16-year-old from Ireland with a passion for aviation and a goal of becoming an airline pilot. Through his TikTok account, @Alex | Aviation, he shares his aviation journey with more than 40,000 followers by creating vlogs, flying videos and aviation content. Alex is currently completing the WINGS course at the National Flight Centre, where he is flying the Cessna 152. Alongside his flight training, he has been involved with a range of organisations across the aviation industry, including Emerald Airlines, AirNav Ireland, Universal Aviation, Airline Flight Academy, Atlantic Flight Training Academy (AFTA), Dublin Airport and Cork Airport. Alongside flying, Alex enjoys creating social media content that gives people an insight into aviation and highlights the many opportunities available within the industry. After finishing school, Alex hopes to join an airline cadet programme while also exploring other routes into aviation and working towards his goal of becoming a commercial pilot."
        }
    ];

    return (
        <main className="speakers-page">

            <HeroSection
                defaultTitle="Speakers and Presenters"
                defaultSubtitle="Meet the inspiring industry leaders, innovators and professionals joining AvCon 2026."
                smallScreenTitle="Speakers and Presenters"
                smallScreenSubtitle="Discover the people shaping the future of aviation and aerospace."
            />

            {/* Introduction */}

            <section className="speakers-intro">

                <p>
                    AvCon 2026 brings together inspiring voices from aviation,
                    aerospace, engineering, defence, drones, space,
                    sustainability and future mobility.
                </p>

                <p>
                    Our speakers and presenters will share their experiences,
                    career journeys and insights into the opportunities shaping
                    the industries of tomorrow.
                </p>

                <p>
                    New speakers and presenters will be announced throughout the year.
                </p>

            </section>

            {/* ==========================
                Presenters
            ========================== */}

            <section className="speakers-section">

                <h2>
                    AvCon Presenters
                </h2>

                <Box>
                    <Grid container spacing={3}>

                        {presenters.length > 0 ? (

                            presenters.map((presenter, index) => (

                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    key={index}
                                >

                                    <Speaker
                                        SpeakerImage={presenter.image}
                                        SpeakerName={presenter.name}
                                        SpeakerBio={presenter.bio}
                                    />

                                </Grid>

                            ))

                        ) : (

                            <Grid item xs={12}>

                                <p className="coming-soon">
                                    Presenter announcements coming soon.
                                </p>

                            </Grid>

                        )}

                    </Grid>
                </Box>

            </section>

            {/* ==========================
                Speakers
            ========================== */}

            <section className="speakers-section">

                <h2>
                    AvCon Speakers
                </h2>

                <Box>

                    <Grid container spacing={3}>

                        {speakers.length > 0 ? (

                            speakers.map((speaker, index) => (

                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    lg={4}
                                    key={index}
                                >

                                    <Speaker
                                        SpeakerImage={speaker.image}
                                        SpeakerName={speaker.name}
                                        SpeakerBio={speaker.bio}
                                    />

                                </Grid>

                            ))

                        ) : (

                            <Grid item xs={12}>

                                <p className="coming-soon">
                                    Speaker announcements coming soon.
                                </p>

                            </Grid>

                        )}

                    </Grid>

                </Box>

            </section>

        </main>
    );
}