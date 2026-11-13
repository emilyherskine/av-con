import React, { useState } from 'react';

const AnalyticsExportModal = ({ onClose }) => {
  const [exportType, setExportType] = useState('opportunities');
  const [format, setFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setError(null);

      const url = `/api/portal/admin/analytics/export?type=${exportType}&format=${format}`;
      const response = await fetch(url, { credentials: 'include' });

      if (!response.ok) throw new Error('Export failed');

      // Get filename from Content-Disposition header
      const contentDisposition = response.headers.get('content-disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename="')[1].split('"')[0]
        : `analytics_${exportType}_${new Date().toISOString().split('T')[0]}.${format}`;

      // Download file
      const blob = await response.blob();
      const url_blob = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url_blob;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url_blob);

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 portal-theme-backdrop flex items-center justify-center z-50">
      <div className="portal-theme-panel rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold portal-theme-text mb-4">Export Analytics</h2>

        {error && (
          <div className="mb-4 p-3 portal-theme-alert border portal-theme-border rounded portal-theme-error text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium portal-theme-muted mb-2">Export Type</label>
            <select
              value={exportType}
              onChange={(e) => setExportType(e.target.value)}
              className="w-full px-3 py-2 border portal-theme-border rounded-lg portal-theme-focus"
            >
              <option value="opportunities">Opportunities</option>
              <option value="searches">Popular Searches</option>
              <option value="organisations">Organizations</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium portal-theme-muted mb-2">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 border portal-theme-border rounded-lg portal-theme-focus"
            >
              <option value="csv">CSV (Excel)</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <div className="portal-theme-panel p-3 rounded-lg text-sm portal-theme-muted">
            <p>This will export {exportType} analytics as {format.toUpperCase()}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="flex-1 px-4 py-2 border portal-theme-border rounded-lg portal-theme-muted font-medium portal-theme-hover disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 px-4 py-2 portal-theme-button portal-theme-white rounded-lg font-medium disabled:opacity-50"
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsExportModal;
