import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FeaturedListingsSection from "./FeaturedListingsSection";

test("renders the FeaturedListingsSection component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<FeaturedListingsSection {...props} />);
  expect(markup).toContain("Loading featured opportunities");
});
