import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import eventPhoto from "../../BookTickets/BookTicketsImages/SHAN6371.jfif";
import "../event.css";

export default function EventIntroduction() {
  return (
    <Box className="event-section">
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={6}>
          <img
            src={eventPhoto}
            alt="Aircraft at AvCon"
            className="event-image"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <h2>More Than a Careers Event</h2>
          <p>
            Students discover careers, meet professionals and experience the
            people and technology shaping aviation, aerospace, engineering and
            emerging industries.
          </p>

          <h2>Why AvCon Exists</h2>
          <p>
            AvCon helps students explore opportunities and experience
            innovation first-hand, whether or not they already know what
            career they want.
          </p>
          <p>
            Thanks to our partners and the AvCon Industry Network, AvCon remains
            free for schools and students.
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}
