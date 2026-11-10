import React, { useId, useState } from "react";

function SpeakerPhoto({ src, name }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <p className="speaker-photo-unavailable">Photo unavailable</p>;
  }

  return (
    <img
      src={src}
      alt={`Portrait of ${name}`}
      className="speaker-image"
      onError={() => setFailed(true)}
    />
  );
}

export default function Speaker({ SpeakerImage, SpeakerName, SpeakerBio }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const bioId = useId();
  const maxBioLength = 100;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="speaker-card">
      <div className="speaker-image-wrapper">
        <SpeakerPhoto key={SpeakerImage} src={SpeakerImage} name={SpeakerName} />
      </div>
      <h3>{SpeakerName}</h3>
      <p id={bioId}>
        {isExpanded || SpeakerBio.length <= maxBioLength
          ? SpeakerBio
          : `${SpeakerBio.substring(0, maxBioLength)}...`}
      </p>
      {SpeakerBio.length > maxBioLength && (
        <button
          type="button"
          className="speaker-bio-toggle"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-controls={bioId}
        >
          {isExpanded ? "Show Less" : "Expand for More"}
        </button>
      )}
    </div>
  );
}
