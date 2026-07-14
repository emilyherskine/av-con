import React from "react";
import AVConPromoVideo from "./The Future of aviation.mp4";
import "./about.css";

export default function About() {
    return (
        <main className="about-main">

            {/* Hero */}
            <section className="about-hero">
                <h1 className="about-heading">
                    About AvCon
                </h1>

                <p className="about-subheading">
                    Connecting Industry. Inspiring Talent. Shaping Tomorrow's Workforce.
                </p>
            </section>


            {/* Introduction */}
            <section className="about-introduction">

                <div className="about-video-container">
                    <video
                        className="about-video"
                        src={AVConPromoVideo}
                        title="AvCon - The Future of Aviation"
                        controls
                    />
                </div>


                <div className="about-content">

                    <h2>
                        Ireland's Future Workforce Starts Here
                    </h2>

                    <p>
                        AvCon is Ireland's flagship free Student & Industry
                        Convention, created to inspire the next generation by
                        connecting young people with the exciting worlds of
                        aviation, aerospace, engineering, defence, drones,
                        space, sustainability and future mobility.
                    </p>

                    <p>
                        Every year, thousands of students aged 15+ including
                        Senior Cycle students, apprentices, further education
                        learners, college students and young enthusiasts come
                        together with industry leaders, educators and government
                        representatives.
                    </p>

                    <p>
                        Together, they explore career pathways, discover
                        emerging technologies and meet the people shaping the
                        future of these industries.
                    </p>

                </div>

            </section>


            {/* Mission */}
            <section className="about-section">

                <h2>
                    Our Mission
                </h2>

                <p className="section-highlight">
                    To connect industry, inspire talent and shape tomorrow's workforce.
                </p>

                <p>
                    We believe young people make better career decisions when
                    they can experience industries first-hand, meet the people
                    behind the careers and understand the many pathways
                    available to them.
                </p>

                <p>
                    Organisations also have an opportunity to help shape the
                    future workforce by sharing knowledge, inspiring the next
                    generation, identifying future skills needs and building
                    stronger relationships with education.
                </p>

                <p>
                    AvCon creates those connections — bringing together
                    industry, education and government to inspire, collaborate
                    and prepare for the future.
                </p>

            </section>


            {/* More Than An Event */}
            <section className="about-section">

                <h2>
                    More Than an Event
                </h2>

                <p>
                    The AvCon Student & Industry Convention is at the heart of
                    everything we do. Around this flagship event, AvCon has
                    evolved into a year-round ecosystem that strengthens
                    partnerships, supports workforce development and creates
                    meaningful engagement between employers and future talent.
                </p>


                <div className="initiative-grid">

                    <article className="initiative-card">

                        <h3>
                            Student & Industry Convention
                        </h3>

                        <p>
                            Ireland's flagship free convention connecting
                            thousands of students with employers, educators and
                            professionals through interactive experiences,
                            demonstrations, career exploration and inspiring
                            conversations.
                        </p>

                    </article>


                    <article className="initiative-card">

                        <h3>
                            Afterburner Networking Series
                        </h3>

                        <p>
                            A growing industry networking community where
                            professionals connect, share knowledge, collaborate
                            and discuss opportunities shaping aviation,
                            aerospace and future mobility.
                        </p>

                    </article>


                    <article className="initiative-card">

                        <h3>
                            AvCon Industry & Student Network
                        </h3>

                        <p>
                            A year-round community connecting organisations,
                            education providers and future talent through
                            collaboration, engagement and workforce initiatives.
                        </p>

                    </article>

                </div>

            </section>


            {/* Looking Ahead */}
            <section className="about-section">

                <h2>
                    Looking Ahead
                </h2>

                <p>
                    As AvCon continues to grow, so does our ambition.
                </p>

                <p>
                    Our vision is to become Ireland's leading platform
                    connecting aviation, aerospace, engineering, defence,
                    drones, space, sustainability and future mobility with the
                    people who will shape these industries in the years ahead.
                </p>

                <p>
                    By creating stronger connections between industry,
                    education and government today, we can help ensure Ireland
                    has the skilled, diverse and innovative workforce needed
                    for tomorrow.
                </p>

            </section>


            {/* Vision */}
            <section className="vision-section">

                <h2>
                    Our Vision
                </h2>

                <p className="section-highlight">
                    Tomorrow's workforce starts with today's conversations.
                </p>

                <p>
                    By bringing together industry, education and government,
                    AvCon creates opportunities that inspire young people,
                    strengthen collaboration and help build the skills needed
                    for the industries of tomorrow.
                </p>

                <blockquote>
                    The Sky is NOT the Limit. It's ONLY the Beginning.
                </blockquote>

                <p className="vision-tagline">
                    Connecting Industry. Inspiring Talent. Shaping Tomorrow's Workforce.
                </p>

            </section>


            {/* Contact */}
            <section className="contact-section">

                <h2>
                    Get Involved
                </h2>

                <p>
                    Whether you are a student, educator, organisation or
                    industry partner, we would love to hear from you.
                </p>

                <a href="mailto:hello@avcon.ie">
                    hello@avcon.ie
                </a>

            </section>


        </main>
    );
}
