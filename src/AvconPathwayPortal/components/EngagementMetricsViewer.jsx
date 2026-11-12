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

  if (loading) return <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-600 text-sm">Error: {error}</div>;
  if (!metrics) return <div className="p-4 text-center text-gray-500 text-sm">No data</div>;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{metrics.view_count}</div>
          <div className="text-xs text-gray-600 mt-1">Views</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-2xl font-bold text-green-600">{metrics.click_count}</div>
          <div className="text-xs text-gray-600 mt-1">Clicks</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{metrics.search_impressions}</div>
          <div className="text-xs text-gray-600 mt-1">Impressions</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {(metrics.conversion_rate * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-600 mt-1">Conversion</div>
        </div>
      </div>

      {/* Engagement Trend */}
      {engagementData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Last 30 Days</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-700">Date</th>
                  <th className="px-3 py-2 text-center text-gray-700">Views</th>
                  <th className="px-3 py-2 text-center text-gray-700">Clicks</th>
                  <th className="px-3 py-2 text-center text-gray-700">Impressions</th>
                </tr>
              </thead>
              <tbody>
                {engagementData.slice(0, 14).map((day, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-900 font-medium">{day.metric_date}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{day.views}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{day.clicks}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{day.search_impressions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {engagementData.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-sm text-gray-500">
          No engagement data yet
        </div>
      )}
    </div>
  );
};

export default EngagementMetricsViewer;
