import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown.svg";
import "./Header.css";

export const Header = () => {
    const [showEventDropdown, setShowEventDropdown] = useState(false);
    const [showAboutDropdown, setShowAboutDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleEventDropdownToggle = () => {
        setShowEventDropdown(!showEventDropdown);
    };

    const handleAboutDropdownToggle = () => {
        setShowAboutDropdown(!showAboutDropdown);
    };

    const handleMobileToggle = () => {
        setShowMobileMenu((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            closeMobileMenu();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="header-container">
                <a href="/">
                    <img
                        src="./AVConLogoWhiteNoBG.png"
                        alt="AVCon logo"
                        className="logo"
                    />
                </a>

            <div className="header-right">
                {isMobile ? (
                    <div className="mobile-menu-toggle" onClick={handleMobileToggle}>
                        <span className="menu-icon">
                            {showMobileMenu ? "✕" : "☰"}
                        </span>

                        {showMobileMenu && (
                            <div className="mobile-menu">
                                <ul>
                                    <li className="mobile-menu-section">
                                        <a href="./" onClick={closeMobileMenu}>
                                            HOME
                                        </a>
                                        <a href="./Event" onClick={closeMobileMenu}>
                                            EVENT INFO
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="./EventSchedule" onClick={closeMobileMenu}>
                                                    EVENT SCHEDULE
                                                </a>
                                            </li>
                                            <li>
                                                <a href="./SpeakersPresenters" onClick={closeMobileMenu}>
                                                    SPEAKERS & PRESENTERS
                                                </a>
                                            </li>
                                            {/* <li>
                                                <a href="./FlightSim" onClick={closeMobileMenu}>
                                                    AVCON XTRA: THE FLIGHT SIM EVENT
                                                </a>
                                            </li> */}
                                        </ul>
                                    </li>

                                    <li className="mobile-menu-section">
                                        <a href="./About" onClick={closeMobileMenu}>
                                            ABOUT AVCON
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="./News" onClick={closeMobileMenu}>
                                                    NEWS & UPDATES
                                                </a>
                                            </li>
                                            <li>
                                                <a href="./AvConEzine" onClick={closeMobileMenu}>
                                                    AVCON EZINE
                                                </a>
                                            </li>
                                            <li>
                                                <a href="./SponsorsPartners" onClick={closeMobileMenu}>
                                                    SPONSORS & PARTNERS
                                                </a>
                                            </li>
                                            <li>
                                                <a href="./AviationPathwayPortal" onClick={closeMobileMenu}>
                                                    AVIATION PATHWAY PORTAL
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="mobile-menu-section">
                                        <a href="./Contact" onClick={closeMobileMenu}>
                                            CONTACT US
                                        </a>
                                    </li>
                                    <li className="mobile-menu-section">
                                        <a href="./ExhibitorRegistration" onClick={closeMobileMenu}>
                                            EXHIBITOR REGISTRATION
                                        </a>
                                    </li>
                                    <li className="mobile-menu-section">
                                        <a href="./BookTickets" onClick={closeMobileMenu}>
                                            AVCON 2025 LIVE STREAM!
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="desktop-menu">
                        <a className="link-text" href="./">
                            HOME
                        </a>
                        <div
                            className="desktop-dropdown"
                            onMouseEnter={handleEventDropdownToggle}
                            onMouseLeave={handleEventDropdownToggle}
                        >
                            <a
                                className="link-text"
                                href="./Event"
                                aria-haspopup="true"
                                aria-expanded={showEventDropdown}
                            >
                                EVENT INFO
                            </a>
                            <img src={Dropdown} alt="Dropdown" className="dropdown-icon" />
                            {showEventDropdown && (
                                <div className="dropdown-content">
                                    <a className="uppercase link-text" href="./EventSchedule">
                                        EVENT SCHEDULE
                                    </a>
                                    <br /><br />
                                    <a className="uppercase link-text" href="./SpeakersPresenters">
                                        SPEAKERS & PRESENTERS
                                    </a>
                                    {/* <br /><br />
                                    <a className="uppercase link-text" href="./FlightSim">
                                        AVCON XTRA: THE FLIGHT SIM EVENT
                                    </a> */}
                                </div>
                            )}
                        </div>

                        <div
                            className="desktop-dropdown"
                            onMouseEnter={handleAboutDropdownToggle}
                            onMouseLeave={handleAboutDropdownToggle}
                        >
                            <a
                                className="uppercase link-text"
                                href="./About"
                                aria-haspopup="true"
                                aria-expanded={showAboutDropdown}
                            >
                                ABOUT AVCON
                            </a>
                            <img src={Dropdown} alt="Dropdown" className="dropdown-icon" />
                            {showAboutDropdown && (
                                <div className="dropdown-content">
                                    <a className="uppercase link-text" href="./News">
                                        NEWS & UPDATES
                                    </a>
                                    <br /><br />
                                    <a className="uppercase link-text" href="./AvConEzine">
                                        AVCON EZINE
                                    </a>
                                    <br /><br />
                                    <a className="uppercase link-text" href="./SponsorsPartners">
                                        SPONSORS & PARTNERS
                                    </a>
                                    <br /><br />
                                    <a className="uppercase link-text" href="./AviationPathwayPortal">
                                        AVIATION PATHWAY PORTAL
                                    </a>
                                </div>
                            )}
                        </div>

                        <a className="link-text" href="./Contact">
                            CONTACT US
                        </a>
                        <a className="link-text" href="./ExhibitorRegistration">
                            EXHIBITOR REGISTRATION
                        </a>
                        <a
                            role="button"
                            className="link-text button-highlight"
                            href="./BookTickets"
                        >
                            AVCON 2025 LIVE STREAM!
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
};
