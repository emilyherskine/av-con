import React, { useState } from "react";

export default function Speaker({ SpeakerImage, SpeakerName, SpeakerBio }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxBioLength = 100;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{
        width: '350px',
        height: '350px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <img
          src={SpeakerImage}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top'
          }}
        />
      </div>
      <h6>{SpeakerName}</h6>
      <p style={{ maxHeight: isExpanded ? 'none' : '60px', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        {isExpanded ? SpeakerBio : `${SpeakerBio.substring(0, maxBioLength)}...`}
      </p>
      {SpeakerBio.length > maxBioLength && (
        <button onClick={handleToggle} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#D3D3D3', textDecoration: 'underline', padding: '5%' }}>
          {isExpanded ? 'Show Less' : 'Expand for More'}
        </button>
      )}
    </div>
  );
}
