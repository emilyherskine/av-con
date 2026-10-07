import React from "react";
import "./eventSchedule.css";
import FloorPlan2026 from "./EventScheduleImages/AvCon 2026 Floorplan.png";
import ContentCard from "../CommonComponents/ContentCard/ContentCard";
import VideoEmbed from "../CommonComponents/VideoEmbed/VideoEmbed";
import AvConLivePanel from "./EventScheduleImages/AvCon Live 2026 - Panels.pdf";
import AVConSchedule from "./EventScheduleImages/AVConSchedule2026.jpeg";
import AvConSpeakerSchedule from "./EventScheduleImages/Speakers Hub Schedule.png";

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

      {/* Event Schedule */}
      <section
        className="schedule-feature"
        aria-labelledby="schedule-overview-heading"
      >
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
          <img
            src={AvConSpeakerSchedule}
            alt="AvCon 2026 speakers hub schedule"
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

        <figure className="floor-plan-frame">
          <a
            href={FloorPlan2026}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the full-size AvCon 2026 floor plan in a new tab"
          >
            <img
              src={FloorPlan2026}
              alt="AvCon 2026 floor plan showing the event's stages, activity zones, exhibitors and facilities"
              className="floor-plan-image"
              loading="lazy"
            />
          </a>

          <figcaption>
            Select the floor plan to open the full-size version in a new tab.
          </figcaption>
        </figure>

        <p className="floor-plan-note">
          Use your browser's zoom controls to explore the different areas of the
          AvCon 2026 event space.
        </p>
      </section>

      {/* Live Stream */}
      <section className="video-section" aria-labelledby="live-stream-heading">
        {/* Featured 2026 Live Stream */}
        <div className="video-grid video-grid--featured">
          <article className="stream-card stream-card--featured">
            <h3>Watch AvCon 2026 Live</h3>

            <p>
              Join the AvCon 2026 live stream on YouTube. Schools can use the
              education registration link below to submit questions during the
              broadcast.
            </p>

            <VideoEmbed
              src="https://www.youtube.com/embed/R9WwaqI-8Lw"
              title="AvCon 2026 live stream"
            />

            <div className="stream-links">
              <a
                href="https://streamyard.com/watch/fXQZNAES3G5A"
                target="_blank"
                rel="noopener noreferrer"
                className="stream-link"
              >
                Schools: register to ask live questions
              </a>

              <a
                href="https://tyhub.ie/ty-podcast/"
                target="_blank"
                rel="noopener noreferrer"
                className="stream-link"
              >
                Also available on TY Hub
              </a>
            </div>
          </article>
        </div>

        {/* Previous Live Streams */}
        <div className="section-heading section-heading--archive">
          <p className="section-eyebrow">Look back</p>
          <h2>Previous AvCon Live Streams</h2>
        </div>

        <div className="video-grid">
          <article className="stream-card">
            <h3>AvCon 2025 LIVE STREAM</h3>

            <VideoEmbed
              src="https://www.youtube.com/embed/videoseries?si=X0ZMQCI5w-k9s84C&amp;list=PLKqYIkM4gVMV9yfE4WkiBRn141HuYwuGa"
              title="AvCon 2025 live stream"
            />
          </article>

          <article className="stream-card">
            <h3>AvCon 2024 LIVE STREAM</h3>

            <VideoEmbed
              src="https://www.youtube.com/embed/videoseries?si=IOMb30T0FMtjvWkD&amp;list=PLKqYIkM4gVMUO04DAeqTrWWMyYJhc9ccg"
              title="AvCon 2024 live stream"
            />
          </article>
        </div>
      </section>
    </main>
  );
}
