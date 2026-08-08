import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import Speaker from "./speaker";
import "./speakers.css";

import AlexMerkelCarroll from "./PresenterSpeakerImages2026/AlexMerkelCarroll.png";
import MaryHennigan from "./PresenterSpeakerImages2026/MaryHennigan.jpg";
import MatthewGee from "./PresenterSpeakerImages2026/MatthewGee.jpg";

const defaultSpeakers = [

        {
            image: AlexMerkelCarroll,
            name: "Alex Merkel Carroll",
            bio: "Alex Merkel Carroll is a 16-year-old from Ireland with a passion for aviation and a goal of becoming an airline pilot. Through his TikTok account, @Alex | Aviation, he shares his aviation journey with more than 40,000 followers by creating vlogs, flying videos and aviation content. Alex is currently completing the WINGS course at the National Flight Centre, where he is flying the Cessna 152. Alongside his flight training, he has been involved with a range of organisations across the aviation industry, including Emerald Airlines, AirNav Ireland, Universal Aviation, Airline Flight Academy, Atlantic Flight Training Academy (AFTA), Dublin Airport and Cork Airport. Alongside flying, Alex enjoys creating social media content that gives people an insight into aviation and highlights the many opportunities available within the industry. After finishing school, Alex hopes to join an airline cadet programme while also exploring other routes into aviation and working towards his goal of becoming a commercial pilot."
        },
        {
            image: MaryHennigan,
            name: "Mary Preud'homme (nee Hennigan)",
            bio: "Mary Preud'homme (nee Hennigan) has more than 20 years of international aviation experience spanning flight operations, aircraft maintenance, technical services, and business development. She is the Co-Founder and Managing Director of Altura Aviation Group, an Irish-based technical services company established in 2026 that has successfully delivered pre-purchase inspections worldwide, alongside a full range of aircraft transition and compliance services. Mary began her aviation career as a flight instructor in Ireland before becoming a commercial airline pilot with ASL Airlines Switzerland, operating ATR-42 and ATR-72 aircraft. She later joined Jet Aviation Basel, where she managed Part 145 business jet maintenance projects and led aircraft pre-purchase inspections, building expertise in regulatory compliance, aircraft records, and MRO operations. After working at Jet Aviation she successfully co-founded Air Doc Services (ADS) in Switzerland where she was Managing Director until 2026. Mary is also Safety Manager and Director of Business Development at Paramount Global Ferry Services, moving aircraft worldwide for aircraft lessors and owners. Mary is spearheading international expansion, managing high-value contracts with global clients while ensuring Paramount operates to the highest safety standards. Mary holds a Diploma in Continuing Airworthiness Management and enjoys flying for fun when she find the time. She is a member of EBAA, Board Member at IBGAA, and a member of Women in Aviation International (WAI)."
        },
        {
            image: MatthewGee,
            name: "Matthew Gee",
            bio: "Matthew Gee, Head of Flight Operations, Six West | Principal, MG Aviation Consultancy. With over 30 years of comprehensive experience across the aviation landscape, Matthew is a professional, specialising in flight operations, regulatory compliance, and consultancy. He currently serves as the Head of Flight Operations at Six West, where he oversees complex operations for large transport aircraft on behalf of global lessors and airlines. Parallel to this role,, Matthew founded MG Aviation Consultancy, which provides auditing and expert witness services to the industry. His career spans the full industry lifecycle: from general aviation, flight training, and ground handling, to working in operations control at Aer Lingus, Aer Arann and First Choice Airways. Matthew then moved, into the aircraft leasing sector, to head up the ferry flight services department at a large technical service provider.  A licensed pilot with experience in turbine-powered aircraft, Matthew is also a qualified Senior and Lead Auditor, as well as an IS-BAO and IS-BAH auditor for IBAC. His industry experience is frequently sought in legal proceedings, globally. "
        }

];

export default function SpeakersPresentors({ presenters = [], speakers = defaultSpeakers }) {

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

                        {/* Presenters will be added when announced. */}
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

                        {/* Speakers are configured above. */}
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
