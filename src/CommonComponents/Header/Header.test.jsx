import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

describe("Header", () => {
  beforeEach(() => {
    window.innerWidth = 1280;
  });

  it("renders the main navigation and call-to-action link", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByAltText(/AVCon logo/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /home/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /contact us/i })).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /school pre-registration 2027/i }),
    ).toBeTruthy();
  });

  it("allows keyboard users to open and close a desktop submenu", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const toggle = screen.getByRole("button", { name: /event info submenu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /event schedule/i })).toBeVisible();
    fireEvent.keyDown(toggle, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(screen.queryByRole("link", { name: /event schedule/i })).toBeNull();
  });

  it("uses the mobile navigation when the desktop menu would wrap", () => {
    window.innerWidth = 1024;
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /school pre-registration 2027/i })).toHaveAttribute("href", "/bookTickets");
  });
});
