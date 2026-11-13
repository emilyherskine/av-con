import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdvertData from "./AdvertData";
import { portalRequest } from "../../portalClient";
import { listingFiles } from "../../portalFiles";

jest.mock("../../portalClient", () => ({
  categories: ["Careers", "Education"],
  sectors: ["Other", "Air Traffic Management"],
  portalRequest: jest.fn(),
}));
jest.mock("../../portalFiles", () => ({ listingFiles: jest.fn() }));

const opportunities = [
  {
    id: "listing-1",
    title: "Aviation foundations course",
    description: "An introduction to aviation careers.",
    organisation_name: "Organisation Alpha",
    category: "Education",
    sector: "Other",
    location: "Online",
    application_url: "https://alpha.example/apply",
  },
  {
    id: "listing-2",
    title: "Airport operations role",
    description: "An entry-level airport operations opportunity.",
    organisation_name: "Organisation Bravo",
    category: "Careers",
    sector: "Other",
    location: "Dublin",
    application_url: "https://bravo.example/apply",
  },
];

beforeEach(() => {
  portalRequest.mockResolvedValue({ listings: opportunities });
  listingFiles.mockResolvedValue([]);
});

test("filters opportunities by category, location and keyword together", async () => {
  render(<AdvertData />);
  await screen.findByRole("heading", { name: "Aviation foundations course" });
  fireEvent.change(screen.getByLabelText("Category"), { target: { value: "Education" } });
  fireEvent.change(screen.getByLabelText("Location"), { target: { value: "online" } });
  expect(screen.getByRole("heading", { name: "Aviation foundations course" })).toBeVisible();
  expect(screen.queryByRole("heading", { name: "Airport operations role" })).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Search"), { target: { value: "Organisation Bravo" } });
  expect(screen.getByText("No opportunities match these filters.")).toBeVisible();
});

test("filters by sector and displays application links from API listings", async () => {
  render(<AdvertData />);
  await screen.findByRole("heading", { name: "Aviation foundations course" });
  fireEvent.change(screen.getByLabelText("Sector"), { target: { value: "Air Traffic Management" } });
  expect(screen.getByText("No opportunities match these filters.")).toBeVisible();
  fireEvent.change(screen.getByLabelText("Sector"), { target: { value: "Other" } });
  expect(screen.getAllByRole("link", { name: "View opportunity" })).toHaveLength(2);
});

test("category and location filters can be cleared together", async () => {
  render(<AdvertData />);
  await screen.findByRole("heading", { name: "Aviation foundations course" });
  fireEvent.change(screen.getByLabelText("Category"), { target: { value: "Education" } });
  expect(screen.getByLabelText("Category")).toHaveValue("Education");
  fireEvent.change(screen.getByLabelText("Location"), { target: { value: "online" } });
  expect(screen.getByText("1 opportunity shown")).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
  expect(screen.getByLabelText("Category")).toHaveValue("");
  expect(screen.getByLabelText("Location")).toHaveValue("");
  expect(screen.getByText("2 opportunities shown")).toBeVisible();
});

test("shows an empty state when the API has no approved opportunities", async () => {
  portalRequest.mockResolvedValue({ listings: [] });
  render(<AdvertData />);

  expect(await screen.findByText("No approved opportunities are available yet. Check back soon.")).toBeVisible();
  expect(screen.queryByRole("link", { name: "View opportunity" })).not.toBeInTheDocument();
});

test("reports an API failure instead of showing hard-coded opportunities", async () => {
  portalRequest.mockRejectedValue(new Error("The organisation portal is not configured."));
  render(<AdvertData />);

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Organisation listings could not be loaded. Please try again later."
  );
  expect(screen.queryByText("No approved opportunities are available yet. Check back soon.")).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "View opportunity" })).not.toBeInTheDocument();
});
