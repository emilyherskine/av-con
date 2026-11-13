import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FilterPanel from "./FilterPanel";

test("renders the FilterPanel component", () => {
  const props = { facets: { categories: [{ name: "Education", count: 1 }], sectors: [{ name: "Other", count: 1 }], locations: [{ name: "Online", count: 1 }] }, selectedFilters: { categories: [], sectors: [], locations: [] }, onFilterChange: jest.fn() };
  const markup = renderToStaticMarkup(<FilterPanel {...props} />);
  expect(markup).toContain("Filters");
});
