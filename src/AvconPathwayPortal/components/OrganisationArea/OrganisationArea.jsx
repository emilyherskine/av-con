import React, { useEffect, useState } from "react";
import { apiAvailable, categories, portalRequest, sectors } from "../../portalClient";
import { validateCategory, validateSector } from "../../taxonomyValidator";
import OrganisationLogo from "../OrganisationLogo/OrganisationLogo";
import ListingFiles from "../ListingFiles/ListingFiles";

const emptyListing = {
  title: "",
  description: "",
  category: "",
  sector: "",
  location: "",
  application_url: "",
  expires_on: "",
};

function ListingForm({ listing, onSave, onCancel }) {
  const [values, setValues] = useState(listing || emptyListing);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function change(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function save(status) {
    setError("");
    setBusy(true);
    try {
      // Validate category and sector against taxonomy
      if (values.category) validateCategory(values.category);
      if (values.sector) validateSector(values.sector);
      
      await onSave({ ...values, expires_on: values.expires_on || null, status });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="portal-form" onSubmit={(event) => {
      event.preventDefault();
      save("pending");
    }}>
      <h3>{listing?.id ? "Edit listing" : "New listing"}</h3>
      <p>Complete every field except expiry before submitting for review. You can save an incomplete draft.</p>
      <label>Title<input name="title" value={values.title} onChange={change} maxLength="200" /></label>
      <label>Description<textarea name="description" value={values.description} onChange={change} maxLength="10000" rows="5" /></label>
      <label>Category<select name="category" value={values.category} onChange={change}>
        <option value="">Select a category</option>
        {categories.map((item) => <option key={item}>{item}</option>)}
      </select></label>
      <label>Sector<select name="sector" value={values.sector} onChange={change}>
        <option value="">Select a sector</option>
        {sectors.map((item) => <option key={item}>{item}</option>)}
      </select></label>
      <label>Location or online<input name="location" value={values.location} onChange={change} maxLength="200" /></label>
      <label>Application or information URL<input name="application_url" value={values.application_url} onChange={change} type="url" /></label>
      <label>Expiry date (optional)<input name="expires_on" value={values.expires_on || ""} onChange={change} type="date" /></label>
      {error && <p role="alert">{error}</p>}
      <div className="portal-actions">
        {listing?.status !== "approved" && <button type="button" disabled={busy} onClick={() => save("draft")}>Save draft</button>}
        <button type="submit" disabled={busy}>Submit for approval</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function Authentication({ onMessage }) {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { user } = await portalRequest(register ? "/register" : "/login", {
        method: "POST", body: { email, password, ...(register ? { name: name.trim() } : {}) },
      });
      onMessage(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="portal-form" onSubmit={submit}>
      <h3>{register ? "Register an organisation" : "Organisation sign in"}</h3>
      {register && <label>Organisation name<input value={name} onChange={(event) => setName(event.target.value)} required maxLength="200" /></label>}
      <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength="8" /></label>
      {error && <p role="alert">{error}</p>}
      <div className="portal-actions">
        <button type="submit" disabled={busy}>{register ? "Create account" : "Sign in"}</button>
        <button type="button" onClick={() => { setRegister(!register); setError(""); }}>
          {register ? "Already registered? Sign in" : "Register an organisation"}
        </button>
      </div>
    </form>
  );
}

export default function OrganisationArea({ onListingsChanged }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [listings, setListings] = useState([]);
  const [editing, setEditing] = useState(null);
  const [managingFiles, setManagingFiles] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!apiAvailable) return undefined;
    let active = true;
    portalRequest("/session").then((result) => {
      if (active) setUser(result.user);
    }).catch((err) => {
      if (active) setError(err.message);
    }).finally(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!user) {
      setListings([]);
      return;
    }
    let active = true;
    async function load() {
      try {
        const result = await portalRequest("/manage/listings");
        if (active) setListings(result.listings);
      } catch (err) { if (active) setError(err.message); }
    }
    load();
    return () => { active = false; };
  }, [user]);

  async function refresh() {
    const result = await portalRequest("/manage/listings");
    setListings(result.listings);
    onListingsChanged();
  }

  async function save(values) {
    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      sector: values.sector,
      location: values.location.trim(),
      application_url: values.application_url.trim(),
      expires_on: values.expires_on,
      status: values.status,
    };
    await portalRequest(editing?.id ? `/listings/${editing.id}` : "/listings", {
      method: editing?.id ? "PUT" : "POST", body: payload,
    });
    await refresh();
    setEditing(null);
    setMessage(payload.status === "pending" ? "Listing submitted for AvCon review." : "Draft saved.");
  }

  async function changeStatus(item, status) {
    setError("");
    try {
      await portalRequest(`/listings/${item.id}`, { method: "PUT", body: { ...item, status } });
      await refresh();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    if (!window.confirm("Delete this listing? This cannot be undone.")) return;
    setError("");
    try {
      await portalRequest(`/listings/${id}`, { method: "DELETE" });
      setManagingFiles(null);
      await refresh();
    } catch (err) { setError(err.message); onListingsChanged(); }
  }

  if (!apiAvailable) {
    return <p>Organisation accounts are not yet available. Please <a href="/contact">contact AvCon</a> to submit an opportunity.</p>;
  }
  if (!ready) return <p>Loading organisation access…</p>;

  return (
    <div className="organisation-area">
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
      {!user ? <Authentication onMessage={setUser} /> : <>
        <div className="portal-actions">
          <button type="button" onClick={() => { setEditing({ ...emptyListing }); setMessage(""); }}>Add a listing</button>
          <button type="button" onClick={async () => {
            try {
              await portalRequest("/logout", { method: "POST" });
              setUser(null); setEditing(null); setManagingFiles(null); setMessage("");
            } catch (err) { setError(err.message); }
          }}>Sign out</button>
        </div>
        {!user.admin && <OrganisationLogo ownerId={user.id} />}
        {editing && <ListingForm key={editing.id || "new"} listing={editing} onSave={save} onCancel={() => setEditing(null)} />}
        <h3>{user.admin ? "All listings" : "Your listings"}</h3>
        <p>Save a listing as a draft before adding its logo, photos or PDF documents.</p>
        {listings.length === 0 && <p>No listings yet.</p>}
        {listings.map((item) => {
          const expired = item.expires_on && item.expires_on < new Date().toISOString().slice(0, 10);
          return <article className="portal-listing" key={item.id}>
            <h4>{item.title || "Untitled draft"}</h4>
            <p>{item.organisation_name} · {expired && item.status === "approved" ? "Expired" : item.status}</p>
            <div className="portal-actions">
              <button type="button" onClick={() => setEditing(item)}>Edit</button>
              <button type="button" onClick={() => setManagingFiles(managingFiles === item.id ? null : item.id)}>
                {managingFiles === item.id ? "Close files" : "Manage files"}
              </button>
              {item.status === "approved" && !user.admin && <button type="button" onClick={() => changeStatus(item, "paused")}>Pause</button>}
              {user.admin && item.status === "pending" && <>
                <button type="button" onClick={() => changeStatus(item, "approved")}>Approve</button>
                <button type="button" onClick={() => changeStatus(item, "rejected")}>Reject</button>
              </>}
              <button type="button" onClick={() => remove(item.id)}>Delete</button>
            </div>
            {managingFiles === item.id && <ListingFiles key={item.id} listing={item} admin={user.admin} onChanged={onListingsChanged} />}
          </article>;
        })}
      </>}
    </div>
  );
}
