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
}) {
    const [title, setTitle] = useState(defaultTitle || "");
    const [subtitle, setSubtitle] = useState(defaultSubtitle || "");

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth <= 600) {
                setTitle(smallScreenTitle || "AvCon 2026");
                setSubtitle(smallScreenSubtitle || "Welcome to the Future of Aviation!");
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
                <source media="(max-width: 600px)" srcSet={HeroMobile} />
                <source media="(min-width: 600px)" srcSet={HeroImage} />
                <img
                    src={HeroImage}
                    alt="AvCon24 PC-9"
                    className="hero-background-img"
                />
            </picture>

            <div className="hero-overlay" />

            <div className="hero-content-position">
                {title && <p className="title">{title}</p>}
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
