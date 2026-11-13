import React, { useState, useEffect } from "react";
import { portalRequest } from "../../portalClient";
import ApprovalDialog from "../ApprovalDialog/ApprovalDialog";
import "../../AvconPathwayPortal.css";

export default function AdminDashboard({ user, onLogout }) {
  const [stats, setStats] = useState({ totalOrgs: 0, totalListings: 0, pendingSubmissions: 0, expiringSoon: 0 });
  const [pendingListings, setPendingListings] = useState([]);
  const [approvedListings, setApprovedListings] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("pending"); // pending, approved, emails, stats
  const [selectedListing, setSelectedListing] = useState(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError("");
    try {
      const result = await portalRequest("/admin/dashboard");
      setStats(result.stats);
      setPendingListings(result.recentSubmissions || []);
      setApprovedListings(result.recentApprovals || []);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function loadEmailLogs() {
    try {
      const result = await portalRequest("/email-logs");
      setEmailLogs(result.logs || []);
    } catch (err) {
      console.error("Failed to load email logs:", err);
    }
  }

  function handleApprove(listing) {
    setSelectedListing(listing);
    setShowApprovalDialog(true);
  }

  function handleApprovalComplete() {
    setShowApprovalDialog(false);
    setSelectedListing(null);
    loadDashboard();
  }

  const { totalOrgs, totalListings, pendingSubmissions, expiringSoon } = stats;

  return (
    <div className="org-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="dashboard-subtitle">Welcome, {user.name}</p>
        </div>
        <button onClick={onLogout} className="btn-logout">
          Log Out
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{totalOrgs}</div>
          <div className="stat-label">Organizations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalListings}</div>
          <div className="stat-label">Published Listings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: "var(--avcon-focus)" }}>
            {pendingSubmissions}
          </div>
          <div className="stat-label">Pending Review</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: "var(--avcon-accent)" }}>
            {expiringSoon}
          </div>
          <div className="stat-label">Expiring Soon</div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab("pending")}
          className={activeTab === "pending" ? "tab-active" : ""}
          style={{
            padding: "var(--space-2) var(--space-4)",
            background: activeTab === "pending" ? "var(--avcon-primary)" : "var(--avcon-primary-dark)",
            color: "var(--avcon-text)",
            border: "1px solid var(--avcon-border)",
            borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            flex: 1,
            textAlign: "center",
          }}
        >
          Pending ({pendingSubmissions})
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={activeTab === "approved" ? "tab-active" : ""}
          style={{
            padding: "var(--space-2) var(--space-4)",
            background: activeTab === "approved" ? "var(--avcon-primary)" : "var(--avcon-primary-dark)",
            color: "var(--avcon-text)",
            border: "1px solid var(--avcon-border)",
            borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            flex: 1,
            textAlign: "center",
          }}
        >
          Approved
        </button>
        <button
          onClick={() => {
            setActiveTab("emails");
            loadEmailLogs();
          }}
          className={activeTab === "emails" ? "tab-active" : ""}
          style={{
            padding: "var(--space-2) var(--space-4)",
            background: activeTab === "emails" ? "var(--avcon-primary)" : "var(--avcon-primary-dark)",
            color: "var(--avcon-text)",
            border: "1px solid var(--avcon-border)",
            borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            flex: 1,
            textAlign: "center",
          }}
        >
          Email Logs
        </button>
      </div>

      {loading ? (
        <p className="loading-message">Loading dashboard...</p>
      ) : activeTab === "pending" ? (
        <div className="listings-table">
          <table>
            <thead>
              <tr>
                <th>Listing</th>
                <th>Organization</th>
                <th>Category</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingListings.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "var(--space-4)" }}>
                    No pending listings
                  </td>
                </tr>
              ) : (
                pendingListings.map((listing) => (
                  <tr key={listing.id}>
                    <td className="listing-title-cell">
                      <strong>{listing.title}</strong>
                      <br />
                      <span className="listing-location">{listing.location}</span>
                    </td>
                    <td>{listing.organisation_name}</td>
                    <td>{listing.category}</td>
                    <td className="listing-date">
                      {new Date(listing.created_at).toLocaleDateString()}
                    </td>
                    <td className="listing-actions">
                      <button
                        onClick={() => handleApprove(listing)}
                        className="btn-small"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : activeTab === "approved" ? (
        <div className="listings-table">
          <table>
            <thead>
              <tr>
                <th>Listing</th>
                <th>Organization</th>
                <th>Category</th>
                <th>Approved</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              {approvedListings.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "var(--space-4)" }}>
                    No approved listings
                  </td>
                </tr>
              ) : (
                approvedListings.map((listing) => (
                  <tr key={listing.id}>
                    <td className="listing-title-cell">
                      <strong>{listing.title}</strong>
                      <br />
                      <span className="listing-location">{listing.location}</span>
                    </td>
                    <td>{listing.organisation_name}</td>
                    <td>{listing.category}</td>
                    <td className="listing-date">
                      {new Date(listing.updated_at).toLocaleDateString()}
                    </td>
                    <td className="listing-date">
                      {listing.expires_on
                        ? new Date(listing.expires_on).toLocaleDateString()
                        : "No expiry"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : activeTab === "emails" ? (
        <div className="listings-table">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Recipient</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Sent</th>
              </tr>
            </thead>
            <tbody>
              {emailLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "var(--space-4)" }}>
                    No email logs
                  </td>
                </tr>
              ) : (
                emailLogs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <span className="badge category">{log.email_type.replace(/_/g, " ")}</span>
                    </td>
                    <td>{log.recipient_email}</td>
                    <td style={{ fontSize: "0.9rem" }}>{log.subject}</td>
                    <td>
                      <span
                        style={{
                          background: log.status === "sent" ? "var(--avcon-accent)" : "var(--avcon-primary-dark)",
                          color: log.status === "sent" ? "var(--avcon-primary-dark)" : "var(--avcon-white)",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="listing-date">
                      {new Date(log.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {showApprovalDialog && selectedListing && (
        <ApprovalDialog
          listing={selectedListing}
          onClose={() => setShowApprovalDialog(false)}
          onApprove={handleApprovalComplete}
        />
      )}

      <div className="dashboard-help">
        <h3>Admin Tools</h3>
        <ul>
          <li>Review pending submissions and approve or reject with feedback</li>
          <li>View all approved listings and their expiry status</li>
          <li>Monitor email delivery in the Email Logs tab</li>
          <li>Use the job endpoints to trigger expiry reminders and weekly digests (requires API key)</li>
        </ul>
      </div>
    </div>
  );
}
