import React from "react";
import Typography from "@mui/material/Typography";
import "./Card.css"; // Make sure this file exists

export default function Card({ imageSrc, heading, description }) {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={imageSrc} alt={heading} className="card-image" />
      </div>
      <div className="card-content">
        <Typography variant="h4" component="h4" className="card-title">
          {heading}
        </Typography>
        <Typography paragraph>{description}</Typography>
      </div>
    </div>
  );
}
