import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import SearchResultsGrid from "./SearchResultsGrid";

test("renders the SearchResultsGrid component", () => {
  const props = { results: [{ id: "listing-1", title: "Example opportunity", description: "Details", category: "Education", sector: "Other", location: "Online", application_url: "https://example.com", created_at: "2026-01-01T00:00:00Z", status: "draft" }] };
  const markup = renderToStaticMarkup(<SearchResultsGrid {...props} />);
  expect(markup).toContain("Example opportunity");
});
