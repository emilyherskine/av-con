import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-col-1 footer-divider position">
                <a href="/index.html">
                    <img
                        className="footer-logo"
                        src="./AVConLogoWhite.png"
                        alt="AV Con logo"
                    />
                </a>
                <p className="footer-text">
                    AvCon - The Future of Aviation & Aerospace: Inspiring and educating future aviation & aerospace professionals through a dynamic, interactive event on October 2nd,  Casement Aerodrome, Baldonnel, Co Dublin & online via TYHub.ie
                </p>
                <a
                    href="https://emily-h-erskine.github.io/portfolio/"
                    className="copyright">
                    Copyright © 2025 Emily-Huong Erskine
                </a>
            </div>

            <div className="flex-container site-map">
                <div className="flex-1 space-between">
                    <p className="uppercase footer-heading">Events</p>
                    <div className="flex-col">
                        <a href="./Event" className="footer-link">
                            AvCon 2026 Info
                        </a>
                        <a href="./DFCon" className="footer-link">
                            DFCon 2026
                        </a>
                        <a href="./AvConIndustryConvention" className="footer-link">
                            AvCon Industry Convention
                        </a>                       
                        <a href="./BookTickets" className="footer-link">
                            Register Here
                        </a>
                        <a
                            href="./ExhibitorRegistration"
                            className="footer-link">
                            Exhibitor Registration
                        </a>
                    </div>
                </div>

                <div className="flex-1">
                    <p className="uppercase footer-heading">Company</p>
                    <div className="flex-col">
                        <a href="./About" className="footer-link">
                            About Us
                        </a>
                        <a href="./SponsorsPartners" className="footer-link">
                            Our Partners
                        </a>
                        <a href="./SponsorsPartners" className="footer-link">
                            Our Sponsors
                        </a>
                        <a
                            href="./AviationPathwayPortal"
                            className="footer-link">
                            Aviation Pathway Portal
                        </a>
                        <a href="./PhotoGallery" className="footer-link">
                            AvCon Photo Gallery
                        </a>
                    </div>
                </div>

                <div className="flex-1 space-between-col">
                    <p className="uppercase footer-heading">Social</p>
                    <SocialMediaLinks />
                </div>
            </div>
        </footer>
    );
}
