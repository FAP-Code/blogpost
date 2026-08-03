// Static site generator for the Frankly Speaking blog.
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
      "This project's full report, dataset, and analysis code live in this repo's projects/ghana_big_push/ folder. The three pieces below are rendered on this site to read directly; the underlying dataset and analysis scripts stay on GitHub, where that kind of material belongs.",
    datasetPath: "projects/ghana_big_push",
    fullReport: {
      slug: "full-report",
      title: "Full Report",
      path: "projects/ghana_big_push/reports/full_report.md",
    },
    links: [
      {
        slug: "executive-summary",
        title: "Executive Summary",
        path: "projects/ghana_big_push/reports/executive_summary.md",
        summary:
          "Big Push is Ghana's roughly $10 billion, multi-year roads and bridges programme covering all 16 regions, but even the basic numbers are disputed: project counts range from 32 to 140 depending on the announcement, and total value estimates range from GH₵43 billion to GH₵110 billion. The programme's own public tracker and a high competitive-tender rate are genuine strengths, while a formal audit petition, contested procurement claims, and an unresolved link to a $500 million World Bank credit remain open questions. Most projects are too early in construction for any claim about jobs, travel times, or market access to be more than a projection at this stage.",
      },
      {
        slug: "economic-policy-analysis",
        title: "Economic & Policy Analysis",
        path: "projects/ghana_big_push/reports/phase4_economic_policy_analysis.md",
        summary:
          "Lays out the full theory of change behind Big Push, from budget allocations through to the poverty and market-access gains the programme is meant to eventually produce, and is explicit about which links in that chain are actually evidenced today, inputs and activities, versus which are not, everything from outcomes onward, since most projects are still under construction. Compares Big Push to Ghana's 2018 Sinohydro bauxite-barter infrastructure programme, the closest domestic precedent, and finds the same political fault lines, financing opacity, the same opposition MP, an unresolved audit, reopening around each one.",
      },
      {
        slug: "sources-discrepancy-log",
        title: "Sources & Discrepancy Log",
        path: "projects/ghana_big_push/sources.md",
        summary:
          "A tiered bibliography, official Government of Ghana sources, international and multilateral bodies, and independent research and civil-society groups, built entirely from dated, sourced claims, plus a running log of every place two credible sources give a different number for the same project count, total cost, or financing structure. Also documents a real constraint on this research: direct scraping of government and IMF sites wasn't possible in this environment, so every claim here is a search-engine synthesis of a primary document, not a verbatim pull from it, and is flagged as needing a live recheck before being treated as final.",
      },
    ],
  },
  {
    slug: "ghana-imf-exit",
    title: "Ghana's Exit from the IMF Programme",
    summary:
      "Ghana concluded its $3 billion IMF Extended Credit Facility in July 2026, its first programme exit in years, backed by falling inflation, rebuilt reserves, and two credit rating upgrades. This project asks whether that stabilization is turning into genuine structural transformation, or repeating the pattern of Ghana's 2006 and 2019 exits, both followed by a slide back into crisis within about three years.",
    type: "external",
    note:
      "This project's full report lives in this repo's projects/ghana_imf_exit/ folder. The plain-language summary below is rendered on this site to read directly; the full report goes through every figure, discrepancy, and caveat in depth.",
    fullReport: {
      slug: "full-report",
      title: "Full Report",
      path: "projects/ghana_imf_exit/imf_exit_full_report.md",
    },
    links: [
      {
        slug: "blog-summary",
        title: "What We Actually Know (Plain-Language Summary)",
        path: "projects/ghana_imf_exit/imf_exit_blog_summary.md",
        summary:
          "The stabilization is real and independently confirmed: inflation fell from above 20% in 2024 to roughly 5% by mid-2026, reserves rose to $14.5 billion, and Fitch and S&P both upgraded Ghana's credit rating. But Ghana didn't walk away from the IMF, it moved into a lighter, non-financing form of continued oversight, and the debt picture depends entirely on which number you look at: a 45% snapshot, a rise to 53 to 55% the IMF itself projects within two years, or a 45% target the law doesn't require until 2034. Export diversification and job-creation programmes show real momentum but are still pipelines and small-base growth, not yet measured, structural change, and Ghana's last two programme exits were both followed by relapse into crisis within about three years.",
      },
    ],
  },
  {
    slug: "ghana-fuel-pricing",
    title: "The Politics of Fuel Pricing in Ghana",
    summary:
      "Ghana deregulated fuel pricing in 2015, and the evidence shows roughly 75 to 81% of the pump price genuinely is outside government's control today. But a 2024 university study finds the deeper story isn't secret price-fixing, it's politicians on all sides campaigning on fuel-price promises their own numbers show they mostly can't keep, plus real, active government leverage over the remaining slice of the price through levies, margins, and a contested 2024 price floor policy.",
    type: "external",
    note:
      "This project's full report lives in this repo's projects/ghana_fuel_pricing/ folder. The plain-language summary below is rendered on this site to read directly; the full report goes through every levy, discrepancy, and caveat in depth.",
    fullReport: {
      slug: "full-report",
      title: "Full Report",
      path: "projects/ghana_fuel_pricing/fuel_pricing_full_report.md",
    },
    links: [
      {
        slug: "blog-summary",
        title: "What We Actually Know (Plain-Language Summary)",
        path: "projects/ghana_fuel_pricing/fuel_pricing_blog_summary.md",
        summary:
          "About 75 to 81% of Ghana's pump price (crude oil plus the cedi exchange rate) is now genuinely outside any government's control, but the remaining 15 to 20% (levies, margins, and a 2024 minimum-price floor) is still an active lever, and gets used. A 2024 university study finds politicians on all sides promise lower fuel prices while campaigning and fail to deliver in office, not mainly from bad faith but because most of the price simply isn't theirs to move, the same pattern recurring with the parties reversed a decade apart. Official subsidies formally ended in 2015, but a targeted diesel subsidy and a reformed industrial subsidy scheme both surfaced in 2026, alongside a live corruption case at the fuel regulator itself. Transport fares are where price changes show up fastest, and even the country's main consumer advocacy group doesn't always agree with the transport union on how much fares should rise.",
      },
    ],
  },
  {
    slug: "ghana-food-security",
    title: "Ghana's Food Glut Paradox",
    summary:
      "Ghanaian farmers were recently sitting on 1.2 million unsold metric tonnes of grain, including roughly $330 million of unsold rice, while about 8 million Ghanaians simultaneously couldn't afford enough food. This project asks why gluts and food insecurity coexist in the same food system, and finds two genuinely different problems: a storage and market-access failure concentrated in the south, and a chronic poverty crisis concentrated in the north, that get misdiagnosed when treated as one undifferentiated food crisis.",
    type: "external",
    note:
      "This project's full report lives in this repo's projects/ghana_food_security/ folder. The plain-language summary below is rendered on this site to read directly; the full report goes through every figure, discrepancy, and caveat in depth.",
    fullReport: {
      slug: "full-report",
      title: "Full Report",
      path: "projects/ghana_food_security/food_security_full_report.md",
    },
    links: [
      {
        slug: "blog-summary",
        title: "What We Actually Know (Plain-Language Summary)",
        path: "projects/ghana_food_security/food_security_blog_summary.md",
        summary:
          "Ghana isn't short of food, it's short of a working system to move it: farmers were sitting on 1.2 million tonnes of unsold grain while roughly 8 million Ghanaians (a quarter of the country, on one measure) didn't have enough to eat. This is genuinely two different crises, not one: a storage and cross-border trade failure in the south (Ashanti, Bono), where tomatoes and maize rot for lack of storage and market access, and a chronic poverty crisis in the north, holding 56% of the country's food-insecure people on just 28% of the population, worsened by refugees fleeing conflict in Burkina Faso. The fixes mostly already exist and aren't being scaled: a cold-storage trial cut onion losses from 30% to 5%, a flagship tomato factory has sat stalled for decades, and the agency built to buy up surplus grain has its own documented corruption problem.",
      },
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

// marked emits bare <table> elements; wrap them so wide tables (long URLs,
// many columns) scroll horizontally instead of overflowing the page.
function wrapTables(html) {
  return html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
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
        html: wrapTables(marked.parse(content)),
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

// Reads a standalone markdown file (a research report living outside
// content/posts/, with no frontmatter) and renders it to HTML. Strips a
// single leading "# Title" line so the page can supply its own heading
// (matching the nav label exactly) instead of duplicating a slightly
// different one from inside the document.
function readReportHtml(relPath) {
  const raw = fs.readFileSync(path.join(ROOT, relPath), "utf-8");
  const stripped = raw.replace(/^#\s+.*\n+/, "");
  return wrapTables(marked.parse(stripped));
}

// Report pages live at dist/projects/<project-slug>/<report-slug>.html, so
// their assets/links are two levels down from the site root.
function buildReportPage(proj, report, summary) {
  const html = readReportHtml(report.path);
  const content = `<article class="post">
    <div class="post-meta"><a href="../${proj.slug}.html">&larr; ${proj.title}</a></div>
    <h1>${report.title}</h1>
    ${html}
    <p class="source-link"><a href="${REPO_BLOB}/${report.path}" target="_blank" rel="noopener">View source on GitHub &rarr;</a></p>
  </article>`;
  return render(`${report.title} | ${proj.title}`, summary || proj.summary, content, 2);
}

function buildExternalProjectPage(proj) {
  const items = proj.links
    .map(
      (link) => `
      <div class="post-list-item series-item">
        <h3><a href="${proj.slug}/${link.slug}.html">${link.title}</a></h3>
        <p>${link.summary}</p>
      </div>`
    )
    .join("\n");

  const fullReportLink = proj.fullReport
    ? `<p class="full-report-link"><a href="${proj.slug}/${proj.fullReport.slug}.html">Read the full report &rarr;</a></p>`
    : "";

  const datasetLink = proj.datasetPath
    ? `<p class="source-link"><a href="${REPO_BLOB}/${proj.datasetPath}" target="_blank" rel="noopener">View the dataset &amp; analysis code on GitHub &rarr;</a></p>`
    : "";

  const content = `
    <h1 style="font-family:'Playfair Display',serif;color:var(--navy)">${proj.title}</h1>
    <p>${proj.summary}</p>
    <p class="external-note">${proj.note}</p>
    ${fullReportLink}
    <div class="project-posts">
      ${items}
    </div>
    ${datasetLink}`;

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

    if (proj.type === "external") {
      const projDir = path.join(DIST_DIR, "projects", proj.slug);
      fs.mkdirSync(projDir, { recursive: true });
      for (const link of proj.links) {
        fs.writeFileSync(
          path.join(projDir, `${link.slug}.html`),
          buildReportPage(proj, link, link.summary)
        );
      }
      if (proj.fullReport) {
        fs.writeFileSync(
          path.join(projDir, `${proj.fullReport.slug}.html`),
          buildReportPage(proj, proj.fullReport)
        );
      }
    }
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
