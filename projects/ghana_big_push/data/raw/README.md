# data/raw/

Empty by design as of Phase 2, not an oversight.

This folder is meant to hold unmodified source snapshots (saved HTML, PDFs, scraped tables) —
see `methodology.md` §3. But direct source retrieval (`WebFetch`) is blocked at the network layer
in this working environment for every domain tested (see `methodology.md` §2.7), so nothing has
been fetched and saved verbatim yet. Everything currently in `data/processed/` was built from
`WebSearch` result summaries instead, which is a materially different (weaker) evidentiary basis
— tracked explicitly via the `data_provenance` field on every row.

If primary documents become available (e.g. supplied directly by the user, or if a future session
has working `WebFetch`/browser access), they should be saved here first, one subfolder per source
(e.g. `data/raw/mrh_tracker/`, `data/raw/mofep_budget_2026/`), before being parsed into
`data/processed/`.
