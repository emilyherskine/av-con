import React, { useEffect, useState } from "react";
import { portalRequest } from "../../portalClient";
import { listingFiles, uploadFile } from "../../portalFiles";

export default function ListingFiles({ listing, admin, onChanged }) {
  const [files, setFiles] = useState([]);
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const editable = admin || !["approved", "pending"].includes(listing.status);

  async function load() {
    const [existing, organisation] = await Promise.all([
      listingFiles([listing.id]),
      portalRequest(`/organisations/${listing.owner_id}/logo`),
    ]);
    setFiles(existing);
    setLogo(organisation.logo_id);
  }

  useEffect(() => {
    let active = true;
    async function initialLoad() {
      try {
        const [existing, organisation] = await Promise.all([
          listingFiles([listing.id]),
          portalRequest(`/organisations/${listing.owner_id}/logo`),
        ]);
        if (active) { setFiles(existing); setLogo(organisation.logo_id); }
      } catch (err) {
        if (active) setError(err.message);
      }
    }
    initialLoad();
    return () => { active = false; };
  }, [listing.id, listing.owner_id]);

  async function add(file, kind) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await uploadFile(file, kind, listing.id);
      await load();
      onChanged();
      setMessage("File added.");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  async function addLogo() {
    setBusy(true);
    setError("");
    try {
      await portalRequest(`/listings/${listing.id}/logo`, { method: "POST" });
      await load();
      onChanged();
      setMessage("Organisation logo added to this listing.");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  async function remove(file) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await portalRequest(`/listings/${listing.id}/files/${file.id}`, { method: "DELETE" });
      setMessage("File removed.");
    } catch (err) { setError(err.message); }
    finally {
      try { await load(); onChanged(); } catch (err) { setError(err.message); }
      setBusy(false);
    }
  }

  return <div className="portal-files">
    <h5>Listing files</h5>
    {!editable && <p>To change files, pause an approved listing or save a pending listing as a draft first. Submit it again for review afterwards.</p>}
    {editable && <>
      {logo && !files.some((file) => file.kind === "logo") &&
        <button type="button" disabled={busy} onClick={addLogo}>Use organisation logo</button>}
      {!logo && <p>Upload an organisation logo above to use it on this listing.</p>}
      <label>Upload photo (JPEG, PNG or WebP, up to 10 MB)
        <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(event) => {
          const file = event.target.files[0]; event.target.value = ""; if (file) add(file, "photo");
        }} />
      </label>
      <label>Upload brochure or document (PDF, up to 10 MB)
        <input type="file" accept="application/pdf" disabled={busy} onChange={(event) => {
          const file = event.target.files[0]; event.target.value = ""; if (file) add(file, "document");
        }} />
      </label>
    </>}
    {message && <p role="status">{message}</p>}
    {error && <p role="alert">{error}</p>}
    <ul>{files.map((file) => <li key={file.id}>
      <a href={file.url} target="_blank" rel="noopener noreferrer">{file.kind}: {file.file_name}</a>
      {editable && <button type="button" disabled={busy} onClick={() => remove(file)}>Remove</button>}
    </li>)}</ul>
  </div>;
}
