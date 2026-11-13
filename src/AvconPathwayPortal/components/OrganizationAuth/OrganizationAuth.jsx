import React, { useState } from "react";
import { portalRequest } from "../../portalClient";
import "../../AvconPathwayPortal.css";

export default function OrganizationAuth({ onAuthSuccess }) {
  const [step, setStep] = useState("request"); // request, verify, or success
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleRequestLink(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Please enter a valid email address.");
      }
      await portalRequest("/login-link", {
        method: "POST",
        body: { email: email.toLowerCase() },
      });
      setStep("verify");
      setSuccessMessage("Check your email for a login link! (Simulated - enter token below)");
    } catch (err) {
      setError(err.message || "Failed to send login link");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyToken(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!token.match(/^[a-f0-9]{64}$/)) {
        throw new Error("Please enter a valid login token (64 hex characters).");
      }
      const result = await portalRequest("/verify-login-token", {
        method: "POST",
        body: { token },
      });
      // Store user info and call success callback
      sessionStorage.setItem("portalUser", JSON.stringify(result.user));
      setStep("success");
      setTimeout(() => onAuthSuccess(result.user), 1500);
    } catch (err) {
      setError(err.message || "Invalid or expired login link");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setStep("request");
    setEmail("");
    setToken("");
    setError("");
    setSuccessMessage("");
  }

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={() => window.location.hash = ""} aria-label="Close">×</button>

        {step === "request" && (
          <form onSubmit={handleRequestLink} className="auth-form">
            <h2>Organization Login</h2>
            <p className="auth-description">
              Enter your organization email to receive a login link. No password needed!
            </p>

            <div className="form-group">
              <label htmlFor="org-email">Organization Email</label>
              <input
                id="org-email"
                type="email"
                placeholder="contact@airline.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="form-input"
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Sending..." : "Send Login Link"}
            </button>

            <p className="auth-footnote">
              Don't have an account? Submit an opportunity first—we'll create one for you!
            </p>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={handleVerifyToken} className="auth-form">
            <h2>Verify Your Login</h2>
            <p className="auth-description">
              A login link has been sent to <strong>{email}</strong>. Check your email and paste the token below.
            </p>

            <div className="form-group">
              <label htmlFor="login-token">Login Token</label>
              <input
                id="login-token"
                type="text"
                placeholder="Paste your 64-character token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={loading}
                className="form-input"
                required
              />
              <p className="form-hint">The token is in the login link in your email</p>
            </div>

            {error && <p className="error-text">{error}</p>}
            {successMessage && <p className="success-text">{successMessage}</p>}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button type="button" onClick={handleReset} className="btn-secondary">
              Back to Email Entry
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="auth-success">
            <div className="success-icon">✓</div>
            <h2>Welcome back!</h2>
            <p>You're logged in. Redirecting to your dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
