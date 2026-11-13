import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import OrganizationDashboard from "./OrganizationDashboard";

test("renders the OrganizationDashboard component", () => {
  const props = { user: { id: "org-1", name: "Example organisation", admin: 0 }, onLogout: jest.fn() };
  const markup = renderToStaticMarkup(<OrganizationDashboard {...props} />);
  expect(markup).toContain("Loading");
});
