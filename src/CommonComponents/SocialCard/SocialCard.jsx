import React from "react";

export default function SocialCard({ title, children }) {
  return (
    <div className="social-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
