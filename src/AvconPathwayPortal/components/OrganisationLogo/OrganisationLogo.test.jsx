import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import OrganisationLogo from "./OrganisationLogo";

test("renders the OrganisationLogo component", () => {
  const props = { ownerId: "org-1" };
  const markup = renderToStaticMarkup(<OrganisationLogo {...props} />);
  expect(markup).toContain("logo");
});
