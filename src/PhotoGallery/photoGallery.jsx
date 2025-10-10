import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import PhotoGalleryEmbed from "./PhotoGalleryEmbed/galleryEmbed";

export default function PhotoGallery() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroSection
        defaultTitle="AvCon The Photo Gallery"
        defaultSubtitle="Look at all the photos from AvCon past"
        smallScreenTitle="AvCon The Photo Gallery"
        smallScreenSubtitle="AvCon presenting an event for all things aviation"
      />

      {/* Description */}
      <section className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          Step inside the energy and excitement of{" "}
          <span className="font-semibold">AvCon 2025</span> - captured through
          the lenses of <span className="italic">Shannon Irvine Photography & Team</span> 
          and the talented students from BCFE's Content Creation Course. From
          aircraft displays and inspiring talks to unforgettable student
          moments, these images showcase the passion and innovation that make
          AvCon so special.
        </p>
        <br/>
      </section>
      <PhotoGalleryEmbed />

    </main>
  );
}
