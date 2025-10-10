import React, { useState } from "react";
import "./PhotoGalleryEmbed.css";

export default function PhotoGalleryEmbed() {
  const [activeGallery, setActiveGallery] = useState("main");

  const galleries = {
    main: "https://drive.google.com/embeddedfolderview?id=1XbLfdd6JdLJArOiL2SRpINHCL_Eg_oVt#grid",
    extra: "https://drive.google.com/embeddedfolderview?id=1welPjMaCd3NCgvgOdlAbdf8asYXYQkXS#grid",
  };

  return (
    <section className="gallery-section">
      <div className="gallery-card">
        {/* Header strip */}
        <div className="gallery-header">
          <h3>AvCon 2025 Official Photo Gallery</h3>
        </div>

        {/* Tab Buttons */}
        <div className="gallery-tabs">
          <button
            onClick={() => setActiveGallery("main")}
            className={`gallery-btn ${activeGallery === "main" ? "active" : ""}`}
          >
            Main Gallery
          </button>
          <button
            onClick={() => setActiveGallery("extra")}
            className={`gallery-btn ${activeGallery === "extra" ? "active" : ""}`}
          >
            Extra Gallery
          </button>
        </div>

        {/* Gallery iframe */}
        <div className="gallery-iframe-container">
          <iframe
            src={galleries[activeGallery]}
            className="gallery-iframe"
            title="AvCon Photo Gallery"
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
