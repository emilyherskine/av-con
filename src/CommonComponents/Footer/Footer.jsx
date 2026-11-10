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
          Connecting education, industry and government to inspire the next
          generation of aviation and aerospace talent.
        </p>

        <a href={EXTERNAL_LINKS.portfolioUrl} className="copyright">
          Copyright © {APP_CONFIG.year} Emily-Huong Erskine
        </a>
      </div>

      <div className="footer-col footer-cta">
        <h3 className="footer-heading uppercase">
          Join Us at {APP_CONFIG.appName}
        </h3>

        <div className="footer-event-details">
          <strong>2026 event: {APP_CONFIG.eventDate}</strong>
          <span>{APP_CONFIG.eventLocation}</span>
        </div>

        <div className="footer-register-buttons">
          <a href={EXTERNAL_LINKS.avcon2027PreRegistrationForm} className="footer-btn">
            AvCon Schools 2027 Pre-Registration
          </a>
          <a
            href={EXTERNAL_LINKS.collegeRegistrationForm}
            className="footer-btn"
          >
            AvCon College Registration
          </a>

          <a
            href={EXTERNAL_LINKS.liveStreamForm}
            className="footer-btn footer-btn-outline"
          >
            2026 education live stream link
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
