import { fileUrl, portalRequest } from "./portalClient";

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export function validateFile(file, kind) {
  if (!file || !allowedTypes.includes(file.type) || (kind !== "document" && file.type === "application/pdf") ||
      (kind === "document" && file.type !== "application/pdf")) {
    throw new Error(kind === "document" ? "Choose a PDF document." : "Choose a JPEG, PNG or WebP image.");
  }
  if (file.size > MAX_FILE_SIZE) throw new Error("Files must be no larger than 10 MB.");
  if (file.size === 0) throw new Error("The selected file is empty.");
}

export async function uploadFile(file, kind, listingId) {
  validateFile(file, kind);
  const body = new FormData();
  body.append("kind", kind);
  if (listingId) body.append("listing_id", listingId);
  body.append("file", file);
  return portalRequest("/uploads", { method: "POST", body });
}

export async function listingFiles(listingIds) {
  const results = await Promise.all(listingIds.map((id) => portalRequest(`/listings/${encodeURIComponent(id)}/files`)));
  return results.flatMap(({ files }, index) => files.map((file) => ({
    ...file, listing_id: listingIds[index], url: fileUrl(file.id),
  })));
}
