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
          <h2 className="ezine-title">AvCon 2025 Ezine - Altitude: Corporate & Careers</h2>
        </header>
        <p className="ezine-description">
          Your insider's guide to The Future of Aviation & Aerospace. Packed with event highlights, speaker line-ups, exhibitor spotlights, industry insights, and opportunities for students and professionals alike, this digital magazine connects education with innovation. Whether you’re joining us in person at Casement Aerodrome or online via TYHub.ie, the Ezine is your must-read companion for AvCon 2025.
        </p>
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
