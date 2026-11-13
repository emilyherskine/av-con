import React, { useState, useEffect } from "react";
import PromotionImpactCard from "../PromotionImpactCard/PromotionImpactCard";
import FeaturedBadge from "../FeaturedBadge/FeaturedBadge";

export default function ListingDetails({ listing, onClose }) {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState(null);
  const [promotionData, setPromotionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3001/api/portal";

  useEffect(() => {
    loadDetails();
  }, [listing.id]);

  async function loadDetails() {
    try {
      const [metricsRes, historyRes, promotionRes] = await Promise.all([
        fetch(`${API_URL}/listings/${listing.id}/metrics`, { credentials: "include" }),
        fetch(`${API_URL}/listings/${listing.id}/history`, { credentials: "include" }),
        listing.is_featured ? fetch(`${API_URL}/organisation/listings/${listing.id}/promotion-impact`, { credentials: "include" }) : Promise.resolve(null)
      ]);

      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics(data);
      }

      if (historyRes.ok) {
        const data = await historyRes.json();
        setHistory(data.history);
      }

      if (promotionRes && promotionRes.ok) {
        const data = await promotionRes.json();
        setPromotionData(data);
      }
    } catch (err) {
      console.error("Failed to load listing details:", err);
    } finally {
      setLoading(false);
    }
  }

  function getStatusStyle(status) {
    const styles = {
      draft: { backgroundColor: "var(--avcon-surface)", color: "var(--avcon-text-muted)" },
      pending: { backgroundColor: "var(--avcon-focus)", color: "var(--avcon-primary-dark)" },
      approved: { backgroundColor: "var(--avcon-accent)", color: "var(--avcon-primary-dark)" },
      rejected: { backgroundColor: "var(--avcon-primary-dark)", color: "var(--avcon-white)" },
      paused: { backgroundColor: "var(--avcon-action)", color: "var(--avcon-white)" },
    };
    return styles[status] || { backgroundColor: "var(--avcon-primary)", color: "var(--avcon-white)" };
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{listing.title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Listing Summary */}
          <div className="details-section">
            <div className="details-grid">
              <div className="detail-item">
                <label>Status</label>
                <span
                  className="status-badge"
                  style={getStatusStyle(listing.status)}
                >
                  {listing.status}
                </span>
              </div>
              <div className="detail-item">
                <label>Category</label>
                <span>{listing.category}</span>
              </div>
              <div className="detail-item">
                <label>Sector</label>
                <span>{listing.sector}</span>
              </div>
              <div className="detail-item">
                <label>Location</label>
                <span>{listing.location}</span>
              </div>
              <div className="detail-item">
                <label>Created</label>
                <span>{formatDate(listing.created_at)}</span>
              </div>
              <div className="detail-item">
                <label>Expires</label>
                <span>{listing.expires_on || "Never"}</span>
              </div>
            </div>

            <div className="description-box">
              <label>Description</label>
              <p>{listing.description}</p>
            </div>

            <div className="detail-item">
              <label>Application URL</label>
              <a href={listing.application_url} target="_blank" rel="noopener noreferrer">
                {listing.application_url}
              </a>
            </div>
          </div>

          {/* Performance Metrics */}
          {metrics && (
            <div className="details-section">
              <h3>Performance</h3>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-value">{metrics.total_views}</div>
                  <div className="metric-label">Total Views</div>
                </div>
                {metrics.last_viewed && (
                  <div className="metric-card">
                    <div className="metric-label">Last Viewed</div>
                    <div className="metric-value">{formatDate(metrics.last_viewed)}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Featured Listing Info */}
          {listing.is_featured && (
            <div className="details-section">
              <FeaturedBadge featured_until={listing.featured_until} />
              <div style={{ marginTop: "var(--space-3)" }}>
                <PromotionImpactCard
                  promotion_data={promotionData || {
                    is_featured: listing.is_featured === 1,
                    featured_until: listing.featured_until,
                    metrics: {}
                  }}
                  listing_title={listing.title}
                />
              </div>
            </div>
          )}

          {/* Change History */}
          {history && history.length > 0 && (
            <div className="details-section">
              <h3>Change History</h3>
              <div className="history-list">
                {history.map((entry) => (
                  <div key={entry.id} className="history-entry">
                    <div className="history-action">{entry.action}</div>
                    <div className="history-by">{entry.changed_by}</div>
                    <div className="history-date">{formatDate(entry.created_at)}</div>
                    {entry.new_value && (
                      <div className="history-details">
                        {JSON.stringify(JSON.parse(entry.new_value), null, 2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
