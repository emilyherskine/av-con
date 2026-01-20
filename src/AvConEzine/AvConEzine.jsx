import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import './AvConEzine.css';

export default function AvConEzine() {
  return (
    <main className="main-container">
      <HeroSection
        defaultTitle="AVCON EZINE 2025"
        defaultSubtitle="AvCon is thrilled to present its signature event dedicated to all things aviation"
        smallScreenTitle="AvCon Ezine 2025"
        smallScreenSubtitle="AvCon presenting an event for all things aviation"
      />

      {/* 2025 Ezine Section */}
      <section className="ezine-section">
        <header>
          <h2 className="ezine-title">
            AvCon Christmas Ezine 2025 – Celebrating Two Years of Inspiration
          </h2>
        </header>

        <p className="ezine-description">
          Our special Christmas Edition of the AvCon Altitude Ezine brings together
          another incredible year of aviation, aerospace, innovation, and inspiration.
          This limited-edition publication celebrates the growing AvCon community and
          our shared commitment to building pathways for the next generation.
        </p>

        <div className="iframe-container">
        <iframe
          src="https://e.issuu.com/embed.html?d=christmas_avcon_2025_altitude_ezine_&u=tyhub"
          title="AvCon Ezine Christmas 2025"
          allowFullScreen
          loading="lazy"
          className="ezine-iframe"
        />
        </div>
      </section>

      {/* 2025 Ezinee Section */}
      <section className="ezine-section">
        <header>
          <h3 className="ezine-title">2025 Ezine</h3>
        </header>
        <div className="iframe-container">
        <iframe
            src="https://issuu.com/tyhub/docs/avcon_2025_ezine?fr=xKAE9_zU1NQ"
            title="Avcon Ezine 2025"
            allow="fullscreen"
            className="ezine-iframe"
          ></iframe>
        </div>
      </section>

      {/* 2024 Ezine Section */}
      <section className="ezine-section">
        <header>
          <h3 className="ezine-title">2024 Ezine</h3>
        </header>
        <div className="iframe-container">
          <iframe
            src="https://e.issuu.com/embed.html?d=avcon_ezine_2024-3&u=tyhub"
            title="Avcon Ezine 2024"
            allow="fullscreen"
            className="ezine-iframe"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
