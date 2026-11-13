import React from "react";
import "../../AvconPathwayPortal.css";

export default function FirstImageAndText() {
  return (
    <section className="intro-section">
      <h2>Welcome to A.P.P.</h2>

      <p>
        The Aviation Pathway Portal (A.P.P.) connects students, graduates and
        professionals with opportunities in aviation, aerospace and space,
        including:
      </p>

      <div className="intro-highlights">
        <span>Work Experience</span>

        <span>Internships</span>

        <span>Graduate Programmes</span>

        <span>Courses & Training</span>
      </div>

      <p>
        Industry professionals can also share opportunities directly with the
        AvCon community. Contact{" "}
        <a href="mailto:hello@avcon.ie">hello@avcon.ie</a> to list your
        opportunity for free.
      </p>
    </section>
  );
}
