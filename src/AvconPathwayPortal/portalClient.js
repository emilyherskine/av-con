import taxonomy from "./taxonomy.json";

const apiBase = process.env.REACT_APP_PORTAL_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3001/api/portal" : "");

export const apiAvailable = Boolean(apiBase);
export const { categories, sectors } = taxonomy;

export async function portalRequest(path, options = {}) {
  if (!apiBase) throw new Error("The organisation portal is not configured.");
  const { body, ...rest } = options;
  const headers = { ...options.headers };
  if (body && !(body instanceof FormData)) headers["Content-Type"] = "application/json";
  const response = await fetch(`${apiBase}${path}`, {
    ...rest,
    headers,
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "The portal request failed.");
  return result;
}

export function fileUrl(id) {
  return `${apiBase}/files/${encodeURIComponent(id)}`;
}
