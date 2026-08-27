import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../event.css";

const experiences = [
  "Meet professionals from aviation, aerospace, engineering, defence, drones, space and technology.",
  "Discover apprenticeships, college courses, graduate programmes and career pathways.",
  "Experience aircraft displays, simulators, demonstrations and interactive exhibits.",
  "Hear inspiring stories from pilots, engineers, technicians and industry leaders.",
  "Explore emerging technologies, sustainability and the future of flight.",
  "Build confidence through meaningful industry connections.",
];

export default function EventExperience() {
  return (
    <Box className="event-section">
      <h2>What You'll Experience</h2>
      <p>AvCon is designed to inspire, educate and connect.</p>

      <br />

      <Grid container spacing={3}>
        {experiences.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box className="experience-card">{item}</Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
