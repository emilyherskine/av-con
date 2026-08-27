import React from "react";
import "./SponsorsPartners.css";
import { Typography } from "@mui/material";

export default function Sponsor({ logoUrl, sponsorName }) {
  return (
    <div className="collaboration-card">
      <img
        src={logoUrl}
        alt={`${sponsorName} Logo`}
        className="collaboration-logo"
      />

      <Typography>{sponsorName}</Typography>
    </div>
  );
}
