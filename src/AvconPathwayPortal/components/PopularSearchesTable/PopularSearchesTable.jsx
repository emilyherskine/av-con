import React, { useState, useEffect } from 'react';

const PopularSearchesTable = () => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(50);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetchPopularSearches();
  }, [limit, days]);

  const fetchPopularSearches = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/portal/admin/analytics/popular-searches?limit=${limit}&days=${days}`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to load searches');
      const data = await response.json();
      setSearches(data.popular_searches || []);
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
        <h1 className="text-2xl font-bold portal-theme-text">Popular Searches</h1>
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

      {searches.length === 0 ? (
        <div className="text-center py-12 portal-theme-muted">No searches yet</div>
      ) : (
        <div className="portal-theme-panel rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="portal-theme-panel border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold portal-theme-muted">Search Term</th>
                <th className="px-6 py-3 text-center text-xs font-semibold portal-theme-muted">Count</th>
                <th className="px-6 py-3 text-center text-xs font-semibold portal-theme-muted">Avg Results</th>
                <th className="px-6 py-3 text-center text-xs font-semibold portal-theme-muted">Avg Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              {searches.map((search, idx) => (
                <tr key={idx} className="border-b portal-theme-hover">
                  <td className="px-6 py-4 text-sm portal-theme-text font-medium">
                    {search.query || '(empty search)'}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold portal-theme-panel portal-theme-text">
                      {search.count}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center portal-theme-muted">
                    {Math.round(search.avg_results || 0)}
                  </td>
                  <td className="px-6 py-4 text-sm text-center portal-theme-muted">
                    {Math.round(search.avg_time_ms || 0)}
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

export default PopularSearchesTable;
