import React from "react";
import AVConSchedule from "./EventScheduleImages/AVConEventSchedule2025.png";
import Schedule5 from "./EventScheduleImages/Schedule5.jpeg";
import "./eventSchedule.css";


export default function EventSchedule() {

    return (

        <main className="schedule-page">


            {/* Header */}
            <section className="schedule-header">

                <h1>
                    AvCon Event Schedule
                </h1>

                <p>
                    Discover the experiences, speakers, demonstrations and
                    opportunities waiting at AvCon 2026.
                </p>

                <p>
                    Ireland's flagship aviation and aerospace careers event
                    brings together students, educators and industry leaders
                    for a day of inspiration, discovery and connection.
                </p>

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




            {/* 2026 Schedule */}
            <section className="schedule-section">

                <h2>
                    AvCon 2026 Schedule Coming Soon
                </h2>


                <p>
                    We are preparing another exciting programme filled with
                    inspiring talks, workshops, industry showcases and
                    experiences designed to connect students with future
                    opportunities.
                </p>


                <img
                    src={Schedule5}
                    alt="AvCon Event Schedule 2026"
                    className="schedule-image"
                />


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

                            <iframe
                                src="https://www.youtube.com/embed/videoseries?si=Ktnu0lIaijjOEjgH&amp;list=PLKqYIkM4gVMV9yfE4WkiBRn141HuYwuGa"
                                title="AvCon 2025 Live Stream"
                                frameBorder="0"
                                allowFullScreen
                            />

                        </div>

                    </div>




                    <div>

                        <h3>
                            AvCon 2024 LIVE STREAM
                        </h3>


                        <div className="video-container">

                            <iframe
                                src="https://www.youtube.com/embed/7_AYMtVLbhI?si=ulFkMd-tNUI6KD3z"
                                title="AvCon 2024 Live Stream"
                                frameBorder="0"
                                allowFullScreen
                            />

                        </div>

                    </div>


                </div>


            </section>




            {/* Archive */}
            <section className="archive-section">

                <h2>
                    Previous Event Schedule
                </h2>


                <p>
                    Take a look back at previous AvCon programmes,
                    featuring industry talks, technology demonstrations,
                    aircraft displays and student experiences.
                </p>


                <img
                    src={AVConSchedule}
                    alt="AvCon 2024 Event Schedule"
                    className="schedule-image"
                />


            </section>


        </main>

    );

}