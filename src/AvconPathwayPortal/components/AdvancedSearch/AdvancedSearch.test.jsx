import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AdvancedSearch from "./AdvancedSearch";

test("renders the AdvancedSearch component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<AdvancedSearch {...props} />);
  expect(markup).toContain("Search");
});
