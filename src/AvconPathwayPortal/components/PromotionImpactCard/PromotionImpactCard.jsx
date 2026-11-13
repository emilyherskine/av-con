import React from "react";
import "./PromotionImpactCard.css";

export default function PromotionImpactCard({ promotion_data, listing_title }) {
  if (!promotion_data?.is_featured) {
    return (
      <div className="promotion-impact promotion-impact--inactive">
        <p>📊 This listing is not currently featured</p>
        <p className="promotion-impact__hint">Feature it in Admin Dashboard to see promotion impact</p>
      </div>
    );
  }

  const metrics = promotion_data.metrics || {};
  const viewIncrease = parseInt(metrics.view_increase) || 0;
  const clickIncrease = parseInt(metrics.click_increase) || 0;

  return (
    <div className="promotion-impact" aria-label={`Promotion impact for ${listing_title || "listing"}`}>
      <div className="promotion-impact__header">
        <div>
          <h3>
            <span>📈 Promotion Impact</span>
          </h3>
          <p className="promotion-impact__hint">
            Since being featured on {new Date(promotion_data.featured_until).toLocaleDateString()}
          </p>
        </div>
        <span className="promotion-impact__star" aria-hidden="true">⭐</span>
      </div>

      <div className="promotion-impact__metrics">
        <div className="promotion-impact__metric">
          <div className="promotion-impact__label">Views</div>
          <div className="promotion-impact__value">
            {viewIncrease > 0 ? '+' : ''}{viewIncrease}%
          </div>
          <div className="promotion-impact__detail">
            {metrics.views_since_featured} views
          </div>
        </div>

        <div className="promotion-impact__metric">
          <div className="promotion-impact__label">Clicks</div>
          <div className="promotion-impact__value">
            {clickIncrease > 0 ? '+' : ''}{clickIncrease}%
          </div>
          <div className="promotion-impact__detail">
            {metrics.clicks_since_featured} clicks
          </div>
        </div>
      </div>

      {(viewIncrease > 100 || clickIncrease > 100) && (
        <div className="promotion-impact__highlight">
          🎯 This listing is performing exceptionally well!
        </div>
      )}
    </div>
  );
}
