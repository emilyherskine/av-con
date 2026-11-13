import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PathwayPortal from "./pathwayPortal";
import { portalRequest } from "./portalClient";
import { listingFiles } from "./portalFiles";

jest.mock("./portalClient", () => ({
  categories: ["Careers", "Education"],
  sectors: ["Other"],
  portalRequest: jest.fn(),
}));
jest.mock("./portalFiles", () => ({ listingFiles: jest.fn() }));

beforeEach(() => {
  portalRequest.mockImplementation((path) => {
    if (path === "/listings") return Promise.resolve({ listings: [] });
    if (path === "/session") return Promise.resolve({ user: null });
    throw new Error(`Unexpected request: ${path}`);
  });
  listingFiles.mockResolvedValue([]);
});

test("keeps the approved-opportunities directory and submission tools accessible", async () => {
  render(<PathwayPortal />);
  expect(await screen.findByRole("heading", { name: "Current Opportunities" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Explore Opportunities" })).toHaveAttribute("href", "#opportunities");

  const submitDisclosure = screen.getByText("Submit an opportunity");
  expect(submitDisclosure.closest("details")).not.toHaveAttribute("open");
  fireEvent.click(submitDisclosure);
  expect(screen.getByRole("heading", { name: "Submit an Opportunity" })).toBeVisible();
});
