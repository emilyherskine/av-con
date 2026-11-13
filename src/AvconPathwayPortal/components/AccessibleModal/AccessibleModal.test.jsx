import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AccessibleModal from "./AccessibleModal";

test("renders the AccessibleModal component", () => {
  const props = { isOpen: true, onClose: jest.fn(), title: "Dialog title", children: "Dialog content" };
  const markup = renderToStaticMarkup(<AccessibleModal {...props} />);
  expect(markup).toContain("Dialog title");
});
