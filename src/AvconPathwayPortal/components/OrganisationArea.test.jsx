import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrganisationArea from "./OrganisationArea";
import { portalRequest } from "../portalClient";

jest.mock("../portalClient", () => ({
  apiAvailable: true,
  categories: ["Education"],
  sectors: ["Aviation Education & Training"],
  portalRequest: jest.fn(),
  fileUrl: jest.fn(),
}));

beforeEach(() => jest.clearAllMocks());

test("registers an organisation and opens its dashboard", async () => {
  portalRequest.mockImplementation(async (path) => {
    if (path === "/session") return { user: null };
    if (path === "/register") return { user: { id: "user-1", admin: 0 } };
    if (path === "/manage/listings") return { listings: [] };
    if (path === "/organisations/user-1/logo") return { logo_id: null };
    throw new Error("Unexpected request");
  });
  render(<OrganisationArea onListingsChanged={jest.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: "Register an organisation" }));
  fireEvent.change(screen.getByLabelText("Organisation name"), { target: { value: "  Example Aviation  " } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
  fireEvent.click(screen.getByRole("button", { name: "Create account" }));
  expect(await screen.findByRole("heading", { name: "Your listings" })).toBeVisible();
  expect(portalRequest).toHaveBeenCalledWith("/register", expect.objectContaining({
    body: expect.objectContaining({ name: "Example Aviation" }),
  }));
});

test("editing an approved listing submits changes for review", async () => {
  const listing = {
    id: "listing-1", owner_id: "user-1", organisation_name: "Example Aviation",
    title: "Course", description: "Details", category: "Education",
    sector: "Aviation Education & Training", location: "Online",
    application_url: "https://example.com", expires_on: null, status: "approved",
  };
  portalRequest.mockImplementation(async (path) => {
    if (path === "/session") return { user: { id: "user-1", admin: 0 } };
    if (path === "/manage/listings") return { listings: [listing] };
    if (path === "/organisations/user-1/logo") return { logo_id: null };
    if (path === "/listings/listing-1") return { ok: true };
    throw new Error("Unexpected request");
  });
  render(<OrganisationArea onListingsChanged={jest.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: "Edit" }));
  expect(screen.queryByRole("button", { name: "Save draft" })).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Updated course" } });
  fireEvent.click(screen.getByRole("button", { name: "Submit for approval" }));
  await waitFor(() => expect(portalRequest).toHaveBeenCalledWith("/listings/listing-1", expect.objectContaining({
    body: expect.objectContaining({ title: "Updated course", status: "pending" }),
  })));
  expect(await screen.findByRole("status")).toHaveTextContent("submitted");
});
