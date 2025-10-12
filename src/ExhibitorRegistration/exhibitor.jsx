import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import Carousel from "./CarouselComponent/Carousel";
import "./ExhibitorRegistration.css";
import img1 from "./CarouselImages/_Pavilion 1 3D Back Angle.png";
import img2 from "./CarouselImages/_Pavilion 1 3D Front Angle.png";
import img3 from "./CarouselImages/_Pavilion 1 3D Plan.png";
import img4 from "./CarouselImages/3x2_Shell Run Angle.png";
import img5 from "./CarouselImages/3x2_Shell Run.png";
import img6 from "./CarouselImages/3x3 Stand Side View.png";
import FloorPlan from "./CarouselImages/FloorPlan2025.png";
import MiddleBlockOfText from "../Home/MiddleBlockOfText/middleBlock";

const imageList = [FloorPlan, img1, img2, img3, img4, img5, img6];

export default function ExhibitorRegistration() {
    return (
        <main>
            <HeroSection
                defaultTitle="Register to be an Exhibitor at AvCon"
                defaultSubtitle="AvCon is thrilled to present its signature event dedicated to all things aviation"
                smallScreenTitle="Register to be an Exhibitor at AvCon"
                smallScreenSubtitle="AvCon presenting an event for all things aviation"
            />

            <section className="exhibitor-content">
                <h2 className="exhibitor-heading">
                    Be Part of AvCon 2026: Inspire, Engage, Connect
                </h2>

                <div className="exhibitor-two-column">
                    <div className="exhibitor-column">
                        <h4>Explore Our Exhibitor Layouts</h4>
                        <Carousel images={imageList} />
                    </div>

                    <div className="exhibitor-column">
                        <p className="exhibitor-paragraph">
                            <strong>AvCon - The Future of Aviation & Aerospace</strong> is Ireland's leading careers and industry event, connecting aviation, aerospace, and space innovators with thousands of students eager to explore their future pathways.
                        </p>
                        <p className="exhibitor-paragraph">
                            In 2024, AvCon inspired over 14,000 students, with 6,480 attending in person and 4,400+ joining online through our live broadcast. In 2025, that momentum soared even higher - over 8,000 students experienced the event live at Casement Aerodrome, while thousands more tuned in from across Ireland, the UK, and Europe via TYHub.ie.
                        </p>
                        <p className="exhibitor-paragraph">
                            AvCon continues to unite industry, education, and government to highlight real career opportunities in aviation, aerospace, space, drones, sustainability, and emerging technologies.
                            Now, we look ahead to 2026, where AvCon expands into a two-part experience - combining our signature student showcase with a new AvCon Industry Convention - and introducing DFCon: The Future of Careers, connecting pathways from Sea to Sky, Cyber to Construction.
                            More than an event, AvCon and DFCon are movements - inspiring the next generation and shaping the future of Ireland's aviation, aerospace, and wider industry landscape.
                        </p>
                    </div>
                </div>

                <MiddleBlockOfText />
                <br/><br/>

                <h3 className="exhibitor-subheading">Why Exhibit or Sponsor?</h3>
                <ul className="exhibitor-list">
                    <li>Showcase your brand to thousands of students, teachers, and early-career professionals.</li>
                    <li>Connect directly with schools, colleges, and youth career services nationwide.</li>
                    <li>Inspire future talent interested in aviation, tech, sustainability, and STEM careers.</li>
                    <li>Feature in AvCon Magazine, distributed to thousands of students and educators, with both print and digital reach.</li>
                    <li>Get visibility on our Live Broadcast, including short ad slots or feature mentions for online audiences.</li>
                    <li>Boost your impact with premium branding, including on-site Airspace and Outdoor branding zones, main stage product placement, or large-format banners.</li>
                    <li>Activate your brand through giveaways, demos or student competitions throughout the day.</li>
                    <li>Network with B2B professionals across recruitment, innovation, government, and education.</li>
                </ul>

                <p className="exhibitor-paragraph">
                    Whether you're launching a programme, showcasing innovation, hiring talent, or simply want to inspire — there's a place for you at AvCon 2026.
                </p>
                <div className="exhibitor-two-column">
                    <div className="exhibitor-column">
                        <div className="exhibitor-cta">
                            <p><strong>🔽 Register Your Interest:</strong></p>
                            <a
                                href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUQkdONTlJMlNQV1hVNU9DQ1NTM0NKTE1BVy4u"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Sponsor/Exhibitor Form
                            </a>
                        </div>
                    </div>
                    <div className="exhibitor-column">
                        <div className="exhibitor-contact">
                            <p><strong>📩 Questions? Contact:</strong></p>
                            <a href="mailto:fiona@avcon.ie">fiona@avcon.ie</a>
                            <a href="mailto:louise@avcon.ie">louise@avcon.ie</a>
                            <a href="mailto:sales@avcon.ie">sales@avcon.ie</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
