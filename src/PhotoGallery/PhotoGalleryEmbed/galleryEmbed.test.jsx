import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PhotoGalleryEmbed from "./galleryEmbed";

test("the open link and iframe follow the selected gallery", () => {
  render(<PhotoGalleryEmbed />);
  expect(screen.getByTitle("2025 Shannon Irvine Gallery")).toHaveAttribute(
    "src",
    "https://drive.google.com/embeddedfolderview?id=1XbLfdd6JdLJArOiL2SRpINHCL_Eg_oVt#grid",
  );
  fireEvent.click(screen.getByRole("button", { name: "2025 Air Corps Gallery" }));
  const frame = screen.getByTitle("2025 Air Corps Gallery");
  expect(screen.getByRole("link", { name: "Open 2025 Air Corps Gallery in a new tab" }))
    .toHaveAttribute("href", frame.getAttribute("src"));
});
