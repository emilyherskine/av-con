import React from "react";
import DFConLogo from "./DFConLogo.jpeg";
import './DFCon.css';

export default function DFCon() {
  return (
    <main className="DFCon-container">
      <header className="DFCon-header">
        <img src={DFConLogo} alt="DFCon Logo" className="DFCon-logo" />
        <h1>Welcome to DFCon - The Future of Careers</h1>
      </header>

      <section className="DFCon-intro">
        <p>
          DFCon is the sister event to AvCon - The Future of Aviation & Aerospace, expanding the mission to connect the Defence Forces with the industries and innovations shaping Ireland's future.
          From sea to sky, from cyber to construction, from tanks to equine, DFCon shows how skills learned in service — from problem-solving and leadership to engineering and communications — apply directly to everyday industries and emerging technologies.
        </p>
      </section>

      <section className="DFCon-highlights">
        <h2>At DFCon, students, educators, and employers come together to:</h2>
        <ul>
          <li>Explore how Defence skills and innovation connect to real-world careers</li>
          <li>Discover pathways in engineering, logistics, cyber, healthcare, sustainability, and more</li>
          <li>Experience interactive exhibits, live demos, and career conversations that spark ideas and ambition</li>
        </ul>
      </section>

      <section className="DFCon-vision">
        <p>DFCon is not just a careers event — it's a movement to build a generation that's adaptable, inspired, and ready for what's next.</p>
        <p>💬 Because 60% of future careers don't exist yet, and together, we can prepare the next generation to Dare 2 Dream and create a better tomorrow.</p>
        <p>📅 Coming May 2026</p>
        <p>👉 Exhibit, sponsor, or partner with us: <a href="mailto:hello@avcon.ie">hello@avcon.ie</a></p>
      </section>
    </main>
  );
}
