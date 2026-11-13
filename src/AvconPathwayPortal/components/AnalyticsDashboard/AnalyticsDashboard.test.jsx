import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AnalyticsDashboard from "./AnalyticsDashboard";

test("renders the AnalyticsDashboard component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<AnalyticsDashboard {...props} />);
  expect(markup).toContain("Loading analytics");
});
