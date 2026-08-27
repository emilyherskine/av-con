import React from "react";

export default function ImageInfoCard({
  imageUrl,
  title,
  description,
  webURL,
  linkLabel,
}) {
  return (
    <article className="opportunity-card">
      <img src={imageUrl} alt={`${title} logo`} className="card-img" />

      <div className="card-content">
        <h3>{title}</h3>

        <p>{description}</p>

        <a
          href={webURL}
          target="_blank"
          rel="noopener noreferrer"
          className="app-button"
        >
          {linkLabel}
        </a>
      </div>
    </article>
  );
}
