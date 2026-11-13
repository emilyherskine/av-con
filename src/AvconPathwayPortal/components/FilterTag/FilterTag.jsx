import React from "react";
import "../../AvconPathwayPortal.css";

export default function FilterTag({ label, onRemove }) {
  return (
    <div className="filter-tag" role="region" aria-label={`Active filter: ${label}`}>
      <span className="filter-tag-label">{label}</span>
      <button
        className="filter-tag-remove"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        title={`Remove ${label}`}
      >
        ✕
      </button>
    </div>
  );
}
