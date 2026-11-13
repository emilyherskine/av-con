import React, { useState, useEffect } from 'react';

const EngagementMetricsViewer = ({ listingId, isAdmin = false }) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [engagementData, setEngagementData] = useState([]);

  useEffect(() => {
    fetchMetrics();
  }, [listingId, isAdmin]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const endpoint = isAdmin
        ? `/api/portal/admin/analytics/listings/${listingId}`
        : `/api/portal/organisation/analytics/listings/${listingId}`;

      const response = await fetch(endpoint, { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to load metrics');

      const data = await response.json();
      setMetrics(data.analytics);
      setEngagementData(data.engagement_history || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-center portal-theme-muted text-sm">Loading...</div>;
  if (error) return <div className="p-4 text-center portal-theme-error text-sm">Error: {error}</div>;
  if (!metrics) return <div className="p-4 text-center portal-theme-muted text-sm">No data</div>;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="portal-theme-panel rounded-lg p-4 border portal-theme-border">
          <div className="text-2xl font-bold portal-theme-accent">{metrics.view_count}</div>
          <div className="text-xs portal-theme-muted mt-1">Views</div>
        </div>
        <div className="portal-theme-panel rounded-lg p-4 border portal-theme-border">
          <div className="text-2xl font-bold portal-theme-accent">{metrics.click_count}</div>
          <div className="text-xs portal-theme-muted mt-1">Clicks</div>
        </div>
        <div className="portal-theme-panel rounded-lg p-4 border portal-theme-border">
          <div className="text-2xl font-bold portal-theme-accent">{metrics.search_impressions}</div>
          <div className="text-xs portal-theme-muted mt-1">Impressions</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {(metrics.conversion_rate * 100).toFixed(1)}%
          </div>
          <div className="text-xs portal-theme-muted mt-1">Conversion</div>
        </div>
      </div>

      {/* Engagement Trend */}
      {engagementData.length > 0 && (
        <div className="portal-theme-panel rounded-lg shadow p-4">
          <h3 className="font-semibold portal-theme-text mb-4">Last 30 Days</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b portal-theme-panel">
                <tr>
                  <th className="px-3 py-2 text-left portal-theme-muted">Date</th>
                  <th className="px-3 py-2 text-center portal-theme-muted">Views</th>
                  <th className="px-3 py-2 text-center portal-theme-muted">Clicks</th>
                  <th className="px-3 py-2 text-center portal-theme-muted">Impressions</th>
                </tr>
              </thead>
              <tbody>
                {engagementData.slice(0, 14).map((day, idx) => (
                  <tr key={idx} className="border-b portal-theme-hover">
                    <td className="px-3 py-2 portal-theme-text font-medium">{day.metric_date}</td>
                    <td className="px-3 py-2 text-center portal-theme-muted">{day.views}</td>
                    <td className="px-3 py-2 text-center portal-theme-muted">{day.clicks}</td>
                    <td className="px-3 py-2 text-center portal-theme-muted">{day.search_impressions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {engagementData.length === 0 && (
        <div className="portal-theme-panel rounded-lg p-8 text-center text-sm portal-theme-muted">
          No engagement data yet
        </div>
      )}
    </div>
  );
};

export default EngagementMetricsViewer;
