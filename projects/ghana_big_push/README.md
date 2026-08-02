# Ghana's Big Push Infrastructure Programme: A Data-Driven Policy Investigation

**Status: Phase 1 complete (source inventory + scaffold). Data collection, dataset construction,
and analysis are Phases 2–5 — not yet done. This README will be rewritten as findings arrive; the
version below describes the project's purpose and current state honestly, not its finished form.**

## Background

Ghana's "Big Push" is the Mahama administration's (in office since January 2025) flagship
infrastructure programme — a multi-billion-cedi commitment to roads and bridges, framed publicly
as a response to an estimated $1.5 billion annual road-sector financing gap. Budget allocations
rose from roughly GH₵13.9 billion in 2025 to a reported GH₵30–30.8 billion in 2026. It is an
active, live, politically contested programme, not a settled historical episode — see
`sources.md`'s Discrepancy Log for the specific facts already found in conflict across official
and near-official sources during Phase 1 (total project count alone has been reported as 32, 50,
72, 77, 87, and 140 in different announcements).

This project treats that contestation as the actual subject of study, not noise to clean away.
The goal is a reproducible dataset and report that clearly separates what's been announced from
what's been budgeted, from what's been spent, from what's a political claim by either side —
and states plainly where the evidence needed to judge the programme simply doesn't exist yet.

## Research objectives

See `research-plan.md` §2 for the full 10-question research brief. In short: what the programme
is and why; its project/sectoral/regional scope; funding announced vs. approved vs. released vs.
spent; financing mechanisms and timelines; project selection/procurement/M&E process; likely
economic effects via an explicit theory of change; regional/district equity of distribution;
implementation risks (debt, procurement, delay, maintenance, political); comparison with prior
Ghanaian and peer African programmes; and what evidence would be needed to judge success.

## Data sources

Full bibliography with access dates and a live discrepancy log: `sources.md`. Tier 1 (official
GoG: MRH, MoFEP, GHA, DUR, DFR, PPA, Auditor-General, GSS, Bank of Ghana, NDPC, Parliament),
Tier 2 (IMF, World Bank, AfDB), Tier 3 (IMANI Africa, GhIE, CSOs, Parliamentary Minority), Tier 4
(news, triangulation only). Geospatial boundaries from HDX's Ghana COD-AB dataset.

## Methodology

Full detail in `methodology.md`. Core mechanism: every claim carries a `verification_status` tag
(`officially_announced` / `budget_approved` / `expenditure_actual` / `procurement_stage` /
`construction_stage` / `completed` / `political_claim` / `independently_verified` /
`contradicted`), so the dataset itself encodes the distinction the research brief requires,
rather than leaving it to prose caveats that are easy to lose track of at scale.

Analytical methods are scoped by confidence level, not by ambition — descriptive statistics and
regional-equity measures (Gini/concentration index) are high-confidence and will be delivered in
full; causal methods like difference-in-differences are explicitly out of scope because a
programme reaching all 16 regions simultaneously has no credible control group, and forcing that
analysis would produce a number that looks rigorous but isn't. See `methodology.md` §2 for the
full breakdown of what's attempted, what's illustrative-only, and what's excluded and why.

## Repository structure

```
projects/ghana_big_push/
├── README.md              # this file
├── research-plan.md        # the original scoping plan (Phase 0 deliverable)
├── methodology.md          # verification protocol + analytical methods
├── sources.md              # full bibliography + live discrepancy log
├── data_dictionary.md       # schema for every processed dataset
├── requirements.txt         # Python dependencies
├── data/
│   ├── raw/                 # unmodified source snapshots, one subfolder per source
│   └── processed/           # analysis-ready CSVs per data_dictionary.md
├── notebooks/                # phase-numbered exploratory + analysis notebooks
├── src/                      # reusable Python modules (scraping, cleaning, analysis, plotting)
├── outputs/
│   ├── figures/               # charts (SVG/PNG)
│   └── tables/                # summary tables (CSV/Markdown)
├── reports/
│   ├── full_report.md          # comprehensive research report (Phase 5)
│   └── executive_summary.md    # policymaker/general-audience summary (Phase 5)
└── references/                # archived source documents (budget PDFs, IMF reports, etc.)
```

## Major findings so far (Phase 1 only)

Phase 1 was source inventory, not analysis — so these are findings *about the evidence base*,
not yet findings about the programme's performance:

1. **Basic facts are contested even in official channels.** Total project count and total
   programme value both vary substantially by source and date (see `sources.md` Discrepancy Log).
   Any headline number used without a date and source attached should be treated as unreliable.
2. **A genuine primary-source project tracker exists** — MRH's own Big Push page publishes
   project-level completion rankings. This is the backbone of the Phase 2 dataset.
3. **Independent scrutiny is real and active**, not absent: IMANI Africa, the Ghana Institution
   of Engineering (which formally petitioned the Auditor-General), civil society groups, and the
   Parliamentary Minority are all on record with specific, checkable concerns (procurement method
   mix, contract disclosure, the National Roads Authority Act's non-operationalization).
4. **No completed independent audit exists yet** — the GhIE's April 2026 petition confirms this
   directly; expenditure figures in the dataset will mostly carry `budget_approved` or
   `officially_announced` status, not `expenditure_actual`, until an audit or Controller and
   Accountant-General report is published.
5. **At least one funding-source tension has a documented resolution**: the "no external debt"
   messaging around Big Push's GHA-executed contracts coexists with a real, separate $500m World
   Bank IDA credit (the Ghana Market Access and Connectivity Project) discussed in the same
   political conversation — whether GMACP is formally counted as part of "Big Push" is an open
   Phase 2 question, not yet resolved.

## Limitations (known as of Phase 1)

- No machine-readable open-data portal found for Big Push specifically; Phase 2 data collection
  will involve structured extraction from web pages, PDFs, and news reporting.
- Auditor-General reporting lag means expenditure data will mostly be self-reported by government
  for the foreseeable future.
- Panel/before-after economic outcome data (travel time, market access, local employment) is
  unlikely to support rigorous causal estimation this early in implementation (~1–1.5 years in).
- The programme is a moving target; every dataset is a dated snapshot, hence the mandatory
  `snapshot_date` field throughout.
- No single closely-comparable "big push"-named peer programme was found in other African
  countries; the comparative section will lean on development-economics literature plus loosely
  comparable national programmes (Kenya/Ethiopia infrastructure strategy, Nigeria's Lekki
  Port/Lagos–Ibadan rail) rather than a false one-to-one match.

## Reproduction instructions

Not yet applicable — `src/` and `notebooks/` are empty pending Phase 2. Once populated:

```bash
cd projects/ghana_big_push
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
jupyter notebook notebooks/
```

## Roadmap

See `research-plan.md` §11 for the full 5-phase plan. Phase 1 (this commit) covered source
inventory and repository scaffolding. Next: Phase 2, dataset construction from the MRH tracker
and budget documents, applying the verification-status tagging throughout.
