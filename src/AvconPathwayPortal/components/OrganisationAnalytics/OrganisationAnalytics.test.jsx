import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import OrganisationAnalytics from "./OrganisationAnalytics";

test("renders the OrganisationAnalytics component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<OrganisationAnalytics {...props} />);
  expect(markup).toContain("Loading analytics");
});
