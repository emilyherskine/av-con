import React from "react";
import "./eventSchedule.css";
import FloorPlan2026 from "./EventScheduleImages/AvCon 2026 Floorplan Draft.pdf";
import ContentCard from "../CommonComponents/ContentCard/ContentCard";
import VideoEmbed from "../CommonComponents/VideoEmbed/VideoEmbed";
import AvConLivePanel from "./EventScheduleImages/AvCon Live 2026 - Panels.pdf";
import AVConSchedule from "./EventScheduleImages/AVConSchedule2026.jpeg";

const experienceCards = [
  {
    title: "Industry Speakers",
    description:
      "Hear from pilots, engineers, innovators and professionals shaping the future of aviation.",
  },
  {
    title: "Interactive Experiences",
    description:
      "Explore technology, aircraft displays, demonstrations and hands-on activities.",
  },
  {
    title: "Career Pathways",
    description:
      "Discover apprenticeships, education routes and career opportunities across aviation, aerospace and STEM.",
  },
];

export default function EventSchedule() {
  return (
    <main className="schedule-page">
      {/* Header */}
      <section className="schedule-header">
        <h1>AvCon 2026 Event Experience</h1>

        <div className="schedule-introduction">
          <p>
            Discover the experiences, speakers, demonstrations and opportunities
            waiting for you at AvCon 2026.
          </p>
          <p>
            Ireland's flagship aviation and aerospace careers event brings
            together students, educators and industry leaders for a day of
            inspiration, discovery and connection.
          </p>
        </div>
      </section>

      <section className="schedule-feature" aria-labelledby="schedule-overview-heading">
        <div className="schedule-feature__content">
          <p className="section-eyebrow">Plan your day</p>
          <h2 id="schedule-overview-heading">AvCon 2026 event schedule</h2>
          <p>
            Browse the day at a glance, then use the floor plan below to find
            each stage, zone and activity.
          </p>
        </div>
        <div className="schedule-image-frame">
          <img
            src={AVConSchedule}
            alt="AvCon 2026 event schedule"
            className="schedule-image"
          />
        </div>
      </section>

      {/* 2026 Experience */}
      <section className="experience-section">
        <div className="section-heading">
          <p className="section-eyebrow">What to expect</p>
          <h2>AvCon 2026 Experience</h2>
        </div>

        <div className="document-frame document-frame--panels">
          <iframe
            src={AvConLivePanel}
            title="AvCon 2026 live panel plan"
            className="document-viewer"
            loading="lazy"
          />
        </div>

        <div className="experience-grid">
          {experienceCards.map((card) => (
            <ContentCard
              key={card.title}
              {...card}
              className="experience-card"
            />
          ))}
        </div>
      </section>

      {/* 2026 Floor Plan */}
      <section className="floor-plan-section">
        <div className="section-heading">
          <p className="section-eyebrow">Find your way</p>
          <h2>AvCon 2026 Floor Plan</h2>
        </div>

        <p>
          Explore the AvCon 2026 floor plan to see where the different zones,
          stages, hubs, displays and visitor facilities are located throughout
          the event.
        </p>

        <div className="document-frame">
          <iframe
            src={FloorPlan2026}
            title="AvCon 2026 Floor Plan"
            className="document-viewer"
            loading="lazy"
          />
        </div>

        <p className="floor-plan-note">
          Use the viewer controls to zoom in and explore the different areas of
          the AvCon 2026 event space.
        </p>
      </section>

      {/* Live Stream */}
      <section className="video-section">
        <div className="section-heading">
          <p className="section-eyebrow">Look back</p>
          <h2>Watch Previous AvCon Live Streams</h2>
        </div>

        <div className="video-grid">
          <article className="stream-card">
            <h3>AvCon 2025 LIVE STREAM</h3>

            <VideoEmbed src="https://www.youtube.com/embed/videoseries?si=X0ZMQCI5w-k9s84C&amp;list=PLKqYIkM4gVMV9yfE4WkiBRn141HuYwuGa" />
          </article>

          <article className="stream-card">
            <h3>AvCon 2024 LIVE STREAM</h3>

            <VideoEmbed src="https://www.youtube.com/embed/videoseries?si=IOMb30T0FMtjvWkD&amp;list=PLKqYIkM4gVMUO04DAeqTrWWMyYJhc9ccg" />
          </article>
        </div>
      </section>
    </main>
  );
}
