import React from "react";
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

const DesktopDropdown = ({ label, to, links, isOpen, onEnter, onLeave }) => (
    <div className="desktop-dropdown" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <Link className="uppercase link-text" to={to} aria-haspopup="true" aria-expanded={isOpen}>
            {label}
        </Link>
        <img src={Dropdown} alt="Dropdown" className="dropdown-icon" />
        {isOpen && (
            <div className="dropdown-content">
                {links.map((childLink) => (
                    <div key={childLink.label} className="dropdown-link-row">
                        <Link className="uppercase link-text" to={childLink.to}>
                            {childLink.label}
                        </Link>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default DesktopDropdown;
