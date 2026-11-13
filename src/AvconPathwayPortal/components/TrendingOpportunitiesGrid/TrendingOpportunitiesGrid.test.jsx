import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import TrendingOpportunitiesGrid from "./TrendingOpportunitiesGrid";

test("renders the TrendingOpportunitiesGrid component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<TrendingOpportunitiesGrid {...props} />);
  expect(markup).toContain("Loading");
});
