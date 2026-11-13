import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AnalyticsExportModal from "./AnalyticsExportModal";

test("renders the AnalyticsExportModal component", () => {
  const props = { onClose: jest.fn() };
  const markup = renderToStaticMarkup(<AnalyticsExportModal {...props} />);
  expect(markup).toContain("Export");
});
