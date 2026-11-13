import React, { useState } from "react";

export default function PauseResumeDialog({ listing, action, onConfirm, onCancel }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm(reason);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Pause Listing</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <p>
            You're about to pause <strong>{listing.title}</strong>. It will no longer appear
            in the public directory, but you can resume it anytime without re-approval.
          </p>

          <div className="form-group">
            <label htmlFor="reason">Reason for pausing (optional):</label>
            <textarea
              id="reason"
              className="form-control"
              placeholder="e.g., 'Position filled' or 'Temporarily unavailable'"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          <div className="info-box">
            <p>✓ Your email will be confirmed</p>
            <p>✓ Listing remains in your account</p>
            <p>✓ Resume anytime from your dashboard</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-warning"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Pausing..." : "Pause Listing"}
          </button>
        </div>
      </div>
    </div>
  );
}
