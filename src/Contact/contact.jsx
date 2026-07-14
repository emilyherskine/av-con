import React from "react";
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

                {/* Contact CTA */}
                <div className="contact-card">

                    <h3>
                        📩 AvCon General Enquiries
                    </h3>

                    <p>
                        Have a question about AvCon, partnerships, attending,
                        or getting involved? Complete our contact form and
                        we'll get back to you.
                    </p>

                    <a
                        href="https://forms.cloud.microsoft/r/hhD9LkzA3rE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-button"
                    >
                        AvCon General Enquiries / Contact Us →
                    </a>

                </div>


                {/* Contact Information */}
                <div className="contact-info">

                    <h3>
                        More Questions? Contact:
                    </h3>

                    <div className="contact-grid">

                        <a href="mailto:fiona@avcon.ie">
                            fiona@avcon.ie
                        </a>

                        <a href="mailto:sales@avcon.ie">
                            sales@avcon.ie
                        </a>

                        <a href="mailto:hello@avcon.ie">
                            hello@avcon.ie
                        </a>

                    </div>

                </div>

            </div>

        </main>
    );
}