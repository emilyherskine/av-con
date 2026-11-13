import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import OrganisationPerformanceTable from "./OrganisationPerformanceTable";

test("renders the OrganisationPerformanceTable component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<OrganisationPerformanceTable {...props} />);
  expect(markup).toContain("Loading");
});
