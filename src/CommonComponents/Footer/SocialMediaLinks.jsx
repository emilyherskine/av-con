import React from "react";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61552633058659",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/avcon_ie?igshid=eTNvcHN4MHdkZHJr",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@tyhub_ie/video/7396372068608101664r",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tyhub?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

export default function SocialMediaLinks() {
  return (
    <div className="flex-container">
      <div className="flex-col">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="footer-link"
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
