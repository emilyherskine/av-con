import React from "react";

const videoAllow =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export default function VideoEmbed({ src, title = "YouTube video player" }) {
  return (
    <div className="video-container">
      <iframe
        width="560"
        height="315"
        src={src}
        title={title}
        frameBorder="0"
        allow={videoAllow}
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
