import EventIntroduction from "./EventIntroduction/EventIntroduction";
import EventExperience from "./EventExperience/EventExperience";
import EventClosing from "./EventClosing/EventClosing";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import eventPhoto from "../Home/HomePageImages/_HAN6730.JPG";
import "./event.css";

export default function Event() {
  return (
    <main className="event-page">
      <HeroSection
        defaultTitle="The AvCon Event"
        defaultSubtitle="Ireland's largest aviation, aerospace and STEM careers convention."
        smallScreenTitle="The AvCon Event"
        smallScreenSubtitle="Discover the future of aviation, aerospace and STEM careers."
        buttonText="Register Your School"
        buttonLink="/bookTickets"
        eyebrow="The student & industry convention"
        backgroundImage={eventPhoto}
      />

      <EventIntroduction />

      <EventExperience />

      <EventClosing />
    </main>
  );
}
