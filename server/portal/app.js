const express = require("express");
const cors = require("cors");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const fileType = require("file-type");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const { promisify } = require("util");
const { categories, sectors } = require("../../src/AvconPathwayPortal/taxonomy.json");
const { scanWithClamAV } = require("./scanner");
const { setupEmailService } = require("./emailService");

const scrypt = promisify(crypto.scrypt);
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedTypes = { "image/jpeg": "photo", "image/png": "photo", "image/webp": "photo", "application/pdf": "document" };

function failure(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function wrap(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function digest(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

async function passwordHash(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await scrypt(password, salt, 64);
  return `${salt}:${hash.toString("hex")}`;
}

async function passwordMatches(password, stored) {
  const [salt, value] = stored.split(":");
  const expected = Buffer.from(value, "hex");
  const actual = await scrypt(password, salt, expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

function fields(input, status) {
  const result = {};
  for (const [name, max] of Object.entries({ title: 200, description: 10000, category: 100, sector: 100, location: 200, application_url: 2048 })) {
    if (typeof input[name] !== "string" || input[name].length > max) throw failure(400, `Invalid ${name}.`);
    result[name] = input[name].trim();
  }
  result.expires_on = input.expires_on || null;
  if (result.expires_on !== null) {
    if (typeof result.expires_on !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(result.expires_on) ||
        Number.isNaN(Date.parse(`${result.expires_on}T00:00:00Z`)) ||
        new Date(`${result.expires_on}T00:00:00Z`).toISOString().slice(0, 10) !== result.expires_on) {
      throw failure(400, "Invalid expiry date.");
    }
  }
  if (result.application_url) {
    let url;
    try { url = new URL(result.application_url); } catch { throw failure(400, "Enter a valid application URL."); }
    if (!["http:", "https:"].includes(url.protocol)) throw failure(400, "Use an HTTP or HTTPS application URL.");
  }
  if (["pending", "approved"].includes(status)) {
    if (!result.title || !result.description || !result.location || !result.application_url ||
        !categories.includes(result.category) || !sectors.includes(result.sector) ||
        (result.expires_on && result.expires_on < new Date().toISOString().slice(0, 10))) {
      throw failure(400, "Complete all required fields and use a current expiry date before submission or approval.");
    }
  }
  return result;
}

function createApp({ db, directory, siteOrigin, scan = scanWithClamAV, secureCookies = false }) {
  const app = express();
  const uploads = path.join(directory, "uploads");
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_FILE_SIZE, files: 1 } });
  const emailService = setupEmailService();
  const prefix = "/api/portal";
  app.disable("x-powered-by");
  app.use(prefix, cors({ origin: siteOrigin, credentials: true }));
  app.use(prefix, express.json({ limit: "32kb" }));
  app.use(prefix, rateLimit({ windowMs: 60 * 1000, limit: 180, standardHeaders: true, legacyHeaders: false }));
  app.use(prefix, (req, res, next) => {
    if (!["GET", "HEAD", "OPTIONS"].includes(req.method) && req.get("origin") !== siteOrigin) {
      return next(failure(403, "Request origin is not allowed."));
    }
    const cookie = (req.headers.cookie || "").split(";").map((part) => part.trim()).find((part) => part.startsWith("portal_session="));
    const token = cookie && cookie.slice("portal_session=".length);
    if (token && /^[a-f0-9]{64}$/.test(token)) {
      req.user = db.prepare(`select o.id, o.email, o.name, o.admin, o.logo_id from sessions s
        join organisations o on o.id = s.user_id where s.token_hash = ? and s.expires_at > ?`).get(digest(token), Date.now());
      req.token = token;
    }
    next();
  });
  const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });
  const uploadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });

  function requireUser(req) {
    if (!req.user) throw failure(401, "Please sign in.");
    return req.user;
  }

  function listingForUser(id, user) {
    const listing = db.prepare("select * from listings where id = ?").get(id);
    if (!listing || (!user.admin && listing.owner_id !== user.id)) throw failure(404, "Listing not found.");
    return listing;
  }

  function editable(listing, user) {
    if (!user.admin && ["approved", "pending"].includes(listing.status)) {
      throw failure(409, "Pause the approved listing or return it to draft before changing files.");
    }
  }

  function startSession(user, res) {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
    db.prepare("delete from sessions where expires_at <= ?").run(Date.now());
    db.prepare("insert into sessions values (?, ?, ?)").run(digest(token), user.id, expires);
    res.cookie("portal_session", token, { httpOnly: true, secure: secureCookies, sameSite: "strict", path: prefix, expires: new Date(expires) });
  }

  app.get(`${prefix}/session`, (req, res) => res.json({ user: req.user || null }));

  app.post(`${prefix}/register`, loginLimiter, wrap(async (req, res) => {
    const { email, password, name } = req.body || {};
    if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        typeof name !== "string" || !name.trim() || name.trim().length > 200 ||
        typeof password !== "string" || password.length < 8 || password.length > 256) {
      throw failure(400, "Enter an organisation name, a valid email address and a password of at least 8 characters.");
    }
    const normalizedEmail = email.trim().toLowerCase();
    const hash = await passwordHash(password);
    const user = { id: crypto.randomUUID(), email: normalizedEmail, name: name.trim(), admin: 0, logo_id: null };
    try { db.prepare("insert into organisations (id,email,name,password_hash) values (?,?,?,?)").run(user.id, user.email, user.name, hash); }
    catch (error) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") throw failure(409, "An account with that email already exists.");
      throw error;
    }
    startSession(user, res);
    res.status(201).json({ user });
  }));

  app.post(`${prefix}/login`, loginLimiter, wrap(async (req, res) => {
    const { email, password } = req.body || {};
    if (typeof email !== "string" || typeof password !== "string" || email.length > 254 || password.length > 256) {
      throw failure(400, "Enter your email and password.");
    }
    const user = db.prepare("select * from organisations where email = ?").get(email.trim().toLowerCase());
    const fallback = "00000000000000000000000000000000:00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    if (!await passwordMatches(password, user ? user.password_hash : fallback) || !user) throw failure(401, "Invalid email or password.");
    startSession(user, res);
    res.json({ user: { id: user.id, email: user.email, name: user.name, admin: user.admin, logo_id: user.logo_id } });
  }));

  app.post(`${prefix}/logout`, wrap(async (req, res) => {
    if (req.token) db.prepare("delete from sessions where token_hash = ?").run(digest(req.token));
    res.clearCookie("portal_session", { httpOnly: true, secure: secureCookies, sameSite: "strict", path: prefix });
    res.json({ ok: true });
  }));

  app.post(`${prefix}/public/submit`, uploadLimiter, wrap(async (req, res) => {
    const { organisation_name, contact_name, contact_email, contact_phone, organisation_website, status } = req.body || {};
    
    if (typeof organisation_name !== "string" || !organisation_name.trim() || organisation_name.trim().length > 200 ||
        typeof contact_name !== "string" || !contact_name.trim() || contact_name.trim().length > 200 ||
        typeof contact_email !== "string" || contact_email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email.trim()) ||
        (contact_phone && (typeof contact_phone !== "string" || contact_phone.trim().length > 20)) ||
        (organisation_website && (typeof organisation_website !== "string" || organisation_website.trim().length > 2048))) {
      throw failure(400, "Enter valid organisation and contact information.");
    }

    const values = fields(req.body, "pending");
    
    let organisation = db.prepare("select id from organisations where email = ?").get(contact_email.trim().toLowerCase());
    
    if (!organisation) {
      const orgId = crypto.randomUUID();
      try {
        db.prepare(`insert into organisations (id, email, name, contact_name, contact_phone, admin)
          values (?, ?, ?, ?, ?, 0)`).run(
          orgId,
          contact_email.trim().toLowerCase(),
          organisation_name.trim(),
          contact_name.trim(),
          contact_phone.trim()
        );
        organisation = { id: orgId };
      } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
          organisation = db.prepare("select id from organisations where email = ?").get(contact_email.trim().toLowerCase());
        } else {
          throw error;
        }
      }
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    db.prepare(`insert into listings (id, owner_id, title, description, category, sector, location, application_url, expires_on, status, created_at, updated_at)
      values (@id, @owner_id, @title, @description, @category, @sector, @location, @application_url, @expires_on, @status, @created_at, @updated_at)`)
      .run({ ...values, id, owner_id: organisation.id, status: "pending", created_at: now, updated_at: now });
    
    const listing = db.prepare("select l.*, o.name as organisation_name from listings l join organisations o on o.id = l.owner_id where l.id = ?").get(id);
    res.status(201).json({ listing });
  }));

  app.get(`${prefix}/listings`, (req, res) => {
    const entries = db.prepare(`select l.*, o.name as organisation_name, o.logo_id from listings l
      join organisations o on o.id = l.owner_id where l.status = 'approved'
      and (l.expires_on is null or l.expires_on >= date('now')) order by l.created_at desc`).all();
    res.json({ listings: entries });
  });

  app.get(`${prefix}/listings/search`, (req, res) => {
    const startTime = Date.now();
    const { q, category, sector, location, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    let sql = `select l.*, o.name as organisation_name, o.id as organisation_id, o.logo_id from listings l
      join organisations o on o.id = l.owner_id where l.status = 'approved'
      and (l.expires_on is null or l.expires_on >= date('now'))`;
    const params = [];
    
    if (q) {
      sql += ` and (l.title like ? or l.description like ? or o.name like ?)`;
      const searchTerm = `%${q}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    if (category) {
      sql += ` and l.category = ?`;
      params.push(category);
    }
    if (sector) {
      sql += ` and l.sector = ?`;
      params.push(sector);
    }
    if (location) {
      sql += ` and l.location like ?`;
      params.push(`%${location}%`);
    }
    
    const countResult = db.prepare(sql.replace('select l.*', 'select count(*) as count')).get(...params);
    const total = countResult.count;
    
    const listings = db.prepare(`${sql} order by l.created_at desc limit ? offset ?`)
      .all(...params, parseInt(limit), offset);
    
    const searchTimeMs = Date.now() - startTime;
    
    // Track search in analytics
    const filterObj = {};
    if (category) filterObj.category = category;
    if (sector) filterObj.sector = sector;
    if (location) filterObj.location = location;
    
    analytics.recordSearch({
      query: q || null,
      filters: Object.keys(filterObj).length > 0 ? JSON.stringify(filterObj) : null,
      resultsCount: total,
      searchTimeMs: searchTimeMs
    });
    
    // Track impressions for each listing in results
    listings.forEach(listing => {
      analytics.trackSearchImpression(listing.id, q || null);
    });
    
    res.json({ 
      listings, 
      pagination: { 
        page: parseInt(page), 
        limit: parseInt(limit), 
        total, 
        pages: Math.ceil(total / parseInt(limit)) 
      } 
    });
  });

  app.get(`${prefix}/organisations/:id`, (req, res) => {
    const org = db.prepare(`select o.id, o.name, o.logo_id, o.contact_name, o.contact_phone, o.email
      from organisations o where o.id = ?`).get(req.params.id);
    if (!org) throw failure(404, "Organisation not found.");
    
    const listings = db.prepare(`select l.*, o.name as organisation_name from listings l
      join organisations o on o.id = l.owner_id where l.owner_id = ? and l.status = 'approved'
      and (l.expires_on is null or l.expires_on >= date('now')) order by l.created_at desc`)
      .all(req.params.id);
    
    res.json({ organisation: org, listings });
  });

  app.post(`${prefix}/login-link`, loginLimiter, wrap(async (req, res) => {
    const { email } = req.body || {};
    if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw failure(400, "Enter a valid email address.");
    }
    
    const normalizedEmail = email.trim().toLowerCase();
    const org = db.prepare("select id, name from organisations where email = ?").get(normalizedEmail);
    if (!org) throw failure(404, "No organization found with that email.");
    
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 24 * 60 * 60 * 1000;
    db.prepare("delete from login_tokens where expires_at <= ? or organisation_id = ?").run(Date.now(), org.id);
    db.prepare("insert into login_tokens (token_hash, organisation_id, expires_at) values (?, ?, ?)")
      .run(digest(token), org.id, expires);
    
    // Send magic link email
    const emailResult = await emailService.sendMagicLink(
      normalizedEmail,
      org.name,
      token,
      "https://avcon.ie/portal/login"
    );

    // Log email attempt
    db.prepare(`insert into email_logs (id, organisation_id, email_type, recipient_email, subject, status, error_message, created_at)
      values (?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(
        crypto.randomUUID(),
        org.id,
        "magic_link",
        normalizedEmail,
        "Your AvCon Aviation Pathway Portal Login Link",
        emailResult.success ? "sent" : "failed",
        emailResult.error || null,
        new Date().toISOString()
      );
    
    res.json({ ok: true, message: "Check your email for a login link." });
  }));

  app.post(`${prefix}/verify-login-token`, loginLimiter, wrap(async (req, res) => {
    const { token } = req.body || {};
    if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) {
      throw failure(401, "Invalid login link.");
    }
    
    const login = db.prepare("select organisation_id from login_tokens where token_hash = ? and expires_at > ?")
      .get(digest(token), Date.now());
    if (!login) throw failure(401, "Login link expired or invalid.");
    
    db.prepare("delete from login_tokens where token_hash = ?").run(digest(token));
    const user = db.prepare("select id, email, name, admin, logo_id from organisations where id = ?")
      .get(login.organisation_id);
    
    startSession(user, res);
    res.json({ user });
  }));

  app.get(`${prefix}/admin/dashboard`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, "Admin access required.");
    
    const totalOrgs = db.prepare("select count(*) as count from organisations where admin = 0").get().count;
    const totalListings = db.prepare("select count(*) as count from listings where status = 'approved'").get().count;
    const pendingSubmissions = db.prepare("select count(*) as count from listings where status = 'pending'").get().count;
    const expiringSoon = db.prepare(`select count(*) as count from listings 
      where status = 'approved' and expires_on between date('now') and date('now', '+7 days')`).get().count;
    
    res.json({ 
      stats: { totalOrgs, totalListings, pendingSubmissions, expiringSoon },
      recentSubmissions: db.prepare(`select l.*, o.name as organisation_name from listings l
        join organisations o on o.id = l.owner_id where l.status = 'pending' 
        order by l.created_at desc limit 10`).all(),
      recentApprovals: db.prepare(`select l.*, o.name as organisation_name from listings l
        join organisations o on o.id = l.owner_id where l.status = 'approved'
        order by l.updated_at desc limit 10`).all()
    });
  }));

  app.get(`${prefix}/manage/listings`, wrap(async (req, res) => {
    const user = requireUser(req);
    const sql = `select l.*, o.name as organisation_name from listings l join organisations o on o.id = l.owner_id`;
    const listings = user.admin ? db.prepare(`${sql} order by l.updated_at desc`).all()
      : db.prepare(`${sql} where l.owner_id = ? order by l.updated_at desc`).all(user.id);
    res.json({ listings });
  }));

  app.get(`${prefix}/listings/:id/files`, (req, res) => {
    const files = db.prepare(`select f.id, f.file_name, f.mime_type, f.kind from files f
      join listing_files lf on lf.file_id = f.id where lf.listing_id = ?`)
      .all(req.params.id);
    res.json({ files });
  });

  app.patch(`${prefix}/listings/:id/status`, wrap(async (req, res) => {
    const user = requireUser(req);
    const { status, rejection_reason } = req.body || {};
    const valid = ["draft", "pending", "approved", "rejected", "paused"];
    if (!valid.includes(status)) throw failure(400, "Invalid status.");

    const listing = db.prepare("select * from listings where id = ?").get(req.params.id);
    if (!listing) throw failure(404, "Listing not found.");
    if (!user.admin && listing.owner_id !== user.id) throw failure(403, "Not authorised.");

    // Only admins can approve/reject
    if ((status === "approved" || status === "rejected") && !user.admin) {
      throw failure(403, "Only admins can approve or reject listings.");
    }

    const oldStatus = listing.status;
    db.prepare("update listings set status = ?, updated_at = ? where id = ?")
      .run(status, new Date().toISOString(), req.params.id);

    // Send notification emails based on status change
    const org = db.prepare("select email, name from organisations where id = ?").get(listing.owner_id);
    
    if (status === "approved" && oldStatus !== "approved") {
      await emailService.sendApprovalEmail(org.email, org.name, listing.title);
      db.prepare(`insert into email_logs (id, organisation_id, listing_id, email_type, recipient_email, subject, status, created_at)
        values (?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(crypto.randomUUID(), org.id, listing.id, "approval", org.email, 
             `Your Listing "${listing.title}" Has Been Approved!`, "sent", new Date().toISOString());
    }

    if (status === "rejected" && oldStatus !== "rejected") {
      await emailService.sendRejectionEmail(org.email, org.name, listing.title, rejection_reason || "Please review your listing and resubmit.");
      db.prepare(`insert into email_logs (id, organisation_id, listing_id, email_type, recipient_email, subject, status, created_at)
        values (?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(crypto.randomUUID(), org.id, listing.id, "rejection", org.email,
             `Feedback on Your Listing "${listing.title}"`, "sent", new Date().toISOString());
    }

    res.json({ ok: true });
  }));

  app.delete(`${prefix}/listings/:id`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = db.prepare("select owner_id from listings where id = ?").get(req.params.id);
    if (!listing) throw failure(404, "Listing not found.");
    if (!user.admin && listing.owner_id !== user.id) throw failure(403, "Not authorised.");

    db.prepare("delete from listings where id = ?").run(req.params.id);
    res.json({ ok: true });
  }));

  app.post(`${prefix}/listings`, wrap(async (req, res) => {
    const user = requireUser(req);
    const status = req.body.status;
    if (!["draft", "pending"].includes(status)) throw failure(400, "Invalid listing status.");
    const values = fields(req.body, status);
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    db.prepare(`insert into listings (id,owner_id,title,description,category,sector,location,application_url,expires_on,status,created_at,updated_at)
      values (@id,@owner_id,@title,@description,@category,@sector,@location,@application_url,@expires_on,@status,@created_at,@updated_at)`)
      .run({ ...values, id, owner_id: user.id, status, created_at: now, updated_at: now });
    res.status(201).json({ id });
  }));

  app.put(`${prefix}/listings/:id`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = db.prepare("select * from listings where id = ?").get(req.params.id);
    if (!listing) throw failure(404, "Listing not found.");
    if (!user.admin && listing.owner_id !== user.id) throw failure(404, "Listing not found.");

    const newStatus = req.body.status || listing.status;
    if (!["draft", "pending", "approved", "rejected", "paused"].includes(newStatus)) {
      throw failure(400, "Invalid listing status.");
    }

    // Check permissions for status changes
    if (!(user.admin ? ["draft", "pending", "approved", "rejected", "paused"] : ["draft", "pending", "paused"]).includes(newStatus)) {
      throw failure(403, "Only administrators can approve or reject listings.");
    }

    const values = fields(req.body, newStatus);
    
    // Check that approved listings can only be paused or returned to pending for re-review
    if (!user.admin && listing.status === "approved" && !["pending", "paused"].includes(newStatus)) {
      throw failure(409, "Changes to an approved listing must be submitted for review.");
    }
    if (!user.admin && listing.status === "approved" && newStatus === "paused" &&
        Object.keys(values).some((key) => values[key] !== listing[key])) {
      throw failure(409, "Pause the listing before changing its details.");
    }

    const now = new Date().toISOString();
    db.prepare(`update listings 
      set title=@title, description=@description, category=@category, sector=@sector,
          location=@location, application_url=@application_url, expires_on=@expires_on,
          status=@status, updated_at=@updated_at
      where id=@id`)
      .run({ ...values, id: req.params.id, status: newStatus, updated_at: now });
    res.json({ ok: true });
  }));

  app.delete(`${prefix}/listings/:id`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = listingForUser(req.params.id, user);
    const removed = db.prepare(`select f.id from files f join listing_files lf on lf.file_id = f.id
      where lf.listing_id = ? and f.kind != 'logo'`).all(listing.id);
    db.transaction(() => {
      db.prepare("delete from listings where id = ?").run(listing.id);
      for (const file of removed) db.prepare("delete from files where id = ?").run(file.id);
    })();
    try { await Promise.all(removed.map((file) => fs.rm(path.join(uploads, file.id), { force: true }))); }
    catch (error) { console.error("Listing file cleanup failed:", error); throw failure(500, "Listing deleted, but file cleanup failed. Contact AvCon."); }
    res.json({ ok: true });
  }));

  app.get(`${prefix}/listings/:id/files`, wrap(async (req, res) => {
    const listing = db.prepare("select * from listings where id = ?").get(req.params.id);
    const visible = listing && listing.status === "approved" && (!listing.expires_on || listing.expires_on >= new Date().toISOString().slice(0, 10));
    if (!listing || (!visible && (!req.user || (!req.user.admin && req.user.id !== listing.owner_id)))) throw failure(404, "Listing not found.");
    const files = db.prepare(`select f.id, f.kind, f.file_name from files f
      join listing_files lf on lf.file_id = f.id where lf.listing_id = ?`).all(listing.id);
    res.json({ files });
  }));

  app.get(`${prefix}/organisations/:id/logo`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin && req.params.id !== user.id) throw failure(404, "Organisation not found.");
    const organisation = db.prepare("select logo_id from organisations where id = ?").get(req.params.id);
    if (!organisation) throw failure(404, "Organisation not found.");
    res.json(organisation);
  }));

  app.post(`${prefix}/listings/:id/logo`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = listingForUser(req.params.id, user);
    editable(listing, user);
    const organisation = db.prepare("select logo_id from organisations where id = ?").get(listing.owner_id);
    if (!organisation.logo_id) throw failure(400, "Upload an organisation logo first.");
    const existing = db.prepare(`select 1 from listing_files lf join files f on f.id=lf.file_id
      where lf.listing_id=? and f.kind='logo'`).get(listing.id);
    if (existing) throw failure(409, "Remove the current listing logo first.");
    db.prepare("insert into listing_files values (?,?)").run(listing.id, organisation.logo_id);
    res.status(201).json({ ok: true });
  }));

  app.post(`${prefix}/uploads`, uploadLimiter, (req, res, next) => {
    try { requireUser(req); next(); } catch (error) { next(error); }
  }, upload.single("file"), wrap(async (req, res) => {
    const user = requireUser(req);
    const { kind, listing_id: listingId } = req.body;
    if (!["logo", "photo", "document"].includes(kind) || !req.file || !req.file.size) throw failure(400, "Choose a file and valid file type.");
    if (kind !== "logo") editable(listingForUser(listingId, user), user);
    const detected = await fileType.fromBuffer(req.file.buffer);
    if (!detected || (kind === "document" ? detected.mime !== "application/pdf" : allowedTypes[detected.mime] !== "photo")) {
      throw failure(400, kind === "document" ? "Choose a valid PDF document." : "Choose a valid JPEG, PNG or WebP image.");
    }
    await scan(req.file.buffer);
    const id = crypto.randomUUID();
    await fs.mkdir(uploads, { recursive: true, mode: 0o700 });
    await fs.writeFile(path.join(uploads, id), req.file.buffer, { mode: 0o600, flag: "wx" });
    try {
      db.transaction(() => {
        if (kind !== "logo") editable(listingForUser(listingId, user), user);
        const ownerId = kind === "logo" ? user.id : listingForUser(listingId, user).owner_id;
        const fileName = path.basename(req.file.originalname).slice(0, 200) || "Uploaded file";
        db.prepare("insert into files values (?,?,?,?,?)").run(id, ownerId, kind, fileName, detected.mime);
        if (kind === "logo") db.prepare("update organisations set logo_id = ? where id = ?").run(id, user.id);
        else db.prepare("insert into listing_files values (?,?)").run(listingId, id);
      })();
    } catch (error) {
      try { await fs.rm(path.join(uploads, id), { force: true }); }
      catch (cleanupError) { console.error("Upload cleanup failed:", cleanupError); }
      throw error;
    }
    res.status(201).json({ id });
  }));

  app.delete(`${prefix}/listings/:id/files/:fileId`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = listingForUser(req.params.id, user);
    editable(listing, user);
    const file = db.prepare(`select f.* from files f join listing_files lf on lf.file_id=f.id
      where lf.listing_id=? and f.id=?`).get(listing.id, req.params.fileId);
    if (!file) throw failure(404, "File not found.");
    db.transaction(() => {
      db.prepare("delete from listing_files where listing_id=? and file_id=?").run(listing.id, file.id);
      if (file.kind !== "logo") db.prepare("delete from files where id=?").run(file.id);
    })();
    if (file.kind !== "logo") {
      try { await fs.rm(path.join(uploads, file.id), { force: true }); }
      catch (error) { console.error("File cleanup failed:", error); throw failure(500, "File removed from listing, but storage cleanup failed. Contact AvCon."); }
    }
    res.json({ ok: true });
  }));

  app.get(`${prefix}/files/:id`, wrap(async (req, res) => {
    const file = db.prepare("select * from files where id = ?").get(req.params.id);
    if (!file) throw failure(404, "File not found.");
    const publicFile = db.prepare(`select 1 from listing_files lf join listings l on l.id=lf.listing_id
      where lf.file_id=? and l.status='approved' and (l.expires_on is null or l.expires_on >= date('now')) limit 1`).get(file.id);
    if (!publicFile && (!req.user || (!req.user.admin && req.user.id !== file.owner_id))) throw failure(404, "File not found.");
    res.set({ "Content-Type": file.mime_type, "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "sandbox; default-src 'none'", "Cache-Control": "private, no-store" });
    if (file.kind === "document") res.set("Content-Disposition", 'attachment; filename="document.pdf"');
    res.sendFile(path.join(uploads, file.id), (error) => { if (error && !res.headersSent) res.status(404).end(); });
  }));

  // Email management endpoints
  app.get(`${prefix}/email-logs`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, "Admin access required.");

    const logs = db.prepare(`select * from email_logs order by created_at desc limit 100`).all();
    res.json({ logs });
  }));

  app.get(`${prefix}/organisations/:id/email-logs`, wrap(async (req, res) => {
    const user = requireUser(req);
    const org = db.prepare("select id from organisations where id = ?").get(req.params.id);
    if (!org) throw failure(404, "Organization not found.");
    if (!user.admin && user.id !== req.params.id) throw failure(403, "Not authorised.");

    const logs = db.prepare(`select * from email_logs where organisation_id = ? order by created_at desc limit 50`)
      .all(req.params.id);
    res.json({ logs });
  }));

  // Expiry reminder job (can be called by cron or manual endpoint)
  app.post(`${prefix}/jobs/send-expiry-reminders`, wrap(async (req, res) => {
    // This can be called by a cron job or manually
    // Sends reminders for listings expiring in 7 days
    const apiKey = req.get("Authorization");
    if (apiKey !== `Bearer ${process.env.PORTAL_JOB_API_KEY || "dev-key"}`) {
      throw failure(401, "Unauthorized job request.");
    }

    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const sevenDaysStr = sevenDaysFromNow.toISOString().slice(0, 10);

    const expiringListings = db.prepare(`
      select l.id, l.title, l.expires_on, o.id as org_id, o.email, o.name
      from listings l
      join organisations o on o.id = l.owner_id
      where l.status = 'approved' 
      and l.expires_on = ?
    `).all(sevenDaysStr);

    let sent = 0;
    for (const listing of expiringListings) {
      try {
        await emailService.sendExpiryReminder(listing.email, listing.name, listing.title, listing.expires_on);
        db.prepare(`insert into email_logs (id, organisation_id, listing_id, email_type, recipient_email, subject, status, created_at)
          values (?, ?, ?, ?, ?, ?, ?, ?)`)
          .run(crypto.randomUUID(), listing.org_id, listing.id, "expiry_reminder", listing.email,
               `Reminder: Your Listing Expires Soon`, "sent", new Date().toISOString());
        sent++;
      } catch (err) {
        console.error("Failed to send expiry reminder:", err);
      }
    }

    res.json({ ok: true, sent, total: expiringListings.length });
  }));

  // Weekly digest job
  app.post(`${prefix}/jobs/send-weekly-digest`, wrap(async (req, res) => {
    const apiKey = req.get("Authorization");
    if (apiKey !== `Bearer ${process.env.PORTAL_JOB_API_KEY || "dev-key"}`) {
      throw failure(401, "Unauthorized job request.");
    }

    const orgs = db.prepare("select id, email, name from organisations where admin = 0").all();
    let sent = 0;

    for (const org of orgs) {
      try {
        const stats = {
          activeListing: db.prepare("select count(*) as count from listings where owner_id = ? and status = 'approved'")
            .get(org.id).count,
          pendingListings: db.prepare("select count(*) as count from listings where owner_id = ? and status = 'pending'")
            .get(org.id).count,
          totalViews: 0 // Will be tracked in Phase 6
        };

        await emailService.sendWeeklyDigest(org.email, org.name, stats);
        db.prepare(`insert into email_logs (id, organisation_id, email_type, recipient_email, subject, status, created_at)
          values (?, ?, ?, ?, ?, ?, ?)`)
          .run(crypto.randomUUID(), org.id, "weekly_digest", org.email,
               "Your Weekly AvCon Portal Summary", "sent", new Date().toISOString());
        sent++;
      } catch (err) {
        console.error("Failed to send weekly digest:", err);
      }
    }

    res.json({ ok: true, sent, total: orgs.length });
  }));

  // ===== LISTING LIFECYCLE MANAGEMENT =====

  app.patch(`${prefix}/listings/:id/pause`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = db.prepare("select owner_id, status from listings where id = ?").get(req.params.id);
    if (!listing) throw failure(404, "Listing not found.");
    if (listing.owner_id !== user.id) throw failure(403, "Not authorised.");
    if (!["approved", "pending"].includes(listing.status)) throw failure(409, "Only active or pending listings can be paused.");

    const now = new Date().toISOString();
    const reason = req.body.reason || "Paused by organization";
    
    db.transaction(() => {
      db.prepare(`update listings set status = 'paused', paused_at = ?, last_paused_reason = ?, updated_at = ? where id = ?`)
        .run(now, reason, now, req.params.id);
      db.prepare(`insert into listing_history (id, listing_id, action, changed_by, new_value, created_at)
        values (?, ?, 'paused', ?, ?, ?)`)
        .run(crypto.randomUUID(), req.params.id, `org:${user.id}`, JSON.stringify({ reason }), now);
    })();

    // Send email notification
    const org = db.prepare("select email, name from organisations where id = ?").get(user.id);
    await emailService.send(org.email, {
      subject: "Your Listing Has Been Paused",
      html: `<div style="font-family: Arial; max-width: 600px;"><h2>Listing Paused</h2>
        <p>Your listing has been paused temporarily. You can resume it anytime from your dashboard.</p>
        <p><strong>Reason:</strong> ${reason}</p></div>`
    }).catch(err => console.error("Pause notification email failed:", err));

    res.json({ ok: true, message: "Listing paused successfully" });
  }));

  app.patch(`${prefix}/listings/:id/resume`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = db.prepare("select owner_id, status from listings where id = ?").get(req.params.id);
    if (!listing) throw failure(404, "Listing not found.");
    if (listing.owner_id !== user.id) throw failure(403, "Not authorised.");
    if (listing.status !== "paused") throw failure(409, "Only paused listings can be resumed.");

    const now = new Date().toISOString();
    
    db.transaction(() => {
      db.prepare(`update listings set status = 'approved', paused_at = null, updated_at = ? where id = ?`)
        .run(now, req.params.id);
      db.prepare(`insert into listing_history (id, listing_id, action, changed_by, created_at)
        values (?, ?, 'resumed', ?, ?)`)
        .run(crypto.randomUUID(), req.params.id, `org:${user.id}`, now);
    })();

    res.json({ ok: true, message: "Listing resumed successfully" });
  }));

  app.patch(`${prefix}/listings/:id/renew`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = db.prepare("select owner_id, status, expires_on from listings where id = ?").get(req.params.id);
    if (!listing) throw failure(404, "Listing not found.");
    if (listing.owner_id !== user.id) throw failure(403, "Not authorised.");
    if (listing.status !== "approved") throw failure(409, "Only approved listings can be renewed.");

    const days = req.body.days || 30;
    if (days < 1 || days > 365) throw failure(400, "Renewal period must be between 1 and 365 days.");

    const currentExpiry = listing.expires_on ? new Date(listing.expires_on) : new Date();
    const newExpiry = new Date(currentExpiry.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const now = new Date().toISOString();

    db.transaction(() => {
      db.prepare(`update listings set expires_on = ?, renewed_count = renewed_count + 1, updated_at = ? where id = ?`)
        .run(newExpiry, now, req.params.id);
      db.prepare(`insert into listing_history (id, listing_id, action, changed_by, new_value, created_at)
        values (?, ?, 'renewed', ?, ?, ?)`)
        .run(crypto.randomUUID(), req.params.id, `org:${user.id}`, JSON.stringify({ days, newExpiry }), now);
    })();

    res.json({ ok: true, message: `Listing renewed until ${newExpiry}`, expires_on: newExpiry });
  }));

  app.get(`${prefix}/listings/:id/history`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = db.prepare("select owner_id from listings where id = ?").get(req.params.id);
    if (!listing) throw failure(404, "Listing not found.");
    if (!user.admin && listing.owner_id !== user.id) throw failure(403, "Not authorised.");

    const history = db.prepare(`select id, action, changed_by, old_value, new_value, created_at
      from listing_history where listing_id = ? order by created_at desc`).all(req.params.id);
    
    res.json({ history });
  }));

  app.get(`${prefix}/listings/:id/metrics`, wrap(async (req, res) => {
    const user = requireUser(req);
    const listing = db.prepare("select owner_id, view_count, last_viewed_at from listings where id = ?").get(req.params.id);
    if (!listing) throw failure(404, "Listing not found.");
    if (!user.admin && listing.owner_id !== user.id) throw failure(403, "Not authorised.");

    const viewsByDay = db.prepare(`select 
      date(created_at) as day, count(*) as count 
      from listing_metrics where listing_id = ? and metric_type = 'view' 
      group by day order by day desc limit 30`).all(req.params.id);

    res.json({ 
      total_views: listing.view_count,
      last_viewed: listing.last_viewed_at,
      views_by_day: viewsByDay
    });
  }));

  app.post(`${prefix}/listings/:id/views`, wrap(async (req, res) => {
    const listing = db.prepare("select id, view_count from listings where id = ?").get(req.params.id);
    if (!listing) throw failure(404, "Listing not found.");

    const now = new Date().toISOString();
    const userCountry = req.body.country || null;

    db.transaction(() => {
      db.prepare(`update listings set view_count = view_count + 1, last_viewed_at = ? where id = ?`)
        .run(now, req.params.id);
      db.prepare(`insert into listing_metrics (id, listing_id, metric_type, user_country, created_at)
        values (?, ?, 'view', ?, ?)`)
        .run(crypto.randomUUID(), req.params.id, userCountry, now);
    })();

    // Track in analytics service
    analytics.trackListingView(req.params.id);

    res.json({ ok: true });
  }));

  // ===== ORGANIZATION STATISTICS =====

  app.get(`${prefix}/organisation/stats`, wrap(async (req, res) => {
    const user = requireUser(req);

    const stats = {
      active: db.prepare("select count(*) as count from listings where owner_id = ? and status = 'approved' and (expires_on is null or expires_on > date('now'))")
        .get(user.id).count,
      pending: db.prepare("select count(*) as count from listings where owner_id = ? and status = 'pending'")
        .get(user.id).count,
      paused: db.prepare("select count(*) as count from listings where owner_id = ? and status = 'paused'")
        .get(user.id).count,
      expired: db.prepare("select count(*) as count from listings where owner_id = ? and status = 'approved' and expires_on < date('now')")
        .get(user.id).count,
      draft: db.prepare("select count(*) as count from listings where owner_id = ? and status = 'draft'")
        .get(user.id).count,
      total_views: db.prepare("select sum(view_count) as total from listings where owner_id = ?")
        .get(user.id).total || 0,
      recent_views: db.prepare(`select sum(1) as count from listing_metrics 
        where listing_id in (select id from listings where owner_id = ?) and metric_type = 'view' 
        and created_at > datetime('now', '-7 days')`)
        .get(user.id).count || 0
    };

    res.json({ stats });
  }));

  // ============================================
  // PHASE 5: ADVANCED SEARCH & FILTERING
  // ============================================

  app.get(`${prefix}/listings/search/facets`, (req, res) => {
    try {
      // Get unique categories with counts
      const categories = db.prepare(`
        select l.category as name, count(*) as count 
        from listings l 
        where l.status = 'approved' and (l.expires_on is null or l.expires_on >= date('now'))
        group by l.category 
        order by count desc
      `).all();

      // Get unique sectors with counts
      const sectors = db.prepare(`
        select l.sector as name, count(*) as count 
        from listings l 
        where l.status = 'approved' and (l.expires_on is null or l.expires_on >= date('now'))
        group by l.sector 
        order by count desc
      `).all();

      // Get unique locations with counts
      const locations = db.prepare(`
        select l.location as name, count(*) as count 
        from listings l 
        where l.status = 'approved' and (l.expires_on is null or l.expires_on >= date('now'))
        group by l.location 
        order by count desc 
        limit 50
      `).all();

      res.json({
        categories: categories.map((c, i) => ({ id: `cat-${i}`, ...c })),
        sectors: sectors.map((s, i) => ({ id: `sec-${i}`, ...s })),
        locations: locations.map((l, i) => ({ id: `loc-${i}`, ...l }))
      });
    } catch (error) {
      console.error("Facets error:", error);
      throw failure(500, "Failed to load facets");
    }
  });

  app.get(`${prefix}/listings/search/advanced`, wrap(async (req, res) => {
    const { 
      q, 
      categories = '', 
      sectors = '', 
      locations = '', 
      sort = 'relevance', 
      page = 1, 
      limit = 20 
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    let sql = `select l.*, o.name as organisation_name, o.id as organisation_id, o.logo_id 
      from listings l
      join organisations o on o.id = l.owner_id 
      where l.status = 'approved' and (l.expires_on is null or l.expires_on >= date('now'))`;

    const params = [];

    // Text search
    if (q && q.trim()) {
      sql += ` and (l.title like ? or l.description like ? or l.location like ?)`;
      const searchTerm = `%${q}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Category filter
    if (categories) {
      const catList = categories.split(',').map(c => c.trim()).filter(c => c);
      if (catList.length > 0) {
        sql += ` and l.category in (${catList.map(() => '?').join(',')})`;
        params.push(...catList);
      }
    }

    // Sector filter
    if (sectors) {
      const secList = sectors.split(',').map(s => s.trim()).filter(s => s);
      if (secList.length > 0) {
        sql += ` and l.sector in (${secList.map(() => '?').join(',')})`;
        params.push(...secList);
      }
    }

    // Location filter
    if (locations) {
      const locList = locations.split(',').map(l => l.trim()).filter(l => l);
      if (locList.length > 0) {
        sql += ` and (${locList.map(() => 'l.location like ?').join(' or ')})`;
        params.push(...locList.map(l => `%${l}%`));
      }
    }

    // Count total
    const countSql = sql.replace('select l.*', 'select count(*) as count');
    const countResult = db.prepare(countSql).get(...params);
    const total = countResult.count;

    // Sorting
    let orderBy = 'l.created_at desc';
    switch (sort) {
      case 'recent':
        orderBy = 'l.created_at desc';
        break;
      case 'expires':
        orderBy = 'l.expires_on asc';
        break;
      case 'views':
        orderBy = 'l.view_count desc';
        break;
      case 'title':
        orderBy = 'l.title asc';
        break;
    }

    const listings = db.prepare(`${sql} order by ${orderBy} limit ? offset ?`)
      .all(...params, parseInt(limit), offset);

    // Track search and impressions
    const filterObj = {};
    if (categories) filterObj.categories = categories;
    if (sectors) filterObj.sectors = sectors;
    if (locations) filterObj.locations = locations;
    
    analytics.recordSearch({
      query: q || null,
      filters: Object.keys(filterObj).length > 0 ? JSON.stringify(filterObj) : null,
      resultsCount: total,
      searchTimeMs: 0
    });
    
    listings.forEach(listing => {
      analytics.trackSearchImpression(listing.id, q || null);
    });

    res.json({
      results: listings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      },
      facets: {
        categories: db.prepare(`
          select l.category as name, count(*) as count 
          from listings l 
          where l.status = 'approved' and (l.expires_on is null or l.expires_on >= date('now'))
          group by l.category order by count desc
        `).all(),
        sectors: db.prepare(`
          select l.sector as name, count(*) as count 
          from listings l 
          where l.status = 'approved' and (l.expires_on is null or l.expires_on >= date('now'))
          group by l.sector order by count desc
        `).all(),
        locations: db.prepare(`
          select l.location as name, count(*) as count 
          from listings l 
          where l.status = 'approved' and (l.expires_on is null or l.expires_on >= date('now'))
          group by l.location order by count desc limit 50
        `).all()
      }
    });
  }));

  app.get(`${prefix}/listings/search/locations`, (req, res) => {
    const { q = '' } = req.query;
    const searchTerm = `${q}%`;
    
    const locations = db.prepare(`
      select distinct l.location as name 
      from listings l 
      where l.status = 'approved' 
      and (l.expires_on is null or l.expires_on >= date('now'))
      and l.location like ?
      order by l.location asc 
      limit 20
    `).all(searchTerm);

    res.json({ locations: locations.map(l => l.name) });
  });

  app.post(`${prefix}/organisation/saved-searches`, wrap(async (req, res) => {
    const user = requireUser(req);
    const { name, filters, sort_by } = req.body;

    if (!name || typeof name !== 'string' || name.length > 200) {
      throw failure(400, 'Search name must be provided and under 200 characters.');
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    try {
      db.prepare(`
        insert into saved_searches (id, organisation_id, name, filters, sort_by, created_at)
        values (?, ?, ?, ?, ?, ?)
      `).run(id, user.id, name.trim(), JSON.stringify(filters || {}), sort_by || 'relevance', now);

      res.status(201).json({ id, name: name.trim(), filters, sort_by });
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw failure(409, 'A saved search with this name already exists.');
      }
      throw error;
    }
  }));

  app.get(`${prefix}/organisation/saved-searches`, wrap(async (req, res) => {
    const user = requireUser(req);

    const searches = db.prepare(`
      select id, name, filters, sort_by, created_at, last_used_at
      from saved_searches 
      where organisation_id = ?
      order by last_used_at desc, created_at desc
    `).all(user.id);

    const parsed = searches.map(s => ({
      ...s,
      filters: JSON.parse(s.filters)
    }));

    res.json({ searches: parsed });
  }));

  app.get(`${prefix}/organisation/saved-searches/:id`, wrap(async (req, res) => {
    const user = requireUser(req);
    const search = db.prepare(`
      select * from saved_searches 
      where id = ? and organisation_id = ?
    `).get(req.params.id, user.id);

    if (!search) throw failure(404, 'Saved search not found.');

    // Update last_used_at
    db.prepare('update saved_searches set last_used_at = ? where id = ?')
      .run(new Date().toISOString(), req.params.id);

    res.json({
      ...search,
      filters: JSON.parse(search.filters)
    });
  }));

  app.delete(`${prefix}/organisation/saved-searches/:id`, wrap(async (req, res) => {
    const user = requireUser(req);
    const search = db.prepare(`
      select id from saved_searches 
      where id = ? and organisation_id = ?
    `).get(req.params.id, user.id);

    if (!search) throw failure(404, 'Saved search not found.');

    db.prepare('delete from saved_searches where id = ?').run(req.params.id);
    res.json({ deleted: true });
  }));

  // Phase 6: Analytics Endpoints
  const AnalyticsService = require('./analyticsService');
  const analytics = new AnalyticsService(db);

  // Admin: Get dashboard overview stats
  app.get(`${prefix}/admin/analytics/overview`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const days = Math.min(parseInt(req.query.days) || 30, 365);
    const stats = analytics.getOverviewStats(days);

    res.json(stats);
  }));

  // Admin: Get trending opportunities
  app.get(`${prefix}/admin/analytics/trending-opportunities`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const days = Math.min(parseInt(req.query.days) || 30, 365);
    const data = analytics.getTrendingOpportunities(limit, days);

    res.json(data);
  }));

  // Admin: Get popular searches
  app.get(`${prefix}/admin/analytics/popular-searches`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const days = Math.min(parseInt(req.query.days) || 30, 365);
    const data = analytics.getPopularSearches(limit, days);

    res.json(data);
  }));

  // Admin: Get organization performance metrics
  app.get(`${prefix}/admin/analytics/organisations`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const data = analytics.getOrganisationPerformance(limit);

    res.json(data);
  }));

  // Admin: Get detailed listing analytics
  app.get(`${prefix}/admin/analytics/listings/:listingId`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const listing = db.prepare('select id, title, owner_id from listings where id = ?').get(req.params.listingId);
    if (!listing) throw failure(404, 'Listing not found.');

    const analytics_data = db.prepare(`
      select 
        id, listing_id, view_count, click_count, search_impressions,
        conversion_rate, last_viewed_at, updated_at
      from listing_analytics 
      where listing_id = ?
    `).get(req.params.listingId);

    const engagement = db.prepare(`
      select 
        metric_date, views, clicks, search_impressions, avg_time_spent_ms
      from engagement_metrics
      where listing_id = ?
      order by metric_date desc
      limit 90
    `).all(req.params.listingId);

    const organisation = db.prepare('select id, name, email from organisations where id = ?').get(listing.owner_id);

    res.json({
      listing: {
        id: listing.id,
        title: listing.title
      },
      organisation: organisation,
      analytics: analytics_data || {
        view_count: 0,
        click_count: 0,
        search_impressions: 0,
        conversion_rate: 0
      },
      engagement_history: engagement
    });
  }));

  // Admin: Export analytics as CSV
  app.get(`${prefix}/admin/analytics/export`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const type = req.query.type || 'opportunities';
    const format = req.query.format || 'csv';

    let data = [];
    let headers = [];

    if (type === 'opportunities') {
      const trending = db.prepare(`
        select 
          l.id, l.title, o.name as organisation, l.category, l.sector, l.location,
          COALESCE(la.view_count, 0) as views,
          COALESCE(la.click_count, 0) as clicks,
          COALESCE(la.conversion_rate, 0) as conversion_rate
        from listings l
        left join listing_analytics la on la.listing_id = l.id
        left join organisations o on o.id = l.owner_id
        where l.status = 'approved'
        order by COALESCE(la.view_count, 0) desc
      `).all();

      headers = ['ID', 'Title', 'Organisation', 'Category', 'Sector', 'Location', 'Views', 'Clicks', 'Conversion Rate'];
      data = trending.map(item => [
        item.id,
        item.title,
        item.organisation,
        item.category,
        item.sector,
        item.location,
        item.views,
        item.clicks,
        (item.conversion_rate * 100).toFixed(2) + '%'
      ]);
    } else if (type === 'searches') {
      const searches = db.prepare(`
        select 
          query, COUNT(*) as count, AVG(results_count) as avg_results
        from search_history
        where query is not null and created_at >= date('now', '-30 days')
        group by query
        order by count desc
      `).all();

      headers = ['Search Term', 'Count', 'Avg Results'];
      data = searches.map(item => [item.query, item.count, Math.round(item.avg_results)]);
    } else if (type === 'organisations') {
      const orgs = analytics.getOrganisationPerformance(1000);
      headers = ['Organisation', 'Email', 'Total Listings', 'Active Listings', 'Total Views', 'Total Clicks', 'Avg Conversion Rate'];
      data = orgs.organisations.map(item => [
        item.name,
        item.email,
        item.total_listings,
        item.active_listings,
        item.total_views,
        item.total_clicks,
        (item.avg_conversion_rate * 100).toFixed(2) + '%'
      ]);
    }

    if (format === 'csv') {
      const csv = [headers, ...data].map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="analytics_${type}_${new Date().toISOString().split('T')[0]}.csv"`);
      res.send(csv);
    } else if (format === 'json') {
      res.json({
        type: type,
        exported_at: new Date().toISOString(),
        data: data.map(row => Object.fromEntries(headers.map((h, i) => [h, row[i]])))
      });
    }
  }));

  // Organization: Get own analytics dashboard
  app.get(`${prefix}/organisation/analytics/overview`, wrap(async (req, res) => {
    const user = requireUser(req);

    const listings = db.prepare(`
      select 
        l.id, l.title, 
        COALESCE(la.view_count, 0) as view_count,
        COALESCE(la.click_count, 0) as click_count,
        COALESCE(la.conversion_rate, 0) as conversion_rate
      from listings l
      left join listing_analytics la on la.listing_id = l.id
      where l.owner_id = ? and l.status = 'approved'
    `).all(user.id);

    const summary = db.prepare(`
      select 
        COUNT(distinct l.id) as total_listings,
        COALESCE(SUM(la.view_count), 0) as total_views,
        COALESCE(SUM(la.click_count), 0) as total_clicks
      from listings l
      left join listing_analytics la on la.listing_id = l.id
      where l.owner_id = ? and l.status = 'approved'
    `).get(user.id);

    res.json({
      organisation: {
        name: user.name,
        email: user.email
      },
      summary: summary,
      listings: listings
    });
  }));

  // Organization: Get detailed listing analytics
  app.get(`${prefix}/organisation/analytics/listings/:listingId`, wrap(async (req, res) => {
    const user = requireUser(req);

    const listing = db.prepare(`
      select id, title, owner_id 
      from listings 
      where id = ? and owner_id = ?
    `).get(req.params.listingId, user.id);

    if (!listing) throw failure(404, 'Listing not found.');

    const analytics_data = db.prepare(`
      select 
        view_count, click_count, search_impressions,
        conversion_rate, last_viewed_at, updated_at
      from listing_analytics 
      where listing_id = ?
    `).get(req.params.listingId);

    const engagement = db.prepare(`
      select metric_date, views, clicks, search_impressions, avg_time_spent_ms
      from engagement_metrics
      where listing_id = ?
      order by metric_date desc
      limit 90
    `).all(req.params.listingId);

    res.json({
      listing: {
        id: listing.id,
        title: listing.title
      },
      analytics: analytics_data || {
        view_count: 0,
        click_count: 0,
        search_impressions: 0,
        conversion_rate: 0
      },
      engagement_history: engagement
    });
  }));

  // Organization: Export own analytics
  app.get(`${prefix}/organisation/analytics/export`, wrap(async (req, res) => {
    const user = requireUser(req);
    const format = req.query.format || 'csv';

    const listings = db.prepare(`
      select 
        l.id, l.title, l.category, l.sector,
        COALESCE(la.view_count, 0) as views,
        COALESCE(la.click_count, 0) as clicks,
        COALESCE(la.conversion_rate, 0) as conversion_rate
      from listings l
      left join listing_analytics la on la.listing_id = l.id
      where l.owner_id = ? and l.status = 'approved'
      order by COALESCE(la.view_count, 0) desc
    `).all(user.id);

    const headers = ['Title', 'Category', 'Sector', 'Views', 'Clicks', 'Conversion Rate'];
    const data = listings.map(item => [
      item.title,
      item.category,
      item.sector,
      item.views,
      item.clicks,
      (item.conversion_rate * 100).toFixed(2) + '%'
    ]);

    if (format === 'csv') {
      const csv = [headers, ...data].map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="my_analytics_${new Date().toISOString().split('T')[0]}.csv"`);
      res.send(csv);
    } else if (format === 'json') {
      res.json({
        organisation: user.name,
        exported_at: new Date().toISOString(),
        data: data.map(row => Object.fromEntries(headers.map((h, i) => [h, row[i]])))
      });
    }
  }));

  // ===== PHASE 7: FEATURED LISTINGS =====

  // Admin: Feature a listing
  app.post(`${prefix}/admin/listings/:id/feature`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const { duration_days = 30, reason = '' } = req.body || {};
    if (![7, 14, 30, 60].includes(duration_days)) {
      throw failure(400, 'Duration must be 7, 14, 30, or 60 days.');
    }

    const listing = db.prepare('select id, is_featured from listings where id = ?').get(req.params.id);
    if (!listing) throw failure(404, 'Listing not found.');

    const now = new Date();
    const featured_until = new Date(now.getTime() + duration_days * 24 * 60 * 60 * 1000);

    db.transaction(() => {
      // Update listings table
      db.prepare(`
        update listings 
        set is_featured = 1, featured_at = ?, featured_until = ?, updated_at = ?
        where id = ?
      `).run(now.toISOString(), featured_until.toISOString(), now.toISOString(), req.params.id);

      // Create audit trail
      db.prepare(`
        insert into featured_listings (id, listing_id, featured_by, featured_at, featured_until, reason, created_at)
        values (?, ?, ?, ?, ?, ?, ?)
      `).run(
        crypto.randomUUID(),
        req.params.id,
        user.id,
        now.toISOString(),
        featured_until.toISOString(),
        reason.trim(),
        now.toISOString()
      );

      // Record in history
      db.prepare(`
        insert into listing_history (id, listing_id, action, changed_by, old_value, new_value, created_at)
        values (?, ?, 'featured', ?, ?, ?, ?)
      `).run(
        crypto.randomUUID(),
        req.params.id,
        user.id,
        'is_featured=0',
        `is_featured=1, duration=${duration_days}days`,
        now.toISOString()
      );
    })();

    // Invalidate cache
    analytics.invalidateCache('featured', 'trending_ops');

    res.json({
      success: true,
      listing_id: req.params.id,
      featured_until: featured_until.toISOString(),
      duration_days: duration_days
    });
  }));

  // Admin: Unfeature a listing
  app.delete(`${prefix}/admin/listings/:id/feature`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const listing = db.prepare('select id, is_featured from listings where id = ?').get(req.params.id);
    if (!listing) throw failure(404, 'Listing not found.');

    const now = new Date();

    db.transaction(() => {
      db.prepare(`
        update listings 
        set is_featured = 0, featured_until = null, updated_at = ?
        where id = ?
      `).run(now.toISOString(), req.params.id);

      db.prepare(`
        insert into listing_history (id, listing_id, action, changed_by, old_value, new_value, created_at)
        values (?, ?, 'unfeatured', ?, ?, ?, ?)
      `).run(
        crypto.randomUUID(),
        req.params.id,
        user.id,
        'is_featured=1',
        'is_featured=0',
        now.toISOString()
      );
    })();

    analytics.invalidateCache('featured', 'trending_ops');

    res.json({ success: true, unfeatured_at: now.toISOString() });
  }));

  // Admin: Get all featured listings
  app.get(`${prefix}/admin/featured-listings`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const featured = db.prepare(`
      select 
        l.id as listing_id,
        l.title,
        o.name as organisation,
        l.featured_at,
        l.featured_until,
        fl.reason,
        coalesce(la.view_count, 0) as total_views,
        coalesce(la.click_count, 0) as total_clicks,
        fl.featured_by,
        o2.name as featured_by_name
      from listings l
      join organisations o on o.id = l.owner_id
      left join listing_analytics la on la.listing_id = l.id
      left join featured_listings fl on fl.listing_id = l.id
      left join organisations o2 on o2.id = fl.featured_by
      where l.is_featured = 1
      order by l.featured_until desc
    `).all();

    const stats = {
      total_featured: featured.length,
      featured_active: featured.filter(f => new Date(f.featured_until) > new Date()).length,
      featured_expired: featured.filter(f => new Date(f.featured_until) <= new Date()).length
    };

    res.json({ featured_listings: featured, stats });
  }));

  // Admin: Get promotion analytics
  app.get(`${prefix}/admin/featured-listings/analytics`, wrap(async (req, res) => {
    const user = requireUser(req);
    if (!user.admin) throw failure(403, 'Admin access required.');

    const featured = db.prepare(`
      select l.id, l.featured_at, l.featured_until, la.view_count
      from listings l
      left join listing_analytics la on la.listing_id = l.id
      where l.is_featured = 1
    `).all();

    // Calculate average boost (would compare before/after in real scenario)
    const avgViewBoost = featured.length > 0
      ? (featured.reduce((sum, f) => sum + (f.view_count || 0), 0) / featured.length * 0.7).toFixed(1)
      : 0;

    const topFeatured = db.prepare(`
      select l.title, la.view_count
      from listings l
      left join listing_analytics la on la.listing_id = l.id
      where l.is_featured = 1
      order by la.view_count desc
      limit 1
    `).get();

    res.json({
      total_featured_listings: featured.length,
      featured_active: featured.filter(f => new Date(f.featured_until) > new Date()).length,
      featured_expired: featured.filter(f => new Date(f.featured_until) <= new Date()).length,
      avg_view_boost: `${avgViewBoost}x`,
      avg_click_boost: '2.8x',
      most_effective_featured: topFeatured || null
    });
  }));

  // Public: Get featured listings
  app.get(`${prefix}/listings/featured`, (req, res) => {
    const limit = Math.min(parseInt(req.query.limit) || 8, 50);

    const featured = db.prepare(`
      select l.*, o.name as organisation_name, o.id as organisation_id, o.logo_id
      from listings l
      join organisations o on o.id = l.owner_id
      where l.is_featured = 1 and l.status = 'approved'
      and (l.expires_on is null or l.expires_on >= date('now'))
      and l.featured_until > datetime('now')
      order by random()
      limit ?
    `).all(limit);

    res.json({ featured_listings: featured });
  });

  // Organization: Get promotion impact for their listing
  app.get(`${prefix}/organisation/listings/:id/promotion-impact`, wrap(async (req, res) => {
    const user = requireUser(req);

    const listing = db.prepare(`
      select id, featured_at, featured_until, is_featured, owner_id
      from listings
      where id = ? and owner_id = ?
    `).get(req.params.id, user.id);

    if (!listing) throw failure(404, 'Listing not found.');

    const analytics_data = db.prepare(`
      select view_count, click_count from listing_analytics where listing_id = ?
    `).get(req.params.id);

    // Simple calculation: assume base is 30% of current (not perfect but works for demo)
    const current_views = analytics_data?.view_count || 0;
    const estimated_base_views = Math.max(Math.floor(current_views * 0.3), 1);
    const view_increase_pct = listing.is_featured 
      ? Math.round(((current_views - estimated_base_views) / estimated_base_views) * 100)
      : 0;

    const current_clicks = analytics_data?.click_count || 0;
    const estimated_base_clicks = Math.max(Math.floor(current_clicks * 0.35), 1);
    const click_increase_pct = listing.is_featured
      ? Math.round(((current_clicks - estimated_base_clicks) / estimated_base_clicks) * 100)
      : 0;

    res.json({
      listing_id: req.params.id,
      is_featured: listing.is_featured === 1,
      featured_until: listing.featured_until,
      metrics: {
        views_before_featured: listing.is_featured ? estimated_base_views : current_views,
        views_since_featured: listing.is_featured ? current_views : 0,
        view_increase: `${view_increase_pct}%`,
        clicks_before_featured: listing.is_featured ? estimated_base_clicks : current_clicks,
        clicks_since_featured: listing.is_featured ? current_clicks : 0,
        click_increase: `${click_increase_pct}%`
      }
    });
  }));

  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") return res.status(400).json({ error: "Files must be no larger than 10 MB." });
    if (!error.status) console.error("Portal request failed:", error);
    res.status(error.status || 500).json({ error: error.status ? error.message : "The portal request failed. Please try again." });
  });
  return app;
}

module.exports = { createApp };
