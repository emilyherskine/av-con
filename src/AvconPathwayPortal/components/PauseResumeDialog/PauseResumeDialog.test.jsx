import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PauseResumeDialog from "./PauseResumeDialog";

test("renders the PauseResumeDialog component", () => {
  const props = { listing: { id: "listing-1", title: "Example opportunity", description: "Details", category: "Education", sector: "Other", location: "Online", application_url: "https://example.com", created_at: "2026-01-01T00:00:00Z", status: "draft" }, action: "pause", onConfirm: jest.fn(), onCancel: jest.fn() };
  const markup = renderToStaticMarkup(<PauseResumeDialog {...props} />);
  expect(markup).toContain("Pause Listing");
});
