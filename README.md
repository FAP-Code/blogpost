# Frankly Speaking

Frank Adu Poku's blog for research and commentary on Ghana's economic development and structural transformation, set in the wider context of Africa and the global economy — statically generated, auto-published to GitHub Pages on every push to `main`.

## Structure

- `content/posts/` — blog posts, one markdown file per post, with frontmatter (`title`, `date`, `excerpt`, `tags`). Add a new file here to publish a new post.
- `content/flyers/` — JSON data files driving social-media flyer images (headline claim + stat + source), one per flyer.
- `research/beyond-cocoa/` — the "Beyond Cocoa" policy paper (source material for posts).
- `research/transformation-research/` — the structural transformation research report (comparative case studies, gap analysis, blueprint, recommendations).
- `research/sources.md` — citation tracker for data claims.
- `site/` — the static site generator (`build.js`, HTML template, CSS). You shouldn't need to touch this to publish a post.
- `scripts/` — standalone tools: `generate-docx.js` (markdown → Word), `generate-flyer.js` (JSON → PNG flyer via `wkhtmltoimage`).
- `.github/workflows/deploy.yml` — builds the site and deploys it to GitHub Pages automatically on push to `main`.

## Publishing a new post

1. Add a file to `content/posts/`, e.g. `content/posts/2026-08-10-cashew-value-chain.md`:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2026-08-10"
   excerpt: "One-sentence summary shown on the homepage."
   tags: ["tag1", "tag2"]
   ---

   Post body in markdown.
   ```
2. Commit and push to `main` — GitHub Actions builds and deploys automatically.

## Local preview

```bash
npm install
npm run serve   # builds the site and serves dist/ at http://localhost:3000
```

## First-time GitHub Pages setup

1. Push this repo to `https://github.com/FAP-Code/blogpost.git` (see below).
2. In the repo: **Settings → Pages → Source → GitHub Actions**. That's it — the workflow in `.github/workflows/deploy.yml` handles the rest on every push to `main`.
3. The site will be live at `https://fap-code.github.io/blogpost/`.

## Other tools

```bash
# Word doc from a markdown research source
node scripts/generate-docx.js research/beyond-cocoa/beyond-cocoa-paper.md outputs/beyond-cocoa.docx

# Social flyer PNG (requires wkhtmltoimage: brew install --cask wkhtmltopdf, or apt-get install wkhtmltopdf)
node scripts/generate-flyer.js content/flyers/flyer-01.json outputs/flyer-01.png
```

## Style notes (from prior work)

- Academic outputs: formal structure, APA citations, theoretical framing (Lewis Dual Sector Model, Rostow's Stages, New Structural Economics).
- Public/social outputs: one powerful claim per flyer, large fonts, generous white space.
- Framing: balanced and non-partisan — structural explanations over blaming any single actor.
- Brand palette: gold, navy, cream. Fonts: Playfair Display, Cormorant Garamond, DM Mono.

## Content quality standard: every claim must be explained, not just asserted

This site's purpose is to educate and inform the public, so a claim with a citation is not
automatically a finished claim. Before publishing or editing any post or report, check that every
non-obvious or interpretive claim (especially causal claims like "X, not Y" or "the real problem is
Z") is walked through with the specific facts that make it true, not just stated and footnoted.
Concretely:

- If a section makes a claim like "the gap is governance, not capital," it must show what evidence
  would distinguish the two explanations, and then apply that test to each piece of evidence cited,
  rather than listing facts next to the claim and leaving the reader to connect them.
- Prefer "X happened, which shows Y because Z" over "X happened (Source, Year)." A citation
  supports a fact; it doesn't substitute for explaining why that fact proves the argument.
  Concrete example from this site: it's not enough to say Usibras considered relocating due to raw
  material shortages and tariffs (IMANI Africa, 2025); the post has to say that Usibras is already a
  built factory (so capital isn't the missing ingredient) and that the tariff schedule itself
  rewards raw exports over local processing (so a policy choice, not a financing gap, is what's
  starving it of supply).
- When auditing existing content against this standard (e.g. after a reader flags an under-explained
  claim), check every post in `content/posts/` and every report under `projects/`, not just the one
  flagged, since the same shorthand (fact plus citation, argument left implicit) tends to repeat
  across a series written in one sitting.
