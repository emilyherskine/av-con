import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PopularSearchesTable from "./PopularSearchesTable";

test("renders the PopularSearchesTable component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<PopularSearchesTable {...props} />);
  expect(markup).toContain("Loading");
});
