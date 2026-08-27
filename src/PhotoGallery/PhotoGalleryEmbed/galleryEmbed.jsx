import React, { useState } from "react";
import "./PhotoGalleryEmbed.css";
import GalleryTabs from "./GalleryTabs";

export default function PhotoGalleryEmbed() {
  const [activeGallery, setActiveGallery] = useState("Gallery");

  const galleries = [
    { id: "Gallery", label: "2025 Shannon Irvine Gallery", url: "https://drive.google.com/embeddedfolderview?id=1XbLfdd6JdLJArOiL2SRpINHCL_Eg_oVt#grid" },
    { id: "BCFE", label: "2025 BCFE Gallery", url: "https://drive.google.com/embeddedfolderview?id=1welPjMaCd3NCgvgOdlAbdf8asYXYQkXS#grid" },
    { id: "Avcon2024Gallery", label: "2024 Shannon Irvine Gallery", url: "https://drive.google.com/embeddedfolderview?id=1cmSUxjwAACJafUwsUPOqpjyD9fvOhdXw#grid" },
    { id: "AirCorps2025", label: "2025 Air Corps Gallery", url: "https://www.flickr.com/photos/dfmagazine/albums/72177720329423083/player/" },
  ];

  return (
    <section className="gallery-section">
      <div className="gallery-card">
        {/* Header strip */}
        <div className="gallery-header">
          <h3>AvCon Official Photo Gallery</h3>
        </div>

        {/* Tab Buttons */}
        <GalleryTabs
          galleries={galleries}
          activeGallery={activeGallery}
          onSelect={setActiveGallery}
        />

        {/* Gallery iframe */}
        <div className="gallery-iframe-container">
          <iframe
            src={galleries.find((gallery) => gallery.id === activeGallery).url}
            className="gallery-iframe"
            title="AvCon Photo Gallery"
            allowFullScreen
          ></iframe>
        </div>

        {/* Footer note */}
        <div className="gallery-footer">
          ✨ Curated by Shannon Irvine Photography & BCFE Students
        </div>
      </div>
    </section>
  );
}
