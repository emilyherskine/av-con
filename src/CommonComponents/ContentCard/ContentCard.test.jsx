import React from "react";
import { render, screen } from "@testing-library/react";
import ContentCard from "./ContentCard";

test("renders a content card with optional children", () => {
  render(
    <ContentCard title="Title" description="Description">
      <span>Child content</span>
    </ContentCard>,
  );

  expect(screen.getByRole("heading", { name: "Title" })).toBeDefined();
  expect(screen.getByText("Description")).toBeDefined();
  expect(screen.getByText("Child content")).toBeDefined();
});
