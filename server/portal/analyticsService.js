/**
 * Analytics Service
 * Handles calculation and aggregation of analytics metrics for the portal.
 */

const crypto = require('crypto');

class AnalyticsService {
  constructor(db) {
    this.db = db;
    this.cacheTTL = 60 * 60 * 1000; // 1 hour in milliseconds
  }

  /**
   * Track a listing view
   * @param {string} listingId - Listing ID being viewed
   * @param {string} searchQuery - Search query that led to view (optional)
   */
  trackListingView(listingId, searchQuery = null) {
    try {
      // Update listing_analytics
      const existingAnalytics = this.db.prepare(
        'SELECT id FROM listing_analytics WHERE listing_id = ?'
      ).get(listingId);

      const now = new Date().toISOString();

      if (existingAnalytics) {
        this.db.prepare(`
          UPDATE listing_analytics 
          SET view_count = view_count + 1, 
              last_viewed_at = ?,
              updated_at = ?
          WHERE listing_id = ?
        `).run(now, now, listingId);
      } else {
        // Create new analytics entry
        const id = crypto.randomUUID();
        this.db.prepare(`
          INSERT INTO listing_analytics (id, listing_id, view_count, last_viewed_at, created_at, updated_at)
          VALUES (?, ?, 1, ?, ?, ?)
        `).run(id, listingId, now, now, now);
      }

      // Record in listing_history
      this.db.prepare(`
        INSERT INTO listing_history (id, listing_id, action, changed_by, created_at)
        VALUES (?, ?, 'viewed', 'system', ?)
      `).run(crypto.randomUUID(), listingId, now);

      // Invalidate cache
      this.invalidateCache('trending_ops', 'listing_analytics');
    } catch (error) {
      console.error('Error tracking listing view:', error);
    }
  }

  /**
   * Track a listing click (Apply/View button clicked)
   * @param {string} listingId - Listing ID clicked
   */
  trackListingClick(listingId) {
    try {
      const existingAnalytics = this.db.prepare(
        'SELECT id FROM listing_analytics WHERE listing_id = ?'
      ).get(listingId);

      const now = new Date().toISOString();

      if (existingAnalytics) {
        this.db.prepare(`
          UPDATE listing_analytics 
          SET click_count = click_count + 1,
              updated_at = ?
          WHERE listing_id = ?
        `).run(now, listingId);

        // Recalculate conversion rate
        const metrics = this.db.prepare(
          'SELECT click_count, search_impressions FROM listing_analytics WHERE listing_id = ?'
        ).get(listingId);

        if (metrics.search_impressions > 0) {
          const conversionRate = metrics.click_count / metrics.search_impressions;
          this.db.prepare(
            'UPDATE listing_analytics SET conversion_rate = ?, updated_at = ? WHERE listing_id = ?'
          ).run(conversionRate, now, listingId);
        }
      }

      // Invalidate cache
      this.invalidateCache('engagement', 'listing_analytics');
    } catch (error) {
      console.error('Error tracking listing click:', error);
    }
  }

  /**
   * Track a search impression (listing appeared in search results)
   * @param {string} listingId - Listing ID that appeared
   * @param {string} searchQuery - Search query that returned this listing
   */
  trackSearchImpression(listingId, searchQuery = null) {
    try {
      const existingAnalytics = this.db.prepare(
        'SELECT id FROM listing_analytics WHERE listing_id = ?'
      ).get(listingId);

      const now = new Date().toISOString();

      if (existingAnalytics) {
        this.db.prepare(`
          UPDATE listing_analytics 
          SET search_impressions = search_impressions + 1,
              updated_at = ?
          WHERE listing_id = ?
        `).run(now, listingId);
      } else {
        // Create new analytics entry
        const id = crypto.randomUUID();
        this.db.prepare(`
          INSERT INTO listing_analytics (id, listing_id, search_impressions, created_at, updated_at)
          VALUES (?, ?, 1, ?, ?)
        `).run(id, listingId, now, now);
      }

      // Invalidate cache
      this.invalidateCache('trending_ops', 'engagement');
    } catch (error) {
      console.error('Error tracking search impression:', error);
    }
  }

  /**
   * Record a search in analytics
   * @param {Object} searchData - Search details
   */
  recordSearch(searchData) {
    try {
      const {
        query = null,
        filters = null,
        resultsCount = 0,
        searchTimeMs = 0,
        organisationId = null
      } = searchData;

      const id = crypto.randomUUID();
      const now = new Date().toISOString();

      this.db.prepare(`
        INSERT INTO search_history (id, query, filters, results_count, search_time_ms, organisation_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(id, query, filters, resultsCount, searchTimeMs, organisationId, now);

      // Invalidate cache
      this.invalidateCache('searches', 'popular_searches');
    } catch (error) {
      console.error('Error recording search:', error);
    }
  }

  /**
   * Get cached analytics data or null if expired/missing
   * @param {string} cacheKey - Cache key
   * @returns {Object|null} - Cached data or null
   */
  getCachedAnalytics(cacheKey) {
    try {
      const cache = this.db.prepare(
        'SELECT cache_data, expires_at FROM analytics_cache WHERE cache_key = ?'
      ).get(cacheKey);

      if (!cache) return null;

      const now = new Date();
      const expiresAt = new Date(cache.expires_at);

      // Check if expired
      if (now > expiresAt) {
        this.db.prepare('DELETE FROM analytics_cache WHERE cache_key = ?').run(cacheKey);
        return null;
      }

      return JSON.parse(cache.cache_data);
    } catch (error) {
      console.error('Error getting cached analytics:', error);
      return null;
    }
  }

  /**
   * Set cached analytics data
   * @param {string} cacheKey - Cache key
   * @param {string} cacheType - Cache type for tracking
   * @param {Object} data - Data to cache
   * @param {number} ttlMinutes - Time to live in minutes (default 60)
   */
  setCachedAnalytics(cacheKey, cacheType, data, ttlMinutes = 60) {
    try {
      const id = crypto.randomUUID();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + ttlMinutes * 60 * 1000);

      this.db.prepare(`
        INSERT OR REPLACE INTO analytics_cache (id, cache_key, cache_type, cache_data, calculated_at, expires_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        id,
        cacheKey,
        cacheType,
        JSON.stringify(data),
        now.toISOString(),
        expiresAt.toISOString()
      );
    } catch (error) {
      console.error('Error setting cached analytics:', error);
    }
  }

  /**
   * Invalidate cache entries by pattern
   * @param {...string} patterns - Cache patterns to invalidate
   */
  invalidateCache(...patterns) {
    try {
      for (const pattern of patterns) {
        this.db.prepare(
          "DELETE FROM analytics_cache WHERE cache_key LIKE ?"
        ).run(`%${pattern}%`);
      }
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }

  /**
   * Get dashboard overview stats
   * @param {number} days - Historical days to include
   * @returns {Object} - Overview stats
   */
  getOverviewStats(days = 30) {
    const cacheKey = `overview_${days}days`;
    const cached = this.getCachedAnalytics(cacheKey);
    if (cached) return cached;

    try {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      const fromDateStr = fromDate.toISOString().split('T')[0];

      // Total listings
      const totalListings = this.db.prepare(
        'SELECT COUNT(*) as count FROM listings'
      ).get().count;

      const approvedListings = this.db.prepare(
        'SELECT COUNT(*) as count FROM listings WHERE status = "approved"'
      ).get().count;

      // Search metrics
      const totalSearches = this.db.prepare(
        'SELECT COUNT(*) as count FROM search_history WHERE created_at >= ?'
      ).get(fromDateStr).count;

      const todaySearches = this.db.prepare(`
        SELECT COUNT(*) as count FROM search_history 
        WHERE created_at >= date('now')
      `).get().count;

      // Organization metrics
      const totalOrganizations = this.db.prepare(
        'SELECT COUNT(*) as count FROM organisations'
      ).get().count;

      // Get most viewed opportunity
      const mostViewed = this.db.prepare(`
        SELECT l.id, l.title, la.view_count, la.click_count
        FROM listings l
        LEFT JOIN listing_analytics la ON la.listing_id = l.id
        WHERE l.status = 'approved'
        ORDER BY la.view_count DESC
        LIMIT 1
      `).get();

      // Get top category
      const topCategory = this.db.prepare(`
        SELECT category, COUNT(*) as count
        FROM listings
        WHERE status = 'approved'
        GROUP BY category
        ORDER BY count DESC
        LIMIT 1
      `).get();

      // Get top sector
      const topSector = this.db.prepare(`
        SELECT sector, COUNT(*) as count
        FROM listings
        WHERE status = 'approved'
        GROUP BY sector
        ORDER BY count DESC
        LIMIT 1
      `).get();

      // Get top location
      const topLocation = this.db.prepare(`
        SELECT location, COUNT(*) as count
        FROM listings
        WHERE status = 'approved'
        GROUP BY location
        ORDER BY count DESC
        LIMIT 1
      `).get();

      // Get most searched term
      const mostSearched = this.db.prepare(`
        SELECT query, COUNT(*) as count
        FROM search_history
        WHERE query IS NOT NULL AND created_at >= ?
        GROUP BY query
        ORDER BY count DESC
        LIMIT 1
      `).get(fromDateStr);

      const result = {
        summary: {
          total_searches: totalSearches,
          searches_today: todaySearches,
          total_opportunities: totalListings,
          opportunities_approved: approvedListings,
          opportunities_expired: 0,
          opportunities_pending: 0,
          total_organisations: totalOrganizations,
          organisations_active: 0
        },
        trends: {
          search_trend: 0,
          opportunity_trend: 0,
          engagement_trend: 0
        },
        top_statistics: {
          most_searched_term: mostSearched?.query || 'N/A',
          most_searched_count: mostSearched?.count || 0,
          most_viewed_opportunity: mostViewed || null,
          top_category: topCategory?.category || 'N/A',
          top_sector: topSector?.sector || 'N/A',
          top_location: topLocation?.location || 'N/A'
        },
        time_period: {
          from: fromDateStr,
          to: new Date().toISOString().split('T')[0],
          days: days
        }
      };

      // Cache for 1 hour
      this.setCachedAnalytics(cacheKey, 'overview', result, 60);

      return result;
    } catch (error) {
      console.error('Error getting overview stats:', error);
      return null;
    }
  }

  /**
   * Get trending opportunities
   * @param {number} limit - Number of results
   * @param {number} days - Historical period
   * @returns {Array} - Trending opportunities
   */
  getTrendingOpportunities(limit = 20, days = 30) {
    const cacheKey = `trending_ops_${limit}_${days}days`;
    const cached = this.getCachedAnalytics(cacheKey);
    if (cached) return cached;

    try {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      const fromDateStr = fromDate.toISOString().split('T')[0];

      const trending = this.db.prepare(`
        SELECT 
          l.id,
          l.title,
          o.name as organisation,
          l.category,
          l.sector,
          l.location,
          COALESCE(la.view_count, 0) as view_count,
          COALESCE(la.click_count, 0) as click_count,
          COALESCE(la.conversion_rate, 0) as conversion_rate,
          COALESCE(la.search_impressions, 0) as search_impressions,
          la.last_viewed_at,
          l.status,
          l.expires_on
        FROM listings l
        LEFT JOIN listing_analytics la ON la.listing_id = l.id
        LEFT JOIN organisations o ON o.id = l.owner_id
        WHERE l.status = 'approved' AND (l.expires_on IS NULL OR l.expires_on >= date('now'))
        ORDER BY COALESCE(la.view_count, 0) DESC
        LIMIT ?
      `).all(limit);

      const result = {
        trending_opportunities: trending,
        time_period: {
          from: fromDateStr,
          to: new Date().toISOString().split('T')[0],
          metric: 'views'
        }
      };

      // Cache for 6 hours
      this.setCachedAnalytics(cacheKey, 'trending_ops', result, 360);

      return result;
    } catch (error) {
      console.error('Error getting trending opportunities:', error);
      return { trending_opportunities: [] };
    }
  }

  /**
   * Get organization performance metrics
   * @param {number} limit - Number of results
   * @returns {Object} - Organization performance data
   */
  getOrganisationPerformance(limit = 50) {
    const cacheKey = `org_performance_${limit}`;
    const cached = this.getCachedAnalytics(cacheKey);
    if (cached) return cached;

    try {
      const organisations = this.db.prepare(`
        SELECT 
          o.id,
          o.name,
          o.email,
          COUNT(DISTINCT l.id) as total_listings,
          SUM(CASE WHEN l.status = 'approved' THEN 1 ELSE 0 END) as active_listings,
          COALESCE(SUM(la.view_count), 0) as total_views,
          COALESCE(SUM(la.click_count), 0) as total_clicks,
          CASE 
            WHEN SUM(la.search_impressions) > 0 THEN CAST(SUM(la.click_count) AS REAL) / SUM(la.search_impressions)
            ELSE 0
          END as avg_conversion_rate
        FROM organisations o
        LEFT JOIN listings l ON l.owner_id = o.id
        LEFT JOIN listing_analytics la ON la.listing_id = l.id
        GROUP BY o.id
        ORDER BY total_views DESC
        LIMIT ?
      `).all(limit);

      const summary = this.db.prepare(`
        SELECT 
          COUNT(DISTINCT id) as total_organisations,
          AVG(listing_count) as avg_listings_per_org
        FROM (
          SELECT o.id, COUNT(l.id) as listing_count
          FROM organisations o
          LEFT JOIN listings l ON l.owner_id = o.id
          GROUP BY o.id
        )
      `).get();

      const result = {
        organisations: organisations,
        summary: summary
      };

      // Cache for 6 hours
      this.setCachedAnalytics(cacheKey, 'org_performance', result, 360);

      return result;
    } catch (error) {
      console.error('Error getting organization performance:', error);
      return { organisations: [] };
    }
  }

  /**
   * Get popular searches
   * @param {number} limit - Number of results
   * @param {number} days - Historical period
   * @returns {Array} - Popular searches
   */
  getPopularSearches(limit = 50, days = 30) {
    const cacheKey = `popular_searches_${limit}_${days}days`;
    const cached = this.getCachedAnalytics(cacheKey);
    if (cached) return cached;

    try {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      const fromDateStr = fromDate.toISOString().split('T')[0];

      const searches = this.db.prepare(`
        SELECT 
          query,
          COUNT(*) as count,
          AVG(results_count) as avg_results,
          AVG(search_time_ms) as avg_time_ms
        FROM search_history
        WHERE query IS NOT NULL AND created_at >= ?
        GROUP BY query
        ORDER BY count DESC
        LIMIT ?
      `).all(fromDateStr, limit);

      const result = {
        popular_searches: searches,
        time_period: {
          from: fromDateStr,
          to: new Date().toISOString().split('T')[0],
          interval: 'daily'
        }
      };

      // Cache for 1 hour
      this.setCachedAnalytics(cacheKey, 'popular_searches', result, 60);

      return result;
    } catch (error) {
      console.error('Error getting popular searches:', error);
      return { popular_searches: [] };
    }
  }
}

module.exports = AnalyticsService;
