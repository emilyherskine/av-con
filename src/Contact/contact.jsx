import React from "react";
import ContactUsForm from "./contactForm";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import "./contact.css";

export default function Contact() {
    return (
        <main>
            <HeroSection
                defaultTitle="CONTACT US"
                defaultSubtitle="AvCon is thrilled to present its signature event dedicated to all things aviation"
                smallScreenTitle="Contact Us"
                smallScreenSubtitle="AvCon presenting an event for all things aviation"
            />

            <div className="contact-container">
                {/* Contact Form */}
                <div className="contact-form-wrapper">
                    <ContactUsForm />
                </div>

                {/* Extra Contact Info */}
                <div className="contact-info">
                    <h3>📩 More Questions? Contact:</h3>
                    <div className="contact-grid">
                        <a href="mailto:fiona@avcon.ie">fiona@avcon.ie</a>
                        <a href="mailto:sales@avcon.ie">sales@avcon.ie</a>
                        <a href="mailto:hello@avcon.ie">hello@avcon.ie</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
