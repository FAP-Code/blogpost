# notebooks/

Empty by choice, not by omission. Phase 3's analysis (`population_by_region_chart`,
`financing_claims_chart`, `regional_summary_table`) is implemented as a plain, repeatable script —
`src/build_figures.py` — rather than an interactive Jupyter notebook, because there was no
exploratory back-and-forth involved: the transformations are a straight read → compute → plot
pipeline over `data/processed/`, which a script expresses more reproducibly than a notebook would
(no risk of out-of-order cell execution affecting the committed output).

If a future phase involves genuine open-ended exploration (e.g. testing several candidate
groupings or model specifications before settling on one), that's what this folder is for —
numbered by phase (e.g. `03_regional_exploration.ipynb`), with the final, settled logic promoted
into `src/` once it's stable, per `methodology.md` §4.
