import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FirstImageAndText from "./FirstImageAndText";

test("renders the FirstImageAndText component", () => {
  const props = {  };
  const markup = renderToStaticMarkup(<FirstImageAndText {...props} />);
  expect(markup).toContain("Welcome to A.P.P.");
});
