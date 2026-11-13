import React from "react";

export default function PathwayCard({ title, text }) {
  return (
    <article className="pathway-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
