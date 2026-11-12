import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdvertData from "./AdvertData";
import { portalRequest } from "../portalClient";
import { listingFiles } from "../portalFiles";

jest.mock("../portalClient", () => ({
  categories: ["Education"], sectors: ["Other"], apiAvailable: true, portalRequest: jest.fn(),
}));
jest.mock("../portalFiles", () => ({ listingFiles: jest.fn() }));

test("shows public listing media using authorised file links", async () => {
  portalRequest.mockResolvedValue({ listings: [{
    id: "listing-1", organisation_name: "Example Aviation", title: "Flight course",
    description: "Course details", category: "Education", sector: "Other",
    location: "Online", application_url: "https://example.com",
  }] });
  listingFiles.mockResolvedValue([
    { id: "logo", listing_id: "listing-1", kind: "logo", url: "https://example.com/logo" },
    { id: "pdf", listing_id: "listing-1", kind: "document", file_name: "Guide.pdf", url: "https://example.com/guide" },
  ]);
  render(<AdvertData />);
  expect(await screen.findByRole("link", { name: "View PDF: Guide.pdf" })).toHaveAttribute("href", "https://example.com/guide");
  expect(screen.getByAltText("Example Aviation logo")).toHaveAttribute("src", "https://example.com/logo");
  expect(portalRequest).toHaveBeenCalledWith("/listings");
});
