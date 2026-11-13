import React, { useState } from "react";
import { portalRequest } from "../../portalClient";
import AccessibleModal from "../AccessibleModal/AccessibleModal";
import "../../AvconPathwayPortal.css";

export default function ApprovalDialog({ listing, onClose, onApprove }) {
  const [action, setAction] = useState(""); // "approve" or "reject"
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!action) {
      setError("Select an action (Approve or Reject)");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await portalRequest(`/listings/${listing.id}/status`, {
        method: "PATCH",
        body: {
          status: action === "approve" ? "approved" : "rejected",
          rejection_reason: action === "reject" ? reason : null,
        },
      });

      onApprove();
    } catch (err) {
      setError(err.message || "Failed to process listing");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AccessibleModal
      isOpen={true}
      onClose={onClose}
      title="Review Listing"
      maxWidth="32rem"
    >
      <p style={{ marginBottom: "var(--space-3)", color: "var(--avcon-text-muted)" }}>
        <strong>{listing.title}</strong>
        <br />
        by {listing.organisation_name}
      </p>

      {error && <div role="alert" className="message error">{error}</div>}

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-group">
          <label style={{ marginBottom: "var(--space-2)" }} className="required">
            Action
          </label>
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <button
              type="button"
              onClick={() => {
                setAction("approve");
                setReason("");
              }}
              aria-pressed={action === "approve"}
              style={{
                flex: 1,
                padding: "var(--space-2) var(--space-3)",
                background: action === "approve" ? "var(--avcon-primary)" : "var(--avcon-surface)",
                color: action === "approve" ? "var(--avcon-white)" : "var(--avcon-accent)",
                border: "2px solid var(--avcon-primary)",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              disabled={loading}
            >
              ✓ Approve
            </button>
            <button
              type="button"
              onClick={() => setAction("reject")}
              aria-pressed={action === "reject"}
              style={{
                flex: 1,
                padding: "var(--space-2) var(--space-3)",
                background: action === "reject" ? "var(--avcon-primary-dark)" : "var(--avcon-surface)",
                color: action === "reject" ? "var(--avcon-white)" : "var(--avcon-accent)",
                border: "2px solid var(--avcon-primary-dark)",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              disabled={loading}
            >
              ✗ Reject
            </button>
          </div>
        </div>

        {action === "reject" && (
          <div className="form-group">
            <label htmlFor="rejection-reason" className="required">
              Feedback for Organization
            </label>
            <textarea
              id="rejection-reason"
              placeholder="Explain what needs to be changed or improved..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-textarea"
              rows={4}
              disabled={loading}
              required
            />
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading || !action}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            {loading ? "Processing..." : action === "approve" ? "Approve & Send Email" : "Reject & Send Email"}
          </button>
          <button type="button" onClick={onClose} disabled={loading} className="btn-tertiary">
            Cancel
          </button>
        </div>
      </form>
    </AccessibleModal>
  );
}
