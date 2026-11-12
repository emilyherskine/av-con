import React, { useState, useEffect, useCallback } from "react";
import { categories, sectors, portalRequest } from "../portalClient";
import FeaturedListingsSection from "./FeaturedListingsSection";
import "../AvconPathwayPortal.css";

export default function PublicDirectory() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const pageSize = 20;

  const loadListings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(search && { q: search }),
        ...(category && { category }),
        ...(sector && { sector }),
        ...(location && { location }),
      });
      const result = await portalRequest(`/listings/search?${params}`);
      setListings(result.listings || []);
      setTotal(result.pagination?.total || 0);
      setPages(result.pagination?.pages || 1);
    } catch (err) {
      setError(err.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  }, [page, search, category, sector, location]);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  function handleReset() {
    setSearch("");
    setCategory("");
    setSector("");
    setLocation("");
    setPage(1);
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
  }

  return (
    <div className="public-directory">
      <section className="directory-header">
        <h2>Find Your Aviation Opportunity</h2>
        <p>Browse careers, training, education and more across aviation and aerospace</p>
      </section>

      <FeaturedListingsSection />

      <section className="directory-search">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="search-filter"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="search-filter"
          >
            <option value="">All Sectors</option>
            {sectors.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="search-filter"
          />

          <button type="submit" className="btn-search">
            Search
          </button>
          <button type="button" onClick={handleReset} className="btn-reset">
            Clear Filters
          </button>
        </form>
      </section>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="loading-message">Loading opportunities...</p>
      ) : listings.length === 0 ? (
        <p className="empty-message">No opportunities found. Try adjusting your filters.</p>
      ) : (
        <>
          <section className="directory-results">
            <p className="results-count">
              Found {total} opportunit{total === 1 ? "y" : "ies"}
              {search && ` matching "${search}"`}
            </p>

            <div className="listings-grid">
              {listings.map((listing) => (
                <article key={listing.id} className="listing-card">
                  {listing.logo_id && (
                    <div className="listing-card-logo">
                      <img
                        src={`/api/portal/files/${listing.logo_id}`}
                        alt={listing.organisation_name}
                        className="org-logo"
                      />
                    </div>
                  )}

                  <div className="listing-card-content">
                    <h3 className="listing-title">{listing.title}</h3>
                    <p className="listing-org">{listing.organisation_name}</p>
                    <p className="listing-meta">
                      <span className="badge category">{listing.category}</span>
                      <span className="badge location">📍 {listing.location}</span>
                    </p>
                    <p className="listing-description">{listing.description.substring(0, 150)}...</p>
                  </div>

                  <div className="listing-card-footer">
                    <a
                      href={listing.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-apply"
                    >
                      Learn More
                    </a>
                    {listing.expires_on && (
                      <p className="listing-expires">Expires: {new Date(listing.expires_on).toLocaleDateString()}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="btn-pagination"
              >
                ← Previous
              </button>
              <span className="page-info">
                Page {page} of {pages}
              </span>
              <button
                onClick={() => setPage(Math.min(pages, page + 1))}
                disabled={page === pages}
                className="btn-pagination"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
