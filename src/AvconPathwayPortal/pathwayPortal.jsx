import React, { useState, useEffect } from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import AdvertData from "./components/AdvertData/AdvertData";
import PublicSubmissionForm from "./components/PublicSubmissionForm/PublicSubmissionForm";
import OrganisationArea from "./components/OrganisationArea/OrganisationArea";
import OrganizationDashboard from "./components/OrganizationDashboard/OrganizationDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import "./AvconPathwayPortal.css";
import pathwayPhoto from "../Home/HomePageImages/_HAN6730.JPG";

export default function AvconPathwayPortal() {
  const [revision, setRevision] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const stored = sessionStorage.getItem("portalUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        sessionStorage.removeItem("portalUser");
      }
    }
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("portalUser");
    setUser(null);
  }

  // Show admin dashboard if admin user is logged in
  if (user && user.admin) {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  // Show organization dashboard if organization user is logged in
  if (user) {
    return <OrganizationDashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="app-page">
      <HeroSection
        defaultTitle="Your pathway into aviation starts here."
        defaultSubtitle="Discover careers, courses and opportunities across aviation, aerospace and space."
        smallScreenTitle="Aviation Pathway Portal"
        smallScreenSubtitle="Discover careers, courses and opportunities across aviation, aerospace and space."
        buttonText="Explore Opportunities"
        buttonLink="#opportunities"
        eyebrow="AvCon Aviation Pathway Portal"
        backgroundImage={pathwayPhoto}
      />

      <section className="portal-intro" aria-labelledby="portal-intro-title">
        <div>
          <p className="portal-kicker">Discover your next step</p>
          <h2 id="portal-intro-title">A world of opportunities, one place to start.</h2>
          <a className="portal-inline-link" href="#organisation-access">
            Share or manage an opportunity
          </a>
        </div>
        <p>
          Whether you&apos;re a student exploring your options, a graduate
          starting out or a professional building new skills, discover
          pathways that connect you with the industry.
        </p>
      </section>

      <AdvertData revision={revision} />

      <section
        className="industry-callout"
        id="organisation-access"
        aria-labelledby="organisation-access-title"
      >
        <div className="portal-organisation-intro">
          <p className="portal-kicker">For organisations</p>
          <h2 id="organisation-access-title">Help someone find their pathway.</h2>
          <p>
            Share your courses, work experience, training or other opportunities
            with the AvCon community. Listings are reviewed by AvCon before
            publication.
          </p>
        </div>
        <div className="portal-disclosures">
          <details className="portal-disclosure" id="submit-opportunity">
            <summary>
              <span>Submit an opportunity</span>
              <span className="portal-disclosure-hint">No account needed · AvCon review</span>
            </summary>
            <PublicSubmissionForm onSubmitSuccess={() => setRevision((value) => value + 1)} />
          </details>
          <details className="portal-disclosure">
            <summary>
              <span>Manage your listings</span>
              <span className="portal-disclosure-hint">Sign in or create an organisation account</span>
            </summary>
            <OrganisationArea onListingsChanged={() => setRevision((value) => value + 1)} />
          </details>
        </div>
      </section>
    </div>
  );
}
