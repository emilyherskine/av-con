import React, { useState, useEffect } from "react";
import { portalRequest } from "../portalClient";
import FeaturedBadge from "./FeaturedBadge";

export default function AdminFeaturedListingsManager() {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [stats, setStats] = useState({
    total_featured: 0,
    featured_active: 0,
    featured_expired: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [duration, setDuration] = useState(30);
  const [reason, setReason] = useState("");
  const [featureLoading, setFeatureLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("featured");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const featured = await portalRequest("/admin/featured-listings", { method: "GET" });
      setFeaturedListings(featured.featured_listings || []);
      setStats(featured.stats || {});

      const allListings = await portalRequest("/admin/listings/all", { method: "GET" });
      setAllListings(allListings.listings || []);
    } catch (err) {
      setError(err.message || "Failed to load featured listings");
    } finally {
      setLoading(false);
    }
  }

  async function handleFeatureListing(listingId) {
    if (!listingId) return;
    setFeatureLoading(true);
    try {
      await portalRequest(`/admin/listings/${listingId}/feature`, {
        method: "POST",
        body: { duration_days: duration, reason: reason.trim() }
      });
      await loadData();
      setShowFeatureModal(false);
      setSelectedListing(null);
      setDuration(30);
      setReason("");
    } catch (err) {
      setError(err.message || "Failed to feature listing");
    } finally {
      setFeatureLoading(false);
    }
  }

  async function handleUnfeatureListing(listingId) {
    if (!window.confirm("Remove featured status from this listing?")) return;
    try {
      await portalRequest(`/admin/listings/${listingId}/feature`, { method: "DELETE" });
      await loadData();
    } catch (err) {
      setError(err.message || "Failed to unfeature listing");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading featured listings...</div>
      </div>
    );
  }

  const unapprovedListings = allListings.filter(l => l.status !== "approved");
  const approvedNotFeatured = allListings.filter(
    l => l.status === "approved" && l.is_featured !== 1
  );

  return (
    <div
      style={{
        maxWidth: "88rem",
        margin: "0 auto",
        padding: "var(--space-3) var(--space-4)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-4)",
          gap: "var(--space-4)",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "var(--avcon-text-dark)",
              margin: 0,
            }}
          >
            Featured Listings
          </h2>
        </div>
        <button
          onClick={onLogout}
          style={{
            padding: "var(--space-2) var(--space-3)",
            backgroundColor: "var(--avcon-primary)",
            color: "var(--avcon-white)",
            border: "none",
            borderRadius: "var(--avcon-radius-medium)",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "var(--avcon-font-small)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
          aria-label="Log out from admin dashboard"
        >
          Log Out
        </button>
      </div>

      {error && (
        <div
          style={{
            marginBottom: "var(--space-3)",
            padding: "var(--space-2) var(--space-3)",
            backgroundColor: "var(--avcon-error-light)",
            border: "1px solid var(--avcon-error)",
            borderRadius: "var(--avcon-radius-medium)",
            color: "var(--avcon-error-dark)",
            fontSize: "var(--avcon-font-small)",
          }}
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {/* Compact Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "var(--space-2)",
          marginBottom: "var(--space-4)",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--avcon-surface)",
            border: "1px solid var(--avcon-border)",
            borderRadius: "var(--avcon-radius-medium)",
            padding: "var(--space-3)",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "var(--avcon-primary)",
            }}
          >
            {stats.total_featured}
          </div>
          <div
            style={{
              fontSize: "var(--avcon-font-small)",
              color: "var(--avcon-text-muted)",
              marginTop: "var(--space-1)",
            }}
          >
            Total Featured
          </div>
        </div>
        <div
          style={{
            backgroundColor: "var(--avcon-surface)",
            border: "1px solid var(--avcon-border)",
            borderRadius: "var(--avcon-radius-medium)",
            padding: "var(--space-3)",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "var(--avcon-accent)",
            }}
          >
            {stats.featured_active}
          </div>
          <div
            style={{
              fontSize: "var(--avcon-font-small)",
              color: "var(--avcon-text-muted)",
              marginTop: "var(--space-1)",
            }}
          >
            Active
          </div>
        </div>
        <div
          style={{
            backgroundColor: "var(--avcon-surface)",
            border: "1px solid var(--avcon-border)",
            borderRadius: "var(--avcon-radius-medium)",
            padding: "var(--space-3)",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "var(--avcon-text-muted)",
            }}
          >
            {stats.featured_expired}
          </div>
          <div
            style={{
              fontSize: "var(--avcon-font-small)",
              color: "var(--avcon-text-muted)",
              marginTop: "var(--space-1)",
            }}
          >
            Expired
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          marginBottom: "var(--space-4)",
          borderBottom: "1px solid var(--avcon-border)",
        }}
      >
        <button
          onClick={() => setActiveTab("featured")}
          style={{
            padding: "var(--space-2) var(--space-4)",
            fontWeight: "600",
            fontSize: "var(--avcon-font-small)",
            color:
              activeTab === "featured"
                ? "var(--avcon-primary)"
                : "var(--avcon-text-muted)",
            borderBottom:
              activeTab === "featured"
                ? "2px solid var(--avcon-primary)"
                : "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            activeTab !== "featured" &&
            (e.target.style.color = "var(--avcon-text-dark)")
          }
          onMouseLeave={(e) =>
            activeTab !== "featured" &&
            (e.target.style.color = "var(--avcon-text-muted)")
          }
          aria-selected={activeTab === "featured"}
          role="tab"
        >
          Currently Featured ({featuredListings.length})
        </button>
        <button
          onClick={() => setActiveTab("feature")}
          style={{
            padding: "var(--space-2) var(--space-4)",
            fontWeight: "600",
            fontSize: "var(--avcon-font-small)",
            color:
              activeTab === "feature"
                ? "var(--avcon-primary)"
                : "var(--avcon-text-muted)",
            borderBottom:
              activeTab === "feature"
                ? "2px solid var(--avcon-primary)"
                : "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            activeTab !== "feature" &&
            (e.target.style.color = "var(--avcon-text-dark)")
          }
          onMouseLeave={(e) =>
            activeTab !== "feature" &&
            (e.target.style.color = "var(--avcon-text-muted)")
          }
          aria-selected={activeTab === "feature"}
          role="tab"
        >
          Feature a Listing ({approvedNotFeatured.length})
        </button>
      </div>

      {/* Currently Featured */}
      {activeTab === "featured" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {featuredListings.length === 0 ? (
            <p
              style={{
                color: "var(--avcon-text-muted)",
                textAlign: "center",
                paddingTop: "var(--space-4)",
                paddingBottom: "var(--space-4)",
              }}
            >
              No listings are currently featured
            </p>
          ) : (
            featuredListings.map((listing) => (
              <div
                key={listing.listing_id}
                style={{
                  backgroundColor: "var(--avcon-white)",
                  border: "1px solid var(--avcon-border)",
                  borderRadius: "var(--avcon-radius-medium)",
                  padding: "var(--space-2) var(--space-3)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  boxShadow: "var(--avcon-shadow-small)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "var(--avcon-shadow-medium)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "var(--avcon-shadow-small)")
                }
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
                    <h3
                      style={{
                        fontWeight: "600",
                        color: "var(--avcon-text-dark)",
                        margin: 0,
                        fontSize: "var(--avcon-font-small)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={listing.title}
                    >
                      {listing.title}
                    </h3>
                    <FeaturedBadge featured_until={listing.featured_until} compact />
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--avcon-text-muted)",
                      display: "flex",
                      gap: "var(--space-3)",
                      alignItems: "center",
                    }}
                  >
                    <span>{listing.organisation}</span>
                    <span>•</span>
                    <span>
                      {Math.ceil(
                        (new Date(listing.featured_until) - new Date()) /
                          (1000 * 60 * 60 * 24)
                      )} days left
                    </span>
                    <span>•</span>
                    <span>📊 {listing.total_views} views</span>
                  </div>
                </div>
                <button
                  onClick={() => handleUnfeatureListing(listing.listing_id)}
                  style={{
                    padding: "var(--space-2) var(--space-3)",
                    backgroundColor: "var(--avcon-error-light)",
                    color: "var(--avcon-error-dark)",
                    border: "1px solid var(--avcon-error)",
                    borderRadius: "var(--avcon-radius-medium)",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Feature Listing */}
      {activeTab === "feature" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {approvedNotFeatured.length === 0 ? (
            <p
              style={{
                color: "var(--avcon-text-muted)",
                textAlign: "center",
                paddingTop: "var(--space-4)",
                paddingBottom: "var(--space-4)",
              }}
            >
              All approved listings are already featured
            </p>
          ) : (
            approvedNotFeatured.map((listing) => (
              <div
                key={listing.id}
                style={{
                  backgroundColor: "var(--avcon-white)",
                  border: "1px solid var(--avcon-border)",
                  borderRadius: "var(--avcon-radius-medium)",
                  padding: "var(--space-2) var(--space-3)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  boxShadow: "var(--avcon-shadow-small)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "var(--avcon-shadow-medium)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "var(--avcon-shadow-small)")
                }
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontWeight: "600",
                      color: "var(--avcon-text-dark)",
                      margin: 0,
                      fontSize: "var(--avcon-font-small)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={listing.title}
                  >
                    {listing.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--avcon-text-muted)",
                      display: "flex",
                      gap: "var(--space-3)",
                      alignItems: "center",
                    }}
                  >
                    <span>{listing.organisation_name || "Unknown"}</span>
                    <span>•</span>
                    <span>{listing.category}</span>
                    {listing.location && (
                      <>
                        <span>•</span>
                        <span>{listing.location}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedListing(listing.id);
                    setShowFeatureModal(true);
                  }}
                  style={{
                    padding: "var(--space-2) var(--space-3)",
                    backgroundColor: "var(--avcon-primary)",
                    color: "var(--avcon-white)",
                    border: "none",
                    borderRadius: "var(--avcon-radius-medium)",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Feature
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Feature Modal */}
      {showFeatureModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="feature-modal-title"
        >
          <div
            style={{
              backgroundColor: "var(--avcon-white)",
              borderRadius: "var(--avcon-radius-medium)",
              padding: "var(--space-4)",
              maxWidth: "28rem",
              width: "100%",
              marginLeft: "1rem",
              marginRight: "1rem",
              boxShadow: "var(--avcon-shadow-large)",
            }}
          >
            <h3
              id="feature-modal-title"
              style={{
                fontSize: "var(--avcon-font-small)",
                fontWeight: "700",
                color: "var(--avcon-text-dark)",
                marginBottom: "var(--space-3)",
                margin: 0,
              }}
            >
              Feature Listing
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              <div>
                <label
                  htmlFor="duration-select"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    color: "var(--avcon-text-dark)",
                    marginBottom: "var(--space-1)",
                  }}
                >
                  Duration (days)
                </label>
                <select
                  id="duration-select"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "var(--space-2) var(--space-3)",
                    border: "1px solid var(--avcon-border)",
                    borderRadius: "var(--avcon-radius-small)",
                    fontSize: "var(--avcon-font-base)",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="reason-textarea"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    color: "var(--avcon-text-dark)",
                    marginBottom: "var(--space-1)",
                  }}
                >
                  Reason (optional)
                </label>
                <textarea
                  id="reason-textarea"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., High engagement..."
                  style={{
                    width: "100%",
                    padding: "var(--space-2) var(--space-3)",
                    border: "1px solid var(--avcon-border)",
                    borderRadius: "var(--avcon-radius-small)",
                    fontSize: "0.75rem",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    minHeight: "4rem",
                    resize: "none",
                  }}
                  aria-label="Reason for featuring this listing"
                />
              </div>
            </div>

            <div
              style={{
                marginTop: "var(--space-4)",
                display: "flex",
                gap: "var(--space-2)",
              }}
            >
              <button
                onClick={() => {
                  setShowFeatureModal(false);
                  setSelectedListing(null);
                  setReason("");
                  setDuration(30);
                }}
                style={{
                  flex: 1,
                  padding: "var(--space-2) var(--space-3)",
                  backgroundColor: "var(--avcon-surface)",
                  color: "var(--avcon-text-dark)",
                  border: "1px solid var(--avcon-border)",
                  borderRadius: "var(--avcon-radius-medium)",
                  fontWeight: "700",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor =
                    "var(--avcon-border)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor =
                    "var(--avcon-surface)")
                }
              >
                Cancel
              </button>
              <button
                onClick={() => handleFeatureListing(selectedListing)}
                disabled={featureLoading}
                style={{
                  flex: 1,
                  padding: "var(--space-2) var(--space-3)",
                  backgroundColor: "var(--avcon-primary)",
                  color: "var(--avcon-white)",
                  border: "none",
                  borderRadius: "var(--avcon-radius-medium)",
                  fontWeight: "700",
                  fontSize: "0.75rem",
                  cursor: featureLoading ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  opacity: featureLoading ? 0.5 : 1,
                }}
                onMouseEnter={(e) =>
                  !featureLoading && (e.target.style.opacity = "0.9")
                }
                onMouseLeave={(e) =>
                  !featureLoading && (e.target.style.opacity = "1")
                }
              >
                {featureLoading ? "Featuring..." : "Feature"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
