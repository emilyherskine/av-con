import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-col footer-brand">
                <a href="/">
                    <img
                        className="footer-logo"
                        src="./AVConLogoWhite.png"
                        alt="AvCon logo"
                    />
                </a>

                <p className="footer-text">
                    AvCon - The Future of Aviation & Aerospace: Connecting education, industry and government to inspire
                    the next generation of aviation and aerospace talent.
                </p>

                <a
                    href="https://emilyherskine.github.io/portfolio"
                    className="copyright"
                >
                    Copyright © 2026 Emily-Huong Erskine
                </a>
            </div>

            <div className="footer-col footer-cta">

                <h3 className="footer-heading uppercase">
                    Join Us at AvCon 2026
                </h3>

                <p className="footer-text">
                    Every young person deserves the opportunity to discover
                    what's possible. Together we're connecting industry,
                    inspiring talent and shaping tomorrow's workforce.
                </p>

                <div className="footer-event-details">
                    <strong>Thursday, 8 October 2026</strong>
                    <span>Casement Aerodrome, Baldonnel, Co. Dublin</span>
                </div>

                <div className="footer-register-buttons">
                    <a href="https://forms.cloud.microsoft/r/EinwjqpRz7" className="footer-btn">
                        Attend the Student Convention
                    </a>

                    <a
                        href="https://forms.cloud.microsoft/r/ygzndwRAYy"
                        className="footer-btn footer-btn-outline"
                    >
                        Join the Free Live Stream
                    </a>
                </div>

                <p className="footer-tagline">
                    Connecting Industry. Inspiring Talent. Shaping Tomorrow's Workforce.
                </p>

            </div>

            <div className="footer-col footer-social">
                <h3 className="footer-heading uppercase">Follow Us</h3>
                <SocialMediaLinks />
            </div>

        </footer>
    );
}