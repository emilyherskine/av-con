import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PublicDirectory from "./PublicDirectory";

test("renders the PublicDirectory component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<PublicDirectory {...props} />);
  expect(markup).toContain("Loading");
});
