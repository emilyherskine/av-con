import React from "react";
import FirstImageAndText from "./components/firstBlockOfText";
import AdvertData from "./components/AdvertData";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import './AvconPathwayPortal.css';

export default function AvconPathwayPortal() {
  return (
    <main className="main-container">
      <HeroSection
        defaultTitle="AVIATION PATHWAY PORTAL (A.P.P.)"
        defaultSubtitle="AvCon is thrilled to present its signature event dedicated to all things aviation"
        smallScreenTitle="Avcon Pathway Portal"
        smallScreenSubtitle="AvCon presenting an event for all things aviation"
        buttonText="Watch The AvCon 2025 Live Stream"
        buttonLink="https://avcon.ie/BookTickets"
      />
      <div className="event-container">
        <FirstImageAndText />
        <AdvertData />
      </div>
    </main>
  );
}
