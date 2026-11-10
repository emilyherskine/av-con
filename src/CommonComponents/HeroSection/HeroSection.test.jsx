import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

test("uses a supplied photograph at desktop and mobile widths", () => {
  const { container } = render(
    <HeroSection
      defaultTitle="Explore AvCon"
      eyebrow="The event"
      backgroundImage="/event-photo.jpg"
      buttonText="Register"
      buttonLink="/bookTickets"
    />,
  );
  expect(screen.getByRole("heading", { name: "Explore AvCon" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Register" })).toHaveAttribute("href", "/bookTickets");
  expect(container.querySelector("img")).toHaveAttribute("src", "/event-photo.jpg");
  expect([...container.querySelectorAll("source")]).toHaveLength(2);
  container.querySelectorAll("source").forEach((source) => {
    expect(source).toHaveAttribute("srcset", "/event-photo.jpg");
  });
});

test("keeps the default responsive hero images", () => {
  const { container } = render(<HeroSection defaultTitle="AvCon" />);
  const sources = [...container.querySelectorAll("source")];
  expect(sources[0].getAttribute("srcset")).toContain("Hero-mobile");
  expect(sources[1].getAttribute("srcset")).toContain("HeroImage");
});
