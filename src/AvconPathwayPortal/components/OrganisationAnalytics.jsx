import React, { useState, useEffect } from 'react';

const OrganisationAnalytics = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        '/api/portal/organisation/analytics/overview',
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to load analytics');
      const data = await response.json();
      setOverview(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await fetch(
        `/api/portal/organisation/analytics/export?format=${format}`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Export failed');

      const contentDisposition = response.headers.get('content-disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename="')[1].split('"')[0]
        : `my_analytics_${new Date().toISOString().split('T')[0]}.${format}`;

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Export failed: ' + err.message);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading analytics...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!overview) return <div className="p-6 text-center text-gray-500">No data available</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Analytics</h1>
          <p className="text-gray-600 mt-1">{overview.organisation.name}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            Export JSON
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Listings</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {overview.summary.total_listings}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Views</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {overview.summary.total_views.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Clicks</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {overview.summary.total_clicks.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Listings Performance */}
      {overview.listings && overview.listings.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Your Listings Performance</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Views</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Clicks</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {overview.listings.map((listing) => (
                <tr key={listing.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{listing.title}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {listing.view_count}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">{listing.click_count}</td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-900">
                    {(listing.conversion_rate * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-500">No listings to display yet</p>
        </div>
      )}
    </div>
  );
};

export default OrganisationAnalytics;
