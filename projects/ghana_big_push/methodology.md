# Methodology

## 1. Verification protocol

Every factual claim that enters the dataset or report is tagged with a `verification_status`.
This is the mechanism that keeps "announced" separate from "spent," and "government said" separate
from "confirmed." No claim is restated as fact just because it appears in an official press
release — official sources get the same scrutiny as any other, they just carry more institutional
weight when uncontested.

| Tag | Meaning | Example |
|---|---|---|
| `officially_announced` | Stated by government (minister, MRH, MoFEP) but not yet in an approved budget line | A minister's speech naming a new project before it appears in a budget statement |
| `budget_approved` | Appears in a passed Appropriations Act / budget statement line item | The GH₵30bn 2026 Big Push allocation in the budget statement |
| `expenditure_actual` | Confirmed released/spent, per MoF, Controller and Accountant-General, or Auditor-General reporting | Not yet found for Big Push as of Phase 1 — expect this tag to be rare early in the dataset |
| `procurement_stage` | Contract awarded / under procurement, per PPA or MRH disclosure | The 66 single-source / 51 restricted-tender breakdown |
| `construction_stage` / `completed` | Per MRH's own tracker or independently verified reporting | The Top 20/Bottom 20 completion-percentage rankings |
| `political_claim` | Stated by an office-holder or political actor (government or opposition), no independent corroboration | "No external debt was contracted" / "the process was abused" |
| `independently_verified` | Corroborated by 2+ source types (e.g., government + IMF, or government + independent press investigation) | The $500m World Bank GMACP figure (government announcement + World Bank press release agree) |
| `contradicted` | Sources disagree; both logged, discrepancy stated explicitly | Total project count (32/50/72/77/87/140) |

Practically: the `sources.md` **Discrepancy Log** is not cleanup work for later — it is a primary
research output. A dataset row with a `contradicted` status and both conflicting source citations
is more valuable to this project than a false single number.

## 2. Analytical methods — scoped to what the data can support

Per the brief's own instruction not to force causal conclusions past the evidence, methods below
are grouped by confidence, not by ambition.

### 2.1 Descriptive (high confidence — proceed as planned)
- Projects and cumulative announced/approved/released funding by region, road category, and
  procurement method
- Project value per km, where both length and contract value are disclosed
- Contractor concentration (share of contract value by top-N contractors; Herfindahl-Hirschman
  Index as a summary statistic)
- Urban vs. rural / trunk vs. feeder split of project count and value
- Completion-percentage distribution, replicating and extending MRH's own tracker

### 2.2 Regional equity analysis (high confidence)
- Gini coefficient and/or concentration index on funding-per-capita and projects-per-capita by
  region, using GSS population figures as the denominator
- Correlation (explicitly labeled as correlation, not a causal claim) between regional allocation
  and: population, GSS multidimensional poverty rate, existing road density (if a road-network
  baseline dataset can be sourced), agricultural output share

### 2.3 Timeline / discrepancy reconciliation (high confidence, and a genuine contribution)
- A time-series reconstruction of "as-of-date X, N projects were reported, worth Y" across every
  source snapshot found — turning the Discrepancy Log into a structured, chartable dataset rather
  than a prose caveat

### 2.4 Geospatial (medium confidence — depends on location precision in source data)
- Choropleth mapping of funding-per-capita and projects-per-capita by region, using the HDX
  COD-AB boundary set
- Point/corridor mapping of named projects, geocoded by place name where coordinates aren't
  directly published (accepting reduced precision, documented as such)

### 2.5 Illustrative, not programme-wide (explicit scope limits)
- **Cost-benefit analysis**: attempted only for 2–3 flagship, well-documented corridors (e.g.
  Tema–Aflao, Accra–Kumasi), not the full programme, because per-project cost/benefit data of
  sufficient quality is unlikely to exist for all 70+ projects
- **Employment multiplier estimation**: uses published external multipliers (World Bank/ILO
  infrastructure-employment literature), explicitly labeled as an applied external assumption,
  not a multiplier estimated from this programme's own data (no Ghana Big Push input-output table
  exists publicly)
- **Debt-sustainability sensitivity**: qualitative/scenario framing using IMF's already-published
  DSA parameters (debt anchor, primary surplus target), not an original DSA re-estimation — we do
  not have the IMF's full underlying model

### 2.6 Explicitly out of scope, and why
- **Difference-in-differences / regional panel-data causal estimation**: would require multiple
  periods of comparable regional economic outcome data before and after the programme, plus a
  credible control-group identification strategy. For a programme reaching all 16 regions
  simultaneously, there is no untreated control region by design — attempting DiD here would
  produce a number that looks rigorous but isn't. The report will state this limitation directly
  rather than present an unsupported estimate.

## 2.7 Environment constraint discovered in Phase 2 (material — read before using any dataset row)

`WebFetch` (direct URL retrieval) is unavailable in this working environment: it returns HTTP 403
for every domain tested, including MRH, IMF, and Wikipedia — confirmed to be a sandbox network
policy, not a per-site block (the CONNECT tunnel itself is rejected at the proxy layer). Only
`WebSearch` (a search-API-mediated tool that returns synthesized snippets, not raw pages) is
available.

Practical consequence: no dataset row in this project is built from a directly scraped primary
document (raw HTML table, PDF text extraction, Hansard record). Every row traces back to a
**WebSearch query result** — typically itself a synthesis of one or more news/government pages,
not a verbatim primary-source pull. This is a materially different (weaker) evidentiary basis
than `methodology.md` originally specified, and it is reflected in two ways:

- A new `data_provenance` field (see `data_dictionary.md`) on every processed row, distinct from
  `verification_status`: `search_synthesis` (built from WebSearch summaries) vs. `direct_scrape`
  (would require primary-document access this environment does not have).
- Every row's `verification_status` is capped at what a search-engine synthesis can actually
  support — many facts that would otherwise be `expenditure_actual` or `completed` if read
  directly off MRH's tracker table are instead tagged conservatively, because we are one step
  removed from the primary source.

**If more complete/higher-fidelity data is wanted**, the fastest path is for the primary
documents to be supplied directly (e.g. the user saving `mrh.gov.gh/big-push-infrastructure-programme/`
as HTML/PDF and sharing it, or pasting the 2026 budget statement's road-project annex) rather
than continued reliance on search-engine synthesis, which has a real ceiling on granularity (it
will not, for instance, reliably return a full 87-row project table with per-project contract
values — it returns whatever named examples and summary statistics happen to appear in indexed
news coverage).

## 3. Data provenance rules

- `data/raw/` holds unmodified source material (saved HTML/PDF snapshots, or verbatim scraped
  tables), one subfolder per source, named after the source (e.g. `data/raw/mrh_tracker/`,
  `data/raw/mofep_budget/`).
- `data/processed/` holds only data that traces back to a `data/raw/` file or an explicitly cited
  URL — no manually transcribed figures without a citation attached in the same row.
- Every `data/processed/*.csv` row carries `source_url`, `date_accessed`, and
  `verification_status` per the schema in `data_dictionary.md`.
- Geospatial joins use HDX COD-AB as the boundary source of record; GADM is a cross-check only.

## 4. Reproducibility

All analysis code lives in `src/` (reusable functions) and `notebooks/` (phase-numbered,
exploratory-to-final). Notebooks import from `src/`, not the reverse, so the same cleaning logic
isn't duplicated between exploration and final output generation. See `README.md` for run
instructions once `src/` and `notebooks/` are populated in Phase 2 onward.
