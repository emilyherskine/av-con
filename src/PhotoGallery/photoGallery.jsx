import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import PhotoGalleryEmbed from "./PhotoGalleryEmbed/galleryEmbed";

const descriptionParagraphs = [
    "Step inside the energy and excitement of AvCon 2025 - captured through the lenses of Shannon Irvine Photography & Team and the talented students from BCFE's Content Creation Course.",
    "From aircraft displays and inspiring talks to unforgettable student moments, these images showcase the passion and innovation that make AvCon so special.",
];

export default function PhotoGallery() {
    return (
        <main className="bg-gray-50 min-h-screen">
            <HeroSection
                defaultTitle="AvCon The Photo Gallery"
                defaultSubtitle="Look at all the photos from AvCon past"
                smallScreenTitle="AvCon The Photo Gallery"
                smallScreenSubtitle="AvCon presenting an event for all things aviation"
            />

            <section className="max-w-4xl mx-auto px-4 py-10 text-center">
                {descriptionParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-lg text-gray-700 leading-relaxed">
                        {paragraph}
                    </p>
                ))}
                <br />
            </section>
            <PhotoGalleryEmbed />
        </main>
    );
}
