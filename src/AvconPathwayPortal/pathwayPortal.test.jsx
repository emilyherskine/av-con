import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PathwayPortal from "./pathwayPortal";

test("keeps opportunities and a working contact route available", () => {
  render(<MemoryRouter><PathwayPortal /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "Current Opportunities" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Submit an Opportunity" })).toHaveAttribute("href", "/contact");
});
