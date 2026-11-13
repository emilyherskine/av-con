import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ListingEditor from "./ListingEditor";

test("renders the ListingEditor component", () => {
  const props = { onSave: jest.fn(), onCancel: jest.fn() };
  const markup = renderToStaticMarkup(<ListingEditor {...props} />);
  expect(markup).toContain("Title");
});
