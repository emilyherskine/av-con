import React, { useState, useEffect } from "react";
import { portalRequest } from "../../portalClient";

export default function AdminPromotionAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    setLoading(true);
    setError("");
    try {
      const result = await portalRequest("/admin/featured-listings/analytics", { method: "GET" });
      setAnalytics(result);
    } catch (err) {
      setError(err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="portal-theme-muted">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portal-theme-alert border portal-theme-border rounded-lg p-4 portal-theme-error text-sm">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!analytics) {
    return <div className="portal-theme-muted text-center py-8">No analytics data available</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold portal-theme-text">Promotion Analytics</h2>
        <p className="portal-theme-muted text-sm mt-1">Understand the impact of featured listings</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="portal-theme-panel rounded-lg p-4">
          <div className="text-3xl font-bold portal-theme-text">{analytics.total_featured_listings}</div>
          <div className="text-sm portal-theme-text mt-1">Total Featured Listings</div>
        </div>

        <div className="portal-theme-panel rounded-lg p-4">
          <div className="text-3xl font-bold portal-theme-text">{analytics.featured_active}</div>
          <div className="text-sm portal-theme-text mt-1">Currently Active</div>
        </div>

        <div className="portal-theme-panel rounded-lg p-4">
          <div className="text-3xl font-bold portal-theme-text">{analytics.featured_expired}</div>
          <div className="text-sm portal-theme-error mt-1">Expired</div>
        </div>

        <div className="portal-theme-panel rounded-lg p-4">
          <div className="text-3xl font-bold portal-theme-text">{analytics.avg_view_boost}</div>
          <div className="text-sm portal-theme-muted mt-1">Avg View Boost</div>
        </div>
      </div>

      {/* Effectiveness Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="portal-theme-panel border portal-theme-border rounded-lg p-6">
          <h3 className="text-lg font-bold portal-theme-text mb-4">Engagement Improvement</h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium portal-theme-muted">Average View Increase</span>
                <span className="text-2xl font-bold portal-theme-accent">{analytics.avg_view_boost}</span>
              </div>
              <div className="w-full portal-theme-progress-track rounded-full h-2">
                <div
                  className="portal-theme-progress h-2 rounded-full"
                  style={{ width: "70%" }}
                />
              </div>
              <p className="text-xs portal-theme-muted mt-1">
                Featured listings receive significantly more exposure
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium portal-theme-muted">Average Click Increase</span>
                <span className="text-2xl font-bold portal-theme-accent">{analytics.avg_click_boost}</span>
              </div>
              <div className="w-full portal-theme-progress-track rounded-full h-2">
                <div
                  className="portal-theme-progress h-2 rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
              <p className="text-xs portal-theme-muted mt-1">
                Visitors are more likely to engage with featured content
              </p>
            </div>
          </div>
        </div>

        <div className="portal-theme-panel border portal-theme-border rounded-lg p-6">
          <h3 className="text-lg font-bold portal-theme-text mb-4">Top Performing Featured</h3>

          {analytics.most_effective_featured ? (
            <div className="border-2 portal-theme-accent-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold portal-theme-text mb-1">
                    {analytics.most_effective_featured.title}
                  </h4>
                  <p className="text-sm portal-theme-muted mb-2">
                    {analytics.most_effective_featured.view_count} views
                  </p>
                  <div className="inline-block px-2 py-1 portal-theme-highlight portal-theme-highlight-text text-xs font-semibold rounded">
                    ⭐ Top Performer
                  </div>
                </div>
                <span className="text-3xl">🏆</span>
              </div>
            </div>
          ) : (
            <p className="portal-theme-muted text-center py-4">No featured listings yet</p>
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 portal-theme-panel border portal-theme-border rounded-lg p-4">
        <h3 className="font-semibold portal-theme-text mb-3">💡 Insights & Recommendations</h3>
        <ul className="space-y-2 text-sm portal-theme-text">
          <li>
            ✓ Featured listings generate an average of{" "}
            <strong>{analytics.avg_view_boost} more views</strong>
          </li>
          <li>
            ✓ Featured status increases click-through rate by approximately{" "}
            <strong>{analytics.avg_click_boost}</strong>
          </li>
          <li>
            ✓ Currently maintaining{" "}
            <strong>{analytics.featured_active} active featured listings</strong>
          </li>
          <li>
            ✓ Consider featuring high-quality listings from diverse organisations to maximize impact
          </li>
        </ul>
      </div>

      <div className="mt-4 text-xs portal-theme-muted text-center">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
}
