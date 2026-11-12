import React, { useState, useEffect } from "react";
import { portalRequest } from "../portalClient";
import FilterPanel from "./FilterPanel";
import SearchResultsGrid from "./SearchResultsGrid";
import FilterTag from "./FilterTag";
import "../AvconPathwayPortal.css";

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    sectors: [],
    locations: [],
    sort: "relevance",
  });
  const [results, setResults] = useState([]);
  const [facets, setFacets] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  const limit = 20;

  useEffect(() => {
    loadFacets();
  }, []);

  useEffect(() => {
    performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, page]);

  async function loadFacets() {
    try {
      const facetData = await portalRequest("/listings/search/facets");
      setFacets(facetData);
    } catch (err) {
      console.error("Failed to load facets:", err);
    }
  }

  async function performSearch() {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        categories: selectedFilters.categories.join(","),
        sectors: selectedFilters.sectors.join(","),
        locations: selectedFilters.locations.join(","),
        sort: selectedFilters.sort,
        page,
        limit,
      });

      const response = await portalRequest(`/listings/search/advanced?${params}`);
      setResults(response.results || []);
      setTotalResults(response.pagination?.total || 0);
      if (response.facets) setFacets(response.facets);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setPage(1);
    performSearch();
  }

  function updateFilter(filterType, values) {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: values,
    }));
    setPage(1);
  }

  function removeFilter(type, value) {
    updateFilter(
      type,
      selectedFilters[type].filter((v) => v !== value)
    );
  }

  function clearAllFilters() {
    setSelectedFilters({
      categories: [],
      sectors: [],
      locations: [],
      sort: "relevance",
    });
    setSearchQuery("");
    setPage(1);
  }

  const hasActiveFilters =
    searchQuery ||
    selectedFilters.categories.length > 0 ||
    selectedFilters.sectors.length > 0 ||
    selectedFilters.locations.length > 0;

  const totalPages = Math.ceil(totalResults / limit);

  return (
    <div className="advanced-search-container">
      {/* Search Header */}
      <div className="search-header">
        <h1>Find Your Opportunity</h1>
        <p className="search-subtitle">
          Search across {totalResults} opportunities in aviation and aerospace
        </p>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search by title, description, organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search opportunities"
              aria-describedby="search-help"
            />
            <button
              type="submit"
              className="search-button"
              aria-label="Search"
            >
              🔍 Search
            </button>
          </div>
          <small id="search-help" className="search-help">
            Press Enter or click Search. Use filters below to narrow results.
          </small>
        </form>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="active-filters-bar">
          <div className="active-filters-list">
            {selectedFilters.categories.map((cat) => (
              <FilterTag
                key={`cat-${cat}`}
                label={cat}
                onRemove={() => removeFilter("categories", cat)}
              />
            ))}
            {selectedFilters.sectors.map((sec) => (
              <FilterTag
                key={`sec-${sec}`}
                label={sec}
                onRemove={() => removeFilter("sectors", sec)}
              />
            ))}
            {selectedFilters.locations.map((loc) => (
              <FilterTag
                key={`loc-${loc}`}
                label={loc}
                onRemove={() => removeFilter("locations", loc)}
              />
            ))}
          </div>
          {hasActiveFilters && (
            <button
              className="btn-clear-filters"
              onClick={clearAllFilters}
              aria-label="Clear all filters"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      <div className="search-main">
        {/* Filter Sidebar */}
        <aside className={`filter-sidebar ${showFilters ? "open" : "closed"}`}>
          <button
            className="filter-close-mobile"
            onClick={() => setShowFilters(false)}
            aria-label="Close filters"
          >
            ✕
          </button>
          {facets && (
            <FilterPanel
              facets={facets}
              selectedFilters={selectedFilters}
              onFilterChange={updateFilter}
            />
          )}
        </aside>

        {/* Results Section */}
        <div className="search-results-wrapper">
          {/* Mobile Filter Toggle */}
          <button
            className="btn-toggle-filters-mobile"
            onClick={() => setShowFilters(true)}
            aria-label="Show filters"
          >
            ⚙️ Filters
          </button>

          {/* Results Header */}
          <div className="results-header">
            <div className="results-info">
              <h2>
                {loading
                  ? "Searching..."
                  : `${totalResults} opportunities found`}
              </h2>
              <div className="sort-controls">
                <label htmlFor="sort-select" className="sort-label">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  className="sort-select"
                  value={selectedFilters.sort}
                  onChange={(e) =>
                    updateFilter("sort", e.target.value)
                  }
                  aria-label="Sort results by"
                >
                  <option value="relevance">Relevance</option>
                  <option value="recent">Most Recent</option>
                  <option value="expires">Expiring Soon</option>
                  <option value="views">Most Popular</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Searching opportunities...</p>
            </div>
          )}

          {/* Results Grid */}
          {!loading && (
            <>
              {results.length === 0 ? (
                <div className="empty-results">
                  <h3>No opportunities found</h3>
                  <p>Try adjusting your search or filters to find more results.</p>
                  <button
                    className="btn-primary"
                    onClick={clearAllFilters}
                  >
                    Clear Filters & Try Again
                  </button>
                </div>
              ) : (
                <>
                  <SearchResultsGrid results={results} />

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination-controls">
                      <button
                        className="btn-pagination"
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        aria-label="Previous page"
                      >
                        ← Previous
                      </button>

                      <div className="pagination-info">
                        Page {page} of {totalPages}
                      </div>

                      <button
                        className="btn-pagination"
                        onClick={() =>
                          setPage(Math.min(totalPages, page + 1))
                        }
                        disabled={page === totalPages}
                        aria-label="Next page"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
