import React, { useId, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown.svg";
import "./Header.css";

export const DropdownLinksList = ({ links, onClick }) => (
  <>
    {links.map((link) => (
      <li key={link.label}>
        <Link to={link.to} onClick={onClick}>
          {link.label}
        </Link>
      </li>
    ))}
  </>
);

const DesktopDropdown = ({ label, to, links, isOpen, onOpenChange }) => {
  const menuId = useId();
  const toggleRef = useRef(null);

  return (
    <div
      className="desktop-dropdown"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) {
          onOpenChange(false);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onOpenChange(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          onOpenChange(false);
          toggleRef.current.focus();
        }
      }}
    >
      <Link className="uppercase link-text" to={to}>
        {label}
      </Link>
      <button
        ref={toggleRef}
        type="button"
        className="dropdown-toggle"
        aria-label={`${label} submenu`}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => onOpenChange(!isOpen)}
      >
        <img src={Dropdown} alt="" className="dropdown-icon" />
      </button>
      <div id={menuId} className="dropdown-content" hidden={!isOpen}>
        {links.map((childLink) => (
          <div key={childLink.label} className="dropdown-link-row">
            <Link
              className="uppercase link-text"
              to={childLink.to}
              onClick={() => onOpenChange(false)}
            >
              {childLink.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopDropdown;
