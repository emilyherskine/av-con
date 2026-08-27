import EventIntroduction from "./EventIntroduction/EventIntroduction";
import EventExperience from "./EventExperience/EventExperience";
import EventClosing from "./EventClosing/EventClosing";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import "./event.css";

export default function Event() {
  return (
    <main className="event-page">
      <HeroSection
        defaultTitle="AvCon 2026"
        defaultSubtitle="Ireland's largest aviation, aerospace and STEM careers convention. Connecting Industry. Inspiring Talent. Shaping Tomorrow's Workforce."
        smallScreenTitle="AvCon 2026"
        smallScreenSubtitle="Discover the future of aviation, aerospace and STEM careers."
        buttonText="Register Your School"
        buttonLink="https://avcon.ie/BookTickets"
      />

      <EventIntroduction />

      <EventExperience />

      <EventClosing />
    </main>
  );
}
