import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ListingDetails from "./ListingDetails";

test("renders the ListingDetails component", () => {
  const props = { listing: { id: "listing-1", title: "Example opportunity", description: "Details", category: "Education", sector: "Other", location: "Online", application_url: "https://example.com", created_at: "2026-01-01T00:00:00Z", status: "draft" }, onClose: jest.fn() };
  const markup = renderToStaticMarkup(<ListingDetails {...props} />);
  expect(markup).toContain("Example opportunity");
});
