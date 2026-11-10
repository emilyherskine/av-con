import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./home";
import { EXTERNAL_LINKS } from "../constants";

test("keeps the 2026 material accessible and links schools to 2027 registration", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("link", { name: /schools pre-register - avcon 2027/i }),
  ).toHaveAttribute("href", EXTERNAL_LINKS.avcon2027PreRegistrationForm);

  expect(
    screen.getByRole("link", { name: /for schools & students/i }),
  ).toHaveAttribute("href", "/bookTickets");
  expect(
    screen.getByRole("link", { name: /for industry & partners/i }),
  ).toHaveAttribute("href", "/exhibitorRegistration");

  const summary = screen.getByText("View AvCon 2026 stream and schedules");
  expect(summary.parentElement).not.toHaveAttribute("open");
  fireEvent.click(summary);
  expect(summary.parentElement).toHaveAttribute("open");
  expect(screen.getByAltText("AvCon 2026 event schedule")).toBeVisible();
});
