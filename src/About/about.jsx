import React from "react";
import AVConPromoVideo from "./The Future of aviation.mp4";
import "./about.css";

export default function About() {
    return (
        <main className="about-main">
            <div className="about-container">
                <h2 className="about-heading">About AvCon</h2>
                <p className="about-subheading">
                    The Future of Aviation & Aerospace in Ireland 🚀
                </p>
            </div>

            {/* Grid Section */}
            <div className="about-grid">
                <div>
                    <video
                        className="about-video"
                        src={AVConPromoVideo}
                        title="AvCon Future of Aviation"
                        controls
                    />
                </div>

                <div className="about-grid-item-text">
                    <h3>Who We Are</h3>
                    <p>
                        AvCon is Ireland's leading aviation and aerospace careers
                        event – designed to engage and inspire 15–25-year-olds
                        with real-world pathways in aviation, aerospace, space
                        technology, UAS, simulation, sustainability, air traffic
                        management, engineering, and more.
                    </p>
                    <p>
                        For all other queries please contact us at{" "}
                        <a href="mailto:hello@avcon.ie">hello@avcon.ie</a>
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div>
                <h3>Our Mission</h3>
                <p>
                    To inspire students to explore and pursue pathways into these
                    exciting industries, and that's exactly what we've achieved.
                    The feedback from students, teachers, and parents has been
                    incredible, with many amazed by the variety of exhibitors,
                    opportunities, and career journeys they discovered.
                </p>
                <p>
                    As AvCon continues to expand, so does our vision. In 2026,
                    AvCon will evolve into a two-part experience – the student
                    and education day and the AvCon Industry Convention – joined
                    by our sister event, DFCon – The Future of Careers.
                </p>

                <blockquote>
                    “The Sky is NOT the Limit, It is ONLY the Beginning!”
                </blockquote>
                <blockquote>
                    “If we don’t show these young minds the possibilities,
                    they’ll never dream to become it.”
                </blockquote>
                <blockquote>
                    “Keep in mind that 60% of future careers do not exist
                    today.”
                </blockquote>
                <blockquote>
                    “As I always tell students – if the job you imagine doesn’t
                    exist, create it! I did. Love what you do every day.”
                </blockquote>
                <p className="quote-author">
                    – Fiona O’Sullivan Forkan, Founder of AvCon & DFCon
                </p>

                <p>
                    AvCon isn’t just about the future of aviation – it’s about
                    shaping the future of Ireland’s workforce, sparking
                    imagination, and connecting education with opportunity to
                    help the next generation soar.
                </p>
            </div>
        </main>
    );
}
