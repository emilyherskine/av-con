import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ApprovalDialog from "./ApprovalDialog";

test("renders the ApprovalDialog component", () => {
  const props = { listing: { id: "listing-1", title: "Example opportunity", description: "Details", category: "Education", sector: "Other", location: "Online", application_url: "https://example.com", created_at: "2026-01-01T00:00:00Z", status: "draft" }, onClose: jest.fn(), onApprove: jest.fn() };
  const markup = renderToStaticMarkup(<ApprovalDialog {...props} />);
  expect(markup).toContain("Review Listing");
});
