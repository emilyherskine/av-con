import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown.svg";
import "./Header.css";
import { eventLinks, aboutLinks, primaryLinks, IMAGES, RESPONSIVE_BREAKPOINTS } from "../../constants";
import { debounce } from "../../utils";

/**
 * Dropdown Links Component
 * Renders a list of links for dropdown menus
 */
const DropdownLinksList = ({ links, onClick }) => (
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

/**
 * Desktop Dropdown Component
 * Handles hover-based dropdown menus for desktop view
 */
const DesktopDropdown = ({ label, to, links, isOpen, onEnter, onLeave }) => (
    <div
        className="desktop-dropdown"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
    >
        <Link
            className="uppercase link-text"
            to={to}
            aria-haspopup="true"
            aria-expanded={isOpen}
        >
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

/**
 * Mobile Menu Component
 * Handles mobile navigation with collapsible sections
 */
const MobileMenu = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const mobileSections = [
        { label: "HOME", to: "/" },
        { label: "EVENT INFO", to: "/event", links: eventLinks },
        { label: "ABOUT AVCON", to: "/about", links: aboutLinks },
        { label: "CONTACT US", to: "/contact" },
        { label: "EXHIBITOR REGISTRATION", to: "/exhibitorRegistration" },
        { label: "AVCON 2026 SCHOOL REGISTRATION", to: "/bookTickets" },
    ];

    return (
        <div className="mobile-menu">
            <ul>
                {mobileSections.map((section) => (
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
        </div>
    );
};

/**
 * Desktop Menu Component
 * Renders desktop navigation with dropdown menus
 */
const DesktopMenu = ({
    showEventDropdown,
    onEventDropdownToggle,
    showAboutDropdown,
    onAboutDropdownToggle,
}) => (
    <div className="desktop-menu">
        {primaryLinks.map((link) => {
            if (link.label === "EVENT INFO") {
                return (
                    <DesktopDropdown
                        key={link.label}
                        label={link.label}
                        to={link.to}
                        links={eventLinks}
                        isOpen={showEventDropdown}
                        onEnter={onEventDropdownToggle}
                        onLeave={onEventDropdownToggle}
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
                        onEnter={onAboutDropdownToggle}
                        onLeave={onAboutDropdownToggle}
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
            role="button"
            className="link-text button-highlight"
            to="/bookTickets"
        >
            AVCON 2026 SCHOOL REGISTRATION
        </Link>
    </div>
);

/**
 * Header Component
 * Main navigation component with responsive design
 */
export const Header = () => {
    const [showEventDropdown, setShowEventDropdown] = useState(false);
    const [showAboutDropdown, setShowAboutDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < RESPONSIVE_BREAKPOINTS.tablet);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleEventDropdownToggle = () => {
        setShowEventDropdown((prev) => !prev);
    };

    const handleAboutDropdownToggle = () => {
        setShowAboutDropdown((prev) => !prev);
    };

    const handleMobileToggle = () => {
        setShowMobileMenu((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    };

    useEffect(() => {
        const handleResize = debounce(() => {
            setIsMobile(window.innerWidth < RESPONSIVE_BREAKPOINTS.tablet);
            closeMobileMenu();
        }, 150);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="header-container">
            <Link to="/">
                <img
                    src={IMAGES.logo}
                    alt="AVCon logo"
                    className="logo"
                />
            </Link>

            <div className="header-right">
                {isMobile ? (
                    <div className="mobile-menu-toggle" onClick={handleMobileToggle}>
                        <span className="menu-icon">
                            {showMobileMenu ? "✕" : "☰"}
                        </span>
                        <MobileMenu isOpen={showMobileMenu} onClose={closeMobileMenu} />
                    </div>
                ) : (
                    <DesktopMenu
                        showEventDropdown={showEventDropdown}
                        onEventDropdownToggle={handleEventDropdownToggle}
                        showAboutDropdown={showAboutDropdown}
                        onAboutDropdownToggle={handleAboutDropdownToggle}
                    />
                )}
            </div>
        </header>
    );
};
