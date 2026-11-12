import React, { useState } from "react";
import "../AvconPathwayPortal.css";

export default function SearchResultsGrid({ results }) {
  const [expandedId, setExpandedId] = useState(null);

  function formatDate(dateStr) {
    if (!dateStr) return "No date";
    return new Date(dateStr).toLocaleDateString("en-IE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function daysUntilExpiry(expiresOn) {
    if (!expiresOn) return null;
    const today = new Date();
    const expiry = new Date(expiresOn);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return (
    <div className="search-results-grid">
      {results.map((listing) => {
        const daysLeft = daysUntilExpiry(listing.expires_on);
        const isExpiringSoon = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;
        const isExpired = daysLeft !== null && daysLeft <= 0;
        const isExpanded = expandedId === listing.id;

        return (
          <article
            key={listing.id}
            className={`search-result-card ${isExpanded ? "expanded" : ""} ${
              isExpired ? "expired" : ""
            }`}
          >
            {/* Card Header */}
            <div className="result-header">
              {/* Logo */}
              {listing.logo_id && (
                <img
                  src={`/api/portal/organisations/${listing.organisation_id}/logo`}
                  alt={listing.organisation_name}
                  className="result-org-logo"
                />
              )}

              {/* Title & Organisation */}
              <div className="result-info">
                <h3 className="result-title">{listing.title}</h3>
                <p className="result-organisation">{listing.organisation_name}</p>
              </div>

              {/* Badges */}
              <div className="result-badges">
                {isExpiringSoon && (
                  <span
                    className="badge badge-expiring"
                    role="status"
                    aria-label={`Expires in ${daysLeft} days`}
                  >
                    Expires in {daysLeft}d
                  </span>
                )}
                {isExpired && (
                  <span className="badge badge-expired" role="status">
                    Expired
                  </span>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="result-body">
              {/* Tags */}
              <div className="result-tags">
                <span className="tag tag-category">{listing.category}</span>
                <span className="tag tag-sector">{listing.sector}</span>
                {listing.location && (
                  <span className="tag tag-location">📍 {listing.location}</span>
                )}
              </div>

              {/* Description (truncated initially) */}
              <p className="result-description">
                {listing.description.substring(0, 150)}
                {listing.description.length > 150 ? "..." : ""}
              </p>

              {/* Stats */}
              <div className="result-stats">
                <span className="stat">
                  <span className="stat-label">Posted:</span>
                  <span className="stat-value">
                    {formatDate(listing.created_at)}
                  </span>
                </span>
                {listing.view_count && (
                  <span className="stat">
                    <span className="stat-label">Views:</span>
                    <span className="stat-value">{listing.view_count}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Expanded Details (shown on expand) */}
            {isExpanded && (
              <div className="result-expanded" role="region">
                <div className="expanded-content">
                  <h4>Full Description</h4>
                  <p>{listing.description}</p>

                  {listing.application_url && (
                    <div className="expanded-actions">
                      <a
                        href={listing.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Apply Now
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Card Footer */}
            <div className="result-footer">
              <button
                className="btn-expand-result"
                onClick={() =>
                  setExpandedId(isExpanded ? null : listing.id)
                }
                aria-expanded={isExpanded}
                aria-controls={`result-details-${listing.id}`}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>

              {listing.application_url && !isExpanded && (
                <a
                  href={listing.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
