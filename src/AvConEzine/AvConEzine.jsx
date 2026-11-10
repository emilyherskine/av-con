import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import "./AvConEzine.css";

const ezines = [
  {
    year: "2026",
    title: "Main Event AvCon 2026 Altitude Ezine",
    description:
      "The official 2026 publication: aviation and aerospace stories, industry voices, career pathways, innovation and event highlights.",
    embed:
      "https://e.issuu.com/embed.html?d=main_event_avcon_2026_altitude_ezine_-2&u=tyhub",
    publicationUrl:
      "https://issuu.com/tyhub/docs/main_event_avcon_2026_altitude_ezine_-2?fr=xKAE9_zU1NQ",
    allow:
      "clipboard-write; autoplay; encrypted-media; fullscreen; picture-in-picture",
    sandbox:
      "allow-downloads allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation",
  },
  {
    year: "2025",
    title: "AvCon Christmas Ezine 2025 – Celebrating Two Years of Inspiration",
    description:
      "This special Christmas edition celebrates the AvCon community, aviation, aerospace, innovation and pathways for the next generation.",
    embed:
      "https://e.issuu.com/embed.html?d=christmas_avcon_2025_altitude_ezine_&u=tyhub",
  },

  {
    year: "2025",
    title: "AvCon Ezine 2025",
    description:
      "Discover the highlights, stories, industry insights and inspirational moments from AvCon 2025.",
    embed: "https://issuu.com/tyhub/docs/avcon_2025_ezine?fr=xKAE9_zU1NQ",
  },

  {
    year: "2024",
    title: "AvCon Ezine 2024",
    description:
      "Explore the first AvCon Ezine featuring aviation pathways, industry stories, student experiences and the future of aviation.",
    embed: "https://e.issuu.com/embed.html?d=avcon_ezine_2024-3&u=tyhub",
  },
];

export default function AvConEzine() {
  return (
    <main className="main-container">
      <HeroSection
        defaultTitle="AVCON EZINE"
        defaultSubtitle="Explore stories, insights and highlights from AvCon's aviation and aerospace community."
        smallScreenTitle="AvCon Ezine"
        smallScreenSubtitle="Discover the stories behind AvCon"
        eyebrow="Stories & insights"
      />

      <section className="ezine-intro">
        <h2>The AvCon Altitude Ezine</h2>

        <p>
          Aviation and aerospace stories, student experiences, career pathways
          and new technology, all in one collection.
        </p>
      </section>

      <section className="ezine-grid">
        {ezines.map((ezine, index) => (
          <article className="ezine-card" key={index}>
            <header>
              <span className="ezine-year">{ezine.year}</span>

              <h3>{ezine.title}</h3>
            </header>

            <p>{ezine.description}</p>

            <div className="iframe-container">
              <iframe
                src={ezine.embed}
                title={ezine.title}
                allowFullScreen
                loading="lazy"
                className="ezine-iframe"
              />
            </div>
            <a href={ezine.publicationUrl || ezine.embed} target="_blank" rel="noopener noreferrer">
              Open {ezine.title}
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
