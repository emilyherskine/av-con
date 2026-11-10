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

          <p className="intro-text">Connect with Ireland's aviation and aerospace community.</p>

          <p>
            The AvCon Network brings leaders, innovators, educators and emerging
            talent together at a two-day international event in Ireland to
            collaborate and shape the industry's future.
          </p>

          <p>
            The Industry Convention connects aviation, aerospace, space
            technology, sustainability, defence, logistics and emerging
            industries, helping organisations and educators collaborate and
            inspire the future workforce.
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
