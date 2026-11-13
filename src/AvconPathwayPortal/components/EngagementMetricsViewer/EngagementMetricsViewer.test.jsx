import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import EngagementMetricsViewer from "./EngagementMetricsViewer";

test("renders the EngagementMetricsViewer component", () => {
  const props = { listingId: "listing-1" };
  const markup = renderToStaticMarkup(<EngagementMetricsViewer {...props} />);
  expect(markup).toContain("Loading");
});
