import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdvertData from "./AdvertData";

test("filters opportunities by category, location and keyword together", () => {
  render(<AdvertData />);
  fireEvent.change(screen.getByLabelText("Category"), { target: { value: "Education" } });
  fireEvent.change(screen.getByLabelText("Location"), { target: { value: "online" } });
  expect(screen.getByRole("heading", { name: /SAR & InSAR/ })).toBeVisible();
  expect(screen.queryByRole("heading", { name: /Engaging with ESA/ })).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Search"), { target: { value: "Irish Aviation Authority" } });
  expect(screen.getByText("No opportunities match these filters.")).toBeVisible();
});

test("filters by sector and keeps the existing opportunity links", () => {
  render(<AdvertData />);
  fireEvent.change(screen.getByLabelText("Sector"), { target: { value: "Air Traffic Management" } });
  expect(screen.getByText("No opportunities match these filters.")).toBeVisible();
  fireEvent.change(screen.getByLabelText("Sector"), { target: { value: "Other" } });
  expect(screen.getAllByRole("link", { name: "View opportunity" })).toHaveLength(4);
});

test("category shortcuts and clear filters stay in sync with the directory", () => {
  render(<AdvertData />);
  const education = screen.getByRole("button", { name: "Education" });
  fireEvent.click(education);
  expect(education).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByLabelText("Category")).toHaveValue("Education");
  expect(screen.getByText("2 opportunities shown")).toBeVisible();
  fireEvent.change(screen.getByLabelText("Location"), { target: { value: "online" } });
  expect(screen.getByText("1 opportunity shown")).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
  expect(education).toHaveAttribute("aria-pressed", "false");
  expect(screen.getByLabelText("Category")).toHaveValue("");
  expect(screen.getByLabelText("Location")).toHaveValue("");
  expect(screen.getByText("4 opportunities shown")).toBeVisible();
});
