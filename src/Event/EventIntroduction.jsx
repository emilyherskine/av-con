import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./event.css";

export default function EventIntroduction() {
  return (
    <Box className="event-section">
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={6}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9sOMS-WPobYEoD2Sz4qGYGQSR9M3Dy-Tfq3n6NlHp8UuIfnlL1acAEB5&s=10"
            alt="AvCon aircraft"
            className="event-image"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <h2>More Than a Careers Event</h2>
          <p>AvCon is where curiosity becomes possibility.</p>
          <p>
            Every student deserves the opportunity to discover careers they never
            knew existed, connect with industry professionals and imagine a future
            they may never have considered.
          </p>
          <p>
            For one unforgettable day, students experience the people, technology
            and opportunities shaping aviation, aerospace, engineering and emerging
            technologies.
          </p>
          
          <br/>

          <h2>Why AvCon Exists</h2>
          <p>The future of aviation depends on the people who will shape it.</p>
          <p>
            AvCon removes barriers between students and industry by creating
            meaningful opportunities to explore careers, meet professionals and
            experience innovation first-hand.
          </p>
          <p>
            Students don't need to arrive knowing their dream career. AvCon exists
            to help them discover one.
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
