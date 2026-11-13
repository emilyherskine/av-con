import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PromotionImpactCard from "./PromotionImpactCard";

test("renders the PromotionImpactCard component", () => {
  const props = { listing_title: "Example opportunity", promotion_data: null };
  const markup = renderToStaticMarkup(<PromotionImpactCard {...props} />);
  expect(markup).toContain("not currently featured");
});
