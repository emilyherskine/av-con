import React, { useEffect, useState } from "react";
import { fileUrl, portalRequest } from "../../portalClient";
import { uploadFile } from "../../portalFiles";

export default function OrganisationLogo({ ownerId }) {
  const [logo, setLogo] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await portalRequest(`/organisations/${ownerId}/logo`);
        if (active) { setLogo(data.logo_id); setUrl(data.logo_id ? fileUrl(data.logo_id) : ""); }
      } catch (err) { if (active) setError(err.message); }
    }
    load();
    return () => { active = false; };
  }, [ownerId]);

  async function changeLogo(file) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const { id } = await uploadFile(file, "logo");
      setLogo(id);
      setMessage("Organisation logo saved. Add it to each listing before submitting for review.");
      setUrl(fileUrl(id));
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <div className="portal-form">
    <h3>Organisation logo</h3>
    <p>Upload a reusable logo, then add it to each listing. Changing it does not change previously submitted listings.</p>
    {url && <img className="portal-logo-preview" src={url} alt="Current organisation logo" />}
    {logo && !url && <p>Logo saved, but its preview could not be loaded.</p>}
    <label>Upload organisation logo (JPEG, PNG or WebP, up to 10 MB)
      <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(event) => {
        const file = event.target.files[0]; event.target.value = ""; if (file) changeLogo(file);
      }} />
    </label>
    {message && <p role="status">{message}</p>}
    {error && <p role="alert">{error}</p>}
  </div>;
}
