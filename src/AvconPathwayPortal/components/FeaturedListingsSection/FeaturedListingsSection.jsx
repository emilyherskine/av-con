import React, { useState, useEffect } from "react";
import { portalRequest } from "../../portalClient";

export default function FeaturedListingsSection() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFeaturedListings();
  }, []);

  async function loadFeaturedListings() {
    setLoading(true);
    setError("");
    try {
      const result = await portalRequest("/listings/featured?limit=8", { method: "GET" });
      setListings(result.featured_listings || []);
    } catch (err) {
      setError(err.message || "Failed to load featured listings");
      console.error("Error loading featured listings:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "var(--space-8)",
          paddingBottom: "var(--space-8)",
        }}
        aria-live="polite"
      >
        <div style={{ color: "var(--avcon-text-muted)" }}>
          Loading featured opportunities...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "var(--avcon-primary-dark)",
          border: `1px solid var(--avcon-focus)`,
          borderRadius: "var(--avcon-radius-medium)",
          padding: "var(--space-4)",
          color: "var(--avcon-focus)",
          fontSize: "var(--avcon-font-small)",
        }}
        role="alert"
      >
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (listings.length === 0) {
    return null;
  }

  return (
    <div style={{ paddingTop: "var(--space-4)", paddingBottom: "var(--space-4)" }}>
      <div style={{ marginBottom: "var(--space-3)" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--avcon-text)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            margin: 0,
          }}
        >
          <span aria-hidden="true">⭐</span> Featured Opportunities
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "var(--space-3)",
        }}
      >
        {listings.map((listing) => (
          <div
            key={listing.id}
            style={{
              backgroundColor: "var(--avcon-surface)",
              border: `1px solid var(--avcon-border)`,
              borderRadius: "var(--avcon-radius-medium)",
              padding: "var(--space-3)",
              boxShadow: "var(--avcon-shadow-small)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--avcon-shadow-medium)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--avcon-shadow-small)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {listing.logo_id && (
              <div style={{ marginBottom: "var(--space-2)", height: "3.5rem", overflow: "hidden" }}>
                <img
                  src={`/api/portal/files/${listing.logo_id}/preview`}
                  alt={`${listing.organisation_name} logo`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "var(--avcon-surface)",
                    borderRadius: "var(--avcon-radius-small)",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-2)",
                marginBottom: "var(--space-2)",
                minHeight: "1.5rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "var(--avcon-accent-light)",
                  color: "var(--avcon-text)",
                  fontSize: "0.625rem",
                  fontWeight: "700",
                  borderRadius: "0.25rem",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
                aria-label="Featured listing"
              >
                ⭐ Featured
              </span>
            </div>

            <h3
              style={{
                fontWeight: "700",
                color: "var(--avcon-text)",
                fontSize: "0.875rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "var(--space-1)",
                flex: 1,
                margin: 0,
              }}
            >
              {listing.title}
            </h3>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--avcon-text-muted)",
                marginBottom: "var(--space-2)",
                margin: 0,
                marginBottom: "var(--space-1)",
              }}
            >
              {listing.organisation_name}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-1)",
                marginBottom: "var(--space-2)",
                fontSize: "0.625rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "0.125rem 0.375rem",
                  backgroundColor: "var(--avcon-accent-light)",
                  color: "var(--avcon-text)",
                  borderRadius: "0.25rem",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                }}
              >
                {listing.category}
              </span>
              {listing.location && (
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.125rem 0.375rem",
                    backgroundColor: "var(--avcon-accent-light)",
                    color: "var(--avcon-text)",
                    borderRadius: "0.25rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {listing.location}
                </span>
              )}
            </div>

            <p
              style={{
                fontSize: "0.7rem",
                color: "var(--avcon-text-muted)",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "var(--space-2)",
                flex: 1,
                margin: 0,
                marginBottom: "var(--space-2)",
              }}
            >
              {listing.description.substring(0, 50)}...
            </p>

            <a
              href={listing.application_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "var(--avcon-primary)",
                textDecoration: "none",
                cursor: "pointer",
                transition: "color 0.2s",
                padding: "var(--space-1) 0",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--avcon-primary-dark)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--avcon-primary)")}
            >
              View Details →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
