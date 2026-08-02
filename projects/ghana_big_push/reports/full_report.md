# Ghana's Big Push Infrastructure Programme: Full Research Report

**Prepared:** 2026-08-02, across 5 research phases in a single working session. **This is a
Phase-1-through-5 evidence base, not a final, audited verdict on the programme.** Every section
below states what's known, what's claimed-but-contested, and what simply isn't knowable yet from
the sources this research could access. See §12 for the complete list of what would need to
happen next to close the remaining gaps.

---

## 1. Executive summary

Ghana's "Big Push" is the Mahama administration's (in office since January 2025) flagship
infrastructure programme: a headline $10 billion, multi-year commitment to roads and bridges
across all 16 regions, framed as a response to an estimated $1.5 billion annual road-sector
financing gap. Annual budget allocations rose from ~GH₵13.9 billion in 2025 to a reported
GH₵30–30.8 billion in 2026.

**The programme's basic facts are contested even in official channels.** Across this research,
total project count was reported as 32, 49, 50, 72, 77, 87, and 140 in different announcements —
seven distinct figures for the same programme, depending on date, scope (GHA-only vs.
all-Ministry-of-Roads-and-Highways), and political context. Total programme value similarly
ranges from a simple sum of annual budget lines (~GH₵43bn+ "committed since taking office") to a
civil-society-cited GH₵110bn total scale. Neither figure is resolved by this research; both are
logged, attributed, and left open (§8, discrepancy log).

**What is well-established:** a real primary-source project tracker exists (the Ministry of Roads
and Highways' own Big Push page, publishing project-level completion rankings); independent
scrutiny is active and substantive (IMANI Africa, the Ghana Institution of Engineering — which
formally petitioned the Auditor-General over GH₵110bn in spending — civil society groups, and the
Parliamentary Minority); and no completed independent audit exists yet.

**What is not yet knowable:** the programme's actual economic effects. Most projects are early in
construction (the most closely tracked bridge was at 6% physical progress as of June 2026), so
no before/after outcome data (travel time, market access, local employment) exists to evaluate
against. Any claim about Big Push's economic impact at this stage is a projection from a stated
theory of change, not a measured result — and this report treats it as such throughout.

**A material research-process finding**: this research was conducted entirely via `WebSearch`,
because direct web page retrieval (`WebFetch`) was blocked at the network layer in the working
environment for every domain tested — government sites and Wikipedia alike. Every figure in this
report is therefore one step removed from its primary source (a search-engine synthesis of it),
not a verbatim scrape. This is documented throughout via a `data_provenance` field on every
dataset row, and is the single biggest constraint on this report's precision (§11, §12).

## 2. Background and problem statement

See `research-plan.md` §1 for the full background narrative with citations. In brief: Big Push
sits within a stated policy lineage running through the National Development Planning
Commission's Ghana Infrastructure Plan, and follows a prior nationwide infrastructure push
(the Sinohydro Bauxite Barter Arrangement, 2018– ) that drew structurally similar political
criticism. Ghana's macro-fiscal position — a completed IMF Extended Credit Facility, a 42.2%
debt-to-GDP ratio (Feb 2026) against a legislated 45% anchor by 2034, and a new 36-month Policy
Coordination Instrument — is the fiscal envelope this spending sits inside.

## 3. Programme scope

- **Sectors**: primarily roads and bridges, administered through the Ministry of Roads and
  Highways' constituent agencies (Ghana Highway Authority for trunk roads, Department of Urban
  Roads, Department of Feeder Roads — the latter separately administering a GH₵828m/1,000km
  "agricultural enclave roads" allocation).
- **Regional coverage**: officially "all 16 regions" by design. Actual project-level regional
  coverage in this research's dataset (17 named projects) spans 13 distinct region values — a
  sampling artifact of what WebSearch surfaced, not evidence about the true distribution (§6).
- **Project count over time**: see §8's discrepancy log entries #1 and #6. The most-cited recent
  figures are 87 projects (74 trunk roads/bridges + 10 urban + 3 feeder, per MRH/DUR coverage,
  July 2026) and 140 projects (a procurement-focused breakdown: 66 single-source + 51 restricted
  tender + 23 inherited from the prior administration).
- **A single project's outsized share**: the Accra–Kumasi Expressway alone is estimated at ~$4bn —
  close to 40% of the programme's entire $10bn headline value — structured as a 50-year
  build-and-manage SPV, distinct from the rest of the programme's financing approach.

## 4. Financing: announced vs. approved vs. released vs. spent

Full detail and every individual figure with its source: `data/processed/financing_timeline.csv`
and the chart at `outputs/figures/financing_claims_reconciliation.svg`. Summary:

| Figure type | Amount | As of | Status |
|---|---|---|---|
| 2025 budget allocation | GH₵13.85–13.9bn (both figures found) | 2025-09 | `budget_approved` |
| 2026 budget allocation | GH₵30.5–30.8bn (both figures found) | 2025-11 | `budget_approved` |
| Programme headline total | $10bn | 2025-09 launch | `officially_announced` (multi-year target, not a single-year spend) |
| Civil-society-cited total scale | GH₵110bn (~GH₵85bn "already committed") | 2026-04 | `political_claim` (GhIE petition framing) |
| Contracts awarded (government claim) | $5bn, "no external debt" | 2026-07 | `officially_announced` |
| GMACP (World Bank) | $500m IDA + $23m GoG = $523m | 2026-05-28 approval | `independently_verified` — relationship to "Big Push" as a label is unresolved |
| Inherited stalled projects | GH₵14.8bn (~23 projects) | 2026 | `officially_announced` |

**No `expenditure_actual`-tagged figure exists in this dataset.** Everything above is announced,
budgeted, or claimed — not confirmed spent. This reflects the absence of a completed audit (§8),
not a gap in this research's search effort.

## 5. Procurement and project selection

Government sources report >90% of Big Push contracts awarded through competitive tendering, with
the remainder split between single-source and restricted tendering — but the exact split is
itself contested (66 single-source + 51 restricted of 140 total, per one procurement-focused
count, versus a separately reported 51 sole-sourced + 21 restricted of 72 GHA-specific project
approvals). A government/PPA-linked investigation concluded no procurement abuse occurred; the
Ghana Institution of Engineering formally petitioned the Auditor-General for an independent
technical audit over the same set of facts; the Parliamentary Minority is demanding full
per-contract disclosure (contractor identity, scope, unit-cost-per-km). The National Roads
Authority Act (2024), which the Minority argues would strengthen independent oversight, is
reported as not yet operationalized.

**This is presented as an active, attributed dispute, not a resolved finding either way** — see
§8, discrepancy #4.

## 6. Regional distribution analysis

Population data (2021 census) is complete for all 16 regions (`data/processed/regions.csv`,
chart at `outputs/figures/population_by_region.svg`). Exact regional MPI poverty rates are **not**
available from this research beyond a qualitative "above 50%" for North East and Savannah regions
(against a 21.9% national rate, 2025 Q3) — the full GSS regional MPI report was located
(`sdgsghana.gov.gh`) but could not be directly retrieved (§11).

**A regional funding/project-count inequality statistic (Gini coefficient or concentration index)
was deliberately not computed.** The project-level dataset (17 of an officially claimed 70–140+
projects) is a WebSearch-visibility sample — it reflects which projects got news coverage, not the
true regional distribution of Big Push spending. Computing an inequality measure on it would
produce a real-looking number that measures search-engine visibility bias, not the programme's
actual regional equity. This is deferred, explicitly, pending direct access to MRH's full project
tracker (§12) — not silently skipped and not faked to look complete.

## 7. Economic impact channels and theory of change

Full detail: `reports/phase4_economic_policy_analysis.md` §1. Summary: the evidence base is
strong for Inputs and Activities (budget figures, procurement splits, project counts — with the
caveats above), thin for Outputs (only 17 of 70+ projects have any public completion data), and
essentially nonexistent for Outcomes and Impacts (no before/after travel-time, market-access, or
employment data exists for any Big Push corridor, because most are too early in construction).
**Any employment, market-access, or poverty-reduction claim attributed to Big Push at this point
in time is a projection from the stated theory of change, not a measured finding** — this
distinction is the report's single most important methodological guardrail, and applies to every
number that follows from it.

## 8. Comparative analysis

Full detail: `reports/phase4_economic_policy_analysis.md` §2. Summary: the Sinohydro Bauxite
Barter Arrangement (2018– ) is the genuine within-country comparator — same all-16-regions scope,
and the same opposition figure (Kwame Agbodza) raising structurally similar transparency
objections to both programmes. No closely comparable *named* peer programme was found in other
African countries; the comparative frame instead draws on development-economics "big push"
theory (Rosenstein-Rodan and its African applications) rather than forcing a false equivalence
with structurally different programmes (LAPSSET, Nigeria's Lekki Port, Ethiopia's growth
strategy).

## 9. Implementation risk assessment

Full detail: `reports/phase4_economic_policy_analysis.md` §3. Five risk categories, each tied to a
specific documented finding rather than a generic checklist:

1. **Debt sustainability** — 42.2% debt-to-GDP (Feb 2026) vs. the 45% legislated anchor; only
   1.4% of GDP in capital spending (Dec 2025) against a GH₵30.8bn 2026 allocation; unresolved
   tension between "no external debt" messaging and the confirmed $500m World Bank credit.
2. **Procurement** — the direct government-vs-GhIE/Minority contradiction (§5).
3. **Delivery capacity** — GHA's own workers publicly flagging obsolete equipment and poor
   logistics as a risk to the programme (May 2026).
4. **Cost concentration** — the Accra–Kumasi Expressway's ~40% share of the programme total,
   which should be isolated in any aggregate statistic rather than blended in.
5. **Maintenance** — no post-completion maintenance funding plan was found for Big Push assets at
   all. Flagged as an evidence gap in this research, not assumed to be absent in reality, but its
   absence from every source checked is itself notable given Ghana's documented history of
   under-maintained road infrastructure.

## 10. Monitoring and evaluation framework

Ghana already has a relevant institutional foundation to build on, rather than needing one
invented from scratch: the National Development Planning Commission (NDPC) developed the Ghana
Infrastructure Plan that Big Push is described as implementing, co-leads Big Push implementation
alongside the Ministry of Finance and Parliament, publishes Annual Progress Reports as its
constitutional M&E mandate, and — per its own Director for Monitoring and Evaluation — is actively
shifting its Results Framework from input/output indicators toward outcome/impact indicators.
IMANI Africa has separately, and specifically, recommended that NDPC be given independent
authority to enforce cross-ministry adherence.

**Recommended M&E architecture, building directly on what already exists:**

1. **A single, authoritative, dated project register** — resolving discrepancy #1/#6 by having
   MRH or NDPC publish one canonical project list with a version/snapshot date on every update,
   rather than leaving the count to be reconstructed from scattered announcements as this
   research had to do.
2. **Quarterly financial reconciliation** — approved vs. released vs. spent, published together
   (not just approved figures), closing the gap identified in §4.
3. **Per-project physical progress**, extending what MRH's tracker already does (Top 20/Mid/
   Bottom 20 rankings) to cover the full register, not a partial one.
4. **NDPC given explicit, resourced authority** to enforce cross-ministry M&E adherence, per
   IMANI's specific recommendation — this is the single highest-leverage institutional change
   identified across all sources reviewed.
5. **A published maintenance-funding plan** attached to each project before or at completion,
   closing the gap identified in §9.5.
6. **A committed baseline-and-follow-up outcome evaluation** (travel time, market access, local
   employment) for the first cohort of completed corridors — the only way the Outcomes/Impacts
   columns of the theory of change (§7) will ever have real evidence behind them, rather than
   permanently remaining a projection.

## 11. Data limitations (consolidated)

- **No direct source scraping was possible in this environment** (`WebFetch` blocked network-wide;
  confirmed against MRH, IMF, and Wikipedia). Every figure in this report is a `WebSearch`
  synthesis of a primary source, not a verbatim pull from it. This is the single largest
  constraint on this report's precision.
- No machine-readable open-data portal exists for Big Push specifically, independent of the above.
- No completed independent audit exists yet (GhIE's petition is pending).
- Regional MPI poverty rates are exact for 0 of 16 regions in this dataset (qualitative-only for
  2).
- The project-level dataset (17 rows) is a small, visibility-biased sample of an officially
  claimed 70–140+ projects.
- No project has disclosed per-km contract cost, precise dates for all lifecycle stages, and a
  completion percentage simultaneously — the fields needed for a genuine progress-vs-cost
  analysis exist, but never all at once for the same project, in what this research retrieved.

## 12. Unanswered questions and next steps

In priority order, if pursued with either direct document access or a different session/tool
configuration:

1. **Directly retrieve MRH's full Big Push project tracker table** (not just search-summarized) —
   resolves the project-count discrepancy and would allow the regional-equity analysis this
   report explicitly deferred (§6).
2. **Retrieve the GhIE Auditor-General petition document itself** — clarifies the GH₵110bn figure's
   methodology and scope (§4).
3. **Retrieve Parliament of Ghana's Hansard record directly** for the March 24, 2026 Roads
   Minister statement and any committee reports, rather than relying on news paraphrase.
4. **Retrieve the World Bank's GMACP project appraisal document** — the single most likely source
   of real project-level cost-benefit figures found in this research (§4 of the Phase 4 report),
   and would clarify whether GMACP is formally counted as part of Big Push.
5. **Retrieve the full GSS Multidimensional Poverty Report** (`sdgsghana.gov.gh`, located but not
   fetchable) — enables genuine regional poverty correlation analysis.
6. **Await and retrieve the Auditor-General's eventual audit report**, if and when GhIE's petition
   produces one — this would be the first `expenditure_actual`-tagged data this project could use.
7. **Revisit this entire research package in 12–18 months**, once more Big Push projects reach
   completion, to begin the outcome evaluation described in §10, recommendation 6 — the theory of
   change's later stages cannot be evidenced any sooner than that, regardless of research effort.

## 13. Policy recommendations

Numbered in the same style as this repo's existing "Beyond Cocoa" research series — each names a
responsible actor and what "done" looks like, not a general call for "more transparency":

**R1. Publish one authoritative, dated project register.** MRH/NDPC jointly publish a single
canonical Big Push project list, versioned by snapshot date, resolving the project-count
discrepancy directly rather than leaving it to public reconstruction. *Target: immediate — this
requires publishing existing internal data, not new work.*

**R2. Publish quarterly approved/released/spent reconciliation.** Ministry of Finance extends its
existing budget reporting to show all three figures together, every quarter, for Big Push
specifically. *Target: next fiscal quarter.*

**R3. Resolve and publicly state GMACP's relationship to "Big Push."** MRH/MoFEP clarify, in one
official statement, whether the $500m World Bank-financed GMACP is counted within Big Push's
headline figures or reported as a separate, parallel programme — ending the ambiguity found
throughout this research. *Target: immediate.*

**R4. Commission and publish the GhIE-requested independent audit.** Auditor-General acts on the
April 2026 petition; findings published, not just the fact that an audit occurred. *Target: as
GhIE's petition timeline allows.*

**R5. Operationalize the National Roads Authority Act (2024).** Ministry of Roads and Highways
implements the independent procurement-oversight body the Act already created in law, closing the
gap the Minority has specifically flagged. *Target: within the current fiscal year.*

**R6. Give NDPC explicit, resourced cross-ministry M&E authority**, per IMANI Africa's specific
recommendation — the single highest-leverage institutional change identified in this research.
*Responsible: Office of the President, Parliament (legislative backing if needed). Target: aligned
with NDPC's own ongoing Results Framework transition.*

**R7. Publish a maintenance-funding plan per completed project**, before or at handover — closing
the gap this research found completely undocumented across every source checked. *Responsible:
MRH, Ministry of Finance. Target: attached to the first cohort of projects nearing completion.*

**R8. Commission a baseline-and-follow-up outcome evaluation** for the first completed corridors
(travel time, market access, local employment), so the programme's actual economic effects can
eventually be measured rather than permanently projected. *Responsible: NDPC, with technical
support from a development partner (World Bank/AfDB) given the specialized survey design
required. Target: baseline survey before any corridor in the current cohort completes.*

## 14. Bibliography

Full bibliography with access dates and the live discrepancy log: `sources.md`. Summary by tier:
Tier 1 (official GoG — MRH, MoFEP, GHA, DUR, DFR, PPA, Auditor-General, GSS, Bank of Ghana, NDPC,
Parliament), Tier 2 (IMF, World Bank, AfDB), Tier 3 (IMANI Africa, GhIE, CSOs, Parliamentary
Minority), Tier 4 (news, triangulation only), plus geospatial (HDX Ghana COD-AB) and comparator
programme sources (Sinohydro, LAPSSET).
