import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    fetchOverview();
  }, [period]);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/portal/admin/analytics/overview?days=${period}`,
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

  if (loading) return <div className="p-6 text-center text-gray-500">Loading analytics...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!overview) return <div className="p-6 text-center text-gray-500">No data available</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
          <option value={365}>Last year</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Searches"
          value={overview.summary.total_searches}
          subtext={`${overview.summary.searches_today} today`}
        />
        <StatCard
          title="Opportunities"
          value={overview.summary.opportunities_approved}
          subtext={`${overview.summary.total_opportunities} total`}
        />
        <StatCard
          title="Organizations"
          value={overview.summary.total_organisations}
          subtext={`${overview.summary.organisations_active} active`}
        />
        <StatCard
          title="Most Searched"
          value={overview.top_statistics.most_searched_count}
          subtext={overview.top_statistics.most_searched_term}
        />
      </div>

      {/* Top Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Category</h2>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {overview.top_statistics.top_category}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Location</h2>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {overview.top_statistics.top_location}
            </div>
          </div>
        </div>
      </div>

      {/* Most Viewed Opportunity */}
      {overview.top_statistics.most_viewed_opportunity && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Most Viewed Opportunity</h2>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900">
              {overview.top_statistics.most_viewed_opportunity.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {overview.top_statistics.most_viewed_opportunity.view_count} views •{' '}
              {overview.top_statistics.most_viewed_opportunity.click_count} clicks
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, subtext }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
    <p className="text-xs text-gray-500 mt-2">{subtext}</p>
  </div>
);

export default AnalyticsDashboard;
