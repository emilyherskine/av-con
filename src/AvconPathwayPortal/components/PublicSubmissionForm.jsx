import React, { useState } from "react";
import { categories, portalRequest, sectors } from "../portalClient";
import ListingFiles from "./ListingFiles";

const emptySubmission = {
  organisation_name: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  organisation_website: "",
  title: "",
  description: "",
  category: "",
  sector: "",
  location: "",
  application_url: "",
  expires_on: "",
};

export default function PublicSubmissionForm({ onSubmitSuccess }) {
  const [values, setValues] = useState(emptySubmission);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  function change(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const payload = {
        organisation_name: values.organisation_name.trim(),
        contact_name: values.contact_name.trim(),
        contact_email: values.contact_email.trim(),
        contact_phone: values.contact_phone.trim(),
        organisation_website: values.organisation_website.trim(),
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        sector: values.sector,
        location: values.location.trim(),
        application_url: values.application_url.trim(),
        expires_on: values.expires_on || null,
        status: "pending",
      };

      const result = await portalRequest("/public/submit", {
        method: "POST",
        body: payload,
      });

      setSubmitted(result.listing);
      setValues(emptySubmission);
      onSubmitSuccess?.(result.listing);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (submitted) {
    return (
      <div className="submission-success-container">
        <div className="submission-success">
          <div className="success-icon">✓</div>
          <h3>Thank You!</h3>
          <p className="success-message-text">Your opportunity has been submitted for AvCon review.</p>
          
          <div className="submission-details">
            <div className="detail-row">
              <span className="detail-label">Listing:</span>
              <span className="detail-value">{submitted.title}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Organization:</span>
              <span className="detail-value">{submitted.organisation_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Contact Email:</span>
              <span className="detail-value">{submitted.contact_email}</span>
            </div>
          </div>

          <div className="submission-next-steps">
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>We'll review your submission</li>
              <li>You'll receive an email confirmation</li>
              <li>Once approved, it'll appear in the public directory</li>
            </ol>
          </div>

          <div className="submission-file-upload">
            <h4>📎 Add Files (Optional)</h4>
            <p>Upload a logo, photos, or PDF documents for your listing:</p>
            <ListingFiles listing={submitted} admin={false} onChanged={() => {}} />
          </div>

          <button 
            type="button" 
            onClick={() => setSubmitted(null)}
            className="app-button"
          >
            Submit Another Opportunity
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="public-submission-form" onSubmit={handleSubmit}>
      <div className="submission-form-header">
        <h3>Submit an Opportunity</h3>
        <p>Share your aviation or aerospace opportunity with the AvCon community</p>
      </div>

      <div className="submission-form-grid">
        {error && <div role="alert" className="message error" style={{ gridColumn: "1 / -1" }}>{error}</div>}

        {/* Left Column - Organization & Contact */}
        <div className="form-column">
          <div className="form-section">
            <h4 className="section-title">Organization</h4>
            <div className="form-group">
              <label htmlFor="org-name" className="required">Organization Name</label>
              <input 
                id="org-name"
                name="organisation_name" 
                value={values.organisation_name} 
                onChange={change} 
                maxLength="200"
                placeholder="e.g., Irish Aviation Authority"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="org-website">Website</label>
              <input 
                id="org-website"
                name="organisation_website" 
                value={values.organisation_website} 
                onChange={change} 
                type="url"
                maxLength="2048"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Contact Details</h4>
            <div className="form-group">
              <label htmlFor="contact-name" className="required">Name</label>
              <input 
                id="contact-name"
                name="contact_name" 
                value={values.contact_name} 
                onChange={change} 
                maxLength="200"
                placeholder="Your name"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email" className="required">Email</label>
              <input 
                id="contact-email"
                name="contact_email" 
                value={values.contact_email} 
                onChange={change} 
                type="email"
                placeholder="your@email.com"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-phone">Phone</label>
              <input 
                id="contact-phone"
                name="contact_phone" 
                value={values.contact_phone} 
                onChange={change} 
                type="tel"
                maxLength="20"
                placeholder="+353 1 1234 5678"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Opportunity Details */}
        <div className="form-column">
          <div className="form-section">
            <h4 className="section-title">Opportunity Details</h4>
            <div className="form-group">
              <label htmlFor="listing-title" className="required">Title</label>
              <input 
                id="listing-title"
                name="title" 
                value={values.title} 
                onChange={change} 
                maxLength="200"
                placeholder="e.g., Pilot Training Programme"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className="required">Category</label>
              <select id="category" name="category" value={values.category} onChange={change} required>
                <option value="">Select a category</option>
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sector" className="required">Sector</label>
              <select id="sector" name="sector" value={values.sector} onChange={change} required>
                <option value="">Select a sector</option>
                {sectors.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location" className="required">Location or Online</label>
              <input 
                id="location"
                name="location" 
                value={values.location} 
                onChange={change} 
                maxLength="200"
                placeholder="e.g., Dublin, Ireland or Online"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="app-url" className="required">Application URL</label>
              <input 
                id="app-url"
                name="application_url" 
                value={values.application_url} 
                onChange={change} 
                type="url"
                placeholder="https://apply.example.com"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="expires">Expiry Date</label>
              <input 
                id="expires"
                name="expires_on" 
                value={values.expires_on} 
                onChange={change} 
                type="date"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description - Full Width */}
      <div className="form-section form-full-width">
        <div className="form-group">
          <label htmlFor="description" className="required">Tell us about this opportunity</label>
          <textarea 
            id="description"
            name="description" 
            value={values.description} 
            onChange={change} 
            maxLength="10000"
            rows="4"
            placeholder="Describe the opportunity, key details, requirements, etc."
            required 
          />
        </div>
      </div>

      <div className="portal-actions">
        <button type="submit" disabled={busy} className="btn-primary">
          {busy ? "Submitting..." : "Submit for Review"}
        </button>
        <button 
          type="button" 
          onClick={() => {
            setValues(emptySubmission);
            setError("");
          }}
          disabled={busy}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
