import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PathwayCard from "./PathwayCard";

test("renders the PathwayCard component", () => {
  const props = { title: "Careers", text: "Explore opportunities" };
  const markup = renderToStaticMarkup(<PathwayCard {...props} />);
  expect(markup).toContain("Careers");
});
