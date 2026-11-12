import React, { useState } from "react";
import "../AvconPathwayPortal.css";

export default function FilterPanel({ facets, selectedFilters, onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    sectors: true,
    locations: false,
  });

  function toggleSection(section) {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function handleCheckboxChange(filterType, value, checked) {
    const currentValues = selectedFilters[filterType] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onFilterChange(filterType, newValues);
  }

  return (
    <div className="filter-panel" role="region" aria-label="Search filters">
      <h3 className="filter-panel-title">Filters</h3>

      {/* Category Filter */}
      <div className="filter-group">
        <button
          className="filter-group-title"
          onClick={() => toggleSection("categories")}
          aria-expanded={expandedSections.categories}
          aria-controls="categories-list"
        >
          <span>Category</span>
          <span className="filter-toggle">
            {expandedSections.categories ? "−" : "+"}
          </span>
        </button>

        {expandedSections.categories && facets?.categories && (
          <div id="categories-list" className="filter-options">
            {facets.categories.map((cat) => (
              <label key={cat.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.includes(cat.name)}
                  onChange={(e) =>
                    handleCheckboxChange("categories", cat.name, e.target.checked)
                  }
                  aria-label={`Filter by ${cat.name}`}
                />
                <span className="filter-label">
                  {cat.name}
                  <span className="filter-count">({cat.count})</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sector Filter */}
      <div className="filter-group">
        <button
          className="filter-group-title"
          onClick={() => toggleSection("sectors")}
          aria-expanded={expandedSections.sectors}
          aria-controls="sectors-list"
        >
          <span>Sector</span>
          <span className="filter-toggle">
            {expandedSections.sectors ? "−" : "+"}
          </span>
        </button>

        {expandedSections.sectors && facets?.sectors && (
          <div id="sectors-list" className="filter-options">
            {facets.sectors.map((sec) => (
              <label key={sec.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.sectors.includes(sec.name)}
                  onChange={(e) =>
                    handleCheckboxChange("sectors", sec.name, e.target.checked)
                  }
                  aria-label={`Filter by ${sec.name}`}
                />
                <span className="filter-label">
                  {sec.name}
                  <span className="filter-count">({sec.count})</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className="filter-group">
        <button
          className="filter-group-title"
          onClick={() => toggleSection("locations")}
          aria-expanded={expandedSections.locations}
          aria-controls="locations-list"
        >
          <span>Location</span>
          <span className="filter-toggle">
            {expandedSections.locations ? "−" : "+"}
          </span>
        </button>

        {expandedSections.locations && facets?.locations && (
          <div id="locations-list" className="filter-options">
            {facets.locations.slice(0, 15).map((loc) => (
              <label key={loc.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.locations.includes(loc.name)}
                  onChange={(e) =>
                    handleCheckboxChange("locations", loc.name, e.target.checked)
                  }
                  aria-label={`Filter by ${loc.name}`}
                />
                <span className="filter-label">
                  {loc.name}
                  <span className="filter-count">({loc.count})</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Filter Summary */}
      <div className="filter-summary">
        <div className="filter-summary-text">
          {selectedFilters.categories.length +
            selectedFilters.sectors.length +
            selectedFilters.locations.length}{" "}
          filter(s) applied
        </div>
      </div>
    </div>
  );
}
