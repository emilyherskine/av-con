import { render, screen } from "@testing-library/react";
import SpeakersPresenters from "./speakersPresenters";

test("renders the configured speakers and an empty-presenters message", () => {
  render(<SpeakersPresenters />);

  expect(screen.getByText("Alex Merkel Carroll")).not.toBeNull();
  expect(
    screen.getByText("Presenter announcements coming soon."),
  ).not.toBeNull();
});

test("renders presenters and an empty-speakers message when supplied", () => {
  render(
    <SpeakersPresenters
      presenters={[
        {
          image: "presenter.jpg",
          name: "Jane Smith",
          bio: "Presenter biography",
        },
      ]}
      speakers={[]}
    />,
  );

  expect(screen.getByText("Jane Smith")).not.toBeNull();
  expect(screen.getByText("Speaker announcements coming soon.")).not.toBeNull();
});
