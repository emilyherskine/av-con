const path = require("path");
const { openDatabase } = require("./db");

const email = process.argv[2];
if (!email) {
  console.error("Usage: node server/portal/make-admin.js <registered-email>");
  process.exitCode = 1;
} else {
  const directory = path.resolve(process.env.PORTAL_DATA_DIR || path.join(__dirname, "data"));
  const db = openDatabase(directory);
  const result = db.prepare("update organisations set admin=1 where email=?").run(email.trim().toLowerCase());
  if (result.changes !== 1) {
    console.error("No registered account found.");
    process.exitCode = 1;
  } else console.log("Account granted administrator access.");
  db.close();
}
