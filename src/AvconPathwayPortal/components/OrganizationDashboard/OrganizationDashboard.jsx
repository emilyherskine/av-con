import React, { useState, useEffect } from "react";
import { portalRequest } from "../../portalClient";
import ListingEditor from "../ListingEditor/ListingEditor";
import ListingManagement from "../ListingManagement/ListingManagement";
import "../../AvconPathwayPortal.css";

export default function OrganizationDashboard({ user, onLogout }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [stats, setStats] = useState({ draft: 0, pending: 0, approved: 0, paused: 0, total_views: 0, total_renewed: 0 });
  const [useListingManagement, setUseListingManagement] = useState(false);

  useEffect(() => {
    loadListings();
    loadStats();
  }, []);

  async function loadListings() {
    setLoading(true);
    setError("");
    try {
      const result = await portalRequest("/manage/listings");
      setListings(result.listings || []);
    } catch (err) {
      setError(err.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    try {
      const result = await portalRequest("/organisation/stats");
      setStats(result || { draft: 0, pending: 0, approved: 0, paused: 0, total_views: 0, total_renewed: 0 });
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }

  async function handleDeleteListing(listingId) {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await portalRequest(`/listings/${listingId}`, { method: "DELETE" });
      setListings(listings.filter((l) => l.id !== listingId));
    } catch (err) {
      alert(err.message || "Failed to delete listing");
    }
  }

  async function handleStatusChange(listingId, newStatus) {
    try {
      await portalRequest(`/listings/${listingId}/status`, {
        method: "PATCH",
        body: { status: newStatus },
      });
      setListings(
        listings.map((l) =>
          l.id === listingId ? { ...l, status: newStatus, updated_at: new Date().toISOString() } : l
        )
      );
      loadStats();
    } catch (err) {
      alert(err.message || "Failed to update listing status");
    }
  }

  const draftCount = stats.draft;
  const pendingCount = stats.pending;
  const approvedCount = stats.approved;

  return (
    <div className="org-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Organization Dashboard</h1>
          <p className="dashboard-subtitle">{user.name}</p>
        </div>
        <button onClick={onLogout} className="btn-logout">
          Log Out
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{draftCount}</div>
          <div className="stat-label">Drafts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{pendingCount}</div>
          <div className="stat-label">Pending Review</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{approvedCount}</div>
          <div className="stat-label">Published</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.paused || 0}</div>
          <div className="stat-label">Paused</div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => setShowEditor(true)} className="btn-primary">
          + Create New Listing
        </button>
        <button 
          onClick={() => setUseListingManagement(!useListingManagement)} 
          className={useListingManagement ? "btn-secondary active" : "btn-secondary"}
        >
          {useListingManagement ? "← Back to Simple View" : "Advanced View →"}
        </button>
      </div>

      {showEditor && (
        <ListingEditor
          initialListing={selectedListing}
          onSave={() => {
            setShowEditor(false);
            setSelectedListing(null);
            loadListings();
            loadStats();
          }}
          onCancel={() => {
            setShowEditor(false);
            setSelectedListing(null);
          }}
        />
      )}

      {error && <p className="error-message">{error}</p>}

      {useListingManagement ? (
        <ListingManagement 
          listings={listings} 
          loading={loading}
          onRefresh={() => {
            loadListings();
            loadStats();
          }}
        />
      ) : (
        <>
          {loading ? (
            <p className="loading-message">Loading your listings...</p>
          ) : listings.length === 0 ? (
            <div className="empty-state">
              <p>No listings yet. Create one to get started!</p>
              <button onClick={() => setShowEditor(true)} className="btn-secondary">
                Create Your First Listing
              </button>
            </div>
          ) : (
            <div className="listings-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.id} className={`status-${listing.status}`}>
                      <td className="listing-title-cell">
                        <strong>{listing.title}</strong>
                        <br />
                        <span className="listing-location">{listing.location}</span>
                      </td>
                      <td>{listing.category}</td>
                      <td>
                        <select
                          value={listing.status}
                          onChange={(e) => handleStatusChange(listing.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="draft">Draft</option>
                          <option value="pending">Submit for Review</option>
                          <option value="paused">Paused</option>
                        </select>
                      </td>
                      <td className="listing-date">
                        {new Date(listing.created_at).toLocaleDateString()}
                      </td>
                      <td className="listing-actions">
                        <button
                          onClick={() => {
                            setSelectedListing(listing);
                            setShowEditor(true);
                          }}
                          className="btn-small"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteListing(listing.id)}
                          className="btn-small btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <div className="dashboard-help">
        <h3>How It Works</h3>
        <ul>
          <li><strong>Draft:</strong> Save your listing without submitting. Only you can see it.</li>
          <li><strong>Submit for Review:</strong> Send to AvCon admins for approval. This takes 1-2 business days.</li>
          <li><strong>Published:</strong> Your listing is live and visible to everyone searching the directory.</li>
          <li><strong>Paused:</strong> Temporarily hide your listing without deleting it. You can resume anytime.</li>
        </ul>
      </div>
    </div>
  );
}
