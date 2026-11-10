import Register from "./register";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("school registration links use the requested form", () => {
  render(<Register />);

  const schoolLinks = screen.getAllByRole("link", {
    name: /register your school/i,
  });

  expect(schoolLinks).toHaveLength(2);
  schoolLinks.forEach((link) => {
    expect(link).toHaveAttribute(
      "href",
      "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__WNhaCZUQURIMFI2QUwyWUpNMTIyNDdRWEo5N1FMVC4u",
    );
  });

  expect(
    screen.getByRole("link", { name: /register your college/i }),
  ).toHaveAttribute("href", "https://forms.cloud.microsoft/r/bKq0qMmnFY");
  expect(
    screen.getByRole("link", { name: /pre-register for avcon 2027/i }),
  ).toHaveAttribute("href", schoolLinks[0].getAttribute("href"));
});
