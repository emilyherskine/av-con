const fs = require("fs/promises");
const path = require("path");
const os = require("os");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execute = promisify(execFile);

async function scanWithClamAV(buffer) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "avcon-scan-"));
  const file = path.join(directory, "upload");
  try {
    await fs.writeFile(file, buffer, { mode: 0o600 });
    try {
      await execute("clamscan", ["--no-summary", file], { timeout: 60000, maxBuffer: 64 * 1024 });
    } catch (error) {
      if (error.code === 1) {
        const rejected = new Error("The file was rejected by the malware scanner.");
        rejected.status = 400;
        throw rejected;
      }
      const unavailable = new Error("The malware scanner is unavailable. Please try again later.");
      unavailable.status = 503;
      throw unavailable;
    }
  } finally {
    await fs.rm(file, { force: true });
    await fs.rmdir(directory);
  }
}

module.exports = { scanWithClamAV };
