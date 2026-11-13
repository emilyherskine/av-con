import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import OrganizationAuth from "./OrganizationAuth";

test("renders the OrganizationAuth component", () => {
  const props = { onAuthSuccess: jest.fn() };
  const markup = renderToStaticMarkup(<OrganizationAuth {...props} />);
  expect(markup).toContain("Email");
});
