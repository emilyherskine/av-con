import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListingFiles from "./ListingFiles";
import { portalRequest } from "../../portalClient";
import { listingFiles, uploadFile } from "../../portalFiles";

jest.mock("../../portalClient", () => ({ portalRequest: jest.fn() }));
jest.mock("../../portalFiles", () => ({ listingFiles: jest.fn(), uploadFile: jest.fn() }));

const listing = { id: "listing-1", owner_id: "owner-1", status: "draft" };

beforeEach(() => {
  jest.clearAllMocks();
  listingFiles.mockResolvedValue([]);
  portalRequest.mockImplementation(async (path) => path.includes("/organisations/")
    ? { logo_id: "logo-1" } : { ok: true });
});

test("adds the reusable logo to a draft listing", async () => {
  const onChanged = jest.fn();
  render(<ListingFiles listing={listing} admin={false} onChanged={onChanged} />);
  fireEvent.click(await screen.findByRole("button", { name: "Use organisation logo" }));
  await waitFor(() => expect(portalRequest).toHaveBeenCalledWith("/listings/listing-1/logo", { method: "POST" }));
  expect(await screen.findByRole("status")).toHaveTextContent("logo added");
  expect(onChanged).toHaveBeenCalled();
});

test("prevents organisations from changing submitted files", async () => {
  listingFiles.mockResolvedValue([{ id: "file-1", kind: "document", file_name: "brochure.pdf", url: "https://example.com/file" }]);
  render(<ListingFiles listing={{ ...listing, status: "pending" }} admin={false} onChanged={jest.fn()} />);
  expect(await screen.findByRole("link", { name: "document: brochure.pdf" })).toBeVisible();
  expect(screen.queryByLabelText(/Upload photo/)).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Remove" })).not.toBeInTheDocument();
});

test("shows scanner errors instead of claiming an upload succeeded", async () => {
  uploadFile.mockRejectedValue(new Error("The malware scanner is unavailable."));
  render(<ListingFiles listing={listing} admin={false} onChanged={jest.fn()} />);
  fireEvent.change(screen.getByLabelText(/Upload brochure/), {
    target: { files: [new File(["pdf"], "brochure.pdf", { type: "application/pdf" })] },
  });
  expect(await screen.findByRole("alert")).toHaveTextContent("scanner is unavailable");
});
