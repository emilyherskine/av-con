import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ListingManagement from "./ListingManagement";

test("renders the ListingManagement component", () => {
  const props = { user: { id: "org-1", name: "Example organisation" } };
  const markup = renderToStaticMarkup(<ListingManagement {...props} />);
  expect(markup).toContain("Loading");
});
