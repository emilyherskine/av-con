import React, { useState, useEffect } from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import AdvancedSearch from "./components/AdvancedSearch";
import PublicSubmissionForm from "./components/PublicSubmissionForm";
import OrganisationArea from "./components/OrganisationArea";
import OrganizationAuth from "./components/OrganizationAuth";
import OrganizationDashboard from "./components/OrganizationDashboard";
import AdminDashboard from "./components/AdminDashboard";
import "./AvconPathwayPortal.css";
import pathwayPhoto from "../Home/HomePageImages/_HAN6730.JPG";

export default function AvconPathwayPortal() {
  const [, setRevision] = useState(0);
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
        </div>
        <p>
          Whether you&apos;re a student exploring your options, a graduate
          starting out or a professional building new skills, discover
          pathways that connect you with the industry.
        </p>
      </section>

      <AdvancedSearch />

      <section className="industry-callout" id="organisation-access">
        <div className="portal-organisation-intro">
          <p className="portal-kicker">For organisations</p>
          <h2>Help someone find their pathway.</h2>
          <p>
            Share your courses, work experience, training or other opportunities
            with the AvCon community. Listings are reviewed by AvCon before
            publication.
          </p>
        </div>
        <PublicSubmissionForm onSubmitSuccess={() => setRevision((value) => value + 1)} />
        <hr className="portal-divider" />
        <h3>Manage Your Listings</h3>
        <p className="portal-subtitle">
          Already submitted? Login to your dashboard to view, edit, and manage all your listings.
        </p>
        <div style={{ marginBottom: "var(--space-4)" }}>
          <button
            onClick={() => setUser({ showAuth: true })}
            style={{
              padding: "var(--space-2) var(--space-4)",
              background: "var(--avcon-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Organization Login
          </button>
        </div>
        {user?.showAuth && <OrganizationAuth onAuthSuccess={(authUser) => setUser(authUser)} />}
        <OrganisationArea onListingsChanged={() => setRevision((value) => value + 1)} />
      </section>
    </div>
  );
}
