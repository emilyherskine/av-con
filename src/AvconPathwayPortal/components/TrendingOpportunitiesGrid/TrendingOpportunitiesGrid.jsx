import React, { useState, useEffect } from 'react';

const TrendingOpportunitiesGrid = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(20);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetchTrending();
  }, [limit, days]);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/portal/admin/analytics/trending-opportunities?limit=${limit}&days=${days}`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to load trending opportunities');
      const data = await response.json();
      setOpportunities(data.trending_opportunities || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center portal-theme-muted">Loading...</div>;
  if (error) return <div className="p-6 text-center portal-theme-error">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold portal-theme-text">Trending Opportunities</h1>
        <div className="flex gap-2">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-3 py-2 border portal-theme-border rounded-lg text-sm"
          >
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
        </div>
      </div>

      {opportunities.length === 0 ? (
        <div className="text-center py-12 portal-theme-muted">No trending opportunities yet</div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="portal-theme-panel rounded-lg shadow p-6 border-l-4 portal-theme-accent-border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold portal-theme-text">{opp.title}</h3>
                  <p className="text-sm portal-theme-muted mt-1">{opp.organisation}</p>
                  <div className="flex gap-4 mt-3 text-sm portal-theme-muted">
                    <span>{opp.category}</span>
                    <span>•</span>
                    <span>{opp.sector}</span>
                    <span>•</span>
                    <span>{opp.location}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-3xl font-bold portal-theme-accent">{opp.view_count}</div>
                  <div className="text-xs portal-theme-muted">views</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div>
                  <div className="text-sm font-semibold portal-theme-text">{opp.click_count}</div>
                  <div className="text-xs portal-theme-muted">clicks</div>
                </div>
                <div>
                  <div className="text-sm font-semibold portal-theme-text">
                    {(opp.conversion_rate * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs portal-theme-muted">conversion</div>
                </div>
                <div>
                  <div className="text-sm font-semibold portal-theme-text">{opp.search_impressions}</div>
                  <div className="text-xs portal-theme-muted">impressions</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingOpportunitiesGrid;
