import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { IMAGES, RESPONSIVE_BREAKPOINTS } from "../../constants";
import { debounce } from "../../utils";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

/**
 * Header Component
 * Main navigation component with responsive design
 */
export const Header = () => {
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < RESPONSIVE_BREAKPOINTS.tablet,
  );
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
        <img src={IMAGES.logo} alt="AVCon logo" className="logo" />
      </Link>

      <div className="header-right">
        {isMobile ? (
          <>
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={handleMobileToggle}
              aria-expanded={showMobileMenu}
              aria-controls="mobile-navigation"
              aria-label={
                showMobileMenu
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              <span className="menu-icon">{showMobileMenu ? "✕" : "☰"}</span>
            </button>
            <MobileMenu isOpen={showMobileMenu} onClose={closeMobileMenu} />
          </>
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
