# Ghana's Big Push Infrastructure Programme: A Data-Driven Policy Investigation

**Status: Phase 1 (source inventory) and Phase 2 (initial dataset construction) complete.
Regional/statistical analysis, economic/policy analysis, and report writing are Phases 3–5 — not
yet done. This README is rewritten as findings arrive; the version below describes the project's
actual current state, including its real limitations, not a polished final form.**

**Read this before using any number from this project:** a hard environment constraint was
discovered in Phase 2 — this session cannot directly fetch web pages (`WebFetch` is blocked at
the network layer for every domain tested, government sites and Wikipedia alike). Every figure in
`data/processed/` was built from `WebSearch` result summaries, not verbatim primary-source
scraping. This is tracked explicitly via a `data_provenance` field on every row. See
`methodology.md` §2.7 for full detail, and treat every dataset row as provisional until checked
against its cited primary source directly.

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

## Major findings so far (Phases 1–2)

Phases 1–2 were source inventory and initial dataset construction, not full analysis — so most of
these are findings *about the evidence base itself*, which is itself a legitimate research
product for a programme this contested:

1. **Basic facts are contested even in official channels.** Total project count has been reported
   as 32, 49, 50, 72, 77, 87, and 140 across different sources and dates — six-plus distinct
   figures for the same programme (see `sources.md` Discrepancy Log #1, #6). Any headline number
   used without a date and source attached should be treated as unreliable.
2. **A genuine primary-source project tracker exists** — MRH's own Big Push page publishes
   project-level completion rankings (Top 20/Mid/Bottom 20). Its content could not be directly
   scraped in this environment (see the constraint noted at the top of this file), so it remains
   the single highest-priority target for direct access in a future phase or session.
3. **Independent scrutiny is real and active**, not absent: IMANI Africa, the Ghana Institution
   of Engineering (which formally petitioned the Auditor-General over GH₵110bn in spending), civil
   society groups, and the Parliamentary Minority are all on record with specific, checkable
   concerns (procurement method mix, contract disclosure, the National Roads Authority Act's
   non-operationalization).
4. **No completed independent audit exists yet** — the GhIE's April 2026 petition confirms this
   directly; expenditure figures in the dataset carry `budget_approved` or `officially_announced`
   status, not `expenditure_actual`, until an audit or Controller and Accountant-General report is
   published.
5. **At least one funding-source tension is now well-documented but not resolved**: the "no
   external debt" messaging around Big Push's GHA-executed contracts (a claimed $5bn awarded)
   coexists with a real, separate $500m World Bank IDA credit (the Ghana Market Access and
   Connectivity Project, GMACP) discussed in the same political conversation — whether GMACP is
   formally counted as part of "Big Push" remains open (`sources.md` discrepancy #3).
6. **A single project may distort any "average project value" statistic**: the Accra-Kumasi
   Expressway alone is estimated at $4bn — close to 40% of the programme's entire headline $10bn
   figure — and uses a 50-year build-and-manage SPV structure distinct from the other named
   projects. Regional/per-project analyses in Phase 3 will need to treat it as an outlier
   explicitly, not average it in silently (discrepancy #7).
7. **A "longest bridge in Ghana" superlative was found applied inconsistently** to two different
   bridge projects across sources (Dambai, 1.49km, vs. Adawso-Ekye Amanfrom, 3.6km) — logged as
   both a data-quality flag and a small illustration of how unreliable single-superlative claims
   are without a primary-source check (discrepancy #5).
8. **A first real, partial project-level dataset now exists**: 17 named projects in
   `data/processed/projects.csv`, each with a source, access date, verification status, and
   explicit data-provenance tag — small relative to the 70+ projects officially claimed, but real
   and honestly scoped rather than fabricated to look complete.

## Limitations

- **Direct source scraping is not possible in this environment** (see the note at the top of this
  file and `methodology.md` §2.7). This is the single biggest constraint on data quality right
  now — every figure is one step removed from its primary document.
- No machine-readable open-data portal found for Big Push specifically, independent of the
  scraping constraint above.
- Auditor-General reporting lag means expenditure data will mostly be self-reported by government
  for the foreseeable future.
- Panel/before-after economic outcome data (travel time, market access, local employment) is
  unlikely to support rigorous causal estimation this early in implementation (~1–1.5 years in).
- The programme is a moving target; every dataset is a dated snapshot, hence the mandatory
  `snapshot_date` field throughout.
- No single closely-comparable "big push"-named peer programme was found in other African
  countries; the comparative section will lean on development-economics literature plus loosely
  comparable national programmes (Kenya/Ethiopia infrastructure strategy, Nigeria's Lekki
  Port/Lagos–Ibadan rail, the LAPSSET corridor) rather than a false one-to-one match.
- `data/processed/regions.csv` now has population figures for all 16 regions (2021 census), but
  exact MPI poverty rates for none (only qualitative "above 50%" for two regions, plus the
  national rate) — full regional poverty correlation analysis needs the underlying GSS MPI report
  (found but not fetchable — see `sources.md`).
- **Regional project/funding inequality (Gini coefficient, concentration index) was deliberately
  NOT computed in Phase 3.** `projects.csv` covers 17 of an officially claimed 70–140+ projects,
  sourced from whatever WebSearch happened to surface — a visibility-biased sample, not a
  representative one. Computing an inequality statistic on it would produce a real-looking number
  that measures news-coverage bias, not the programme's actual regional distribution. This is
  deferred, not skipped: revisit once the MRH tracker's full project table is retrievable. See
  `src/build_figures.py`'s `project_coverage_note()` for the exact figures behind this decision.

## Analysis and outputs (Phase 3)

Two charts and one summary table were generated by `src/build_figures.py`, using real pandas/
matplotlib (installed via `pip install -r requirements.txt` — `pypi.org` is reachable in this
environment even though arbitrary web fetching is not):

- `outputs/figures/population_by_region.svg` — all 16 regions, sourced, complete
- `outputs/figures/financing_claims_reconciliation.svg` — every distinct GHS funding figure found
  across Phases 1–2, plotted as separate bars (not averaged or reconciled to one number) — this is
  the discrepancy log turned into a chart, and is legitimate regardless of the project-level
  sample's incompleteness, since it doesn't depend on having every project, only on accurately
  recording every distinct claim
- `outputs/tables/regional_summary.csv` — clean population + poverty summary per region

While building the financing chart, a real bug surfaced and is worth noting for anyone extending
this script: two funding claims share the literal label `"2025 - budget_approved"` (GH₵13.8bn and
GH₵13.9bn) and two share `"2026 - budget_approved"` (GH₵30.5bn and GH₵30.8bn). Plotting these with
matplotlib's categorical string y-axis silently collapsed same-text rows onto one bar position —
exactly the kind of silent data loss this project's methodology is built to avoid. Fixed by
plotting on integer row positions and attaching label text only as a display tick label, so
duplicate-looking claims never overwrite each other.

## Reproduction instructions

```bash
cd projects/ghana_big_push
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python src/validate_datasets.py   # checks data/processed/*.csv against data_dictionary.md
python src/build_figures.py       # regenerates outputs/figures/ and outputs/tables/
```

`notebooks/` is still empty by choice — see `notebooks/README.md` for why Phase 3's analysis was
implemented as a plain script instead.

## Roadmap

See `research-plan.md` §11 for the full 5-phase plan. Phase 1 covered source inventory and
repository scaffolding. Phase 2 built the first real dataset from what `WebSearch` could retrieve
and documented the `WebFetch` environment constraint. Phase 3 (this commit) filled in remaining
region population data, built the legitimate descriptive charts/tables, and explicitly deferred
regional-equity statistics rather than computing them on a non-representative sample. Next: Phase
4, economic/policy analysis (theory of change, comparative section, implementation risk
assessment, illustrative cost-benefit for 2–3 flagship corridors).
