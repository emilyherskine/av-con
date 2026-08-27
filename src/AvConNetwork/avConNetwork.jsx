import React from "react";
import "./avConNetwork.css";

export default function AvConNetwork() {
  return (
    <main className="convention-main">
      <div className="convention-container">
        <header className="convention-header">
          <h1>The AvCon Network - The Future of Aviation & Aerospace</h1>

          <p className="convention-tagline">
            B2B <span aria-hidden="true">|</span> Network{" "}
            <span aria-hidden="true">|</span> Inspire{" "}
            <span aria-hidden="true">|</span> Employ{" "}
            <span aria-hidden="true">|</span> Connect
          </p>
        </header>

        <section
          className="convention-content"
          aria-labelledby="welcome-heading"
        >
          <h2 id="welcome-heading" className="sr-only">
            Welcome to the AvCon Network
          </h2>

          <p className="intro-text">Welcome to the next evolution of AvCon.</p>

          <p>
            The AvCon Network is where innovation meets opportunity - a two-day
            international event hosted in Ireland, the hub of aviation and
            aerospace excellence. It’s where leaders, innovators, educators, and
            emerging talent come together to collaborate, inspire, and shape the
            future of a rapidly evolving global industry.
          </p>

          <p>
            Being part of AvCon means more than just attending an event - it
            means joining a community of likeminded thinkers and doers who
            believe in action, collaboration, and creating real change. Across
            both days, the Industry Convention will spark meaningful
            conversations between sectors - from aviation, aerospace, and space
            technology to sustainability, defence, logistics, and emerging
            industries - demonstrating how shared innovation can power a new
            generation of progress.
          </p>

          <p>
            AvCon is not only inspiring young minds to pursue their dreams; it's
            also inspiring organisations, educators, and industry professionals
            to think differently, work together, and build the future workforce
            of tomorrow.
          </p>

          <p className="convention-values">
            Network. Collaborate. Inspire. Employ. Connect.
          </p>

          <p>
            Join us as we bring the global aviation and aerospace community
            together under one roof - right here in Ireland.
          </p>

          <p>
            Register your interest today and be part of the movement shaping the
            future of aviation and aerospace.
          </p>
        </section>

        <section
          className="registration-section"
          aria-labelledby="registration-heading"
        >
          <div className="registration-heading">
            <span className="registration-eyebrow">Get involved</span>

            <h2 id="registration-heading">Register Your Interest</h2>

            <p>Choose the registration option that best describes you.</p>
          </div>

          <div className="registration-links">
            <a
              href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUODMyTktOUko2VVFTWEI4NVRPT01MOUJCMi4u"
              target="_blank"
              rel="noopener noreferrer"
              className="registration-button"
              aria-label="Register as a student for the AvCon Network - opens in a new tab"
            >
              <span>Students Network Registration</span>
              <span className="button-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <a
              href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUMzZKTTE1SDZESFJHQ0tSRlk3RlNHMUk0Wi4u"
              target="_blank"
              rel="noopener noreferrer"
              className="registration-button"
              aria-label="Register as an industry individual for the AvCon Network - opens in a new tab"
            >
              <span>Industry Individuals Network Registration</span>
              <span className="button-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <a
              href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUM1JSUUsyNVZWUEcxQTBXOUFSQlpRTlJJQi4u"
              target="_blank"
              rel="noopener noreferrer"
              className="registration-button"
              aria-label="Register as an organisation partner for the AvCon Network - opens in a new tab"
            >
              <span>Organisation Partners Registration</span>
              <span className="button-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
