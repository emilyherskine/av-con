import React from "react";
import { Link } from "react-router-dom";
import DesktopDropdown from "./DesktopDropdown";
import { eventLinks, aboutLinks, primaryLinks } from "../../constants";

const DesktopMenu = ({
  showEventDropdown,
  onEventDropdownChange,
  showAboutDropdown,
  onAboutDropdownChange,
}) => (
  <nav className="desktop-menu" aria-label="Main navigation">
    {primaryLinks.map((link) => {
      if (link.label === "EVENT INFO") {
        return (
          <DesktopDropdown
            key={link.label}
            label={link.label}
            to={link.to}
            links={eventLinks}
            isOpen={showEventDropdown}
            onOpenChange={onEventDropdownChange}
          />
        );
      }

      if (link.label === "ABOUT AVCON") {
        return (
          <DesktopDropdown
            key={link.label}
            label={link.label}
            to={link.to}
            links={aboutLinks}
            isOpen={showAboutDropdown}
            onOpenChange={onAboutDropdownChange}
          />
        );
      }

      return (
        <Link key={link.label} className="link-text" to={link.to}>
          {link.label}
        </Link>
      );
    })}

    <Link
      className="link-text button-highlight"
      to="/bookTickets"
    >
      SCHOOL PRE-REGISTRATION 2027
    </Link>
  </nav>
);

export default DesktopMenu;
