import React, { useState, useEffect } from 'react';

const OrganisationPerformanceTable = () => {
  const [organisations, setOrganisations] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('total_views');
  const [limit] = useState(50);

  useEffect(() => {
    fetchOrganisationPerformance();
  }, []);

  const fetchOrganisationPerformance = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/portal/admin/analytics/organisations?limit=${limit}`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to load organisation data');
      const data = await response.json();
      setOrganisations(data.organisations || []);
      setSummary(data.summary);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sortedOrganisations = [...organisations].sort((a, b) => {
    const aVal = a[sortBy] || 0;
    const bVal = b[sortBy] || 0;
    return typeof aVal === 'number' ? bVal - aVal : String(bVal).localeCompare(String(aVal));
  });

  if (loading) return <div className="p-6 text-center portal-theme-muted">Loading...</div>;
  if (error) return <div className="p-6 text-center portal-theme-error">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold portal-theme-text">Organization Performance</h1>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="portal-theme-panel rounded-lg p-4 border portal-theme-border">
            <div className="text-3xl font-bold portal-theme-accent">{summary.total_organisations}</div>
            <div className="text-sm portal-theme-muted">Total Organizations</div>
          </div>
          <div className="portal-theme-panel rounded-lg p-4 border portal-theme-border">
            <div className="text-3xl font-bold portal-theme-accent">
              {Math.round(summary.avg_listings_per_org)}
            </div>
            <div className="text-sm portal-theme-muted">Avg Listings per Org</div>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <label className="text-sm portal-theme-muted">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border portal-theme-border rounded-lg text-sm"
        >
          <option value="total_views">Total Views</option>
          <option value="total_clicks">Total Clicks</option>
          <option value="active_listings">Active Listings</option>
          <option value="total_listings">Total Listings</option>
          <option value="avg_conversion_rate">Conversion Rate</option>
        </select>
      </div>

      {organisations.length === 0 ? (
        <div className="text-center py-12 portal-theme-muted">No organizations yet</div>
      ) : (
        <div className="portal-theme-panel rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="portal-theme-panel border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold portal-theme-muted">Organization</th>
                <th className="px-6 py-3 text-center font-semibold portal-theme-muted">Listings</th>
                <th className="px-6 py-3 text-center font-semibold portal-theme-muted">Active</th>
                <th className="px-6 py-3 text-center font-semibold portal-theme-muted">Views</th>
                <th className="px-6 py-3 text-center font-semibold portal-theme-muted">Clicks</th>
                <th className="px-6 py-3 text-center font-semibold portal-theme-muted">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrganisations.map((org) => (
                <tr key={org.id} className="border-b portal-theme-hover">
                  <td className="px-6 py-4">
                    <div className="font-medium portal-theme-text">{org.name}</div>
                    <div className="text-xs portal-theme-muted">{org.email}</div>
                  </td>
                  <td className="px-6 py-4 text-center portal-theme-muted">{org.total_listings}</td>
                  <td className="px-6 py-4 text-center portal-theme-muted">{org.active_listings}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold portal-theme-panel portal-theme-text">
                      {org.total_views}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center portal-theme-muted">{org.total_clicks}</td>
                  <td className="px-6 py-4 text-center font-semibold portal-theme-text">
                    {(org.avg_conversion_rate * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrganisationPerformanceTable;
