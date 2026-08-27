import React from "react";

export default function GalleryTabs({ galleries, activeGallery, onSelect }) {
  return (
    <div className="gallery-tabs">
      {galleries.map((gallery) => (
        <button
          key={gallery.id}
          onClick={() => onSelect(gallery.id)}
          className={`gallery-btn ${activeGallery === gallery.id ? "active" : ""}`}
        >
          {gallery.label}
        </button>
      ))}
    </div>
  );
}
