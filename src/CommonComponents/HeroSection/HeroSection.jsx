import React, { useState, useEffect } from "react";
import HeroMobile from "./Hero-mobile.png";
import HeroImage from "./HeroImage.jpeg";
import "./HeroSection.css";

export default function HeroSection({
  defaultTitle,
  defaultSubtitle,
  smallScreenTitle,
  smallScreenSubtitle,
  buttonText,
  buttonLink,
  eyebrow,
  backgroundImage,
}) {
  const [title, setTitle] = useState(defaultTitle || "");
  const [subtitle, setSubtitle] = useState(defaultSubtitle || "");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 600) {
        setTitle(smallScreenTitle || defaultTitle || "");
        setSubtitle(
          smallScreenSubtitle || defaultSubtitle || "",
        );
      } else {
        setTitle(defaultTitle);
        setSubtitle(defaultSubtitle);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [defaultTitle, defaultSubtitle, smallScreenTitle, smallScreenSubtitle]);

  return (
    <div className="hero-wrapper">
      <picture className="hero-image-container">
        <source media="(max-width: 600px)" srcSet={backgroundImage || HeroMobile} />
        <source media="(min-width: 600px)" srcSet={backgroundImage || HeroImage} />
        <img
          src={backgroundImage || HeroImage}
          alt=""
          className="hero-background-img"
        />
      </picture>

      <div className="hero-overlay" />

      <div className="hero-content-position">
        {eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}
        {title && <h1 className="title">{title}</h1>}
        {subtitle && <p className="sub-title">{subtitle}</p>}

        {buttonText && buttonLink && (
          <a href={buttonLink} className="uppercase btn-link">
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
}
