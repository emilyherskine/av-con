import React from "react";

export default function FeaturedBadge({ featured_until, compact = false }) {
  if (!featured_until) return null;

  const now = new Date();
  const expiry = new Date(featured_until);
  const daysLeft = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  const isExpired = daysLeft <= 0;

  // Color scheme from AvCon palette
  const activeStyles = {
    background: "var(--avcon-accent)",
    color: "var(--avcon-white)",
    borderColor: "var(--avcon-accent-light)",
  };

  const expiredStyles = {
    background: "var(--avcon-surface)",
    color: "var(--avcon-text-muted)",
    borderColor: "var(--avcon-border)",
  };

  const styles = isExpired ? expiredStyles : activeStyles;

  if (compact) {
    return (
      <span
        style={{
          display: "inline-block",
          padding: "0.375rem 0.75rem",
          fontSize: "0.75rem",
          fontWeight: "600",
          borderRadius: "1rem",
          border: "1px solid",
          backgroundColor: styles.background,
          color: styles.color,
          borderColor: styles.borderColor,
          letterSpacing: "0.5px",
        }}
        aria-label={isExpired ? "Featured listing (expired)" : "Featured listing"}
      >
        ⭐ Featured
      </span>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-3)",
        borderRadius: "var(--avcon-radius-medium)",
        fontSize: "var(--avcon-font-small)",
        fontWeight: "500",
        border: "1px solid",
        backgroundColor: styles.background,
        color: styles.color,
        borderColor: styles.borderColor,
        transition: "all 0.3s ease",
      }}
      role="status"
      aria-live="polite"
      aria-label={`Featured listing${isExpired ? " (expired)" : ""}`}
    >
      <span style={{ fontSize: "1.25rem", marginTop: "0.125rem" }} aria-hidden="true">⭐</span>
      <div>
        <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
          Featured Listing
        </div>
        {!isExpired && daysLeft > 0 && (
          <div style={{ opacity: "0.85", fontSize: "var(--avcon-font-small)" }}>
            Expires in {daysLeft} {daysLeft === 1 ? "day" : "days"}
          </div>
        )}
        {isExpired && (
          <div style={{ opacity: "0.85", fontSize: "var(--avcon-font-small)" }}>
            Feature expired
          </div>
        )}
      </div>
    </div>
  );
}
