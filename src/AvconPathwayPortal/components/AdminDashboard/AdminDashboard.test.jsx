import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AdminDashboard from "./AdminDashboard";

test("renders the AdminDashboard component", () => {
  const props = { user: { id: "admin-1", name: "Admin", admin: 1 }, onLogout: jest.fn() };
  const markup = renderToStaticMarkup(<AdminDashboard {...props} />);
  expect(markup).toContain("Loading");
});
