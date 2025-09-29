import React from "react";
import Grid from "@mui/material/Grid";
import Sponsor from "./sponsor";

// Sponsor images
import SponsoredBy from "./SponsorImages/1.png";
import AirCorpLogo from "./SponsorImages/AirCorpsLogo.jpeg";
import TYHubLogo from "./SponsorImages/TYHubLogo.jpg";
import All2025Sponsors from "./Sponsers.jpeg";



// 🧩 Reusable Image Component
const SponsorImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: "100%",
      maxWidth: "400px",
      opacity: 0.7,
      transition: "opacity 0.3s ease-in-out",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
  />
);

export default function SponsorsPartners() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-4 md:p-24">
      {/* Main Header */}
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Our Sponsors and Partners
      </h3>

      {/* Description */}
      <p style={{ textAlign: "center", padding: "2%" }}>
        AvCon - The Future of Aviation is an unparalleled event made possible through the generous support of our sponsors,
        exhibitors, and partners. This collaboration, including a key partnership with The Irish Air Corps, brings together
        leading aviation professionals, innovative companies, and educational institutions to create an inspiring experience...
      </p>

      {/* Sponsored By */}
      <Grid container justifyContent="center" sx={{ mb: 4 }}>
        <SponsorImage src={SponsoredBy} alt="AvCon Sponsored By" />
      </Grid>
      <Grid container justifyContent="center" sx={{ mb: 4 }}>
        <SponsorImage src={All2025Sponsors}/>
      </Grid>




      {/* Collaboration */}
      <h6 style={{ textAlign: "center", marginBottom: "2rem" }}>
        AvCon In Collaboration with:
      </h6>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Sponsor logoUrl={AirCorpLogo} sponsorName="Irish Air Corps" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Sponsor logoUrl={TYHubLogo} sponsorName="TY Hub" />
        </Grid>
      </Grid>
    </main>
  );
}
