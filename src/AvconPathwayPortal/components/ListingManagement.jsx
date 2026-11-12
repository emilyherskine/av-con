import React, { useState, useEffect } from "react";
import PauseResumeDialog from "./PauseResumeDialog";
import RenewListingDialog from "./RenewListingDialog";
import ListingEditor from "./ListingEditor";
import ListingDetails from "./ListingDetails";

export default function ListingManagement({ user }) {
  const [listings, setListings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedListing, setSelectedListing] = useState(null);
  const [editingListing, setEditingListing] = useState(null);
  const [pauseDialog, setPauseDialog] = useState(null);
  const [renewDialog, setRenewDialog] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_URL = "http://localhost:3001/api/portal";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [listingsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/manage/listings`, { credentials: "include" }),
        fetch(`${API_URL}/organisation/stats`, { credentials: "include" })
      ]);

      if (listingsRes.ok) {
        const data = await listingsRes.json();
        setListings(data.listings || []);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }
    } catch (err) {
      setError("Failed to load listings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status) {
    const colors = {
      draft: "#9ca3af",
      pending: "#f59e0b",
      approved: "#10b981",
      rejected: "#ef4444",
      paused: "#8b5cf6"
    };
    return colors[status] || "#6b7280";
  }

  function getDaysUntilExpiry(expiryDate) {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return days;
  }

  function getFilteredListings() {
    if (filter === "all") return listings;
    return listings.filter(l => l.status === filter);
  }

  async function handlePause(listing, reason) {
    try {
      const res = await fetch(`${API_URL}/listings/${listing.id}/pause`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason })
      });

      if (res.ok) {
        setSuccess("Listing paused successfully");
        setPauseDialog(null);
        loadData();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to pause listing");
      }
    } catch (err) {
      setError("Error pausing listing");
      console.error(err);
    }
  }

  async function handleResume(listing) {
    try {
      const res = await fetch(`${API_URL}/listings/${listing.id}/resume`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        setSuccess("Listing resumed successfully");
        loadData();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to resume listing");
      }
    } catch (err) {
      setError("Error resuming listing");
      console.error(err);
    }
  }

  async function handleRenew(listing, days) {
    try {
      const res = await fetch(`${API_URL}/listings/${listing.id}/renew`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days })
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess(data.message);
        setRenewDialog(null);
        loadData();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to renew listing");
      }
    } catch (err) {
      setError("Error renewing listing");
      console.error(err);
    }
  }

  async function handleDelete(listing) {
    if (!window.confirm(`Delete "${listing.title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`${API_URL}/listings/${listing.id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        setSuccess("Listing deleted successfully");
        loadData();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete listing");
      }
    } catch (err) {
      setError("Error deleting listing");
      console.error(err);
    }
  }

  if (loading) {
    return <div className="loading-spinner">Loading your listings...</div>;
  }

  if (editingListing) {
    return (
      <ListingEditor
        user={user}
        listing={editingListing}
        onSave={() => {
          setEditingListing(null);
          loadData();
        }}
        onCancel={() => setEditingListing(null)}
      />
    );
  }

  const filteredListings = getFilteredListings();

  return (
    <div className="listing-management">
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Statistics Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.active}</div>
            <div className="stat-label">Active Listings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending Review</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.paused}</div>
            <div className="stat-label">Paused</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.total_views}</div>
            <div className="stat-label">Total Views</div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="listing-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({listings.length})
        </button>
        <button
          className={`filter-btn ${filter === "approved" ? "active" : ""}`}
          onClick={() => setFilter("approved")}
        >
          Published
        </button>
        <button
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === "paused" ? "active" : ""}`}
          onClick={() => setFilter("paused")}
        >
          Paused
        </button>
        <button
          className={`filter-btn ${filter === "draft" ? "active" : ""}`}
          onClick={() => setFilter("draft")}
        >
          Drafts
        </button>
      </div>

      {/* Listings Table */}
      {filteredListings.length === 0 ? (
        <div className="empty-state">
          <p>No {filter !== "all" ? filter : ""} listings yet</p>
          <button className="btn btn-primary">Create New Listing</button>
        </div>
      ) : (
        <table className="listings-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Expires</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map(listing => {
              const daysLeft = getDaysUntilExpiry(listing.expires_on);
              return (
                <tr key={listing.id}>
                  <td className="title-cell">{listing.title}</td>
                  <td>{listing.category}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(listing.status) }}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td>
                    {listing.expires_on ? (
                      <span className={daysLeft < 7 ? "expiry-warning" : ""}>
                        {daysLeft > 0 ? `${daysLeft} days` : "Expired"}
                      </span>
                    ) : (
                      "Never"
                    )}
                  </td>
                  <td>{listing.view_count || 0}</td>
                  <td className="actions-cell">
                    <button
                      className="action-btn"
                      title="View details"
                      onClick={() => setDetailsDialog(listing)}
                    >
                      👁️
                    </button>
                    <button
                      className="action-btn"
                      title="Edit"
                      onClick={() => setEditingListing(listing)}
                    >
                      ✏️
                    </button>
                    {listing.status === "approved" ? (
                      <>
                        <button
                          className="action-btn"
                          title="Pause"
                          onClick={() => setPauseDialog(listing)}
                        >
                          ⏸️
                        </button>
                        {daysLeft !== null && daysLeft < 30 && (
                          <button
                            className="action-btn"
                            title="Renew"
                            onClick={() => setRenewDialog(listing)}
                          >
                            🔄
                          </button>
                        )}
                      </>
                    ) : listing.status === "paused" ? (
                      <button
                        className="action-btn"
                        title="Resume"
                        onClick={() => handleResume(listing)}
                      >
                        ▶️
                      </button>
                    ) : null}
                    <button
                      className="action-btn delete"
                      title="Delete"
                      onClick={() => handleDelete(listing)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Dialogs */}
      {pauseDialog && (
        <PauseResumeDialog
          listing={pauseDialog}
          action="pause"
          onConfirm={(reason) => handlePause(pauseDialog, reason)}
          onCancel={() => setPauseDialog(null)}
        />
      )}

      {renewDialog && (
        <RenewListingDialog
          listing={renewDialog}
          onConfirm={(days) => handleRenew(renewDialog, days)}
          onCancel={() => setRenewDialog(null)}
        />
      )}

      {detailsDialog && (
        <ListingDetails
          listing={detailsDialog}
          onClose={() => setDetailsDialog(null)}
        />
      )}
    </div>
  );
}
