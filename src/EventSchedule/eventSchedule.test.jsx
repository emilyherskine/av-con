import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EventSchedule from "./eventSchedule";

test("keeps the 2026 archive and full-size resources accessible", () => {
  render(<EventSchedule />);
  expect(screen.getByRole("heading", { name: "AvCon 2026 Event Archive" })).toBeVisible();
  expect(screen.getByRole("link", { name: /full-size AvCon 2026 event schedule/i })).toHaveAttribute("href");
  expect(screen.getByRole("link", { name: /panel plan \(PDF\)/i })).toHaveAttribute("href");
  expect(screen.getByRole("region", { name: "AvCon Live archive" })).toBeVisible();
});
