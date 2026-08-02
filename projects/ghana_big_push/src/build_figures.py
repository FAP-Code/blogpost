"""Generate outputs/figures/*.svg and outputs/tables/*.csv from data/processed/.

Usage:
    python src/build_figures.py

Deliberately does NOT compute a regional Gini/concentration index on projects.csv or attempt a
full regional-equity ranking. As of Phase 3, projects.csv covers 17 of an officially claimed
70-140+ projects, sourced entirely from what WebSearch happened to surface (i.e. whichever
projects got news coverage) - not a random or representative sample of the true regional
distribution. Computing an inequality statistic on that data would produce a real-looking number
that measures search-engine visibility bias, not the programme's actual regional distribution.
See methodology.md sec2.2 and the note printed by this script.

What IS legitimate on current data and is built here:
- Population by region (a real, ~complete, sourced dataset - data/processed/regions.csv)
- The financing-claims reconciliation chart (visualizing the discrepancy log itself, which is a
  genuine research finding regardless of project-level sample completeness)
"""

from __future__ import annotations

from pathlib import Path

import matplotlib
import numpy as np
import pandas as pd

matplotlib.use("svg")
import matplotlib.pyplot as plt

PROJECT_DIR = Path(__file__).resolve().parent.parent
PROCESSED = PROJECT_DIR / "data" / "processed"
FIGURES = PROJECT_DIR / "outputs" / "figures"
TABLES = PROJECT_DIR / "outputs" / "tables"

# Sequential single-hue palette, per this repo's dataviz convention for magnitude comparisons
# (one hue, light->dark is not needed here since all bars represent the same measure - see
# choosing-a-form.md: "Compare magnitude -> bar/column; color job: sequential (one hue)").
BAR_COLOR = "#184f95"
GRID_COLOR = "#d9d9d9"
TEXT_COLOR = "#1a1a1a"
MUTED_COLOR = "#595959"


def population_by_region_chart() -> None:
    df = pd.read_csv(PROCESSED / "regions.csv")
    df = df[df["region"] != "ALL_REGIONS_NATIONAL"].copy()
    df = df.dropna(subset=["population_est"])
    df["population_est"] = df["population_est"].astype(int)
    df = df.sort_values("population_est", ascending=True)

    fig, ax = plt.subplots(figsize=(9, 7))
    bars = ax.barh(df["region"], df["population_est"] / 1_000_000, color=BAR_COLOR, height=0.6)

    for bar, val in zip(bars, df["population_est"]):
        ax.text(
            bar.get_width() + 0.05, bar.get_y() + bar.get_height() / 2,
            f"{val:,}", va="center", ha="left", fontsize=9, color=TEXT_COLOR,
        )

    ax.set_xlabel("Population, 2021 census (millions)", fontsize=10, color=MUTED_COLOR)
    ax.set_title(
        "Ghana population by region, 2021 census\n(denominator data for per-capita funding analysis - see limitations)",
        fontsize=12, color=TEXT_COLOR, loc="left",
    )
    ax.grid(axis="x", color=GRID_COLOR, linewidth=0.8, zorder=0)
    ax.set_axisbelow(True)
    for spine in ("top", "right", "left"):
        ax.spines[spine].set_visible(False)
    ax.spines["bottom"].set_color(GRID_COLOR)
    ax.tick_params(axis="y", length=0)
    fig.tight_layout()
    fig.savefig(FIGURES / "population_by_region.svg")
    plt.close(fig)
    print("Wrote outputs/figures/population_by_region.svg")


def financing_claims_chart() -> None:
    df = pd.read_csv(PROCESSED / "financing_timeline.csv")

    # Label text is for display only, not a plotting key - two rows can legitimately share the
    # same (year, figure_type) label (e.g. two slightly different figures both reported as the
    # "2025 budget_approved" amount). Using barh() with these as categorical y-values would
    # silently collapse same-text rows onto one bar position (matplotlib groups identical
    # category strings) - exactly the kind of silent-collapse this project's methodology forbids.
    # So: plot by integer row position, and attach the label text only as a tick label.
    df["label"] = df.apply(
        lambda r: f"{r['year']} - {r['figure_type']}" if pd.notna(r["amount_ghs"])
        else f"{r['year']} - {r['figure_type']} (USD, not converted)",
        axis=1,
    )
    ghs_df = df.dropna(subset=["amount_ghs"]).copy()
    ghs_df["amount_bn_ghs"] = ghs_df["amount_ghs"] / 1_000_000_000
    ghs_df = ghs_df.sort_values("amount_bn_ghs", ascending=True).reset_index(drop=True)

    y_pos = np.arange(len(ghs_df))
    fig, ax = plt.subplots(figsize=(10, 6))
    bars = ax.barh(y_pos, ghs_df["amount_bn_ghs"], color=BAR_COLOR, height=0.55)
    ax.set_yticks(y_pos)
    ax.set_yticklabels(ghs_df["label"])
    for bar, val in zip(bars, ghs_df["amount_bn_ghs"]):
        ax.text(
            bar.get_width() + 0.5, bar.get_y() + bar.get_height() / 2,
            f"GH₵{val:.1f}bn", va="center", ha="left", fontsize=9, color=TEXT_COLOR,
        )

    ax.set_xlabel("GH₵ billions", fontsize=10, color=MUTED_COLOR)
    ax.set_title(
        "Every GHS-denominated Big Push funding figure found (Phase 1-2)\n"
        "Distinct claims, not a time series - see sources.md discrepancy log",
        fontsize=11, color=TEXT_COLOR, loc="left",
    )
    ax.grid(axis="x", color=GRID_COLOR, linewidth=0.8, zorder=0)
    ax.set_axisbelow(True)
    for spine in ("top", "right", "left"):
        ax.spines[spine].set_visible(False)
    ax.spines["bottom"].set_color(GRID_COLOR)
    ax.tick_params(axis="y", length=0, labelsize=8)
    fig.tight_layout()
    fig.savefig(FIGURES / "financing_claims_reconciliation.svg")
    plt.close(fig)
    print("Wrote outputs/figures/financing_claims_reconciliation.svg")

    usd_only = df[df["amount_ghs"].isna() & df["amount_usd"].notna()]
    if len(usd_only):
        print(
            f"Note: {len(usd_only)} USD-denominated figures excluded from the chart above "
            "(no dated exchange rate on file to convert - see these rows directly in "
            "financing_timeline.csv): " + ", ".join(usd_only["figure_type"].tolist())
        )


def regional_summary_table() -> None:
    df = pd.read_csv(PROCESSED / "regions.csv")
    df = df[df["region"] != "ALL_REGIONS_NATIONAL"].copy()
    df = df[["region", "population_est", "mpi_poverty_rate"]].sort_values(
        "population_est", ascending=False, na_position="last"
    )
    df.to_csv(TABLES / "regional_summary.csv", index=False)
    print(f"Wrote outputs/tables/regional_summary.csv ({df['population_est'].notna().sum()} of "
          f"{len(df)} regions have a population figure; "
          f"{df['mpi_poverty_rate'].notna().sum()} have any poverty figure, none exact)")


def project_coverage_note() -> None:
    projects = pd.read_csv(PROCESSED / "projects.csv")
    covered_regions = projects["region"].nunique()
    print(
        f"\nDeliberately not computed: regional project-count/funding inequality (Gini/"
        f"concentration index). Current projects.csv has {len(projects)} rows covering "
        f"{covered_regions} distinct region values, against an officially claimed 70-140+ total "
        f"projects across all 16 regions. This is a WebSearch-visibility sample, not a "
        f"representative one - see methodology.md sec2.2 and sec2.7. Revisit once the MRH tracker's "
        f"full project table can be directly retrieved."
    )


def main() -> None:
    FIGURES.mkdir(parents=True, exist_ok=True)
    TABLES.mkdir(parents=True, exist_ok=True)
    population_by_region_chart()
    financing_claims_chart()
    regional_summary_table()
    project_coverage_note()


if __name__ == "__main__":
    main()
