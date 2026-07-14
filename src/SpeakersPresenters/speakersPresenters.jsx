import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import Speaker from "./speaker";
import "./speakers.css";

export default function SpeakersPresentors() {

    // Add confirmed 2026 speakers here
    const presenters = [
        // Example:
        // {
        //     image: SpeakerImage,
        //     name: "Speaker Name",
        //     bio: "Speaker biography"
        // }
    ];


    return (
        <main className="speakers-page">

            <HeroSection
                defaultTitle="Speakers and Presenters"
                defaultSubtitle="Meet the inspiring industry leaders, innovators and professionals joining AvCon 2026."
                smallScreenTitle="Speakers and Presenters"
                smallScreenSubtitle="Discover the people shaping the future of aviation and aerospace."
            />


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
                    Speaker announcements coming soon.
                </p>

            </section>


            {/* Presenters */}

            <section className="speakers-section">

                <h2>
                    AvCon Presenters
                </h2>


                <Box>
                    <Grid container spacing={3}>

                        {presenters.length > 0 ? (

                            presenters.map((speaker, index) => (

                                <Grid
                                    item
                                    xs={12}
                                    md={6}
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
                                    Presenter announcements coming soon.
                                </p>

                            </Grid>

                        )}

                    </Grid>
                </Box>

            </section>


            {/* Speakers */}

            <section className="speakers-section">

                <h2>
                    AvCon Speakers
                </h2>


                <Box>

                    <Grid container spacing={3}>

                        {presenters.length > 0 ? (

                            presenters.map((speaker, index) => (

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