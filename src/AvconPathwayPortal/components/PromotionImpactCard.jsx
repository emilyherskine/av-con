import React, { useState } from "react";

export default function PromotionImpactCard({ promotion_data, listing_title }) {
  if (!promotion_data?.is_featured) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-sm text-blue-700">
        <p>📊 This listing is not currently featured</p>
        <p className="text-xs opacity-75 mt-1">Feature it in Admin Dashboard to see promotion impact</p>
      </div>
    );
  }

  const metrics = promotion_data.metrics || {};
  const viewIncrease = parseInt(metrics.view_increase) || 0;
  const clickIncrease = parseInt(metrics.click_increase) || 0;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-green-900 flex items-center gap-2">
            <span>📈 Promotion Impact</span>
          </h3>
          <p className="text-xs text-green-700 opacity-75 mt-1">
            Since being featured on {new Date(promotion_data.featured_until).toLocaleDateString()}
          </p>
        </div>
        <span className="text-2xl">⭐</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-white bg-opacity-60 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Views</div>
          <div className="text-2xl font-bold text-green-700">
            {viewIncrease > 0 ? '+' : ''}{viewIncrease}%
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {metrics.views_since_featured} views
          </div>
        </div>

        <div className="bg-white bg-opacity-60 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Clicks</div>
          <div className="text-2xl font-bold text-green-700">
            {clickIncrease > 0 ? '+' : ''}{clickIncrease}%
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {metrics.clicks_since_featured} clicks
          </div>
        </div>
      </div>

      {(viewIncrease > 100 || clickIncrease > 100) && (
        <div className="mt-3 text-sm text-green-800 font-medium text-center">
          🎯 This listing is performing exceptionally well!
        </div>
      )}
    </div>
  );
}
