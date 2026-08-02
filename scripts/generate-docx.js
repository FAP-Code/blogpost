// Convert a markdown research doc into a formatted .docx file.
// Usage: node scripts/generate-docx.js <input.md> <output.docx>

import fs from "node:fs";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/generate-docx.js <input.md> <output.docx>");
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, "utf-8");
const lines = raw.split("\n");

const children = [];
for (const line of lines) {
  if (line.startsWith("# ")) {
    children.push(new Paragraph({ text: line.slice(2), heading: HeadingLevel.TITLE }));
  } else if (line.startsWith("## ")) {
    children.push(new Paragraph({ text: line.slice(3), heading: HeadingLevel.HEADING_1 }));
  } else if (line.startsWith("### ")) {
    children.push(new Paragraph({ text: line.slice(4), heading: HeadingLevel.HEADING_2 }));
  } else if (line.startsWith("- ")) {
    children.push(new Paragraph({ text: line.slice(2), bullet: { level: 0 } }));
  } else if (line.trim() === "") {
    children.push(new Paragraph({ text: "" }));
  } else {
    children.push(new Paragraph({ text: line }));
  }
}

const doc = new Document({ sections: [{ children }] });

Packer.toBuffer(doc).then((buffer) => {
  fs.mkdirSync(outputPath.substring(0, outputPath.lastIndexOf("/")) || ".", { recursive: true });
  fs.writeFileSync(outputPath, buffer);
  console.log(`Wrote ${outputPath}`);
});
