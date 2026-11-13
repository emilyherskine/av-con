import React, { useState, useEffect } from "react";
import { categories, portalRequest, sectors } from "../../portalClient";
import { validateCategory, validateSector } from "../../taxonomyValidator";
import AccessibleModal from "../AccessibleModal/AccessibleModal";
import "../../AvconPathwayPortal.css";

const newListingTemplate = {
  title: "",
  description: "",
  category: "Careers",
  sector: "Airlines & Aviation",
  location: "",
  application_url: "",
  expires_on: "",
};

export default function ListingEditor({ initialListing, onSave, onCancel }) {
  const [listing, setListing] = useState(initialListing || newListingTemplate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (initialListing) {
      setListing(initialListing);
    }
  }, [initialListing]);

  async function handleSubmit(e, status = "draft") {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields and taxonomy
      if (!listing.title.trim()) throw new Error("Title is required");
      if (!listing.description.trim()) throw new Error("Description is required");
      if (!listing.location.trim()) throw new Error("Location is required");
      if (!listing.application_url.trim()) throw new Error("Application URL is required");

      // Validate category and sector against taxonomy
      validateCategory(listing.category);
      validateSector(listing.sector);

      const body = {
        ...listing,
        status,
      };

      if (initialListing?.id) {
        // Update existing listing
        await portalRequest(`/listings/${initialListing.id}`, {
          method: "PUT",
          body,
        });
        setSuccess("Listing updated successfully!");
      } else {
        // Create new listing
        await portalRequest("/listings", {
          method: "POST",
          body,
        });
        setSuccess("Listing created successfully!");
      }

      setTimeout(() => onSave(), 1000);
    } catch (err) {
      setError(err.message || "Failed to save listing");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field, value) {
    setListing((prev) => ({ ...prev, [field]: value }));
  }

  const isNew = !initialListing?.id;

  return (
    <AccessibleModal
      isOpen={true}
      onClose={onCancel}
      title={isNew ? "Create New Listing" : "Edit Listing"}
      maxWidth="36rem"
    >
      {error && <div role="alert" className="message error">{error}</div>}
      {success && <div role="status" className="message success">{success}</div>}

      <form onSubmit={(e) => handleSubmit(e, "draft")} className="editor-form">
        <div className="form-section">
          <h3>Listing Details</h3>

          <div className="form-group">
            <label htmlFor="listing-title" className="required">
              Listing Title
            </label>
            <input
              id="listing-title"
                type="text"
                placeholder="e.g., Pilot Training Program"
                value={listing.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="form-input"
                disabled={loading}
              />
              <p className="form-hint">Keep it clear and descriptive (50-80 characters)</p>
            </div>

            <div className="form-group">
              <label htmlFor="listing-description">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="listing-description"
                placeholder="Tell students what this opportunity is about, what they'll learn, and why they should apply..."
                value={listing.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="form-textarea"
                rows={6}
                disabled={loading}
              />
              <p className="form-hint">Aim for 200-500 characters</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="listing-category">
                  Category <span className="required">*</span>
                </label>
                <select
                  id="listing-category"
                  value={listing.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="form-input"
                  disabled={loading}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="listing-sector">
                  Sector <span className="required">*</span>
                </label>
                <select
                  id="listing-sector"
                  value={listing.sector}
                  onChange={(e) => handleChange("sector", e.target.value)}
                  className="form-input"
                  disabled={loading}
                >
                  {sectors.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="listing-location">
                  Location <span className="required">*</span>
                </label>
                <input
                  id="listing-location"
                  type="text"
                  placeholder="e.g., Dublin, Ireland or Remote"
                  value={listing.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="form-input"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="listing-expiry">Expiry Date (optional)</label>
                <input
                  id="listing-expiry"
                  type="date"
                  value={listing.expires_on || ""}
                  onChange={(e) => handleChange("expires_on", e.target.value)}
                  className="form-input"
                  disabled={loading}
                />
                <p className="form-hint">Leave blank for no expiry</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="listing-url">
                Application URL <span className="required">*</span>
              </label>
              <input
                id="listing-url"
                type="url"
                placeholder="https://example.com/apply"
                value={listing.application_url}
                onChange={(e) => handleChange("application_url", e.target.value)}
                className="form-input"
                disabled={loading}
              />
              <p className="form-hint">Where should students go to apply?</p>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              title="Save as draft - you can edit later"
            >
              {loading ? "Saving..." : "Save as Draft"}
            </button>

            <button
              type="button"
              onClick={(e) => {
                handleSubmit(e, "pending");
              }}
              disabled={loading}
              className="btn-secondary"
              title="Submit for AvCon review - takes 1-2 business days"
            >
              {loading ? "Submitting..." : "Save & Submit for Review"}
            </button>

            <button type="button" onClick={onCancel} disabled={loading} className="btn-tertiary">
              Cancel
            </button>
          </div>

          <p className="form-note">
            💡 <strong>Tip:</strong> Save as draft first, then submit for review when ready. AvCon will review your
            listing within 1-2 business days.
          </p>
        </form>
    </AccessibleModal>
  );
}
