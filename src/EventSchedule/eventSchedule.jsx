import React from "react";
import "./eventSchedule.css";
import FloorPlan2026 from "./EventScheduleImages/AvCon 2026 Floorplan Draft.pdf";

export default function EventSchedule() {
    return (
        <main className="schedule-page">

            {/* Header */}
            <section className="schedule-header">
                <h1>
                    AvCon 2026 Event Experience
                </h1>

                <p>
                    Discover the experiences, speakers, demonstrations and
                    opportunities waiting for you at AvCon 2026.
                </p>

                <p>
                    Ireland's flagship aviation and aerospace careers event
                    brings together students, educators and industry leaders
                    for a day of inspiration, discovery and connection.
                </p>
                <div className="video-container">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/rjl6q8Y0h5w?si=o6VOZ_5PlR2E_aLz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </section>


            {/* 2026 Experience */}
            <section className="experience-section">
                <h2>
                    AvCon 2026 Experience
                </h2>

                <div className="experience-grid">

                    <div className="experience-card">
                        <h3>
                            Industry Speakers
                        </h3>

                        <p>
                            Hear from pilots, engineers, innovators and
                            professionals shaping the future of aviation.
                        </p>
                    </div>


                    <div className="experience-card">
                        <h3>
                            Interactive Experiences
                        </h3>

                        <p>
                            Explore technology, aircraft displays,
                            demonstrations and hands-on activities.
                        </p>
                    </div>


                    <div className="experience-card">
                        <h3>
                            Career Pathways
                        </h3>

                        <p>
                            Discover apprenticeships, education routes and
                            career opportunities across aviation, aerospace
                            and STEM.
                        </p>
                    </div>

                </div>
            </section>


            {/* 2026 Floor Plan */}
            <section className="floor-plan-section">

                <h2>
                    AvCon 2026 Floor Plan
                </h2>

                <p>
                    Explore the AvCon 2026 floor plan to see where the
                    different zones, stages, hubs, displays and visitor
                    facilities are located throughout the event.
                </p>

                <div className="floor-plan-container">

                    <iframe
                        src={FloorPlan2026}
                        title="AvCon 2026 Floor Plan"
                        className="floor-plan-viewer"
                    />

                </div>

                <p className="floor-plan-note">
                    Use the viewer controls to zoom in and explore the
                    different areas of the AvCon 2026 event space.
                </p>

            </section>


            {/* Live Stream */}
            <section className="video-section">

                <h2>
                    Watch Previous AvCon Live Streams
                </h2>

                <div className="video-grid">

                    <div>

                        <h3>
                            AvCon 2025 LIVE STREAM
                        </h3>

                        <div className="video-container">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=X0ZMQCI5w-k9s84C&amp;list=PLKqYIkM4gVMV9yfE4WkiBRn141HuYwuGa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>

                    </div>


                    <div>

                        <h3>
                            AvCon 2024 LIVE STREAM
                        </h3>

                        <div className="video-container">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=IOMb30T0FMtjvWkD&amp;list=PLKqYIkM4gVMUO04DAeqTrWWMyYJhc9ccg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}