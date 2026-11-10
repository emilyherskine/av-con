import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import "./contact.css";

const contactEmails = [
  { href: "mailto:fiona@avcon.ie", label: "fiona@avcon.ie" },
  { href: "mailto:sales@avcon.ie", label: "sales@avcon.ie" },
  { href: "mailto:hello@avcon.ie", label: "hello@avcon.ie" },
];

export default function Contact() {
  return (
    <div>
      <HeroSection
        defaultTitle="Contact AvCon"
        defaultSubtitle="Questions about attending, partnerships or getting involved? We'd love to hear from you."
        smallScreenTitle="Contact Us"
        smallScreenSubtitle="Get in touch with the AvCon team."
        eyebrow="Let's connect"
      />

      <div className="contact-container">
        <div className="contact-card">
          <h2>General Enquiries</h2>
          <p>
            Have a question about AvCon, partnerships, attending, or getting
            involved? Complete our contact form and we'll get back to you.
          </p>
          <a
            href="https://forms.cloud.microsoft/r/hhD9LkzA3rE"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button"
          >
            AvCon General Enquiries / Contact Us →
          </a>
        </div>

        <div className="contact-info">
          <h2>Email the team</h2>
          <div className="contact-grid">
            {contactEmails.map((email) => (
              <a key={email.label} href={email.href}>
                {email.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
