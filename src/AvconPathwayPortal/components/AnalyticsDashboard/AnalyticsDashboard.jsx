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

  if (loading) return <div className="p-6 text-center portal-theme-muted">Loading analytics...</div>;
  if (error) return <div className="p-6 text-center portal-theme-error">Error: {error}</div>;
  if (!overview) return <div className="p-6 text-center portal-theme-muted">No data available</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold portal-theme-text">Analytics Dashboard</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
          className="px-3 py-2 border portal-theme-border rounded-lg portal-theme-focus"
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
        <div className="portal-theme-panel rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold portal-theme-text mb-4">Top Category</h2>
          <div className="text-center">
            <div className="text-3xl font-bold portal-theme-accent">
              {overview.top_statistics.top_category}
            </div>
          </div>
        </div>

        <div className="portal-theme-panel rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold portal-theme-text mb-4">Top Location</h2>
          <div className="text-center">
            <div className="text-3xl font-bold portal-theme-accent">
              {overview.top_statistics.top_location}
            </div>
          </div>
        </div>
      </div>

      {/* Most Viewed Opportunity */}
      {overview.top_statistics.most_viewed_opportunity && (
        <div className="portal-theme-panel rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold portal-theme-text mb-4">Most Viewed Opportunity</h2>
          <div className="border-l-4 portal-theme-accent-border pl-4">
            <h3 className="font-semibold portal-theme-text">
              {overview.top_statistics.most_viewed_opportunity.title}
            </h3>
            <p className="text-sm portal-theme-muted mt-1">
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
  <div className="portal-theme-panel rounded-lg shadow p-6">
    <h3 className="text-sm font-medium portal-theme-muted">{title}</h3>
    <p className="text-3xl font-bold portal-theme-text mt-2">{value.toLocaleString()}</p>
    <p className="text-xs portal-theme-muted mt-2">{subtext}</p>
  </div>
);

export default AnalyticsDashboard;
