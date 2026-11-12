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

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Trending Opportunities</h1>
        <div className="flex gap-2">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
        </div>
      </div>

      {opportunities.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No trending opportunities yet</div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{opp.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{opp.organisation}</p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    <span>{opp.category}</span>
                    <span>•</span>
                    <span>{opp.sector}</span>
                    <span>•</span>
                    <span>{opp.location}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-3xl font-bold text-blue-600">{opp.view_count}</div>
                  <div className="text-xs text-gray-500">views</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{opp.click_count}</div>
                  <div className="text-xs text-gray-500">clicks</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {(opp.conversion_rate * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">conversion</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{opp.search_impressions}</div>
                  <div className="text-xs text-gray-500">impressions</div>
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
