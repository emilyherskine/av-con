import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FeaturedBadge from "./FeaturedBadge";

test("renders the FeaturedBadge component", () => {
  const props = { featured_until: "2099-01-01T00:00:00Z" };
  const markup = renderToStaticMarkup(<FeaturedBadge {...props} />);
  expect(markup).toContain("Featured Listing");
});
