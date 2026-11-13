import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ImageInfoCard from "./ImageInfoCard";

test("renders the ImageInfoCard component", () => {
  const props = { imageUrl: "/logo.png", title: "Example course", description: "Course details", webURL: "https://example.com", linkLabel: "View opportunity" };
  const markup = renderToStaticMarkup(<ImageInfoCard {...props} />);
  expect(markup).toContain("Example course");
});
