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

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Organization Performance</h1>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-3xl font-bold text-blue-600">{summary.total_organisations}</div>
            <div className="text-sm text-gray-600">Total Organizations</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-3xl font-bold text-green-600">
              {Math.round(summary.avg_listings_per_org)}
            </div>
            <div className="text-sm text-gray-600">Avg Listings per Org</div>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <label className="text-sm text-gray-600">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          <option value="total_views">Total Views</option>
          <option value="total_clicks">Total Clicks</option>
          <option value="active_listings">Active Listings</option>
          <option value="total_listings">Total Listings</option>
          <option value="avg_conversion_rate">Conversion Rate</option>
        </select>
      </div>

      {organisations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No organizations yet</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Organization</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Listings</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Active</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Views</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Clicks</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrganisations.map((org) => (
                <tr key={org.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{org.name}</div>
                    <div className="text-xs text-gray-500">{org.email}</div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">{org.total_listings}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{org.active_listings}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {org.total_views}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">{org.total_clicks}</td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-900">
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
