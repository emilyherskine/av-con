import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AdminFeaturedListingsManager from "./AdminFeaturedListingsManager";

test("renders the AdminFeaturedListingsManager component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<AdminFeaturedListingsManager {...props} />);
  expect(markup).toContain("Loading");
});
