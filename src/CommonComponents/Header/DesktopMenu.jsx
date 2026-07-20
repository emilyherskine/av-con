import React from "react";
import { Link } from "react-router-dom";
import DesktopDropdown from "./DesktopDropdown";
import { eventLinks, aboutLinks, primaryLinks } from "../../constants";

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

        <Link role="button" className="link-text button-highlight" to="/bookTickets">
            AVCON 2026 SCHOOL REGISTRATION
        </Link>
    </div>
);

export default DesktopMenu;
