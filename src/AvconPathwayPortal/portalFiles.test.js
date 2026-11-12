import { MAX_FILE_SIZE, validateFile } from "./portalFiles";

test("accepts supported image and PDF files for their matching purposes", () => {
  expect(() => validateFile(new File(["image"], "photo.png", { type: "image/png" }), "photo")).not.toThrow();
  expect(() => validateFile(new File(["pdf"], "brochure.pdf", { type: "application/pdf" }), "document")).not.toThrow();
  expect(() => validateFile(new File(["pdf"], "logo.pdf", { type: "application/pdf" }), "logo")).toThrow("JPEG");
  expect(() => validateFile(new File(["svg"], "image.svg", { type: "image/svg+xml" }), "photo")).toThrow("JPEG");
});

test("rejects empty and oversized files", () => {
  expect(() => validateFile(new File([], "empty.pdf", { type: "application/pdf" }), "document")).toThrow("empty");
  expect(() => validateFile({ type: "image/png", size: MAX_FILE_SIZE + 1 }, "photo")).toThrow("10 MB");
  expect(() => validateFile({ type: "image/png", size: MAX_FILE_SIZE }, "photo")).not.toThrow();
});
