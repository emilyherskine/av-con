import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AvConEzine from "./AvConEzine";

test("provides direct links to every publication", () => {
  render(<AvConEzine />);
  expect(screen.getAllByRole("link", { name: /^Open .*Ezine/i })).toHaveLength(4);
});
