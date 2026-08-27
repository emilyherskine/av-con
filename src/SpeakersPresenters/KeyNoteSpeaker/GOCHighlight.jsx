import React, { useState } from "react";
import "./GOCHighlight.css";

export default function GOCHighlight({
  SpeakerImage,
  SpeakerName,
  SpeakerBio,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxBioLength = 150;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section
      className="goc-highlight"
      aria-label={`Keynote Speaker: ${SpeakerName}`}
    >
      <div className="goc-image-wrapper">
        <img
          src={SpeakerImage}
          alt={`Portrait of keynote speaker ${SpeakerName}`}
          className="goc-image"
        />
      </div>

      <div className="goc-content">
        <h2 className="goc-name">{SpeakerName}</h2>
        <p
          className={`goc-bio ${isExpanded ? "expanded" : "collapsed"}`}
          aria-expanded={isExpanded}
        >
          {isExpanded ? SpeakerBio : `${SpeakerBio.slice(0, maxBioLength)}...`}
        </p>

        {SpeakerBio.length > maxBioLength && (
          <button
            onClick={handleToggle}
            aria-label={isExpanded ? "Collapse bio" : "Expand full bio"}
            className="speaker-bio-toggle"
          >
            {isExpanded ? "Show Less ▲" : "Read More ▼"}
          </button>
        )}
      </div>
    </section>
  );
}
