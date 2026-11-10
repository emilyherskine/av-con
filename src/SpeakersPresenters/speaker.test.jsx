import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Speaker from "./speaker";

test("expands and collapses the full speaker biography accessibly", () => {
  const bio = "Aviation experience. ".repeat(10).trim();
  render(<Speaker SpeakerName="A Speaker" SpeakerImage="portrait.jpg" SpeakerBio={bio} />);

  const button = screen.getByRole("button", { name: "Expand for More" });
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByText(bio)).not.toBeInTheDocument();
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText(bio)).toBeVisible();
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "false");
});

test("shows a short biography without a toggle or ellipsis", () => {
  render(<Speaker SpeakerName="A Speaker" SpeakerImage="portrait.jpg" SpeakerBio="Pilot and educator." />);
  expect(screen.getByText("Pilot and educator.")).toBeVisible();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("labels an unavailable photo and reports an image load failure", () => {
  const { rerender } = render(<Speaker SpeakerName="A Speaker" SpeakerImage={null} SpeakerBio="Biography." />);
  expect(screen.getByText("Photo unavailable")).toBeVisible();
  rerender(<Speaker SpeakerName="A Speaker" SpeakerImage="portrait.jpg" SpeakerBio="Biography." />);
  fireEvent.error(screen.getByRole("img", { name: "Portrait of A Speaker" }));
  expect(screen.getByText("Photo unavailable")).toBeVisible();
});
