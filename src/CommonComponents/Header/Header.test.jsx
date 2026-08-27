import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

describe("Header", () => {
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
      screen.getByRole("button", { name: /avcon 2026 school registration/i }),
    ).toBeTruthy();
  });
});
