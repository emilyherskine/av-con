import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PublicSubmissionForm from "./PublicSubmissionForm";

test("renders the PublicSubmissionForm component", () => {
  const props = { onSubmitSuccess: jest.fn() };
  const markup = renderToStaticMarkup(<PublicSubmissionForm {...props} />);
  expect(markup).toContain("Submit an Opportunity");
});
