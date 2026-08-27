import React from "react";

export default function ContentCard({
  title,
  description,
  className = "content-card",
  children,
}) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
