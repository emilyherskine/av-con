import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import PhotoGalleryEmbed from "./PhotoGalleryEmbed/galleryEmbed";
import { Link } from "react-router-dom";
import "./photoGallery.css";

export default function PhotoGallery() {
  return (
    <main className="photo-gallery-page">
      <HeroSection
        defaultTitle="AvCon The Photo Gallery"
        defaultSubtitle="Experience the moments, people and innovation that bring AvCon to life."
        smallScreenTitle="AvCon Photo Gallery"
        smallScreenSubtitle="Explore highlights from AvCon events."
      />

      {/* Gallery Introduction */}
      <section className="gallery-intro">
        <h2>Capturing The AvCon Experience</h2>

        <p>
          Step inside the energy and excitement of AvCon through photographs
          captured by Shannon Irvine Photography & Team and talented students
          from BCFE's Content Creation Course.
        </p>

        <p>
          From aircraft displays and inspiring talks to unforgettable student
          experiences, these images showcase the passion, innovation and
          connections that make AvCon special.
        </p>
      </section>

      {/* Gallery Embed */}
      <section className="gallery-container">
        <PhotoGalleryEmbed />
      </section>

      {/* Final CTA */}
      <section className="gallery-cta">
        <h2>Be Part of AvCon 2026</h2>

        <p>
          Join students, educators, industry professionals and aviation
          enthusiasts as we continue connecting industry, inspiring talent and
          shaping tomorrow's workforce.
        </p>

        <div className="cta-buttons">
          <Link to="/BookTickets" className="btn-link">
            Schools Register
          </Link>

          <Link to="/ExhibitorRegistration" className="btn-link">
            Industry Opportunities
          </Link>
        </div>
      </section>
    </main>
  );
}
