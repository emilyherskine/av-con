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

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Popular Searches</h1>
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

      {searches.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No searches yet</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Search Term</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Count</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Avg Results</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Avg Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              {searches.map((search, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {search.query || '(empty search)'}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                      {search.count}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-600">
                    {Math.round(search.avg_results || 0)}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-600">
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
