const path = require("path");
const { openDatabase } = require("./db");
const { createApp } = require("./app");

if (process.env.NODE_ENV === "production") {
  throw new Error("The in-house portal is not production-ready: email verification, recovery and deployment safeguards are required.");
}

const directory = path.resolve(process.env.PORTAL_DATA_DIR || path.join(__dirname, "data"));
const siteOrigin = process.env.PORTAL_SITE_ORIGIN || "http://localhost:3000";
const port = Number(process.env.PORTAL_PORT || 3001);
const db = openDatabase(directory);
const app = createApp({ db, directory, siteOrigin });
app.listen(port, "127.0.0.1", () => console.log(`Portal API listening at http://127.0.0.1:${port}`));
