/** @jest-environment node */
const fs = require("fs");
const os = require("os");
const path = require("path");
const request = require("supertest");
const { openDatabase } = require("../../server/portal/db");
const { createApp } = require("../../server/portal/app");

const origin = "http://localhost:3000";
let directory;
let db;
let app;
let scanner;

beforeEach(() => {
  directory = fs.mkdtempSync(path.join(os.tmpdir(), "avcon-portal-test-"));
  db = openDatabase(directory);
  scanner = jest.fn().mockResolvedValue();
  app = createApp({ db, directory, siteOrigin: origin, scan: scanner });
});

afterEach(() => {
  db.close();
  fs.rmSync(directory, { recursive: true, force: true });
});

async function register(agent, email) {
  const response = await agent.post("/api/portal/register").set("Origin", origin)
    .send({ name: email, email, password: "example-password" }).expect(201);
  return response.body.user;
}

const details = {
  title: "Flight course", description: "Course details", category: "Education",
  sector: "Other", location: "Online", application_url: "https://example.com",
  expires_on: null, status: "draft",
};

test("enforces ownership, moderation and private file access throughout a listing lifecycle", async () => {
  const owner = request.agent(app);
  const other = request.agent(app);
  const admin = request.agent(app);
  await register(owner, "owner@example.test");
  await register(other, "other@example.test");
  const adminUser = await register(admin, "admin@example.test");
  db.prepare("update organisations set admin=1 where id=?").run(adminUser.id);

  const created = await owner.post("/api/portal/listings").set("Origin", origin).send(details).expect(201);
  const id = created.body.id;
  const uploaded = await owner.post("/api/portal/uploads").set("Origin", origin)
    .field("kind", "document").field("listing_id", id)
    .attach("file", Buffer.from("%PDF-1.7\nExample"), "guide.pdf").expect(201);
  const file = uploaded.body.id;
  expect(scanner).toHaveBeenCalledTimes(1);
  await other.get(`/api/portal/files/${file}`).expect(404);
  await request(app).get(`/api/portal/files/${file}`).expect(404);
  await other.put(`/api/portal/listings/${id}`).set("Origin", origin).send({ ...details, status: "approved" }).expect(404);
  await owner.put(`/api/portal/listings/${id}`).set("Origin", origin).send({ ...details, status: "approved" }).expect(403);
  await owner.put(`/api/portal/listings/${id}`).set("Origin", origin).send({ ...details, status: "pending" }).expect(200);
  await owner.delete(`/api/portal/listings/${id}/files/${file}`).set("Origin", origin).expect(409);
  await admin.get(`/api/portal/files/${file}`).expect(200);
  await admin.put(`/api/portal/listings/${id}`).set("Origin", origin).send({ ...details, status: "approved" }).expect(200);
  expect((await request(app).get("/api/portal/listings").expect(200)).body.listings).toHaveLength(1);
  await request(app).get(`/api/portal/files/${file}`).expect(200);
  await owner.put(`/api/portal/listings/${id}`).set("Origin", origin).send({ ...details, status: "paused" }).expect(200);
  expect((await request(app).get("/api/portal/listings").expect(200)).body.listings).toHaveLength(0);
  await request(app).get(`/api/portal/files/${file}`).expect(404);
  await owner.delete(`/api/portal/listings/${id}/files/${file}`).set("Origin", origin).expect(200);
  await owner.get(`/api/portal/files/${file}`).expect(404);
});

test("rejects forged origins, invalid content and failed scanner results", async () => {
  const owner = request.agent(app);
  await register(owner, "owner@example.test");
  await owner.post("/api/portal/listings").set("Origin", "https://untrusted.example").send(details).expect(403);
  const id = (await owner.post("/api/portal/listings").set("Origin", origin).send(details).expect(201)).body.id;
  await owner.post("/api/portal/uploads").set("Origin", origin)
    .field("kind", "document").field("listing_id", id)
    .attach("file", Buffer.from("not a pdf"), "guide.pdf").expect(400);
  expect(scanner).not.toHaveBeenCalled();
  scanner.mockRejectedValue(Object.assign(new Error("The malware scanner is unavailable."), { status: 503 }));
  await owner.post("/api/portal/uploads").set("Origin", origin)
    .field("kind", "document").field("listing_id", id)
    .attach("file", Buffer.from("%PDF-1.7\nExample"), "guide.pdf").expect(503);
  expect(db.prepare("select count(*) as count from files").get().count).toBe(0);
});

test("refuses uploads when the actual ClamAV executable is unavailable", async () => {
  const previousPath = process.env.PATH;
  process.env.PATH = directory;
  try {
    app = createApp({ db, directory, siteOrigin: origin });
    const owner = request.agent(app);
    await register(owner, "scanner@example.test");
    const id = (await owner.post("/api/portal/listings").set("Origin", origin).send(details).expect(201)).body.id;
    await owner.post("/api/portal/uploads").set("Origin", origin)
      .field("kind", "document").field("listing_id", id)
      .attach("file", Buffer.from("%PDF-1.7\nExample"), "guide.pdf").expect(503);
    expect(db.prepare("select count(*) as count from files").get().count).toBe(0);
  } finally {
    process.env.PATH = previousPath;
  }
});

test("allows public submissions without authentication", async () => {
  const publicSubmission = {
    organisation_name: "Test Aviation Co",
    contact_name: "John Doe",
    contact_email: "john@testav.example",
    contact_phone: "123-456-7890",
    organisation_website: "https://testav.example",
    title: "Pilot Training Course",
    description: "A comprehensive pilot training program",
    category: "Training",
    sector: "Other",
    location: "Dublin",
    application_url: "https://testav.example/apply",
    expires_on: null,
  };

  const response = await request(app).post("/api/portal/public/submit").set("Origin", origin)
    .send(publicSubmission).expect(201);

  expect(response.body.listing).toBeDefined();
  expect(response.body.listing.id).toBeDefined();
  expect(response.body.listing.title).toBe("Pilot Training Course");
  expect(response.body.listing.status).toBe("pending");
  expect(response.body.listing.organisation_name).toBe("Test Aviation Co");

  const allListings = await request(app).get("/api/portal/listings").expect(200);
  expect(allListings.body.listings).toHaveLength(0);

  const org = db.prepare("select * from organisations where email = ?").get("john@testav.example");
  expect(org).toBeDefined();
  expect(org.name).toBe("Test Aviation Co");
  expect(org.contact_name).toBe("John Doe");
});

