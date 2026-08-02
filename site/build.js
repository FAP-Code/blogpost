// Static site generator for the Ghanaian Economy blog.
// Reads content/posts/*.md (with frontmatter), renders them through
// site/templates/layout.html, and writes a static site to dist/.
//
// Usage: node site/build.js
// Config (repo name / GitHub username / base path for GitHub Pages) via env vars,
// see README.md.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const DIST_DIR = path.join(ROOT, "dist");
const LAYOUT = fs.readFileSync(path.join(__dirname, "templates", "layout.html"), "utf-8");

const GITHUB_USER = process.env.GITHUB_USER || "your-github-username";
const REPO_NAME = process.env.REPO_NAME || "ghana-economy";
const YEAR = new Date().getFullYear();

// All links/assets in the layout are written relative to the page (e.g. "assets/x"),
// so basePath is just "" at the root and "../" one level down (posts/). This works
// whether the site is served from a domain root or a GitHub Pages project subpath.
function render(pageTitle, description, content, depth = 0) {
  const basePath = depth === 0 ? "" : "../".repeat(depth);
  return LAYOUT
    .replaceAll("{{pageTitle}}", pageTitle)
    .replaceAll("{{description}}", description || "")
    .replaceAll("{{basePath}}", basePath)
    .replaceAll("{{content}}", content)
    .replaceAll("{{githubUser}}", GITHUB_USER)
    .replaceAll("{{repoName}}", REPO_NAME)
    .replaceAll("{{year}}", YEAR);
}

function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      const slug = (data.slug || filename.replace(/\.md$/, "")).toLowerCase();
      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        html: marked.parse(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function buildIndex(posts) {
  const items = posts
    .map(
      (p) => `
    <div class="post-list-item">
      <div class="post-meta">${p.date}</div>
      <h2><a href="posts/${p.slug}.html">${p.title}</a></h2>
      <p>${p.excerpt}</p>
    </div>`
    )
    .join("\n");

  const content = `<h1 style="font-family:'Playfair Display',serif;color:var(--navy)">Latest Posts</h1>\n${
    items || "<p>No posts yet — add markdown files to content/posts/.</p>"
  }`;

  return render("Home", "Research and commentary on Ghana's economic development.", content, 0);
}

function buildPost(post) {
  const content = `<article class="post">
    <div class="post-meta">${post.date}</div>
    <h1>${post.title}</h1>
    ${post.html}
  </article>`;
  return render(post.title, post.excerpt, content, 1);
}

// Manual recursive copy — avoids fs.cpSync, which chokes on some
// FUSE-backed mounts (permission errors on directory-to-directory copy).
function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(path.join(DIST_DIR, "posts"), { recursive: true });

  copyDir(path.join(__dirname, "assets"), path.join(DIST_DIR, "assets"));

  const posts = readPosts();

  fs.writeFileSync(path.join(DIST_DIR, "index.html"), buildIndex(posts));
  for (const post of posts) {
    fs.writeFileSync(path.join(DIST_DIR, "posts", `${post.slug}.html`), buildPost(post));
  }

  console.log(`Built ${posts.length} post(s) to dist/`);
}

main();
