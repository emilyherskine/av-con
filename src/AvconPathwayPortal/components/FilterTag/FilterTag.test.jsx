import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FilterTag from "./FilterTag";

test("renders the FilterTag component", () => {
  const props = { label: "Education", onRemove: jest.fn() };
  const markup = renderToStaticMarkup(<FilterTag {...props} />);
  expect(markup).toContain("Education");
});
