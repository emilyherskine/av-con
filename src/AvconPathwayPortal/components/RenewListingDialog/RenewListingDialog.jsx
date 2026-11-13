import React, { useState } from "react";

export default function RenewListingDialog({ listing, onConfirm, onCancel }) {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm(days);
    } finally {
      setLoading(false);
    }
  }

  const renewalOptions = [
    { days: 7, label: "1 week" },
    { days: 14, label: "2 weeks" },
    { days: 30, label: "30 days" },
    { days: 60, label: "60 days" },
    { days: 90, label: "3 months" },
    { days: 180, label: "6 months" }
  ];

  // Calculate new expiry date
  const today = new Date();
  const newExpiry = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
  const expiryFormatted = newExpiry.toLocaleDateString("en-IE", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Renew Listing</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <p>Extend the availability of <strong>{listing.title}</strong></p>

          <div className="form-group">
            <label>Renewal Duration:</label>
            <div className="renewal-options">
              {renewalOptions.map(option => (
                <button
                  key={option.days}
                  className={`renewal-option ${days === option.days ? "active" : ""}`}
                  onClick={() => setDays(option.days)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="renewal-preview">
            <p>New expiry date: <strong>{expiryFormatted}</strong></p>
          </div>

          <div className="info-box">
            <p>✓ Extend your listing's visibility</p>
            <p>✓ No re-approval needed</p>
            <p>✓ Continues in search results</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Renewing..." : "Renew Listing"}
          </button>
        </div>
      </div>
    </div>
  );
}
