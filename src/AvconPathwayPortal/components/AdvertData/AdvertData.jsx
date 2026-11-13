import React, { useEffect, useState } from "react";
import { categories, portalRequest, sectors } from "../../portalClient";
import { listingFiles } from "../../portalFiles";
import "../../AvconPathwayPortal.css";

export default function AdvertData({ revision = 0 }) {
  const [submitted, setSubmitted] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    portalRequest("/listings")
      .then(({ listings }) => {
        if (!active) return;
        setSubmitted(listings);
      })
      .catch(() => {
        if (active) { setSubmitted([]); setError("Organisation listings could not be loaded. Please try again later."); }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [revision]);

  useEffect(() => {
    if (!submitted.length) {
      setFiles([]);
      return undefined;
    }
    let active = true;
    async function loadFiles() {
      try {
        const result = await listingFiles(submitted.map((item) => item.id));
        if (active) { setFiles(result); setFileError(""); }
      } catch (err) {
        if (active) {
          setFiles([]);
          setFileError("Listing files could not be loaded. Please try again later.");
        }
      }
    }
    loadFiles();
    return () => { active = false; };
  }, [submitted]);

  const matching = submitted.filter((item) => {
    const text = `${item.title} ${item.description} ${item.organisation_name}`.toLowerCase();
    return text.includes(search.trim().toLowerCase())
      && (!category || item.category === category)
      && (!sector || item.sector === sector)
      && item.location.toLowerCase().includes(location.trim().toLowerCase());
  });

  function clearFilters() {
    setSearch("");
    setCategory("");
    setSector("");
    setLocation("");
  }

  const hasFilters = search || category || sector || location;

  return (
    <section
      className="advert-container"
      id="opportunities"
      aria-labelledby="opportunities-title"
      aria-busy={loading}
    >
      <div className="portal-section-heading">
        <p className="portal-kicker">Explore the possibilities</p>
        <h2 id="opportunities-title">Current Opportunities</h2>
        <p>Find a route that&apos;s right for you. Browse by category or search by organisation, sector and location.</p>
      </div>
      <fieldset className="portal-filters">
        <legend>Filter opportunities</legend>
        <label>Search<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Title, organisation or keyword" /></label>
        <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All categories</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select></label>
        <label>Sector<select value={sector} onChange={(event) => setSector(event.target.value)}>
          <option value="">All sectors</option>
          {sectors.map((item) => <option key={item}>{item}</option>)}
        </select></label>
        <label>Location<input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location or online" /></label>
      </fieldset>
      {loading && <p role="status">Loading organisation listings…</p>}
      {error && <p role="alert">{error}</p>}
      {fileError && <p role="alert">{fileError}</p>}
      <div className="portal-results-bar">
        {!loading && <p aria-live="polite">
          {matching.length} {matching.length === 1 ? "opportunity" : "opportunities"} shown
        </p>}
        {hasFilters &&
          <button type="button" onClick={clearFilters}>Clear filters</button>}
      </div>
      {!loading && !error && matching.length === 0 && (
        <p className="portal-empty-state">
          {submitted.length === 0
            ? "No approved opportunities are available yet. Check back soon."
            : "No opportunities match these filters."}
        </p>
      )}
      <div className="card-grid">
        {matching.map((item) => {
          const itemFiles = files.filter((file) => file.listing_id === item.id);
          const logo = itemFiles.find((file) => file.kind === "logo");
          return (
            <article className="opportunity-card" key={item.id}>
              {(item.image || logo) && (
                <img
                  src={item.image || logo.url}
                  alt={`${item.organisation_name} logo`}
                  className="card-img"
                />
              )}
              <div className="card-content">
                <span className="portal-card-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p className="portal-card-description">{item.description}</p>
                <p className="portal-card-meta">
                  <strong>{item.organisation_name}</strong>
                  <span>{item.location}</span>
                </p>
                {itemFiles.filter((file) => file.kind !== "logo").map((file) => (
                  <a key={file.id} href={file.url} target="_blank" rel="noopener noreferrer">
                    {file.kind === "photo" ? "View photo" : "View PDF"}: {file.file_name}
                  </a>
                ))}
                <a
                  href={item.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-button"
                >
                  View opportunity
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
