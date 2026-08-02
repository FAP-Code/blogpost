# Ghana's Big Push Infrastructure Programme: Research Plan

**Status:** PLAN — not yet implemented. This document is the deliverable requested before data
collection, dataset construction, or analysis begins. It is scoped, cited against real sources
found via preliminary research, and phased for delivery across multiple follow-up prompts, per
the two-stage process requested (plan first, implementation on subsequent direction).

**Prepared:** 2026-08-02. Given this is an active, fast-moving government programme, every
figure below is timestamped and sourced — none of it should be treated as current without
re-verification at the time full data collection begins.

---

## 1. Background (preliminary, sourced)

Ghana's "Big Push" is the current government's (President John Dramani Mahama, in office since
January 2025) flagship infrastructure programme, concentrated on roads and bridges but bridging
into broader infrastructure. Preliminary research confirms it is real, active, and substantial,
not a minor or defunct initiative:

- **Scale of ambition:** framed as a $10 billion / at least $2 billion-per-year infrastructure
  commitment, positioned as addressing an estimated $1.5 billion annual road-sector financing gap
  ([GBC Ghana Online](https://www.gbcghanaonline.com/general/promise-delivered-10bn-big-push-roads-project-begins/2025/); [News Ghana](https://www.newsghana.com.gh/ghana-launches-us10-billion-infrastructure-transformation-programme/)).
- **Budget trajectory:** GH₵13.85–13.9 billion allocated in the 2025 budget, rising to a reported
  GH₵30–30.8 billion in the 2026 budget ([Ministry of Finance](https://mofep.gov.gh/news-and-events/2025-09-13/government-to-invest-gh13.9-billion-big%20push-infrastructure-drive-deputy-finance-minister); [ModernGhana, 2026 budget](https://www.modernghana.com/news/1447790/2026-budget-ghc308bn-allocated-for-big-push-agen.html); [Ghana News Agency](https://gna.org.gh/2025/11/gh%C2%A230-billion-earmarked-for-big-push-infrastructure-roads-ministry-gets-gh%C2%A24-3-billion/)).
- **Project count:** reporting is inconsistent across sources and over time — figures of 32, 77,
  and 87 total projects all appear in different announcements/periods, alongside a claim of
  contracts worth $5 billion awarded, funded domestically "without contracting external debt"
  ([AllAfrica, 32 projects](https://allafrica.com/stories/202507250066.html); [MyJoyOnline, 87 projects](https://www.myjoyonline.com/government-begins-87-road-projects-under-big-push-programme/); [MRH](https://mrh.gov.gh/big-push-infrastructure-programme/)). **This inconsistency is itself a research finding** — reconciling project counts across time and source is a first-order task, not a footnote.
- **Named flagship projects:** Accra–Kumasi Expressway, Adawso–Ekye Amanfrom Bridge, a new 1.6km
  Oti River bridge at Dambai (claimed to be Ghana's longest), Tema–Aflao, Ofankor–Nsawam,
  Atimpoku–Ho–Aflao, Kasoa–Winneba, Mankessim–Ajumako–Breman Asikuma–Agona Swedru, Suame
  Interchange (Kumasi), Accra ring road, Sunyani outer ring road.
- **Absorbed legacy debt:** ~23 previously abandoned projects worth GH₵14.8 billion, stalled for
  lack of funding, were folded into Big Push after debt restructuring progress freed up fiscal
  space ([News Ghana](https://www.newsghana.com.gh/stalled-road-projects-resume-as-debt-restructuring-nears-completion/)).
- **Procurement:** government claims >90% of contracts were competitively tendered; the remainder
  used single-source procurement, justified by government on speed/security/inflation grounds and
  approved by the Public Procurement Authority Board on a case-by-case basis. 14 of 16 contracts
  reviewed in one report (>GH₵6bn) went to named local firms (Murisco Ltd, Kojo Job Company Ltd,
  Arab Contractors Ghana Ltd, Kingspok Co Ltd, Oswal Investments Ltd, Hatfast Ltd, Serengeti
  Construction Ltd, Ashcal Investment Ltd, Mmanab Company Ltd) ([DailyGuide](https://dailyguidenetwork.com/over-90-of-road-projects-awarded-competitively-govt/); [ModernGhana](https://www.modernghana.com/news/1480651/big-push-local-road-contractors-were-selected.html)).
- **Progress tracking exists officially:** MRH's own Big Push page publishes Top 20 / Mid Point /
  Bottom 20 project rankings by completion percentage (as of April 2026) — a genuine primary
  source for the project-level dataset, not something we'd have to construct from scratch
  ([mrh.gov.gh/big-push-infrastructure-programme](https://mrh.gov.gh/big-push-infrastructure-programme/)).
- **Independent scrutiny exists:** IMANI Africa has published a review arguing success hinges on
  implementation discipline, not design, and has called for NDPC to be given independent authority
  to monitor cross-ministry adherence ([News Ghana](https://www.newsghana.com.gh/imani-africa-warns-ghana-infrastructure-plan-faces-implementation-risks-despite-ambitious-design/)). Parliamentary Minority (Kwame Governs Agbodza) has raised specific
  objections, including on a $500m World Bank-funded roads component ([GBC Ghana Online](https://www.gbcghanaonline.com/general/world-bank-funded-roads/2026/)).
- **Macro-fiscal context:** Ghana completed its sixth and final review under the 2023–2026 IMF
  Extended Credit Facility in mid-2026, moved to a 36-month Policy Coordination Instrument, and
  reports debt risk has returned to "moderate" with a legislated 45%-of-GDP debt anchor by 2034
  and a 2026 primary surplus target of 1.5% of GDP ([IMF](https://www.imf.org/en/news/articles/2026/07/27/pr25260-ghana-imf-exec-board-completes-6th-rev-arr-ecf-concludes-2026-aiv-consult-rev-req-36mo-pci-request)). This is the fiscal envelope Big Push spending has to fit inside —
  central to the debt-sustainability angle of this research.

**What this tells us going in:** there is real official primary data (MRH's own tracker), real
independent commentary (IMANI, Parliament Minority), and a live, unresolved discrepancy in even
basic facts like total project count and financing terms ("domestic resources, no external debt"
vs. a $500m World Bank-funded component reported in the same period). That discrepancy is exactly
the kind of thing the user's brief asks us to flag, not paper over.

---

## 2. Research objectives

Answer the 10 core questions in the brief, producing a reproducible, citation-backed research
package that:

1. Explains the programme's stated purpose and the deficit it claims to address.
2. Maps its actual project, sectoral, and regional scope — as officially claimed.
3. Reconciles announced vs. approved vs. released vs. spent funding, across time and source.
4. Documents financing mechanisms and timelines as officially stated.
5. Documents the selection, procurement, and M&E process, including where it deviates from
   competitive norms and why.
6. Assesses plausible economic effects using an explicit theory of change, not assumed impact.
7. Tests regional/district fairness of distribution quantitatively (inequality measures).
8. Catalogs implementation risks with evidence, not speculation — debt, procurement, delay,
   maintenance.
9. Benchmarks against Ghana's own prior programmes and comparable African infrastructure pushes.
10. States, explicitly, what evidence would be needed to judge success or failure — and what of
    that evidence exists today vs. doesn't.

---

## 3. Proposed repository structure

```
projects/ghana_big_push/
├── README.md                  # background, objectives, methodology, findings, limitations, repro steps
├── research-plan.md           # this document
├── methodology.md             # verification protocol, analytical methods, assumptions
├── sources.md                 # full bibliography, live, with access dates
├── data_dictionary.md         # variable definitions, types, units, allowed values, provenance
├── requirements.txt           # Python dependencies (pandas, geopandas, matplotlib, etc.)
├── data/
│   ├── raw/                   # unmodified scraped/downloaded source material, one subfolder per source
│   └── processed/             # cleaned, structured, analysis-ready datasets (CSV/Parquet)
├── notebooks/                 # exploratory + analysis notebooks (Jupyter), numbered by phase
├── src/                       # reusable Python modules (scraping, cleaning, analysis, plotting)
├── outputs/
│   ├── figures/                # charts, exported as SVG/PNG
│   └── tables/                 # summary tables, exported as CSV/Markdown
├── reports/
│   ├── full_report.md          # the comprehensive research report
│   └── executive_summary.md    # policymaker/general-audience summary
└── references/                 # archived source documents (PDFs of budget statements, IMF reports, etc.)
```

This sits alongside the blog's existing `research/` folder (source papers) and `content/`
(published posts) without touching the site build — `site/build.js` only reads `content/posts/`,
so this project is inert to the site pipeline until/unless we choose to publish summary posts
from it later.

---

## 4. Report outline (`reports/full_report.md`)

1. Executive summary
2. Background and problem statement
3. Programme scope: sectors, project count over time, regional coverage
4. Financing: announced vs. approved vs. released vs. spent, by year and source
5. Procurement and project selection
6. Regional and district distribution analysis (with inequality metrics)
7. Economic impact channels and theory of change
8. Comparative analysis (Ghana's prior programmes; peer African programmes)
9. Implementation risk assessment (debt, procurement, delay, maintenance, political)
10. Monitoring & evaluation framework — what should be tracked going forward
11. Policy recommendations
12. Unanswered questions and data gaps
13. Full bibliography

---

## 5. Sources to investigate

Organized by tier, with what preliminary research already found:

**Official Ghanaian government (primary, highest priority)**
- Ministry of Roads and Highways — dedicated Big Push page with a project tracker and progress
  rankings: `mrh.gov.gh/big-push-infrastructure-programme/` (confirmed to exist, April 2026 data cited)
- Ministry of Finance (MoFEP) — budget statements (2025, 2026 confirmed available as PDF at
  `mofep.gov.gh/publications/budget-statements/2026`), mid-year reviews, press releases
- Ghana Highway Authority, Department of Urban Roads, Department of Feeder Roads — likely hold
  disaggregated road-category data; not yet confirmed to have Big-Push-specific pages
- Public Procurement Authority — single-source approval records, procurement method breakdowns
- Auditor-General of Ghana — likely lag of 1+ years; check for any interim/special reports
- Parliament of Ghana (Hansard, committee reports) — Minority objections, appropriations debates
- Ghana Statistical Service — regional population, poverty, and economic indicators for
  denominator data (per-capita funding, correlation analysis)
- Bank of Ghana — debt statistics, exchange rate, inflation context
- National Development Planning Commission — coordination/M&E mandate (per IMANI's
  recommendation that NDPC's role be strengthened)

**International/multilateral**
- IMF — Article IV consultations, ECF/PCI reviews, debt sustainability analyses (confirmed
  recent: 6th ECF review + 2026 Article IV, July 2026)
- World Bank — project database (the $500m World Bank-funded roads component flagged by the
  Minority needs its own World Bank project page, likely on the Bank's public project database)
- African Development Bank — any co-financed components; comparative regional programmes

**Independent research / watchdog**
- IMANI Africa (confirmed active commentary on this exact programme)
- Academic literature on Ghana infrastructure spending, prior programmes (e.g. the Sinohydro
  bauxite-barter roads deal, National Highways Development Project), and African "big push"
  infrastructure economics generally (Rostow/Sachs-style big-push theory literature, plus applied
  African case studies)

**News (for triangulation and timeline reconstruction, not as primary evidence)**
- Graphic Online, MyJoyOnline, Ghana News Agency, ModernGhana, News Ghana, GBC Ghana Online,
  AllAfrica, Business & Financial Times, Deloitte Ghana tax/budget analyses, Adomonline,
  Ghana Budgit — several already surfaced concrete, useful reporting during preliminary search

**Geospatial reference data**
- District/regional boundary shapefiles: GADM or Humanitarian Data Exchange (HDX) Ghana
  administrative boundaries, for mapping
- Road network geometry if available: OpenStreetMap Ghana extract, or GHA route data if published

---

## 6. Dataset design

### 6.1 Project-level dataset (`data/processed/projects.csv`)

One row per project, per the brief's requested schema. Given the count-discrepancy already
found (32 vs. 77 vs. 87), the dataset must carry a **snapshot date** and **as-of source** for
every row, since "the project list" is not a fixed thing — it's a moving target we're sampling.

| Variable | Type | Notes |
|---|---|---|
| `project_id` | string | our own stable ID, since no official one is confirmed to exist |
| `project_name` | string | |
| `project_type` | categorical | road / bridge / interchange / other |
| `road_category` | categorical | trunk / urban / feeder (matches MRH's own 74/10/3 breakdown) |
| `region` | categorical | one of Ghana's 16 regions |
| `district` | string | |
| `constituency` | string | if disclosed — likely to be a data gap for many projects |
| `start_location` / `end_location` | string | |
| `length_km` | float | |
| `contractor` | string | |
| `is_local_contractor` | boolean | |
| `procurement_method` | categorical | competitive tender / single source / other |
| `contract_value_ghs` | float | |
| `funding_source` | categorical | GoG domestic / World Bank / other DFI / mixed |
| `announcement_date` | date | |
| `contract_award_date` | date | |
| `commencement_date` | date | |
| `expected_completion_date` | date | |
| `status` | categorical | announced / procurement / under construction / complete / stalled |
| `pct_complete` | float | as reported by MRH tracker where available |
| `amount_released_ghs` | float | |
| `amount_spent_ghs` | float | |
| `beneficiaries_est` | integer | if disclosed |
| `jobs_est` | integer | if disclosed |
| `source_url` | string | |
| `date_accessed` | date | |
| `verification_status` | categorical | **the core rigor mechanism** — see §8 |
| `snapshot_date` | date | which "wave" of data collection this row belongs to |

### 6.2 Supporting datasets

- `data/processed/regions.csv` — region-level population, poverty rate, existing road density,
  agricultural output share (from GSS/World Bank), for denominator and correlation work
- `data/processed/financing_timeline.csv` — one row per (year, announced/approved/released/spent)
  observation, to track the funding-figure reconciliation over time
- `data/processed/prior_programmes.csv` — comparator programmes (Sinohydro roads-for-bauxite
  deal, National Highways Development Project, and 1–2 peer-country "big push" programmes) for
  the comparative section

---

## 7. Analytical methods

Matched candidly to what the likely data will support — the brief explicitly warns against
forcing causal conclusions past what the data can bear, and that instruction is going to matter
in practice here.

**Almost certainly feasible, given official tracker + budget data:**
- Descriptive statistics: projects/funding by region, road-km by region, urban vs rural split
- Project-value-per-km, contractor concentration (HHI or simple share)
- Announced vs. completed project counts; planned vs. actual expenditure (where both are
  disclosed)
- Delay analysis (expected vs. actual completion, where dates are disclosed)
- Regional inequality measures: Gini coefficient or concentration index on funding-per-capita
  and projects-per-capita by region
- Correlation (not causal) between regional allocation and population, poverty rate, existing
  road density, agricultural output share

**Feasible with caveats:**
- Geospatial mapping of project locations/corridors (depends on how precisely locations are
  disclosed; likely road-name-level, not always coordinate-level — may need geocoding by name)
- Before/after comparisons on specific completed corridors, if pre-project baseline data
  (e.g., travel time) exists anywhere — likely thin

**Only feasible as scenario/illustrative analysis, not empirical estimation, given real data
constraints (stated candidly rather than attempted anyway):**
- Employment multiplier estimation — no Ghana-specific Big-Push input-output table is likely to
  exist publicly; would use published national infrastructure-employment multipliers from
  literature (e.g. World Bank/ILO), clearly labeled as an external assumption, not an estimate
  derived from this programme's own data
- Difference-in-differences / regional panel-data analysis — needs multiple time periods of
  comparable regional economic outcome data pre/post programme; feasible only if GSS/GLSS-type
  panel data covering the relevant years becomes available, and even then requires a real
  identification strategy (control regions), which for a nationwide programme touching all 16
  regions is genuinely hard — flagged as a limitation, not promised as a deliverable
- Debt-sustainability sensitivity analysis — feasible only at a qualitative/scenario level using
  IMF DSA figures already published, not as an original DSA model (that requires the DSA's full
  underlying assumptions, which the IMF does not always publish in machine-readable form)

**Cost-benefit / input-output analysis:** will be scoped as illustrative for 2–3 flagship
corridors (e.g. Tema–Aflao, Accra–Kumasi) where enough project-specific data exists, not
attempted programme-wide.

---

## 8. Verification protocol (the rigor mechanism)

Every claim in the dataset and report carries a `verification_status` tag, one of:

- **officially_announced** — stated by government (minister, MRH, MoFEP) but not yet in an
  approved budget line
- **budget_approved** — appears in a passed Appropriations Act / budget statement line item
- **expenditure_actual** — confirmed released/spent, per Ministry of Finance, Controller and
  Accountant-General, or Auditor-General reporting
- **procurement_stage** — contract awarded/under procurement per PPA or MRH disclosure
- **construction_stage** / **completed** — per MRH's own tracker or independently verified site
  reporting
- **political_claim** — a claim made by an office-holder or political actor (government or
  opposition) without independent corroboration — reported as a claim, attributed, never
  restated as fact
- **independently_verified** — corroborated by 2+ source types (e.g. government + IMF, or
  government + independent press investigation)
- **contradicted** — sources disagree; both versions logged with their sources, discrepancy
  flagged explicitly rather than silently resolved by picking one

This tagging is what lets the final dataset and report honestly distinguish "announced $10bn
programme" from "$X billion actually disbursed as of [date]" — the exact distinction the brief
requires and that the preliminary research already shows is contested (e.g., "no external debt"
vs. a reported $500m World Bank-funded component).

---

## 9. Expected charts and maps

- Bar chart: projects and cumulative funding by region (sequential, single-hue, matching the
  blog's existing chart convention)
- Bar chart: announced vs. released vs. spent, by year (grouped/paired bars)
- Choropleth map: funding-per-capita by region, and separately, projects-per-capita
- Ranked table/chart: project completion %, replicating and extending MRH's own Top/Bottom
  ranking with our verification layer added
- Scatter: regional funding vs. regional poverty rate / existing road density (correlation, not
  trend-line-implies-causation)
- Lorenz-curve-style chart alongside the Gini coefficient for regional funding distribution
- Contractor concentration chart (share of contract value by top N contractors)
- Timeline: project count and headline funding figure as reported at each successive
  announcement/budget point, visually showing the reconciliation problem from §1

---

## 10. Known data limitations (anticipated, stated upfront per the brief's own instruction)

- **No machine-readable open-data portal** appears to exist for Big Push specifically — data
  collection will mean scraping/transcribing structured facts out of government web pages, PDFs,
  and news reporting, not downloading a clean CSV. Expect real gaps at the constituency and
  coordinate level.
- **Project counts and figures already conflict across official sources and time** (32 vs. 77 vs.
  87 projects; domestic-only financing vs. a reported World Bank-funded component) — this is a
  finding to report, not an error to silently fix.
- **Auditor-General reporting lags** — likely no audited actual-expenditure figures will exist yet
  for a programme this new; expenditure data will mostly be Ministry-of-Finance-reported, which
  the report must label accordingly (not "audited").
- **Panel/before-after economic outcome data** (travel time, market access, local employment) is
  unlikely to be available in a form that supports rigorous causal estimation for a programme
  only ~1–1.5 years into implementation as of this writing — the report will say this plainly
  rather than manufacture a DiD result from insufficient data.
- **Political sensitivity** — Minority/government disagreement on procurement and financing is
  live and current; the report must attribute claims to their source and avoid adjudicating
  disputed facts itself.
- **Programme is a moving target** — because it's ongoing, any dataset is a dated snapshot;
  the repository structure (§3) and `snapshot_date` field (§6.1) exist specifically to make
  re-collection and comparison-over-time possible rather than pretending the dataset is final.

---

## 11. Proposed phasing (for subsequent prompts)

Given the scope, proposed delivery in phases rather than one pass:

1. **Phase 1 — source inventory & scaffold** (small, fast): create the repo skeleton per §3,
   populate `sources.md` with every source found so far plus systematic checks of the remaining
   official portals (GHA, DUR, DFR, PPA, Auditor-General, GSS, Bank of Ghana, World Bank project
   database, AfDB), and confirm which have Big-Push-specific disclosures.
2. **Phase 2 — dataset construction**: build `data/raw/` and `data/processed/projects.csv` from
   the MRH tracker and budget documents, applying the verification-status tagging as we go;
   flag every discrepancy found rather than resolving it unilaterally.
3. **Phase 3 — regional/statistical analysis**: descriptive stats, inequality measures,
   correlation analysis, charts and maps per §9.
4. **Phase 4 — economic/policy analysis**: theory of change, comparative section, risk
   assessment, illustrative cost-benefit for 2–3 flagship corridors.
5. **Phase 5 — report writing**: full report, executive summary, M&E framework, policy
   recommendations, open-questions section.

Each phase produces committable, reviewable output before the next begins, so you can redirect
at any point rather than receiving one large, hard-to-review drop at the end.

---

## 12. Open questions for you before Phase 1 begins

1. Confirm repo placement: proceed inside `blogpost` under `projects/ghana_big_push/` as scoped
   above, or should this live in a separate repository?
2. Should Phase 1 begin now, or do you want to review/amend this plan first?
3. Any specific regions, corridors, or time window (e.g. 2025 launch through a specific cutoff)
   you want prioritized first, given the full scope will take several phases either way?
