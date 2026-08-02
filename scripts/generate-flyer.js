// Render a social-media flyer PNG from a JSON data file + flyer-template.html,
// using the wkhtmltoimage system binary.
// Usage: node scripts/generate-flyer.js <data.json> <output.png>

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , dataPath, outputPath] = process.argv;

if (!dataPath || !outputPath) {
  console.error("Usage: node scripts/generate-flyer.js <data.json> <output.png>");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const template = fs.readFileSync(path.join(__dirname, "flyer-template.html"), "utf-8");

const html = template
  .replaceAll("__KICKER__", data.kicker || "")
  .replaceAll("__HEADLINE__", data.headline || "")
  .replaceAll("__STAT__", data.stat || "")
  .replaceAll("__SOURCE__", data.source || "");

const tmpHtml = path.join(os.tmpdir(), `flyer-${Date.now()}.html`);
fs.writeFileSync(tmpHtml, html);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

try {
  execFileSync("wkhtmltoimage", ["--width", "1080", "--height", "1350", tmpHtml, outputPath], {
    stdio: "inherit",
  });
  console.log(`Wrote ${outputPath}`);
} catch (err) {
  console.error(
    "wkhtmltoimage failed or is not installed. Install it with:\n" +
      "  macOS:  brew install --cask wkhtmltopdf\n" +
      "  Ubuntu: sudo apt-get install wkhtmltopdf"
  );
  process.exit(1);
} finally {
  fs.rmSync(tmpHtml, { force: true });
}
