import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import "./Footer.css";
import { APP_CONFIG, IMAGES, EXTERNAL_LINKS } from "../../constants";

/**
 * Footer Component
 * Displays footer information, CTA, and social links
 */
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-col footer-brand">
                <a href="/">
                    <img
                        className="footer-logo"
                        src={IMAGES.logoWhite}
                        alt={`${APP_CONFIG.appName} logo`}
                    />
                </a>

                <p className="footer-text">
                    {APP_CONFIG.appName} - The Future of Aviation & Aerospace: Connecting education, industry and government to inspire the next generation of aviation and aerospace talent.
                </p>

                <a href={EXTERNAL_LINKS.portfolioUrl} className="copyright">
                    Copyright © {APP_CONFIG.year} Emily-Huong Erskine
                </a>
            </div>

            <div className="footer-col footer-cta">
                <h3 className="footer-heading uppercase">
                    Join Us at {APP_CONFIG.appName} {APP_CONFIG.year}
                </h3>

                <p className="footer-text">
                    Every young person deserves the opportunity to discover what's possible. Together we're connecting industry, inspiring talent and shaping tomorrow's workforce.
                </p>

                <div className="footer-event-details">
                    <strong>{APP_CONFIG.eventDate}</strong>
                    <span>{APP_CONFIG.eventLocation}</span>
                </div>

                <div className="footer-register-buttons">
                    <a href={EXTERNAL_LINKS.studentConventionForm} className="footer-btn">
                        Attend the Student Convention
                    </a>

                    <a href={EXTERNAL_LINKS.liveStreamForm} className="footer-btn footer-btn-outline">
                        Join the Free Live Stream
                    </a>
                </div>

                <p className="footer-tagline">{APP_CONFIG.tagline}</p>
            </div>

            <div className="footer-col footer-social">
                <h3 className="footer-heading uppercase">Follow Us</h3>
                <SocialMediaLinks />
            </div>
        </footer>
    );
}