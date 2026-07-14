import React from "react";
import Box from "@mui/material/Box";
import "./event.css";

export default function EventClosing() {
  return (
    <Box className="event-section">
      <h2>Who Should Attend?</h2>
      <p>AvCon welcomes:</p>
      <ul>
        <li>Secondary School students (Transition Year to Sixth Year)</li>
        <li>Third Level students</li>
        <li>Teachers and Career Guidance Counsellors</li>
        <li>Industry professionals</li>
        <li>Training providers</li>
        <li>Government agencies and education partners</li>
      </ul>

      <br/><br/><br/>

      <h2>More Than an Event</h2>
      <p>
        The AvCon Student Convention is the flagship event within the wider AvCon
        ecosystem.
      </p>
      <p>
        Throughout the year, AvCon connects industry, education and government
        through the AvCon Industry Network, Afterburner networking events,
        workshops and collaborative initiatives.
      </p>
      <p>
        Together, we're helping build a stronger, more connected future for
        aviation, aerospace, engineering, defence, drones, technology,
        sustainability and space.
      </p>

      <Box className="registration-box">
        <h2>Register Your School</h2>
        <p>
          School registration for AvCon 2026 is now open. Participation is free
          for schools and students thanks to the support of our partners.
        </p>
        <a href="https://avcon.ie/BookTickets" className="btn-link">
          Register Your School
        </a>
      </Box>
    </Box>
  );
}
