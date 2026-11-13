import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AdminPromotionAnalytics from "./AdminPromotionAnalytics";

test("renders the AdminPromotionAnalytics component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<AdminPromotionAnalytics {...props} />);
  expect(markup).toContain("Loading analytics");
});
