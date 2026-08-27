import React from "react";
import { Link } from "react-router-dom";
import { DropdownLinksList } from "./DesktopDropdown";
import { mobileMenuSections } from "../../constants";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <nav
      id="mobile-navigation"
      className="mobile-menu"
      aria-label="Mobile navigation"
    >
      <ul>
        {mobileMenuSections.map((section) => (
          <li key={section.label} className="mobile-menu-section">
            <Link to={section.to} onClick={onClose}>
              {section.label}
            </Link>
            {section.links && (
              <ul className="dropdown-menu">
                <DropdownLinksList links={section.links} onClick={onClose} />
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
