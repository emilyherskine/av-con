import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import PhotoGalleryEmbed from "./PhotoGalleryEmbed/galleryEmbed";
import { Link } from "react-router-dom";
import "./photoGallery.css";
import galleryPhoto from "../Home/HomePageImages/_HAN6110.JPG";

export default function PhotoGallery() {
  return (
    <main className="photo-gallery-page">
      <HeroSection
        defaultTitle="The AvCon Photo Gallery"
        defaultSubtitle="Experience the moments, people and innovation that bring AvCon to life."
        smallScreenTitle="AvCon Photo Gallery"
        smallScreenSubtitle="Explore highlights from AvCon events."
        eyebrow="Moments from AvCon"
        backgroundImage={galleryPhoto}
      />

      {/* Gallery Introduction */}
      <section className="gallery-intro">
        <h2>Capturing The AvCon Experience</h2>

        <p>
          Explore aircraft displays, talks and student experiences through
          photographs by Shannon Irvine Photography &amp; Team and students
          from BCFE's Content Creation Course.
        </p>
      </section>

      {/* Gallery Embed */}
      <section className="gallery-container">
        <PhotoGalleryEmbed />
      </section>

      {/* Final CTA */}
      <section className="gallery-cta">
        <h2>Be Part of AvCon</h2>

        <p>
          Join students, educators and industry professionals shaping
          tomorrow's workforce.
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
