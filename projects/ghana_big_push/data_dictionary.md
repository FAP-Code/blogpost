# Data Dictionary

Defines every field in the processed datasets. Populated ahead of data collection (Phase 2) so
the schema is fixed before scraping begins — fields can be added later if a source reveals a
variable we didn't anticipate, but existing fields and their meanings should not change.

## `data/processed/projects.csv` — one row per project, per snapshot

| Field | Type | Allowed values / format | Notes |
|---|---|---|---|
| `project_id` | string | `BP-####` (our own ID) | Stable across snapshots for the same project; no official ID confirmed to exist |
| `snapshot_date` | date | `YYYY-MM-DD` | Which data-collection wave this row belongs to — the project list changes over time, so this is not optional |
| `project_name` | string | free text | As named by the source; note alternate names in `notes` if the same project appears under different names across sources |
| `project_type` | categorical | `road` \| `bridge` \| `interchange` \| `other` | |
| `road_category` | categorical | `trunk` \| `urban` \| `feeder` \| `not_applicable` | Matches MRH's own 74/10/3 trunk/urban/feeder breakdown |
| `region` | categorical | one of Ghana's 16 regions | |
| `district` | string | free text | Data gap expected for many rows |
| `constituency` | string | free text | Data gap expected for most rows |
| `start_location` | string | free text | |
| `end_location` | string | free text | |
| `length_km` | float | ≥ 0 | Null if not disclosed |
| `contractor` | string | free text | |
| `is_local_contractor` | boolean | `TRUE` \| `FALSE` \| null | Null if contractor nationality not disclosed/determinable |
| `procurement_method` | categorical | `competitive_tender` \| `single_source` \| `restricted_tender` \| `inherited_prior_admin` \| `unknown` | `inherited_prior_admin` for the ~23 projects absorbed from the previous administration |
| `contract_value_ghs` | float | ≥ 0, Ghana cedis | Convert and note exchange rate + date if source gives USD |
| `funding_source` | categorical | `gog_domestic` \| `world_bank` \| `afdb` \| `other_dfi` \| `mixed` \| `unknown` | |
| `announcement_date` | date | `YYYY-MM-DD`, partial dates allowed (`YYYY-MM`) | |
| `contract_award_date` | date | as above | |
| `commencement_date` | date | as above | |
| `expected_completion_date` | date | as above | |
| `status` | categorical | `announced` \| `procurement` \| `under_construction` \| `stalled` \| `completed` | |
| `pct_complete` | float | 0–100 | As reported by MRH tracker where available |
| `amount_released_ghs` | float | ≥ 0 | |
| `amount_spent_ghs` | float | ≥ 0 | Distinct from released — released ≠ spent |
| `beneficiaries_est` | integer | ≥ 0 | Only where disclosed (e.g. GMACP's 550,000 figure) |
| `jobs_est` | integer | ≥ 0 | Only where disclosed |
| `source_url` | string | URL | Primary citation for this row |
| `date_accessed` | date | `YYYY-MM-DD` | When we retrieved this data |
| `verification_status` | categorical | see `methodology.md` §1 | Required, non-null |
| `data_provenance` | categorical | `search_synthesis` \| `direct_scrape` \| `user_supplied` | See `methodology.md` §2.7 — this environment cannot directly fetch external pages, so every row so far is `search_synthesis` unless a document was pasted/supplied directly by the user |
| `notes` | string | free text | Alternate names, caveats, cross-references to the discrepancy log |

## `data/processed/regions.csv` — one row per region, per period

| Field | Type | Notes |
|---|---|---|
| `region` | categorical | one of Ghana's 16 regions |
| `period` | string | e.g. `2025Q4`, matching GSS quarterly MPI releases |
| `population_est` | integer | GSS source |
| `mpi_poverty_rate` | float | 0–100, GSS Multidimensional Poverty Index |
| `road_density_km_per_sqkm` | float | if a baseline road-network dataset is sourced |
| `agricultural_output_share` | float | share of regional economic output from agriculture, if available |
| `source_url` / `date_accessed` | string / date | |

## `data/processed/financing_timeline.csv` — one row per (year, figure-type, as-of-date) observation

Purpose: turn the funding-figure discrepancy (§ Discrepancy Log in `sources.md`) into structured,
chartable data rather than leaving it as prose.

| Field | Type | Notes |
|---|---|---|
| `year` | integer | Fiscal year the figure refers to |
| `figure_type` | categorical | `announced` \| `budget_approved` \| `released` \| `spent` \| `total_programme_estimate` |
| `amount_ghs` | float | |
| `as_of_date` | date | When this figure was stated |
| `source_url` / `date_accessed` | string / date | |
| `verification_status` | categorical | |

## `data/processed/prior_programmes.csv` — comparator programmes

| Field | Type | Notes |
|---|---|---|
| `programme_name` | string | e.g. "Sinohydro Bauxite Barter Arrangement" |
| `country` | string | |
| `start_year` | integer | |
| `total_value_usd` | float | |
| `financing_mechanism` | string | e.g. "barter", "concessional loan", "domestic budget" |
| `scope_summary` | string | |
| `outcome_summary` | string | what's known about completion/controversy/effectiveness |
| `source_url` / `date_accessed` | string / date | |
