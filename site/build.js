// Static site generator for the Ghana, Africa & the World blog.
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
const REPO_URL = `https://github.com/${GITHUB_USER}/${REPO_NAME}`;
const REPO_BLOB = `${REPO_URL}/blob/main`;

// The homepage lists these as "main projects", each a card with just a summary.
// Clicking a project title goes to a project page listing that project's
// pieces (subheadings) as clickable titles; clicking one of those goes to the
// actual content. "series" projects pull their subheading list from blog
// posts sharing that `series` frontmatter value; "external" projects are
// hand-listed because their content isn't part of the content/posts/
// pipeline (e.g. a data-science research project living in its own folder).
const PROJECTS = [
  {
    slug: "ghana-beyond-cocoa",
    title: "Ghana: Beyond Cocoa",
    summary:
      "A five-part research series on why Ghana's non-traditional agricultural exports, cashew, shea, rubber, oil palm, mango, and pineapple, remain underdeveloped, and the eight reforms that would actually fix it. Drawn from the full policy paper in this repo's research/ folder.",
    type: "series",
  },
  {
    slug: "ghana-big-push",
    title: "Ghana's Big Push Infrastructure Programme",
    summary:
      "A five-phase, citation-backed investigation into Ghana's flagship roads-and-bridges programme: what's officially claimed, what's independently verified, and what's still contested, including a live discrepancy log and a dataset built entirely from sourced, dated claims rather than filled in to look complete.",
    type: "external",
    note:
      "This project's full report, dataset, and analysis code live in this repo's projects/ghana_big_push/ folder. The links below open the rendered files on GitHub.",
    links: [
      { title: "Executive Summary", path: "projects/ghana_big_push/reports/executive_summary.md" },
      { title: "Full Report", path: "projects/ghana_big_push/reports/full_report.md" },
      { title: "Economic & Policy Analysis", path: "projects/ghana_big_push/reports/phase4_economic_policy_analysis.md" },
      { title: "Research Plan", path: "projects/ghana_big_push/research-plan.md" },
      { title: "Methodology", path: "projects/ghana_big_push/methodology.md" },
      { title: "Sources & Discrepancy Log", path: "projects/ghana_big_push/sources.md" },
      { title: "Dataset & Analysis Code", path: "projects/ghana_big_push" },
    ],
  },
];

// All links/assets in the layout are written relative to the page (e.g. "assets/x"),
// so basePath is just "" at the root and "../" one level down (posts/, projects/).
// This works whether the site is served from a domain root or a GitHub Pages
// project subpath.
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
        series: data.series || null,
        part: typeof data.part === "number" ? data.part : null,
        html: marked.parse(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Groups consecutive-or-not posts sharing a frontmatter `series` together,
// in narrative order (Part 1 first), for use on that series' project page.
function groupPosts(posts) {
  const groups = [];
  const bySeriesKey = new Map();
  for (const p of posts) {
    if (!p.series) {
      groups.push({ series: null, posts: [p] });
      continue;
    }
    if (!bySeriesKey.has(p.series)) {
      const group = { series: p.series, posts: [] };
      bySeriesKey.set(p.series, group);
      groups.push(group);
    }
    bySeriesKey.get(p.series).posts.push(p);
  }

  // A series reads as a narrative, oldest/Part 1 first, unlike the
  // reverse-chronological feed order a flat list would use.
  for (const group of groups) {
    if (!group.series) continue;
    group.posts.sort((a, b) => {
      if (a.part != null && b.part != null) return a.part - b.part;
      return a.date < b.date ? -1 : 1;
    });
  }

  return groups;
}

function buildIndex() {
  const projectCards = PROJECTS.map(
    (proj) => `
    <div class="project-card">
      <h2><a href="projects/${proj.slug}.html">${proj.title}</a></h2>
      <p>${proj.summary}</p>
    </div>`
  ).join("\n");

  const content = `
    <section class="about">
      <h1 style="font-family:'Playfair Display',serif;color:var(--navy)">About this site</h1>
      <p>Research and commentary on Ghana's economic development and structural transformation, set in the wider context of Africa and the global economy. Each project below starts from a full sourced research paper or dataset, not a general overview, and is broken into a readable series so the argument and the evidence stay attached to each other.</p>
    </section>
    <section class="location-contact">
      <h2>Location &amp; contact</h2>
      <p>Written by Frank Adu Poku, an MSc International Economics and Management student at Paderborn Universit&auml;t, Germany, with a research focus on Ghana's economic development. The source, data, and full citations for every project are open on <a href="${REPO_URL}">GitHub</a>, which is also the best way to get in touch or raise a correction.</p>
    </section>
    <section class="projects">
      <h2>Projects</h2>
      ${projectCards}
    </section>`;

  return render("Home", "Research and commentary on Ghana's economic development, Africa, and the world.", content, 0);
}

function buildSeriesProjectPage(proj, groups) {
  const group = groups.find((g) => g.series === proj.title);
  const posts = group ? group.posts : [];

  const items = posts
    .map(
      (p) => `
      <div class="post-list-item series-item">
        <div class="post-meta">${p.part != null ? `Part ${p.part} &middot; ` : ""}${p.date}</div>
        <h3><a href="../posts/${p.slug}.html">${p.title}</a></h3>
        <p>${p.excerpt}</p>
      </div>`
    )
    .join("\n");

  const content = `
    <h1 style="font-family:'Playfair Display',serif;color:var(--navy)">${proj.title}</h1>
    <p>${proj.summary}</p>
    <div class="project-posts">
      ${items || "<p>No posts published yet.</p>"}
    </div>`;

  return render(proj.title, proj.summary, content, 1);
}

function buildExternalProjectPage(proj) {
  const items = proj.links
    .map(
      (link) => `
      <div class="post-list-item series-item">
        <h3><a href="${REPO_BLOB}/${link.path}" target="_blank" rel="noopener">${link.title}</a></h3>
      </div>`
    )
    .join("\n");

  const content = `
    <h1 style="font-family:'Playfair Display',serif;color:var(--navy)">${proj.title}</h1>
    <p>${proj.summary}</p>
    <p class="external-note">${proj.note}</p>
    <div class="project-posts">
      ${items}
    </div>`;

  return render(proj.title, proj.summary, content, 1);
}

function buildPost(post, seriesNav) {
  const metaLine = seriesNav
    ? `${post.series} &middot; Part ${post.part} of ${seriesNav.total} &middot; ${post.date}`
    : post.date;

  const nav =
    seriesNav && (seriesNav.prev || seriesNav.next)
      ? `<nav class="series-pager">
      ${seriesNav.prev ? `<a href="${seriesNav.prev.slug}.html">&larr; Part ${seriesNav.prev.part}: ${seriesNav.prev.title}</a>` : "<span></span>"}
      ${seriesNav.next ? `<a href="${seriesNav.next.slug}.html">Part ${seriesNav.next.part}: ${seriesNav.next.title} &rarr;</a>` : "<span></span>"}
    </nav>`
      : "";

  const content = `<article class="post">
    <div class="post-meta">${metaLine}</div>
    <h1>${post.title}</h1>
    ${post.html}
    ${nav}
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
  fs.mkdirSync(path.join(DIST_DIR, "projects"), { recursive: true });

  copyDir(path.join(__dirname, "assets"), path.join(DIST_DIR, "assets"));

  const posts = readPosts();
  const groups = groupPosts(posts);

  // Build a slug -> {prev, next, total} lookup from the same narrative
  // ordering the project pages use, so a post page can link to its neighbours.
  const seriesNavBySlug = new Map();
  for (const group of groups) {
    if (!group.series) continue;
    group.posts.forEach((p, i) => {
      seriesNavBySlug.set(p.slug, {
        total: group.posts.length,
        prev: group.posts[i - 1] || null,
        next: group.posts[i + 1] || null,
      });
    });
  }

  fs.writeFileSync(path.join(DIST_DIR, "index.html"), buildIndex());

  for (const proj of PROJECTS) {
    const html =
      proj.type === "series" ? buildSeriesProjectPage(proj, groups) : buildExternalProjectPage(proj);
    fs.writeFileSync(path.join(DIST_DIR, "projects", `${proj.slug}.html`), html);
  }

  for (const post of posts) {
    fs.writeFileSync(
      path.join(DIST_DIR, "posts", `${post.slug}.html`),
      buildPost(post, seriesNavBySlug.get(post.slug))
    );
  }

  console.log(`Built ${posts.length} post(s) and ${PROJECTS.length} project page(s) to dist/`);
}

main();
