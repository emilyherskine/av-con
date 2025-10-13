import React, { useState } from "react";
import "./PhotoGalleryEmbed.css";

export default function PhotoGalleryEmbed() {
  const [activeGallery, setActiveGallery] = useState("Gallery");

  const galleries = {
    Gallery: "https://drive.google.com/embeddedfolderview?id=1XbLfdd6JdLJArOiL2SRpINHCL_Eg_oVt#grid",
    BCFE: "https://drive.google.com/embeddedfolderview?id=1welPjMaCd3NCgvgOdlAbdf8asYXYQkXS#grid",
    Avcon2024Gallery: "https://drive.google.com/embeddedfolderview?id=1cmSUxjwAACJafUwsUPOqpjyD9fvOhdXw#grid",
    AirCorps2025: "https://www.flickr.com/photos/dfmagazine/albums/72177720329423083/player/",
  };

  return (
    <section className="gallery-section">
      <div className="gallery-card">
        {/* Header strip */}
        <div className="gallery-header">
          <h3>AvCon Official Photo Gallery</h3>
        </div>

        {/* Tab Buttons */}
        <div className="gallery-tabs">
          <button
            onClick={() => setActiveGallery("Gallery")}
            className={`gallery-btn ${activeGallery === "Gallery" ? "active" : ""}`}
          >
            2025 Shannon Irvine Gallery
          </button>
          <button
            onClick={() => setActiveGallery("BCFE")}
            className={`gallery-btn ${activeGallery === "BCFE" ? "active" : ""}`}
          >
            2025 BCFE Gallery
          </button>
          <button
            onClick={() => setActiveGallery("Avcon2024Gallery")}
            className={`gallery-btn ${activeGallery === "Avcon2024Gallery" ? "active" : ""}`}
          >
            2024 Shannon Irvine Gallery
          </button>
          <button
            onClick={() => setActiveGallery("AirCorps2025")}
            className={`gallery-btn ${activeGallery === "AirCorps2025" ? "active" : ""}`}
          >
            2025 Air Corps Gallery
          </button>
        </div>

        {/* Gallery iframe */}
        <div className="gallery-iframe-container">
          <iframe
            src={galleries[activeGallery]}
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
